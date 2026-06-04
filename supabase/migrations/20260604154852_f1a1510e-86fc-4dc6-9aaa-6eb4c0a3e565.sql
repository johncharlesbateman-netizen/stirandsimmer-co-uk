-- 1. Allow admins to view dish photos and verification images
CREATE POLICY "Admins can view dish photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = ANY (ARRAY['dish-photos'::text, 'dish-verifications'::text])
  AND public.is_admin()
);

-- 2. Drop the broad public SELECT policy on recipe-images.
-- Files remain accessible via their public CDN URLs (the bucket is public),
-- but clients can no longer list/enumerate objects through the storage API.
DROP POLICY IF EXISTS "Public read access for recipe-images" ON storage.objects;
