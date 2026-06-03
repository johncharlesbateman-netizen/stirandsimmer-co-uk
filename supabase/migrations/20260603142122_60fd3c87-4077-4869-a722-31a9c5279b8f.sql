
-- Fix privilege escalation: only allow challenge progress / verifications / unlocks via verify_dish RPC (SECURITY DEFINER) or service role
DROP POLICY IF EXISTS "Own progress insert" ON public.challenge_progress;
DROP POLICY IF EXISTS "Own progress update" ON public.challenge_progress;

DROP POLICY IF EXISTS "Own unlocks insert" ON public.unlocked_secrets;

DROP POLICY IF EXISTS "Own verifications insert" ON public.verifications;

-- Reconcile dish-verifications storage SELECT policy:
-- remove the dish-photos-only single-bucket SELECT policy; the ANY-array policy
-- "Users view own dish photos" remains as the authoritative owner-read rule for both buckets.
DROP POLICY IF EXISTS "Owners can read their dish photos" ON storage.objects;

-- Prevent listing of the public recipe-images bucket via storage.objects SELECT.
-- Public buckets serve object URLs through the CDN without requiring an RLS SELECT,
-- so removing this policy keeps image URLs working while blocking the list API.
DROP POLICY IF EXISTS "Recipe images are publicly readable" ON storage.objects;
