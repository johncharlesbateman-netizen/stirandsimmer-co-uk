/**
 * Scale the numeric quantities in an ingredient string by a multiplier.
 *
 * Examples:
 *   scaleIngredient("2 Chicken Breasts", 2) → "4 Chicken Breasts"
 *   scaleIngredient("1 ½ Tsp Cumin", 0.5) → "¾ Tsp Cumin"
 *   scaleIngredient("0.5 Tsp Salt", 2) → "1 Tsp Salt"
 */

/** Unicode fraction map */
const FRAC_TO_NUM: Record<string, number> = {
  "½": 0.5, "⅓": 1 / 3, "⅔": 2 / 3,
  "¼": 0.25, "¾": 0.75, "⅕": 0.2,
  "⅖": 0.4, "⅗": 0.6, "⅘": 0.8,
  "⅙": 1 / 6, "⅚": 5 / 6, "⅛": 0.125,
  "⅜": 0.375, "⅝": 0.625, "⅞": 0.875,
};

const NUM_TO_FRAC: [number, string][] = [
  [0.125, "⅛"], [0.25, "¼"], [1 / 3, "⅓"], [0.375, "⅜"],
  [0.5, "½"], [0.625, "⅝"], [2 / 3, "⅔"], [0.75, "¾"],
  [0.875, "⅞"],
];

function toFraction(n: number): string {
  if (n <= 0) return "";
  const whole = Math.floor(n);
  const remainder = n - whole;

  // Find closest fraction
  if (remainder < 0.05) return whole === 0 ? "" : `${whole}`;

  let bestFrac = "";
  let bestDiff = Infinity;
  for (const [val, sym] of NUM_TO_FRAC) {
    const diff = Math.abs(remainder - val);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestFrac = sym;
    }
  }

  if (bestDiff > 0.08) {
    // No good fraction match — use decimal
    return n % 1 === 0 ? `${n}` : `${+n.toFixed(2)}`;
  }

  if (whole === 0) return bestFrac;
  return `${whole} ${bestFrac}`;
}

/** Parse a leading quantity from an ingredient string, return [numericValue, restOfString] */
function parseLeadingQty(text: string): [number | null, string] {
  // Match patterns like: "1 ½", "1½", "0.5", "1/2", "½", "1 1/2", "1 1⁄2"
  const fracChars = Object.keys(FRAC_TO_NUM).join("");
  const re = new RegExp(
    `^(\\d+(?:\\.\\d+)?)?\\s*([${fracChars}])|^(\\d+(?:\\.\\d+)?)\\s*[/⁄]\\s*(\\d+(?:\\.\\d+)?)|^(\\d+(?:\\.\\d+)?)\\s+(\\d+)\\s*[/⁄]\\s*(\\d+)|^(\\d+(?:\\.\\d+)?)`
  );

  const m = text.match(re);
  if (!m) return [null, text];

  let value: number;
  const matchLen = m[0].length;

  if (m[1] !== undefined || m[2] !== undefined) {
    // "1 ½" or "½"
    const whole = m[1] ? parseFloat(m[1]) : 0;
    const frac = m[2] ? FRAC_TO_NUM[m[2]] || 0 : 0;
    value = whole + frac;
  } else if (m[3] !== undefined && m[4] !== undefined) {
    // "1/2"
    value = parseFloat(m[3]) / parseFloat(m[4]);
  } else if (m[5] !== undefined && m[6] !== undefined && m[7] !== undefined) {
    // "1 1/2"
    value = parseFloat(m[5]) + parseFloat(m[6]) / parseFloat(m[7]);
  } else if (m[8] !== undefined) {
    // plain number
    value = parseFloat(m[8]);
  } else {
    return [null, text];
  }

  const rest = text.slice(matchLen).replace(/^\s+/, "");
  return [value, rest];
}

export function scaleIngredient(ingredient: string, multiplier: number): string {
  if (multiplier === 1) return ingredient;

  const trimmed = ingredient.trim();
  const [qty, rest] = parseLeadingQty(trimmed);

  if (qty === null) return ingredient; // no quantity found

  const scaled = qty * multiplier;
  const formatted = toFraction(scaled);

  return formatted ? `${formatted} ${rest}` : rest;
}

export function scaleIngredients(ingredients: string[], baseServings: number, targetServings: number): string[] {
  if (baseServings <= 0 || targetServings <= 0) return ingredients;
  const multiplier = targetServings / baseServings;
  return ingredients.map((ing) => scaleIngredient(ing, multiplier));
}
