import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScreenShell from "@/components/pass/ScreenShell";
import AuthGuard from "@/components/pass/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const AVATARS = ["👨‍🍳", "👩‍🍳", "🧑‍🍳", "🔥"];

const STYLES = [
  { id: "home_cook", title: "Home cook", subtitle: "Weeknight meals, classics" },
  { id: "explorer", title: "Explorer", subtitle: "New cuisines, bold flavours" },
  { id: "entertainer", title: "Entertainer", subtitle: "Dinner parties, showpieces" },
  { id: "speed_chef", title: "Speed chef", subtitle: "Fast, smart, delicious" },
];

function ProfileSetupInner() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(profile?.avatar ?? AVATARS[0]);
  const [style, setStyle] = useState<string | null>(profile?.cooking_style ?? null);
  const [name, setName] = useState(profile?.chef_name ?? "");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!user) return;
    if (!name.trim()) {
      toast({ title: "Add your chef name", variant: "destructive" });
      return;
    }
    if (!style) {
      toast({ title: "Pick a cooking style", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("profiles").upsert(
      {
        user_id: user.id,
        chef_name: name.trim(),
        avatar,
        cooking_style: style,
      },
      { onConflict: "user_id" }
    );
    if (error) {
      toast({ title: "Could not save", description: error.message, variant: "destructive" });
      setBusy(false);
      return;
    }
    await refreshProfile();
    navigate("/home", { replace: true });
  };

  return (
    <ScreenShell>
      <div className="px-6 pt-6 pb-12 min-h-screen flex flex-col">
        <button
          aria-label="Back"
          onClick={() => navigate(-1)}
          className="text-[rgba(245,215,142,0.7)] mb-8 self-start"
        >
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>

        <h1 className="text-[1.75rem] leading-tight mb-3">Your chef profile</h1>
        <p className="pass-muted text-[14px] leading-relaxed mb-8 max-w-[34ch]">
          Tell us about yourself. This shapes the challenges you'll receive.
        </p>

        <p className="pass-eyebrow mb-3">Chef name</p>
        <input
          className="pass-input px-4 py-3.5 text-[15px] mb-8"
          placeholder="What should we call you?"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <p className="pass-eyebrow mb-3">Choose your avatar</p>
        <div className="flex gap-3 mb-8">
          {AVATARS.map((a) => (
            <button
              key={a}
              onClick={() => setAvatar(a)}
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-colors"
              style={{
                background: "#1a0e00",
                border: `1.5px solid ${avatar === a ? "#C97B1A" : "rgba(245,215,142,0.15)"}`,
              }}
            >
              {a}
            </button>
          ))}
        </div>

        <p className="pass-eyebrow mb-3">Cooking style</p>
        <div className="grid grid-cols-2 gap-3 mb-10">
          {STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => setStyle(s.id)}
              className="text-left p-4 rounded-[14px] transition-colors"
              style={{
                background: "#1a0e00",
                border: `1.5px solid ${style === s.id ? "#C97B1A" : "rgba(245,215,142,0.15)"}`,
              }}
            >
              <p className="text-[14px] font-medium mb-1">{s.title}</p>
              <p className="pass-muted text-[12px] leading-snug">{s.subtitle}</p>
            </button>
          ))}
        </div>

        <button onClick={submit} disabled={busy} className="pass-btn-primary py-3.5 text-[15px] mt-auto">
          {busy ? "Saving…" : "Enter The Pass"}
        </button>
      </div>
    </ScreenShell>
  );
}

export default function ProfileSetup() {
  return (
    <AuthGuard requireProfile={false}>
      <ProfileSetupInner />
    </AuthGuard>
  );
}
