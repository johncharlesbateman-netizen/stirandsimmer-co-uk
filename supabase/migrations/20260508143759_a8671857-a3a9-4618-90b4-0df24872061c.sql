
REVOKE ALL ON FUNCTION public.verify_dish(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.verify_dish(uuid, text) TO authenticated;
