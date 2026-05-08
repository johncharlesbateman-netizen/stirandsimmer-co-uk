import { useNavigate } from "react-router-dom";
import { useOnboarding } from "./OnboardingContext";
import { OnboardShell, PrimaryButton, ProgressDots, TopBar } from "./shared";

const REGIONS = [
  { name: "South Asia", flag: "🇮🇳" },
  { name: "South East Asia", flag: "🌏" },
  { name: "Middle East", flag: "🫕" },
  { name: "West Africa", flag: "🌍" },
  { name: "Mediterranean", flag: "🇪🇸" },
  { name: "Latin America", flag: "🌎" },
  { name: "East Asia", flag: "🇨🇳" },
  { name: "Europe", flag: "🇫🇷" },
];

const OnboardingRegions = () => {
  const navigate = useNavigate();
  const { prefs, update } = useOnboarding();

  const toggle = (name: string) => {
    const next = prefs.regions.includes(name)
      ? prefs.regions.filter((r) => r !== name)
      : [...prefs.regions, name];
    update({ regions: next });
  };

  return (
    <OnboardShell>
      <TopBar onBack={() => navigate("/onboarding/preferences")} onSkip={() => navigate("/onboarding/done")} />
      <div className="mt-6 flex-1">
        <h1 className="font-display text-3xl text-white">What excites you?</h1>
        <p className="mt-2 text-sm text-white/55">Pick the regions you'd love to explore first.</p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {REGIONS.map((r) => {
            const selected = prefs.regions.includes(r.name);
            return (
              <button
                key={r.name}
                type="button"
                onClick={() => toggle(r.name)}
                className={`flex flex-col items-start gap-3 rounded-2xl border px-4 py-5 text-left transition ${
                  selected
                    ? "border-[#B45309] bg-[#B45309]/15"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <span className="text-3xl leading-none">{r.flag}</span>
                <span className={`text-sm ${selected ? "text-[#F5C77E]" : "text-white/80"}`}>
                  {r.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="space-y-4 pt-6">
        <PrimaryButton onClick={() => navigate("/onboarding/done")}>Continue →</PrimaryButton>
        <ProgressDots current={3} total={5} />
      </div>
    </OnboardShell>
  );
};

export default OnboardingRegions;
