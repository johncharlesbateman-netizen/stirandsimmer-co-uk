import { Flame } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import ScreenShell from "@/components/pass/ScreenShell";
import { useAuth } from "@/hooks/useAuth";

export default function Entry() {
  const { profile, loading, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [demoBusy, setDemoBusy] = useState(false);

  const startDemo = async () => {
    setDemoBusy(true);
    await updateProfile({
      chef_name: "Demo Chef",
      avatar: "👨‍🍳",
      cooking_style: "explorer",
      total_points: 250,
      level: 2,
    });
    navigate("/home", { replace: true });
  };

  if (!loading && profile?.chef_name && profile?.cooking_style) {
    return <Navigate to="/home" replace />;
  }

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
          Are you ready for the Pass?
        </h1>

        <div className="pass-divider w-12 mb-7" />

        <p className="pass-muted text-[15px] leading-relaxed max-w-[28ch] mb-12">
          Cook. Verify. Unlock secrets. Prove yourself in the kitchen.
        </p>

        <div className="w-full flex flex-col gap-3 max-w-[320px]">
          <Link to="/signup" className="pass-btn-primary py-3.5 text-center text-[15px]">
            Create your chef profile
          </Link>
          <button
            onClick={startDemo}
            disabled={demoBusy}
            className="pass-btn-ghost py-3.5 text-center text-[14px]"
            style={{ borderStyle: "dashed" }}
          >
            {demoBusy ? "Starting demo…" : "Try the demo"}
          </button>
        </div>
      </div>
    </ScreenShell>
  );
}
