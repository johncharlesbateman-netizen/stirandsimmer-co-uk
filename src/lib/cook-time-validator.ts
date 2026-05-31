// Soft validator that scans recipe method steps for time references and
// compares them against the listed cook time. Active vs hands-off times are
// detected separately — overnight chills, marinades and proofs don't count
// toward active cook time.

const PASSIVE_KEYWORDS = [
  "marinate", "marinade", "marinating",
  "chill", "chilled", "chilling",
  "refrigerate", "refrigerated", "refrigerating",
  "rest", "resting", // dough resting
  "prove", "proving", "proof", "proofing",
  "rise", "rising",
  "soak", "soaking",
  "freeze", "freezing",
  "cool", "cooling",
  "set", "setting", // panna cotta / jellies
  "overnight",
];

const UNIT_TO_MINUTES: Record<string, number> = {
  s: 1 / 60, sec: 1 / 60, secs: 1 / 60, second: 1 / 60, seconds: 1 / 60,
  m: 1, min: 1, mins: 1, minute: 1, minutes: 1,
  h: 60, hr: 60, hrs: 60, hour: 60, hours: 60,
};

type Match = {
  rawText: string;
  minutes: number;
  passive: boolean;
};

// Match patterns like:
//   "10 minutes", "1 hour", "1.5 hrs", "30 mins"
//   "10-15 minutes", "10 to 15 minutes" (take upper bound)
//   "1 hour 30 minutes" (combine)
//   "an hour", "half an hour", "overnight"
const NUMBER = "(?:\\d+(?:\\.\\d+)?)";
const RANGE_PATTERN = new RegExp(
  `(${NUMBER})\\s*(?:-|–|to)\\s*(${NUMBER})\\s*(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h)\\b`,
  "gi",
);
const SINGLE_PATTERN = new RegExp(
  `(${NUMBER})\\s*(seconds?|secs?|minutes?|mins?|hours?|hrs?)\\b`,
  "gi",
);
const WORD_HOUR_PATTERN = /\b(?:an?|one)\s+hour\b/gi;
const HALF_HOUR_PATTERN = /\bhalf\s+an?\s+hour\b/gi;
const OVERNIGHT_PATTERN = /\bovernight\b/gi;

const isPassiveContext = (text: string, index: number): boolean => {
  const windowStart = Math.max(0, index - 60);
  const before = text.slice(windowStart, index).toLowerCase();
  return PASSIVE_KEYWORDS.some((kw) => before.includes(kw));
};

const collectMatches = (text: string): Match[] => {
  const matches: Match[] = [];
  const claimed: Array<[number, number]> = [];
  const overlaps = (start: number, end: number) =>
    claimed.some(([s, e]) => start < e && end > s);

  // Ranges first (so "10-15 minutes" isn't double-counted as "10" and "15")
  for (const m of text.matchAll(RANGE_PATTERN)) {
    const start = m.index ?? 0;
    const end = start + m[0].length;
    if (overlaps(start, end)) continue;
    const upper = parseFloat(m[2]);
    const unit = m[3].toLowerCase();
    const minutes = upper * (UNIT_TO_MINUTES[unit] ?? 1);
    matches.push({
      rawText: m[0],
      minutes,
      passive: isPassiveContext(text, start),
    });
    claimed.push([start, end]);
  }

  for (const m of text.matchAll(SINGLE_PATTERN)) {
    const start = m.index ?? 0;
    const end = start + m[0].length;
    if (overlaps(start, end)) continue;
    const value = parseFloat(m[1]);
    const unit = m[2].toLowerCase();
    const minutes = value * (UNIT_TO_MINUTES[unit] ?? 1);
    matches.push({
      rawText: m[0],
      minutes,
      passive: isPassiveContext(text, start),
    });
    claimed.push([start, end]);
  }

  for (const m of text.matchAll(WORD_HOUR_PATTERN)) {
    const start = m.index ?? 0;
    const end = start + m[0].length;
    if (overlaps(start, end)) continue;
    matches.push({
      rawText: m[0],
      minutes: 60,
      passive: isPassiveContext(text, start),
    });
    claimed.push([start, end]);
  }

  for (const m of text.matchAll(HALF_HOUR_PATTERN)) {
    const start = m.index ?? 0;
    const end = start + m[0].length;
    if (overlaps(start, end)) continue;
    matches.push({
      rawText: m[0],
      minutes: 30,
      passive: isPassiveContext(text, start),
    });
    claimed.push([start, end]);
  }

  for (const m of text.matchAll(OVERNIGHT_PATTERN)) {
    const start = m.index ?? 0;
    const end = start + m[0].length;
    if (overlaps(start, end)) continue;
    matches.push({
      rawText: m[0],
      minutes: 8 * 60,
      passive: true, // always hands-off
    });
    claimed.push([start, end]);
  }

  return matches;
};

export type CookTimeAnalysis = {
  activeMinutes: number;
  longestActive: number;
  passiveMinutes: number;
  matches: Match[];
};

export const analyseCookTimeFromSteps = (
  instructions: string[],
): CookTimeAnalysis => {
  const text = instructions.filter(Boolean).join("\n");
  const matches = collectMatches(text);
  const active = matches.filter((m) => !m.passive);
  const passive = matches.filter((m) => m.passive);
  return {
    activeMinutes: Math.round(active.reduce((s, m) => s + m.minutes, 0)),
    longestActive: Math.round(active.reduce((max, m) => Math.max(max, m.minutes), 0)),
    passiveMinutes: Math.round(passive.reduce((s, m) => s + m.minutes, 0)),
    matches,
  };
};

export type CookTimeWarning = {
  message: string;
  detectedActive: number;
  passiveMinutes: number;
};

// Returns a soft warning when listed cook time differs from detected active
// time by more than the tolerance (default 10 min). Returns null when there's
// nothing to flag.
export const getCookTimeWarning = (
  listedCookMinutes: number | null,
  instructions: string[],
  toleranceMinutes = 10,
): CookTimeWarning | null => {
  if (listedCookMinutes == null) return null;
  const cleaned = instructions.map((s) => s.trim()).filter(Boolean);
  if (cleaned.length === 0) return null;

  const analysis = analyseCookTimeFromSteps(cleaned);
  // Need at least some detected active time to make a meaningful comparison
  if (analysis.activeMinutes === 0) return null;

  const diff = Math.abs(listedCookMinutes - analysis.activeMinutes);
  if (diff <= toleranceMinutes) return null;

  const message =
    `The listed cook time (${listedCookMinutes} min) may not match your method steps — ` +
    `we detected references to ~${analysis.activeMinutes} min of active cook time in the steps. ` +
    `Please review before saving.`;

  return {
    message,
    detectedActive: analysis.activeMinutes,
    passiveMinutes: analysis.passiveMinutes,
  };
};
