CREATE TABLE public.guides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  intro TEXT NOT NULL,
  body TEXT NOT NULL,
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  last_updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published guides are viewable by everyone"
  ON public.guides FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can view all guides"
  ON public.guides FOR SELECT TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can insert guides"
  ON public.guides FOR INSERT TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update guides"
  ON public.guides FOR UPDATE TO authenticated
  USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins can delete guides"
  ON public.guides FOR DELETE TO authenticated
  USING (is_admin());

CREATE TRIGGER update_guides_updated_at
  BEFORE UPDATE ON public.guides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.guides (slug, title, intro, body) VALUES
(
  'midweek-dinners-under-30-minutes',
  '5 Proper Midweek Dinners You Can Make in Under 30 Minutes',
  'Five reliable weeknight dinners using ingredients from any UK supermarket — no skill required, no faffing about.',
  $$There''s a particular kind of weeknight despair that hits around 5:30pm. You''re tired, the fridge looks uninspiring, and the last thing you want is a recipe that needs three pans and an hour you don''t have. These five dinners are our answer to that. All of them use ingredients you can pick up at any UK supermarket, none of them require culinary skill, and all of them are genuinely worth eating.

Chicken Tray Bake with Lemon and Garlic — Chuck everything on one tray, slide it in the oven, and use the time it cooks to decompress. This is the most reliable weeknight formula there is.

Lamb Mince Keema — Faster than a takeaway and considerably better. Lamb mince is underused in most British kitchens — this recipe is a good argument for changing that.

One-Pan Pork Belly with New Potatoes — New potatoes are at their best right now. This one needs about 10 minutes of prep and the oven does the rest.

Courgette and Feta Fritters — A proper dinner, not a side dish. Ready in 20 minutes and the kind of thing that surprises people with how good it is.

Simple Pasta with a Proper Tomato Sauce — Not the jar. An actual sauce, made in the time it takes to boil the pasta. Once you know how, you''ll never go back.

All recipes on Stir & Simmer are tested in a real UK kitchen using ingredients from your local supermarket. No subscriptions, no paywalls — just food that works.$$
),
(
  'whats-in-season-june-uk',
  'What''s in Season in June in the UK',
  'A short guide to the British produce worth buying in June, and what to cook with it.',
  $$June is one of the best months to eat in Britain. The last of the spring produce overlaps with the first proper summer vegetables, and for a few weeks the supermarkets and markets are full of things that actually taste of something. Here''s what to look for and what to do with it.

Courgettes — They arrive in June and keep coming until September. Buy the smaller ones — they have better flavour and less water. Fritters, grilled with olive oil, or stirred through pasta are all excellent.

New Potatoes — Jersey Royals are still around in early June. After that, any new potatoes from British growers will do. Boil them with mint, roast them simply, or use them as the base for a one-pan dinner.

Broad Beans — Underrated and underused. Briefly blanched and popped from their grey skins, they''re one of the better things about an English summer. Good with bacon, good with pasta, good on toast.

Strawberries — British strawberries start properly in June. Worth waiting for — they taste completely different from the imported ones that appear in April.

Lamb — Spring lamb is at its peak. Mince, chops, or shoulder — all worth cooking with right now.

We build our recipes around what''s actually available at UK supermarkets. Browse our seasonal recipes for ideas on what to cook this month.$$
);