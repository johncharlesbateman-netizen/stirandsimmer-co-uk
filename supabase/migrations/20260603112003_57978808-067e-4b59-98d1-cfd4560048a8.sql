-- 1) Lock down recipe_ratings: no more public read of user_id
DROP POLICY IF EXISTS "Ratings are viewable by everyone" ON public.recipe_ratings;
DROP POLICY IF EXISTS "Public can view ratings" ON public.recipe_ratings;
DROP POLICY IF EXISTS "Anyone can view ratings" ON public.recipe_ratings;
DROP POLICY IF EXISTS "Ratings viewable by everyone" ON public.recipe_ratings;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.recipe_ratings;

-- Authenticated users can only see their own rating row on the base table
CREATE POLICY "Users can view their own rating"
  ON public.recipe_ratings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Public-safe view that exposes only recipe_id + rating (no user_id)
CREATE OR REPLACE VIEW public.recipe_ratings_public
WITH (security_invoker = on) AS
  SELECT recipe_id, rating
  FROM public.recipe_ratings;

GRANT SELECT ON public.recipe_ratings_public TO anon, authenticated;

-- The view uses security_invoker, so it still respects RLS. We need a
-- separate policy that allows anyone to read the rating value (but the
-- view hides user_id from them).
CREATE POLICY "Aggregate rating values readable"
  ON public.recipe_ratings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Wait — that re-exposes user_id on the base table. Replace with column-
-- limited access via the view by revoking direct base-table SELECT from
-- anon and keeping authenticated own-row only.
DROP POLICY IF EXISTS "Aggregate rating values readable" ON public.recipe_ratings;
REVOKE SELECT ON public.recipe_ratings FROM anon;

-- For the security_invoker view to work for anon, we need an alternative:
-- make the view SECURITY DEFINER-style by switching off security_invoker
-- so it runs as the view owner and bypasses RLS, exposing only safe cols.
DROP VIEW IF EXISTS public.recipe_ratings_public;
CREATE VIEW public.recipe_ratings_public AS
  SELECT recipe_id, rating
  FROM public.recipe_ratings;
GRANT SELECT ON public.recipe_ratings_public TO anon, authenticated;

-- 2) dish-photos: allow owners to read their own files
CREATE POLICY "Owners can read their dish photos"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'dish-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
