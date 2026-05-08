import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { useOnboarding } from "./OnboardingContext";
import { AmberGlow, OnboardShell, PrimaryButton, ProgressDots, TopBar } from "./shared";

const tierFor = (skill: string) => {
  if (skill === "Just starting") return "Home Cook";
  if (skill === "Home cook") return "Home Cook";
  if (skill === "Confident") return "Confident Cook";
  if (skill === "Love a challenge") return "Adventurous Cook";
  return "Home Cook";
};

const OnboardingDone = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { prefs } = useOnboarding();
  const [saving, setSaving] = useState(false);

  const tier = tierFor(prefs.skill_level);
  const startingRegion = prefs.regions[0] ?? "Anywhere";

  const handleEnter = async () => {
    setSaving(true);
    try {
      if (user) {
        const { error } = await supabase
          .from("profiles")
          .update({
            skill_level: prefs.skill_level || null,
            time_available: prefs.time_available || null,
            spice_tolerance: prefs.spice_tolerance || null,
            dietary: prefs.dietary || null,
            regions: prefs.regions,
            onboarding_completed: true,
          })
          .eq("user_id", user.id);
        if (error) throw error;
      }
      navigate("/app");
    } catch (err: any) {
      toast({ title: "Could not save preferences", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <OnboardShell>
      <TopBar onBack={() => navigate("/onboarding/regions")} />
      <div className="mt-2 flex flex-1 flex-col items-center justify-center text-center">
        <div className="relative flex h-60 w-60 items-center justify-center">
          <AmberGlow size={420} />
          <span className="relative text-[7rem] leading-none">🍳</span>
        </div>
        <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/40">You're starting as</p>
        <h1 className="font-display mt-2 text-4xl text-white">{tier}</h1>
        <p className="mt-3 max-w-xs text-sm text-white/55">
          Every great cook starts here. Let's find your first dish.
        </p>

        <div className="mt-8 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
          <Row label="Skill" value={prefs.skill_level || "—"} />
          <Row label="Time" value={prefs.time_available || "—"} />
          <Row label="Spice" value={prefs.spice_tolerance || "—"} />
          <Row label="Starting region" value={startingRegion} last />
        </div>
      </div>
      <div className="space-y-4 pt-6">
        <PrimaryButton onClick={handleEnter} disabled={saving}>
          Enter the kitchen →
        </PrimaryButton>
        <ProgressDots current={4} total={5} />
      </div>
    </OnboardShell>
  );
};

const Row = ({ label, value, last }: { label: string; value: string; last?: boolean }) => (
  <div
    className={`flex items-center justify-between py-2.5 ${
      last ? "" : "border-b border-white/5"
    }`}
  >
    <span className="text-xs uppercase tracking-[0.15em] text-white/40">{label}</span>
    <span className="text-sm text-white/85">{value}</span>
  </div>
);

export default OnboardingDone;
