import heic2any from "heic2any";

const HEIC_EXTENSIONS = /\.(heic|heif)$/i;
const HEIC_MIME_TYPES = new Set([
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "image/heif-sequence",
]);

const MIN_FILE_BYTES = 25_000; // ~25KB; real photos at q≥0.9 are well above this
const MIN_SHORT_EDGE_PX = 400; // reject anything smaller than this on the shortest side
const MIN_COLOUR_VARIANCE = 180; // sum of per-channel cell variance; flat textures (wood, sky, tablecloth) fall well below this
const GRID = 4;

const isHeicLikeFile = (file: File) =>
  HEIC_MIME_TYPES.has(file.type) || HEIC_EXTENSIONS.test(file.name);

const toJpegFileName = (name: string) =>
  HEIC_EXTENSIONS.test(name) ? name.replace(HEIC_EXTENSIONS, ".jpg") : `${name}.jpg`;

const toPngFileName = (name: string) =>
  HEIC_EXTENSIONS.test(name) ? name.replace(HEIC_EXTENSIONS, ".png") : `${name}.png`;

export class RecipeImageValidationError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = "RecipeImageValidationError";
  }
}

interface Candidate {
  blob: Blob;
  img: HTMLImageElement;
  variance: number;
  shortEdge: number;
  longEdge: number;
  mime: string;
  strategyLabel: string;
}

const loadImage = (blob: Blob): Promise<HTMLImageElement | null> =>
  new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });

const computeColourVariance = (img: HTMLImageElement): number => {
  const canvas = document.createElement("canvas");
  const sample = 64;
  canvas.width = sample;
  canvas.height = sample;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Number.POSITIVE_INFINITY;
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

/** Re-encode a decoded image through a fresh canvas at high quality JPEG.
 *  This is the "safer crop strategy" — by drawing the full natural
 *  dimensions onto canvas and exporting, we discard any odd metadata-driven
 *  cropping from the source and guarantee the output matches what we just
 *  inspected.
 */
const reencodeViaCanvas = (img: HTMLImageElement, quality = 0.92): Promise<Blob | null> =>
  new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return resolve(null);
    ctx.drawImage(img, 0, 0);
    canvas.toBlob((b) => resolve(b), "image/jpeg", quality);
  });

const buildCandidate = async (
  blob: Blob,
  mime: string,
  strategyLabel: string,
): Promise<Candidate | null> => {
  if (blob.size < 1000) return null;
  const img = await loadImage(blob);
  if (!img) return null;
  return {
    blob,
    img,
    variance: computeColourVariance(img),
    shortEdge: Math.min(img.naturalWidth, img.naturalHeight),
    longEdge: Math.max(img.naturalWidth, img.naturalHeight),
    mime,
    strategyLabel,
  };
};

const isPassing = (c: Candidate): boolean =>
  c.blob.size >= MIN_FILE_BYTES &&
  c.shortEdge >= MIN_SHORT_EDGE_PX &&
  c.variance >= MIN_COLOUR_VARIANCE;

/** Generate conversion candidates from a HEIC file, in fallback order:
 *   1. Standard single-frame JPEG at q=0.95
 *   2. Multi-frame extraction → every embedded image (picks up the real
 *      photo when the HEIC container holds a thumbnail/depth-map first)
 *   3. Lossless PNG (different decode path inside heic2any)
 *   4. Canvas re-encode of the best decoded frame above (safer re-export)
 */
async function* generateCandidates(file: File): AsyncGenerator<Candidate> {
  // 1. Standard JPEG
  try {
    const out = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.95 });
    const blobs = Array.isArray(out) ? out : [out];
    for (let i = 0; i < blobs.length; i++) {
      const cand = await buildCandidate(
        blobs[i],
        "image/jpeg",
        `jpeg-q95${blobs.length > 1 ? `[${i}]` : ""}`,
      );
      if (cand) yield cand;
    }
  } catch {
    /* fall through */
  }

  // 2. Multi-frame extraction — return every embedded frame
  try {
    const out = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.95,
      multiple: true,
    } as Parameters<typeof heic2any>[0]);
    const blobs = Array.isArray(out) ? out : [out];
    for (let i = 0; i < blobs.length; i++) {
      const cand = await buildCandidate(blobs[i], "image/jpeg", `jpeg-frame[${i}]`);
      if (cand) yield cand;
    }
  } catch {
    /* fall through */
  }

  // 3. Lossless PNG path
  try {
    const out = await heic2any({ blob: file, toType: "image/png" });
    const blobs = Array.isArray(out) ? out : [out];
    for (let i = 0; i < blobs.length; i++) {
      const cand = await buildCandidate(
        blobs[i],
        "image/png",
        `png${blobs.length > 1 ? `[${i}]` : ""}`,
      );
      if (cand) yield cand;
    }
  } catch {
    /* fall through */
  }
}

export const normaliseRecipeImageUpload = async (file: File): Promise<File> => {
  if (!isHeicLikeFile(file)) return file;

  const candidates: Candidate[] = [];
  let anyDecoded = false;

  for await (const cand of generateCandidates(file)) {
    anyDecoded = true;
    candidates.push(cand);
    if (isPassing(cand)) {
      return finalise(cand, file.name);
    }
  }

  // None passed outright. Try a canvas re-encode of the best decoded frame —
  // this rescues cases where the original blob was oversized or had odd
  // metadata, but the actual pixels are fine.
  if (candidates.length > 0) {
    const best = candidates.slice().sort((a, b) =>
      (b.variance * b.shortEdge) - (a.variance * a.shortEdge),
    )[0];
    if (best.shortEdge >= MIN_SHORT_EDGE_PX && best.variance >= MIN_COLOUR_VARIANCE) {
      const reBlob = await reencodeViaCanvas(best.img);
      if (reBlob) {
        const reCand = await buildCandidate(reBlob, "image/jpeg", `${best.strategyLabel}+canvas`);
        if (reCand && isPassing(reCand)) {
          return finalise(reCand, file.name);
        }
      }
      // Re-encode didn't help but pixels are valid — accept the best frame anyway.
      return finalise(best, file.name);
    }
  }

  if (!anyDecoded) {
    throw new RecipeImageValidationError(
      "CONVERSION_FAILED",
      `Could not convert "${file.name}" from HEIC to JPEG in the browser, even after multiple attempts. Please re-export it as JPEG or PNG from your phone and try again.`,
    );
  }

  // Decoded but every attempt failed validation — explain why using the best candidate.
  const best = candidates.slice().sort((a, b) => b.variance - a.variance)[0];
  if (best.shortEdge < MIN_SHORT_EDGE_PX) {
    throw new RecipeImageValidationError(
      "TOO_LOW_RES",
      `"${file.name}" only decoded to ${best.img.naturalWidth}×${best.img.naturalHeight}px after ${candidates.length} attempts. Please re-export at a higher resolution.`,
    );
  }
  throw new RecipeImageValidationError(
    "UNIFORM_CROP",
    `Every HEIC decoding strategy for "${file.name}" produced a near-uniform image (likely just background, not the dish). Please re-export the photo as JPEG or PNG from your phone and upload that instead.`,
  );
};

const finalise = (cand: Candidate, originalName: string): File => {
  const name = cand.mime === "image/png" ? toPngFileName(originalName) : toJpegFileName(originalName);
  return new File([cand.blob], name, { type: cand.mime, lastModified: Date.now() });
};
