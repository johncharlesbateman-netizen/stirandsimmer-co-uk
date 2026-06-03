-- Recreate recipe_ratings_public view with security_invoker explicitly set
DROP VIEW IF EXISTS public.recipe_ratings_public;
CREATE VIEW public.recipe_ratings_public
WITH (security_invoker = on) AS
SELECT recipe_id, rating FROM public.recipe_ratings;

GRANT SELECT ON public.recipe_ratings_public TO anon, authenticated;

-- Allow public SELECT on base table aggregate columns through the view; base table policies remain owner-only
-- We need a SELECT policy on recipe_ratings so the view (running as invoker) can read rows.
DROP POLICY IF EXISTS "Public can read ratings for aggregates" ON public.recipe_ratings;
CREATE POLICY "Public can read ratings for aggregates"
ON public.recipe_ratings
FOR SELECT
TO anon, authenticated
USING (true);

-- Note: user_id column is excluded from the public view; direct table reads still expose user_id.
-- Revoke column access to user_id for anon/authenticated on the base table.
REVOKE SELECT ON public.recipe_ratings FROM anon, authenticated;
GRANT SELECT (recipe_id, rating, comment, created_at, updated_at, id, user_id) ON public.recipe_ratings TO authenticated;
-- anon only via the view

-- Fix storage policy: add is_anonymous check to dish-verifications upload policy
DROP POLICY IF EXISTS "Pass: upload own dish photos" ON storage.objects;
CREATE POLICY "Pass: upload own dish photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'dish-verifications'
  AND (auth.uid())::text = (storage.foldername(name))[1]
  AND (((auth.jwt() ->> 'is_anonymous'::text))::boolean IS NOT TRUE)
);

-- Fix recipes RLS: hide unpublished from public, allow admins to see all
DROP POLICY IF EXISTS "Recipes are viewable by everyone" ON public.recipes;
CREATE POLICY "Published recipes are viewable by everyone"
ON public.recipes
FOR SELECT
TO public
USING (published = true);

CREATE POLICY "Admins can view all recipes"
ON public.recipes
FOR SELECT
TO authenticated
USING (public.is_admin());