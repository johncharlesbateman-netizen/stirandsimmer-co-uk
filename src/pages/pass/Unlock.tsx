import { useEffect, useState } from "react";
import { Award } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ScreenShell from "@/components/pass/ScreenShell";
import AuthGuard from "@/components/pass/AuthGuard";
import { supabase } from "@/integrations/supabase/client";
import type { VerifyResult } from "@/lib/pass";

function UnlockInner() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: VerifyResult | null };
  const [secretTitle, setSecretTitle] = useState<string | null>(null);
  const [secretContent, setSecretContent] = useState<string | null>(null);

  useEffect(() => {
    if (!state?.secret_id) return;
    supabase
      .from("secrets_pass")
      .select("title, content")
      .eq("id", state.secret_id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setSecretTitle(data.title);
          setSecretContent(data.content);
        }
      });
  }, [state?.secret_id]);

  if (!state) {
    return (
      <ScreenShell>
        <div className="p-6 pass-muted">No verification data.</div>
      </ScreenShell>
    );
  }

  const subtitle = state.completed
    ? "Challenge complete — a new secret is yours."
    : `${state.verified_count} of ${state.required_count} verified. Keep cooking.`;

  return (
    <ScreenShell>
      <div className="flex flex-col items-center justify-center text-center px-8 py-16 min-h-screen">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
          style={{ border: "1.5px solid #C97B1A", background: "#1a0e00" }}
        >
          <Award size={36} color="#C97B1A" strokeWidth={1.5} />
        </div>

        {state.points_awarded > 0 ? (
          <p className="text-[3rem] leading-none mb-4" style={{ color: "#C97B1A" }}>
            +{state.points_awarded} points
          </p>
        ) : (
          <p className="text-[2rem] leading-none mb-4" style={{ color: "#C97B1A" }}>
            Keep going
          </p>
        )}

        <h1 className="text-[1.5rem] mb-3">Dish verified</h1>
        <p className="pass-muted text-[14px] leading-relaxed mb-10 max-w-[30ch]">{subtitle}</p>

        {secretTitle && secretContent && (
          <div className="pass-card p-5 text-left mb-10 w-full max-w-[360px]">
            <p className="pass-eyebrow mb-2" style={{ color: "#C97B1A" }}>Chef's secret unlocked</p>
            <h2 className="text-[16px] mb-2">{secretTitle}</h2>
            <p className="pass-muted text-[13px] leading-relaxed" style={{ color: "rgba(245,215,142,0.75)" }}>
              {secretContent}
            </p>
          </div>
        )}

        <button onClick={() => navigate("/home", { replace: true })} className="pass-btn-primary py-3.5 px-10 text-[15px]">
          Continue cooking
        </button>
      </div>
    </ScreenShell>
  );
}

export default function Unlock() {
  return <AuthGuard><UnlockInner /></AuthGuard>;
}
