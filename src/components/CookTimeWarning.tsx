import { useMemo } from "react";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getCookTimeWarning } from "@/lib/cook-time-validator";

type Props = {
  cookTimeMinutes: number | null;
  instructions: string[];
};

const CookTimeWarning = ({ cookTimeMinutes, instructions }: Props) => {
  const warning = useMemo(
    () => getCookTimeWarning(cookTimeMinutes, instructions),
    [cookTimeMinutes, instructions],
  );

  if (!warning) return null;

  return (
    <Alert className="border-amber-500/60 bg-amber-50 dark:bg-amber-950/30">
      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertDescription className="text-amber-900 dark:text-amber-100">
        <p className="font-medium">Cook time may not match the method</p>
        <p className="text-sm mt-1">{warning.message}</p>
        {warning.passiveMinutes > 0 && (
          <p className="text-xs mt-2 text-amber-800/80 dark:text-amber-200/80">
            We also detected ~{warning.passiveMinutes} min of hands-off time
            (marinating, chilling, proving, overnight) — that's separate from
            active cook time and doesn't need to be included here.
          </p>
        )}
        <p className="text-xs mt-2 text-amber-800/80 dark:text-amber-200/80">
          This is a warning only — you can still save.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default CookTimeWarning;
