-- 1. Storage: remove wide-open write policies on recipe-images bucket.
DROP POLICY IF EXISTS "Anyone can upload recipe images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update recipe images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete recipe images" ON storage.objects;

-- 2. Storage: remove broad SELECT policies that allow listing every file.
-- Direct public URLs (/storage/v1/object/public/...) bypass RLS, so images
-- on the site continue to load — only API-level enumeration is blocked.
DROP POLICY IF EXISTS "Anyone can view recipe images" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for recipe images" ON storage.objects;

-- 3. Lock down SECURITY DEFINER helpers from being called directly by clients.
-- pgmq queue helpers are only meant to be invoked by service-role edge functions.
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM anon, authenticated;

-- Trigger-only helpers should never be called directly.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.unlock_welcome_secrets_for_profile() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;

-- Note: is_admin() and verify_dish() remain executable — they are used by
-- RLS policies and an authenticated RPC respectively.

-- 4. Pin search_path on the one helper missing it.
ALTER FUNCTION public.level_for_points(integer) SET search_path = public;