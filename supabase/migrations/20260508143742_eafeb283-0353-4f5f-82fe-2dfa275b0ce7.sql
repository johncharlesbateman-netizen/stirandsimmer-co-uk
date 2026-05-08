
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS chef_name text,
  ADD COLUMN IF NOT EXISTS avatar text,
  ADD COLUMN IF NOT EXISTS cooking_style text,
  ADD COLUMN IF NOT EXISTS total_points integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS level integer NOT NULL DEFAULT 1;

CREATE TABLE IF NOT EXISTS public.secrets_pass (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  cuisine_region text NOT NULL,
  recipe_name text NOT NULL,
  recipe_url text NOT NULL,
  cook_time_minutes integer NOT NULL DEFAULT 30,
  required_count integer NOT NULL DEFAULT 1,
  points_reward integer NOT NULL DEFAULT 50,
  unlock_reward_id uuid REFERENCES public.secrets_pass(id) ON DELETE SET NULL,
  is_locked_until_points integer NOT NULL DEFAULT 0,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.challenge_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  challenge_id uuid NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  verified_count integer NOT NULL DEFAULT 0,
  completed boolean NOT NULL DEFAULT false,
  completed_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, challenge_id)
);

CREATE TABLE IF NOT EXISTS public.verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  challenge_id uuid NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  recipe_name text NOT NULL,
  recipe_url text NOT NULL,
  photo_url text NOT NULL,
  points_awarded integer NOT NULL DEFAULT 0,
  unlocked_secret_id uuid REFERENCES public.secrets_pass(id) ON DELETE SET NULL,
  verified_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.unlocked_secrets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  secret_id uuid NOT NULL REFERENCES public.secrets_pass(id) ON DELETE CASCADE,
  unlocked_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, secret_id)
);

ALTER TABLE public.secrets_pass ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unlocked_secrets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Challenges readable by all" ON public.challenges;
CREATE POLICY "Challenges readable by all" ON public.challenges FOR SELECT USING (true);

DROP POLICY IF EXISTS "Secrets readable by all" ON public.secrets_pass;
CREATE POLICY "Secrets readable by all" ON public.secrets_pass FOR SELECT USING (true);

DROP POLICY IF EXISTS "Own progress select" ON public.challenge_progress;
DROP POLICY IF EXISTS "Own progress insert" ON public.challenge_progress;
DROP POLICY IF EXISTS "Own progress update" ON public.challenge_progress;
CREATE POLICY "Own progress select" ON public.challenge_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Own progress insert" ON public.challenge_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own progress update" ON public.challenge_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Own verifications select" ON public.verifications;
DROP POLICY IF EXISTS "Own verifications insert" ON public.verifications;
CREATE POLICY "Own verifications select" ON public.verifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Own verifications insert" ON public.verifications FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Own unlocks select" ON public.unlocked_secrets;
DROP POLICY IF EXISTS "Own unlocks insert" ON public.unlocked_secrets;
CREATE POLICY "Own unlocks select" ON public.unlocked_secrets FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Own unlocks insert" ON public.unlocked_secrets FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

INSERT INTO storage.buckets (id, name, public) VALUES ('dish-verifications', 'dish-verifications', false)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Pass: upload own dish photos" ON storage.objects;
DROP POLICY IF EXISTS "Pass: read own dish photos" ON storage.objects;
CREATE POLICY "Pass: upload own dish photos" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'dish-verifications' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Pass: read own dish photos" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'dish-verifications' AND auth.uid()::text = (storage.foldername(name))[1]);

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
           level = 1 + ((COALESCE(total_points, 0) + v_points) / 200),
           updated_at = now()
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

WITH s AS (
  INSERT INTO public.secrets_pass (title, content) VALUES
    ('The salt timing rule', 'Salt your pasta water until it tastes like the sea, and finish every dish with a final pinch of flaky salt just before serving — it wakes up every flavour underneath.'),
    ('The Maillard window', 'Get your pan smoking hot, dry the protein thoroughly, and do not move it for 90 seconds. That untouched contact is where deep flavour lives.'),
    ('The acid finish', 'Almost every savoury dish improves with a squeeze of lemon or a splash of vinegar at the very end. It lifts heavy flavours into balance.'),
    ('The mise en place truth', 'Prep everything before the heat goes on. The best chefs cook calmly because they have already done the thinking.'),
    ('The resting principle', 'Rest meat for half its cooking time. The juices redistribute, the texture transforms, and the dish tastes twice as good.'),
    ('The umami stack', 'Layer three umami sources — anchovy, parmesan, soy, miso, mushroom — and your dish gains a depth that tastes like a restaurant kitchen.')
  RETURNING id, title
)
INSERT INTO public.challenges (title, description, cuisine_region, recipe_name, recipe_url, cook_time_minutes, required_count, points_reward, unlock_reward_id, is_locked_until_points, sort_order)
SELECT * FROM (VALUES
  ('The pasta initiation', 'Master a true Italian classic. Cook it once and earn your first secret.', 'Italian', 'Spaghetti carbonara', 'https://stirandsimmer.co.uk/recipes', 25, 1, 50, (SELECT id FROM s WHERE title = 'The salt timing rule'), 0, 1),
  ('Sear school', 'Cook two dishes that demand a perfect sear. Learn what restaurant-grade browning feels like.', 'European', 'Steak au poivre', 'https://stirandsimmer.co.uk/recipes', 35, 2, 75, (SELECT id FROM s WHERE title = 'The Maillard window'), 0, 2),
  ('The bright finish', 'Cook a dish where acid is the hero. Learn how a single squeeze transforms a plate.', 'Mediterranean', 'Lemon chicken with herbs', 'https://stirandsimmer.co.uk/recipes', 40, 1, 60, (SELECT id FROM s WHERE title = 'The acid finish'), 50, 3),
  ('Calm in the kitchen', 'Cook three dishes back-to-back this week. Build the habit of preparing before the heat.', 'Global', 'A weeknight trio', 'https://stirandsimmer.co.uk/recipes', 30, 3, 100, (SELECT id FROM s WHERE title = 'The mise en place truth'), 75, 4),
  ('Slow and steady', 'Cook a slow-braised dish. Patience is the technique.', 'French', 'Beef bourguignon', 'https://stirandsimmer.co.uk/recipes', 180, 1, 80, (SELECT id FROM s WHERE title = 'The resting principle'), 150, 5),
  ('The umami test', 'Cook two dishes that build deep savoury layers. You will taste the difference.', 'Asian', 'Miso ramen', 'https://stirandsimmer.co.uk/recipes', 60, 2, 120, (SELECT id FROM s WHERE title = 'The umami stack'), 250, 6)
) AS t(title, description, cuisine_region, recipe_name, recipe_url, cook_time_minutes, required_count, points_reward, unlock_reward_id, is_locked_until_points, sort_order);
