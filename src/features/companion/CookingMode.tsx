import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Lightbulb, Pause, Play, RotateCcw, Timer } from "lucide-react";
import type { CookingStep } from "./data";
import LogDishPrompt from "./LogDishPrompt";

interface CookingModeProps {
  recipeId: string;
  recipeName: string;
  emoji: string;
  steps: CookingStep[];
  onClose: () => void;
}

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
};

/** Split step text into segments, wrapping any `highlights` substrings in amber. */
const renderHighlighted = (text: string, highlights?: string[]) => {
  if (!highlights?.length) return text;
  const escaped = highlights
    .filter(Boolean)
    .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!escaped.length) return text;
  const re = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(re);
  return parts.map((part, i) =>
    re.test(part) ? (
      <span key={i} className="text-[#F5C77E] font-medium">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
};

const CookingMode = ({ recipeId, recipeName, emoji, steps, onClose }: CookingModeProps) => {
  const [showLogPrompt, setShowLogPrompt] = useState(false);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const total = steps.length;
  const step = steps[index];
  const progress = done ? 100 : ((index + 1) / total) * 100;

  const [remaining, setRemaining] = useState(step.durationSeconds ?? 0);
  const [running, setRunning] = useState(false);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    setRemaining(step.durationSeconds ?? 0);
    setRunning(false);
  }, [index, step.durationSeconds]);

  useEffect(() => {
    if (!running) return;
    tickRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, [running]);

  const isLast = index === total - 1;
  const hasTimer = (step.durationSeconds ?? 0) > 0;

  const stepContent = useMemo(
    () => renderHighlighted(step.text, step.highlights),
    [step.text, step.highlights],
  );

  if (done) {
    return (
      <div className="fixed inset-0 z-[60] flex flex-col bg-[#0d0d0d] text-white">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-10 pt-6">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-[#B45309]" style={{ width: "100%" }} />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="relative mb-8 flex h-56 w-56 items-center justify-center">
              <div
                className="absolute h-full w-full rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(217,119,6,0.4) 0%, rgba(180,83,9,0.15) 40%, transparent 75%)",
                  filter: "blur(20px)",
                }}
              />
              <span className="relative text-8xl">🎉</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B45309]">{recipeName}</p>
            <h2 className="font-display mt-3 text-4xl text-white">Dish complete</h2>
            <p className="mt-3 max-w-xs text-sm text-white/55">
              Take a breath, plate it up, and give yourself a moment to enjoy it.
            </p>
          </div>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => {
                onLog?.();
                onClose();
              }}
              className="w-full rounded-full bg-[#B45309] px-6 py-4 text-sm font-medium text-white shadow-[0_10px_40px_rgba(180,83,9,0.4)] transition hover:bg-[#a04808]"
            >
              Log this dish
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-full border border-white/10 px-6 py-4 text-sm text-white/80 transition hover:bg-white/5"
            >
              Back to recipe
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#0d0d0d] text-white">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-8 pt-6">
        <header className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:text-white"
            aria-label="Exit"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
            Step {index + 1} of {total}
          </span>
        </header>

        <div className="mt-5">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-[#B45309] transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#B45309]">{recipeName}</p>
          <p className="font-display mt-5 max-w-sm text-2xl leading-snug text-white">
            {stepContent}
          </p>

          {step.tip && (
            <div className="mt-7 flex w-full max-w-sm items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-left">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#B45309]/15 text-[#F5C77E]">
                <Lightbulb className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#F5C77E]">Chef tip</p>
                <p className="mt-1 text-xs leading-relaxed text-white/65">{step.tip}</p>
              </div>
            </div>
          )}

          {hasTimer && (
            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (remaining === 0) {
                    setRemaining(step.durationSeconds ?? 0);
                    setRunning(true);
                  } else {
                    setRunning((r) => !r);
                  }
                }}
                className="inline-flex items-center gap-3 rounded-full border border-[#B45309]/40 bg-[#B45309]/10 px-6 py-3 text-[#F5C77E] transition hover:bg-[#B45309]/15"
              >
                {running ? (
                  <Pause className="h-4 w-4" />
                ) : remaining === 0 ? (
                  <RotateCcw className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                <Timer className="h-4 w-4 opacity-60" />
                <span className="font-display text-2xl tabular-nums">
                  {formatTime(remaining)}
                </span>
              </button>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/35">
                tap to {running ? "pause" : remaining === 0 ? "reset" : "start"}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            aria-label="Previous step"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:text-white disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              if (isLast) setDone(true);
              else setIndex((i) => i + 1);
            }}
            className="flex-1 rounded-full bg-[#B45309] px-6 py-3.5 text-sm font-medium text-white shadow-[0_10px_40px_rgba(180,83,9,0.4)] transition hover:bg-[#a04808]"
          >
            {isLast ? "Finish dish →" : "Next step →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookingMode;
