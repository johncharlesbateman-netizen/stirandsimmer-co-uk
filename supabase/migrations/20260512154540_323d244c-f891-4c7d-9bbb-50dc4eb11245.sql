UPDATE public.recipes
SET meal_types = ARRAY['lunch']::text[]
WHERE slug IN (
  'salmon-and-asparagus-terrine',
  'smoked-salmon-with-gherkin-beetroot-vanilla-vodka-crme-frache',
  'smoked-salmon-and-cream-cheese-roll',
  'prawn-avocado-and-mango-salad',
  'scallops-with-apple-fennel-and-celeriac-salad',
  'warm-beef-salad'
);