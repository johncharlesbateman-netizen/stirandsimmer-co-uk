import { useMemo } from "react";
import { AlertTriangle, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  analyseCookTimeFromSteps,
  getCookTimeWarning,
} from "@/lib/cook-time-validator";

type Props = {
  cookTimeMinutes: number | null;
  instructions: string[];
};

const formatMinutes = (mins: number): string => {
  if (mins >= 60) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (m === 0) return `${h} hr`;
    return `${h} hr ${m} min`;
  }
  return `${mins} min`;
};

const CookTimeWarning = ({ cookTimeMinutes, instructions }: Props) => {
  const { analysis, warning } = useMemo(() => {
    const cleaned = (instructions ?? [])
      .map((s) => (typeof s === "string" ? s : String(s ?? "")).trim())
      .filter(Boolean);
    return {
      analysis: analyseCookTimeFromSteps(cleaned),
      warning: getCookTimeWarning(cookTimeMinutes, cleaned),
    };
  }, [cookTimeMinutes, instructions]);

  if (!warning && analysis.passiveMinutes === 0) return null;

  return (
    <div className="space-y-3">
      {warning && (
        <Alert className="border-amber-500/60 bg-amber-50 dark:bg-amber-950/30">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-900 dark:text-amber-100">
            <p className="font-medium">Cook time may not match the method</p>
            <p className="text-sm mt-1">{warning.message}</p>
            <p className="text-xs mt-2 text-amber-800/80 dark:text-amber-200/80">
              This is a warning only — you can still save.
            </p>
          </AlertDescription>
        </Alert>
      )}

      {analysis.passiveMinutes > 0 && (
        <Alert className="border-sky-500/60 bg-sky-50 dark:bg-sky-950/30">
          <Clock className="h-4 w-4 text-sky-600 dark:text-sky-400" />
          <AlertDescription className="text-sky-900 dark:text-sky-100">
            <p className="font-medium">
              Hands-off time detected: ~{formatMinutes(analysis.passiveMinutes)}
            </p>
            <p className="text-sm mt-1">
              We spotted references to passive time in the method
              (marinating, chilling, proving, resting, overnight, etc.).
              That's separate from active cook time and doesn't need to be
              included in the cook time field above.
            </p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CookTimeWarning;
