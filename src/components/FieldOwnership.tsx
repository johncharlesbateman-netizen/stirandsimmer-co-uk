import { Lock, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Author / AI-assisted field separation primitives.
 *
 * Author fields are author-controlled and must never be touched by AI.
 * AI-assisted fields can be auto-filled (when empty) via "Fill with AI".
 */

export function AuthorSectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-3 pt-6 border-t border-border">
      <div className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
        <Lock className="w-3.5 h-3.5" />
      </div>
      <div className="min-w-0">
        <h2 className="font-display text-2xl leading-tight">{title}</h2>
        <p className="text-xs text-muted-foreground mt-1">
          {subtitle ??
            "Author-controlled. The AI will never rewrite, merge, reorder or modify these fields."}
        </p>
      </div>
    </div>
  );
}

export function AISectionHeader({
  title,
  subtitle,
  onFill,
  loading,
  disabled,
}: {
  title: string;
  subtitle?: string;
  onFill: () => void;
  loading: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 pt-6 border-t-2 border-dashed border-primary/30">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-2xl leading-tight">{title}</h2>
          <p className="text-xs text-muted-foreground mt-1">
            {subtitle ??
              "AI-assisted. ‘Fill with AI’ only populates empty fields — it will never overwrite what you've already entered."}
          </p>
        </div>
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={onFill}
        disabled={loading || disabled}
        className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? "Filling..." : "Fill with AI"}
      </Button>
    </div>
  );
}

/** Small badge to drop next to an individual AI-assisted field label. */
export function AIBadge() {
  return (
    <span
      title="AI-assisted field — only populated when empty"
      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary align-middle"
    >
      <Sparkles className="w-2.5 h-2.5" />
      AI
    </span>
  );
}

/** Small badge to drop next to an Author-controlled field label. */
export function AuthorBadge() {
  return (
    <span
      title="Author-controlled — the AI will not modify this"
      className="inline-flex items-center gap-1 rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground align-middle"
    >
      <Lock className="w-2.5 h-2.5" />
      Author
    </span>
  );
}
