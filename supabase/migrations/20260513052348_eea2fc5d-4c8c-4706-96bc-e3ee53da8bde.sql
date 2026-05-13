-- Recipe ratings table
CREATE TABLE public.recipe_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (recipe_id, user_id)
);

CREATE INDEX idx_recipe_ratings_recipe_id ON public.recipe_ratings(recipe_id);

ALTER TABLE public.recipe_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ratings are viewable by everyone"
  ON public.recipe_ratings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert their own rating"
  ON public.recipe_ratings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own rating"
  ON public.recipe_ratings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can delete their own rating"
  ON public.recipe_ratings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin());

CREATE TRIGGER update_recipe_ratings_updated_at
  BEFORE UPDATE ON public.recipe_ratings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Aggregate stats view for fast reads (used by recipe page + AggregateRating JSON-LD)
CREATE VIEW public.recipe_rating_stats
WITH (security_invoker = true)
AS
SELECT
  recipe_id,
  ROUND(AVG(rating)::numeric, 2) AS average_rating,
  COUNT(*)::int AS rating_count
FROM public.recipe_ratings
GROUP BY recipe_id;

GRANT SELECT ON public.recipe_rating_stats TO anon, authenticated;