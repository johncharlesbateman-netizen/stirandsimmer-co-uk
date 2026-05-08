import { useNavigate } from "react-router-dom";
import { AmberGlow, GhostButton, OnboardShell, PrimaryButton, ProgressDots } from "./shared";

const OnboardingWelcome = () => {
  const navigate = useNavigate();
  return (
    <OnboardShell>
      <div className="flex min-h-screen flex-col">
        <div className="relative flex flex-1 flex-col items-center justify-center text-center">
          <div className="relative flex h-72 w-72 items-center justify-center">
            <AmberGlow size={500} />
            <span className="relative text-[8rem] leading-none">🌍</span>
          </div>
          <h1 className="font-display mt-6 text-3xl text-white">A kitchen without borders</h1>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
            110+ recipes from across the world. Cook your way through them, one region at a time.
          </p>
        </div>
        <div className="space-y-3">
          <PrimaryButton onClick={() => navigate("/onboarding/signup")}>
            Get started →
          </PrimaryButton>
          <GhostButton onClick={() => navigate("/onboarding/signup?mode=signin")}>
            I already have an account
          </GhostButton>
          <div className="pt-4">
            <ProgressDots current={0} total={5} />
          </div>
        </div>
      </div>
    </OnboardShell>
  );
};

export default OnboardingWelcome;
