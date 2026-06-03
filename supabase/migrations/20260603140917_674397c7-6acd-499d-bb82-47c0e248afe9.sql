
-- Fix 1: Remove public SELECT on recipe_ratings that exposes user_id/comment.
-- Clients should use the recipe_ratings_public view for aggregates.
DROP POLICY IF EXISTS "Public can read ratings for aggregates" ON public.recipe_ratings;

-- Fix 2: Add explicit public SELECT policy for recipe-images bucket.
CREATE POLICY "Recipe images are publicly readable"
ON storage.objects
FOR SELECT
USING (bucket_id = 'recipe-images');
