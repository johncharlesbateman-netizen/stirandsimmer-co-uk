import heic2any from "heic2any";

const HEIC_EXTENSIONS = /\.(heic|heif)$/i;
const HEIC_MIME_TYPES = new Set([
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "image/heif-sequence",
]);

const isHeicLikeFile = (file: File) =>
  HEIC_MIME_TYPES.has(file.type) || HEIC_EXTENSIONS.test(file.name);

const toJpegFileName = (name: string) =>
  HEIC_EXTENSIONS.test(name) ? name.replace(HEIC_EXTENSIONS, ".jpg") : `${name}.jpg`;

export const normaliseRecipeImageUpload = async (file: File): Promise<File> => {
  if (!isHeicLikeFile(file)) return file;

  const converted = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.9,
  });

  const convertedBlob = Array.isArray(converted) ? converted[0] : converted;

  return new File([convertedBlob], toJpegFileName(file.name), {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
};