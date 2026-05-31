import heic2any from "heic2any";

const HEIC_EXTENSIONS = /\.(heic|heif)$/i;
const HEIC_MIME_TYPES = new Set([
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "image/heif-sequence",
]);

const MIN_FILE_BYTES = 25_000; // ~25KB; real photos at q=0.9 are well above this
const MIN_SHORT_EDGE_PX = 400; // reject anything smaller than this on the shortest side
const MIN_COLOUR_VARIANCE = 180; // sum of per-channel variance across a 4×4 grid; very uniform crops (wood, sky, plain table) fall well below this
const GRID = 4;

const isHeicLikeFile = (file: File) =>
  HEIC_MIME_TYPES.has(file.type) || HEIC_EXTENSIONS.test(file.name);

const toJpegFileName = (name: string) =>
  HEIC_EXTENSIONS.test(name) ? name.replace(HEIC_EXTENSIONS, ".jpg") : `${name}.jpg`;

export class RecipeImageValidationError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = "RecipeImageValidationError";
  }
}

const loadImage = (blob: Blob): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new RecipeImageValidationError("DECODE_FAILED", "Converted image could not be decoded."));
    };
    img.src = url;
  });

/**
 * Sample the image as a GRID×GRID grid of cell-averaged RGB values and
 * return the summed per-channel variance across cells. A genuine food
 * photograph hits hundreds-to-thousands; a flat wood-grain / single-colour
 * crop sits well under 100.
 */
const computeColourVariance = (img: HTMLImageElement): number => {
  const canvas = document.createElement("canvas");
  // Downscale to a fixed sample size so the variance threshold is stable
  // regardless of source dimensions.
  const sample = 64;
  canvas.width = sample;
  canvas.height = sample;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Number.POSITIVE_INFINITY; // can't check — don't block
  ctx.drawImage(img, 0, 0, sample, sample);
  const { data } = ctx.getImageData(0, 0, sample, sample);

  const cellSize = sample / GRID;
  const cellMeans: Array<[number, number, number]> = [];
  for (let gy = 0; gy < GRID; gy++) {
    for (let gx = 0; gx < GRID; gx++) {
      let r = 0, g = 0, b = 0, n = 0;
      for (let y = Math.floor(gy * cellSize); y < Math.floor((gy + 1) * cellSize); y++) {
        for (let x = Math.floor(gx * cellSize); x < Math.floor((gx + 1) * cellSize); x++) {
          const i = (y * sample + x) * 4;
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          n++;
        }
      }
      cellMeans.push([r / n, g / n, b / n]);
    }
  }

  const mean = (idx: 0 | 1 | 2) =>
    cellMeans.reduce((acc, c) => acc + c[idx], 0) / cellMeans.length;
  const variance = (idx: 0 | 1 | 2) => {
    const m = mean(idx);
    return cellMeans.reduce((acc, c) => acc + (c[idx] - m) ** 2, 0) / cellMeans.length;
  };

  return variance(0) + variance(1) + variance(2);
};

const validateConvertedImage = async (blob: Blob, sourceName: string): Promise<void> => {
  if (blob.size < MIN_FILE_BYTES) {
    throw new RecipeImageValidationError(
      "TOO_SMALL",
      `Converted image for "${sourceName}" is only ${(blob.size / 1024).toFixed(1)}KB — the HEIC conversion likely failed. Please re-export the photo as JPEG/PNG and try again.`,
    );
  }

  const img = await loadImage(blob);
  const shortEdge = Math.min(img.naturalWidth, img.naturalHeight);
  if (shortEdge < MIN_SHORT_EDGE_PX) {
    throw new RecipeImageValidationError(
      "TOO_LOW_RES",
      `Converted image for "${sourceName}" is only ${img.naturalWidth}×${img.naturalHeight}px. Please re-export the photo at a higher resolution.`,
    );
  }

  const variance = computeColourVariance(img);
  if (variance < MIN_COLOUR_VARIANCE) {
    throw new RecipeImageValidationError(
      "UNIFORM_CROP",
      `The HEIC conversion for "${sourceName}" produced a near-uniform image (likely just background / table surface, not the dish). Please re-export the photo as JPEG or PNG from your phone and upload that instead.`,
    );
  }
};

export const normaliseRecipeImageUpload = async (file: File): Promise<File> => {
  if (!isHeicLikeFile(file)) return file;

  let convertedBlob: Blob;
  try {
    const converted = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.9,
    });
    convertedBlob = Array.isArray(converted) ? converted[0] : converted;
  } catch (err) {
    throw new RecipeImageValidationError(
      "CONVERSION_FAILED",
      `Could not convert "${file.name}" from HEIC to JPEG in the browser. Please re-export it as JPEG or PNG from your phone and try again.`,
    );
  }

  await validateConvertedImage(convertedBlob, file.name);

  return new File([convertedBlob], toJpegFileName(file.name), {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
};
