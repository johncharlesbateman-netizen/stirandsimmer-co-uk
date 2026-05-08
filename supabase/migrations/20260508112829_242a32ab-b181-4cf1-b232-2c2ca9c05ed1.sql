CREATE TABLE public.cooked_dishes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id TEXT NOT NULL,
  recipe_name TEXT,
  photo_url TEXT,
  photo_verified BOOLEAN NOT NULL DEFAULT false,
  cooked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.cooked_dishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own cooked dishes" ON public.cooked_dishes
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own cooked dishes" ON public.cooked_dishes
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own cooked dishes" ON public.cooked_dishes
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX idx_cooked_dishes_user ON public.cooked_dishes(user_id, cooked_at DESC);

INSERT INTO storage.buckets (id, name, public) VALUES ('dish-photos', 'dish-photos', false)
  ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users view own dish photos" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'dish-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users upload own dish photos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'dish-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users delete own dish photos" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'dish-photos' AND auth.uid()::text = (storage.foldername(name))[1]);