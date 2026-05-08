
-- Helper: level from points
CREATE OR REPLACE FUNCTION public.level_for_points(p integer)
RETURNS integer
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE
    WHEN p >= 2000 THEN 5
    WHEN p >= 1000 THEN 4
    WHEN p >= 500  THEN 3
    WHEN p >= 200  THEN 2
    ELSE 1
  END
$$;

-- Update verify_dish to use new level thresholds
CREATE OR REPLACE FUNCTION public.verify_dish(
  p_challenge_id uuid,
  p_photo_url text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_challenge public.challenges%ROWTYPE;
  v_progress public.challenge_progress%ROWTYPE;
  v_new_count integer;
  v_completed boolean := false;
  v_points integer := 0;
  v_secret_id uuid := NULL;
  v_verification_id uuid;
  v_new_total integer;
BEGIN
  IF v_user_id IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  SELECT * INTO v_challenge FROM public.challenges WHERE id = p_challenge_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Challenge not found'; END IF;

  INSERT INTO public.challenge_progress (user_id, challenge_id, verified_count)
  VALUES (v_user_id, p_challenge_id, 0)
  ON CONFLICT (user_id, challenge_id) DO NOTHING;

  SELECT * INTO v_progress FROM public.challenge_progress
   WHERE user_id = v_user_id AND challenge_id = p_challenge_id FOR UPDATE;

  IF v_progress.completed THEN RAISE EXCEPTION 'Challenge already completed'; END IF;

  v_new_count := v_progress.verified_count + 1;
  IF v_new_count >= v_challenge.required_count THEN
    v_completed := true;
    v_points := v_challenge.points_reward;
    v_secret_id := v_challenge.unlock_reward_id;
  END IF;

  UPDATE public.challenge_progress
     SET verified_count = v_new_count,
         completed = v_completed,
         completed_at = CASE WHEN v_completed THEN now() ELSE NULL END,
         updated_at = now()
   WHERE id = v_progress.id;

  INSERT INTO public.verifications (user_id, challenge_id, recipe_name, recipe_url, photo_url, points_awarded, unlocked_secret_id)
  VALUES (v_user_id, p_challenge_id, v_challenge.recipe_name, v_challenge.recipe_url, p_photo_url, v_points, v_secret_id)
  RETURNING id INTO v_verification_id;

  IF v_completed AND v_secret_id IS NOT NULL THEN
    INSERT INTO public.unlocked_secrets (user_id, secret_id)
    VALUES (v_user_id, v_secret_id)
    ON CONFLICT (user_id, secret_id) DO NOTHING;
  END IF;

  IF v_points > 0 THEN
    UPDATE public.profiles
       SET total_points = COALESCE(total_points, 0) + v_points,
           updated_at = now()
     WHERE user_id = v_user_id
     RETURNING total_points INTO v_new_total;

    UPDATE public.profiles
       SET level = public.level_for_points(v_new_total)
     WHERE user_id = v_user_id;
  END IF;

  RETURN jsonb_build_object(
    'verification_id', v_verification_id,
    'points_awarded', v_points,
    'completed', v_completed,
    'secret_id', v_secret_id,
    'verified_count', v_new_count,
    'required_count', v_challenge.required_count
  );
END;
$$;

REVOKE ALL ON FUNCTION public.verify_dish(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.verify_dish(uuid, text) TO authenticated;

-- Add welcome flag to secrets
ALTER TABLE public.secrets_pass ADD COLUMN IF NOT EXISTS is_welcome boolean NOT NULL DEFAULT false;

-- Wipe and reseed
DELETE FROM public.unlocked_secrets;
DELETE FROM public.verifications;
DELETE FROM public.challenge_progress;
DELETE FROM public.challenges;
DELETE FROM public.secrets_pass;

-- Recalculate existing profiles to level 1 (no progress remains)
UPDATE public.profiles SET total_points = 0, level = 1;

-- Seed secrets
WITH s AS (
  INSERT INTO public.secrets_pass (title, content, is_welcome) VALUES
    ('Carbonara technique',
     'Take the pan off the heat before adding your eggs. Never let it boil again. Low and slow is everything.',
     true),
    ('Curry depth',
     'Fry your spices in oil until the colour deepens before adding anything liquid. This is where the flavour lives.',
     true),
    ('Nonna''s pasta secrets',
     'The water is the sauce. Always save a full cup of pasta water before draining and add it slowly as you finish the dish. It binds everything together.',
     false),
    ('The mother sauce guide',
     'Every sauce in French cooking descends from five mothers. Master Béchamel, Velouté, Espagnole, Hollandaise and Tomat and you can build almost anything.',
     false)
  RETURNING id, title
)
INSERT INTO public.challenges (title, description, cuisine_region, recipe_name, recipe_url, cook_time_minutes, required_count, points_reward, unlock_reward_id, is_locked_until_points, sort_order)
SELECT * FROM (VALUES
  ('Cook 3 Italian dishes this week',
   'Cook any 3 recipes from the Italian kitchen on Stir and Simmer and photograph each one to verify.',
   'Italian', 'Italian classics', 'https://stirandsimmer.co.uk/recipes',
   45, 3, 150, (SELECT id FROM s WHERE title = 'Nonna''s pasta secrets'), 0, 1),
  ('Master the mother sauces',
   'Cook all 5 classic French mother sauces from the Stir and Simmer recipe collection.',
   'French', 'Béchamel sauce', 'https://stirandsimmer.co.uk/recipes',
   60, 5, 300, (SELECT id FROM s WHERE title = 'The mother sauce guide'), 0, 2),
  ('Complete a full meal',
   'Cook a starter, a main and a dessert within the same week and verify each one.',
   'Global', 'Three course menu', 'https://stirandsimmer.co.uk/recipes',
   90, 3, 200, NULL, 0, 3),
  ('Spice trail',
   'Cook any 5 spicy dishes from the Stir and Simmer collection.',
   'Global', 'Spicy dishes', 'https://stirandsimmer.co.uk/recipes',
   45, 5, 250, NULL, 500, 4)
) AS t(title, description, cuisine_region, recipe_name, recipe_url, cook_time_minutes, required_count, points_reward, unlock_reward_id, is_locked_until_points, sort_order);

-- Auto-unlock welcome secrets for every existing user
INSERT INTO public.unlocked_secrets (user_id, secret_id)
SELECT p.user_id, s.id
FROM public.profiles p
CROSS JOIN public.secrets_pass s
WHERE s.is_welcome = true
ON CONFLICT (user_id, secret_id) DO NOTHING;

-- Trigger: auto-unlock welcome secrets when a profile is created
CREATE OR REPLACE FUNCTION public.unlock_welcome_secrets_for_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.unlocked_secrets (user_id, secret_id)
  SELECT NEW.user_id, s.id FROM public.secrets_pass s WHERE s.is_welcome = true
  ON CONFLICT (user_id, secret_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_unlock_welcome ON public.profiles;
CREATE TRIGGER trg_unlock_welcome
AFTER INSERT ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.unlock_welcome_secrets_for_profile();
