import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, Pause, Play, RotateCcw, Timer } from "lucide-react";
import type { CookingStep } from "./data";

interface CookingModeProps {
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

const CookingMode = ({ recipeName, emoji, steps, onClose }: CookingModeProps) => {
  const [index, setIndex] = useState(0);
  const total = steps.length;
  const step = steps[index];
  const progress = ((index + 1) / total) * 100;

  const [remaining, setRemaining] = useState(step.durationSeconds ?? 0);
  const [running, setRunning] = useState(false);
  const tickRef = useRef<number | null>(null);

  // Reset timer when the step changes
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

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-black text-companion-fg">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <header className="flex items-center justify-between px-6 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-companion-muted hover:text-companion-fg"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Exit
          </button>
          <span className="text-[10px] uppercase tracking-[0.3em] text-companion-muted">
            Step {index + 1} of {total}
          </span>
        </header>

        <div className="mt-5 px-6">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-companion-amber transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="relative mb-10">
            <div className="absolute -inset-10 rounded-full bg-companion-amber/20 blur-3xl" />
            <span className="relative text-6xl">{emoji}</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-companion-amber">
            {recipeName}
          </p>
          <p className="mt-6 max-w-sm font-display text-xl leading-snug text-companion-fg">
            {step.text}
          </p>

          {hasTimer && (
            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-companion-amber/40 bg-companion-amber/10 px-5 py-2 text-companion-amber">
                <Timer className="h-4 w-4" />
                <span className="font-display text-2xl tabular-nums">
                  {formatTime(remaining)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setRunning((r) => !r)}
                  disabled={remaining === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-companion-fg transition-colors hover:border-companion-amber/50 disabled:opacity-40"
                >
                  {running ? (
                    <>
                      <Pause className="h-3.5 w-3.5" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" /> Start
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRunning(false);
                    setRemaining(step.durationSeconds ?? 0);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-companion-muted transition-colors hover:text-companion-fg"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 px-6 pb-10">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm text-companion-fg transition-colors hover:border-white/20 disabled:opacity-30"
          >
            Back
          </button>
          {isLast ? (
            <button
              type="button"
              onClick={onClose}
              className="flex-[2] inline-flex items-center justify-center gap-2 rounded-xl bg-companion-amber px-4 py-3 text-sm font-medium text-white hover:bg-companion-amber-soft"
            >
              <Check className="h-4 w-4" /> Finish
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
              className="flex-[2] rounded-xl bg-companion-amber px-4 py-3 text-sm font-medium text-white hover:bg-companion-amber-soft"
            >
              Next step
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookingMode;
