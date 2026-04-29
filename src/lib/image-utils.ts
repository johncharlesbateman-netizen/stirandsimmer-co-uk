// Image transformation helpers for Supabase Storage.
// Uses the built-in image renderer to deliver WebP + responsive sizes,
// improving LCP and reducing bandwidth on mobile.
//
// Docs: https://supabase.com/docs/guides/storage/serving/image-transformations

const SUPABASE_RENDER_PATH = "/storage/v1/render/image/public/";
const SUPABASE_OBJECT_PATH = "/storage/v1/object/public/";

const isSupabaseStorageUrl = (url: string): boolean =>
  url.includes(SUPABASE_OBJECT_PATH) || url.includes(SUPABASE_RENDER_PATH);

const toRenderUrl = (url: string): string =>
  url.replace(SUPABASE_OBJECT_PATH, SUPABASE_RENDER_PATH);

interface TransformOpts {
  width?: number;
  height?: number;
  quality?: number; // 20–100
  resize?: "cover" | "contain" | "fill";
}

/**
 * Build an optimised image URL. For Supabase Storage URLs, this rewrites the
 * path to the image renderer and serves WebP. For other URLs (local imports,
 * external CDNs), the original URL is returned unchanged.
 */
export const optimisedImage = (
  src: string | null | undefined,
  opts: TransformOpts = {},
): string => {
  if (!src) return "";
  if (!isSupabaseStorageUrl(src)) return src;

  const base = toRenderUrl(src);
  const params = new URLSearchParams();
  params.set("format", "webp");
  if (opts.width) params.set("width", String(opts.width));
  if (opts.height) params.set("height", String(opts.height));
  params.set("quality", String(opts.quality ?? 75));
  params.set("resize", opts.resize ?? "cover");

  return `${base}?${params.toString()}`;
};

/**
 * Build a responsive srcset string at common DPR-aware widths.
 * Pair with a `sizes` attribute for the layout you're using.
 */
export const responsiveSrcSet = (
  src: string | null | undefined,
  widths: number[],
  opts: Omit<TransformOpts, "width"> = {},
): string => {
  if (!src || !isSupabaseStorageUrl(src)) return "";
  return widths
    .map((w) => `${optimisedImage(src, { ...opts, width: w })} ${w}w`)
    .join(", ");
};
