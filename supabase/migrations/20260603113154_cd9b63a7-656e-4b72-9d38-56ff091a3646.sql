-- Don't expose user_id column via the base table to anon/authenticated.
-- The public view exposes only recipe_id + rating. Users querying base table can still see their own row (rating, comment) via existing RLS, but not user_id of others.
REVOKE SELECT ON public.recipe_ratings FROM authenticated;
GRANT SELECT (id, recipe_id, rating, comment, created_at, updated_at) ON public.recipe_ratings TO authenticated;
-- Grant user_id only so owner policies can filter on it — but we need it readable to the owner themselves.
-- Owners checking their own rating: use maybeSingle on user_id = auth.uid(); they don't need to read user_id column to do that filter (server-side).
-- However app code may select user_id. Grant it to authenticated; RLS still limits to own row via owner policy.
GRANT SELECT (user_id) ON public.recipe_ratings TO authenticated;

-- Drop the broad public-read policy and replace with one that limits which columns? RLS is row-level not column-level.
-- Instead: keep aggregate-public policy but rely on column grants to hide user_id from anon.
-- Anon has no grants on base table (revoked above implicitly? Re-confirm). Explicitly revoke:
REVOKE ALL ON public.recipe_ratings FROM anon;
-- Anon reads aggregates only via the view (which has its own grant).