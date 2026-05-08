import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const AmberGlow = ({ size = 420 }: { size?: number }) => (
  <div
    aria-hidden
    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    style={{
      width: size,
      height: size,
      background:
        "radial-gradient(circle, rgba(217,119,6,0.35) 0%, rgba(180,83,9,0.15) 35%, transparent 70%)",
      filter: "blur(8px)",
    }}
  />
);

export const OnboardShell = ({ children }: { children: ReactNode }) => (
  <div className="relative min-h-screen bg-[#0d0d0d] text-white">
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pb-8 pt-6">{children}</div>
  </div>
);

export const TopBar = ({
  onBack,
  onSkip,
  hideBack,
}: {
  onBack?: () => void;
  onSkip?: () => void;
  hideBack?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      {hideBack ? (
        <span />
      ) : (
        <button
          type="button"
          onClick={onBack ?? (() => navigate(-1))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:text-white"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
      )}
      {onSkip ? (
        <button
          type="button"
          onClick={onSkip}
          className="text-xs uppercase tracking-[0.2em] text-white/40 transition hover:text-white/70"
        >
          Skip
        </button>
      ) : (
        <span />
      )}
    </div>
  );
};

export const ProgressDots = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center justify-center gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <span
        key={i}
        className={`h-1.5 rounded-full transition-all ${
          i === current ? "w-6 bg-[#B45309]" : "w-1.5 bg-white/15"
        }`}
      />
    ))}
  </div>
);

export const PrimaryButton = ({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...rest}
    className={`flex w-full items-center justify-center rounded-full bg-[#B45309] px-6 py-4 text-sm font-medium text-white shadow-[0_10px_40px_rgba(180,83,9,0.4)] transition hover:bg-[#a04808] disabled:opacity-50 ${
      rest.className ?? ""
    }`}
  />
);

export const GhostButton = ({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...rest}
    className={`flex w-full items-center justify-center rounded-full border border-white/10 px-6 py-4 text-sm font-medium text-white/80 transition hover:bg-white/5 ${
      rest.className ?? ""
    }`}
  />
);

export const Chip = ({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full border px-4 py-2 text-xs transition ${
      selected
        ? "border-[#B45309] bg-[#B45309]/15 text-[#F5C77E]"
        : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20"
    }`}
  >
    {children}
  </button>
);
