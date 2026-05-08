import { Flame } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import ScreenShell from "@/components/pass/ScreenShell";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function Entry() {
  const { session, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [demoBusy, setDemoBusy] = useState(false);

  const startDemo = async () => {
    setDemoBusy(true);
    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
      toast({ title: "Could not start demo", description: error.message, variant: "destructive" });
      setDemoBusy(false);
      return;
    }
    // Seed sample profile data so dashboard isn't empty
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").upsert(
        {
          user_id: user.id,
          first_name: "Demo Chef",
          chef_name: "Demo Chef",
          avatar: "👨‍🍳",
          cooking_style: "explorer",
          total_points: 250,
          level: 2,
        },
        { onConflict: "user_id" }
      );
    }
    navigate("/profile-setup", { replace: true });
  };

  if (!loading && session && profile?.chef_name) return <Navigate to="/home" replace />;
  if (!loading && session) return <Navigate to="/profile-setup" replace />;

  return (
    <ScreenShell>
      <div className="flex flex-col items-center justify-center text-center px-8 py-16 min-h-screen">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-10"
          style={{ border: "1.5px solid #C97B1A" }}
        >
          <Flame size={32} color="#C97B1A" strokeWidth={1.5} />
        </div>

        <p className="pass-eyebrow mb-5">A cooking challenge</p>

        <h1 className="text-[2rem] leading-[1.15] mb-7 max-w-[14ch]">
          Are you ready for The Pass?
        </h1>

        <div className="pass-divider w-12 mb-7" />

        <p className="pass-muted text-[15px] leading-relaxed max-w-[28ch] mb-12">
          Cook. Verify. Unlock secrets. Prove yourself in the kitchen.
        </p>

        <div className="w-full flex flex-col gap-3 max-w-[320px]">
          <Link to="/signup" className="pass-btn-primary py-3.5 text-center text-[15px]">
            Create your chef profile
          </Link>
          <Link to="/signin" className="pass-btn-ghost py-3.5 text-center text-[15px]">
            Sign in
          </Link>
          <button
            onClick={startDemo}
            disabled={demoBusy}
            className="pass-btn-ghost py-3.5 text-center text-[14px] mt-2"
            style={{ borderStyle: "dashed" }}
          >
            {demoBusy ? "Starting demo…" : "Try the demo"}
          </button>
        </div>
      </div>
    </ScreenShell>
  );
}
