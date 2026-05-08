import { useNavigate } from "react-router-dom";
import { useOnboarding } from "./OnboardingContext";
import { Chip, OnboardShell, PrimaryButton, ProgressDots, TopBar } from "./shared";

const rows: { key: "skill_level" | "time_available" | "spice_tolerance" | "dietary"; label: string; options: string[] }[] = [
  { key: "skill_level", label: "Skill level", options: ["Just starting", "Home cook", "Confident", "Love a challenge"] },
  { key: "time_available", label: "Time available", options: ["Under 30 min", "Under 45 min", "Up to an hour", "No limit"] },
  { key: "spice_tolerance", label: "Spice tolerance", options: ["Mild", "Medium", "Hot", "Bring it on"] },
  { key: "dietary", label: "Dietary", options: ["No restrictions", "Vegetarian", "Vegan", "Gluten free"] },
];

const OnboardingPreferences = () => {
  const navigate = useNavigate();
  const { prefs, update } = useOnboarding();

  return (
    <OnboardShell>
      <TopBar onBack={() => navigate("/onboarding/signup")} onSkip={() => navigate("/onboarding/regions")} />
      <div className="mt-6 flex-1">
        <h1 className="font-display text-3xl text-white">How do you cook?</h1>
        <p className="mt-2 text-sm text-white/55">A few quick choices to tune your kitchen.</p>

        <div className="mt-8 space-y-7">
          {rows.map((row) => (
            <div key={row.key}>
              <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-white/40">{row.label}</p>
              <div className="flex flex-wrap gap-2">
                {row.options.map((opt) => (
                  <Chip
                    key={opt}
                    selected={prefs[row.key] === opt}
                    onClick={() => update({ [row.key]: opt } as any)}
                  >
                    {opt}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4 pt-6">
        <PrimaryButton onClick={() => navigate("/onboarding/regions")}>Continue →</PrimaryButton>
        <ProgressDots current={2} total={5} />
      </div>
    </OnboardShell>
  );
};

export default OnboardingPreferences;
