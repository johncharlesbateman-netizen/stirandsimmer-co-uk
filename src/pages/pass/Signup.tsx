import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ScreenShell from "@/components/pass/ScreenShell";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

export default function Signup() {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: "Add your chef name", variant: "destructive" });
      return;
    }
    setBusy(true);
    await updateProfile({ chef_name: name.trim() });
    navigate("/profile-setup", { replace: true });
  };

  return (
    <ScreenShell>
      <div className="px-6 pt-6 pb-12 min-h-screen flex flex-col">
        <Link to="/" aria-label="Back" className="text-[rgba(245,215,142,0.7)] mb-8">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </Link>

        <h1 className="text-[1.75rem] leading-tight mb-3">Join the Pass</h1>
        <p className="pass-muted text-[14px] leading-relaxed mb-10 max-w-[34ch]">
          Let's start with your chef name.
        </p>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <p className="pass-eyebrow mb-1">What's your chef name?</p>
          <input
            className="pass-input px-4 py-3.5 text-[15px]"
            placeholder="e.g. Marco"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            autoComplete="off"
          />

          <button type="submit" disabled={busy} className="pass-btn-primary py-3.5 mt-6 text-[15px]">
            {busy ? "Saving…" : "Continue"}
          </button>
        </form>
      </div>
    </ScreenShell>
  );
}
