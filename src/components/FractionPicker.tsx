import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const FRACTIONS = [
  { label: "¼", char: "¼" },
  { label: "½", char: "½" },
  { label: "¾", char: "¾" },
  { label: "⅓", char: "⅓" },
  { label: "⅔", char: "⅔" },
  { label: "⅛", char: "⅛" },
];

interface FractionPickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

export default function FractionPicker({
  value,
  onChange,
  placeholder,
  className,
  inputClassName,
}: FractionPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const insertFraction = useCallback((fraction: string) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart ?? value.length;
    const end = input.selectionEnd ?? value.length;
    const before = value.slice(0, start);
    const after = value.slice(end);
    const next = `${before}${fraction}${after}`;

    onChange(next);

    // Restore cursor position after the inserted fraction
    requestAnimationFrame(() => {
      input.focus();
      const pos = start + fraction.length;
      input.setSelectionRange(pos, pos);
    });
  }, [value, onChange]);

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center gap-1">
        {FRACTIONS.map((f) => (
          <button
            key={f.char}
            type="button"
            onClick={() => insertFraction(f.char)}
            className={cn(
              "inline-flex items-center justify-center",
              "h-7 min-w-[1.75rem] px-1.5 rounded-md text-sm font-medium",
              "border border-input bg-background",
              "hover:bg-accent hover:text-accent-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "transition-colors select-none"
            )}
            title={`Insert ${f.label}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          inputClassName
        )}
      />
    </div>
  );
}
