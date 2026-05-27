
UPDATE public.recipes
SET
  image_url = 'https://xlekynbjvcfbfqycjnpj.supabase.co/storage/v1/object/public/recipe-images/date-and-walnut-cake.jpeg',
  prep_time_minutes = 20,
  cook_time_minutes = 55,
  servings = 10,
  ingredients = '[
    "100g unsalted butter, plus extra for greasing",
    "250g pitted Medjool dates, roughly chopped",
    "150ml boiling water",
    "1 tsp instant coffee granules",
    "75g caster sugar",
    "55g dark muscovado sugar",
    "2 medium eggs, lightly beaten",
    "225g self-raising flour",
    "1 tsp baking powder",
    "Pinch of table salt",
    "100g walnuts, roughly chopped",
    "10g demerara sugar"
  ]'::jsonb,
  instructions = '[
    "Preheat the oven to 160°C (140°C fan / Gas Mark 3).",
    "Grease a 900g loaf tin and line the base and ends with a strip of buttered greaseproof paper.",
    "Combine the butter, dates, boiling water and coffee granules in a large mixing bowl. Stir briefly to combine, then leave for 30 minutes so the butter melts and the dates soften.",
    "Add the caster and dark muscovado sugars to the date mixture and stir well, breaking up any lumps of brown sugar.",
    "Add the beaten eggs and mix again to combine.",
    "Sift in the self-raising flour, baking powder and salt, then fold through until the batter is smooth.",
    "Add all but about 15g of the chopped walnuts and fold through.",
    "Pour the mixture into the prepared loaf tin, scatter over the reserved walnuts, then sprinkle with the demerara sugar.",
    "Bake in the centre of the oven for 30 minutes.",
    "Reduce the temperature to 150°C (130°C fan / Gas Mark 2) and bake for a further 25 minutes, or until a skewer inserted into the middle comes out clean. If the top is browning too quickly, cover loosely with foil for this final stage.",
    "Remove from the oven and leave to cool in the tin for 10 minutes, then carefully lift out onto a wire rack and leave until completely cool before slicing."
  ]'::jsonb,
  updated_at = now()
WHERE slug = 'date-and-walnut-cake';
