import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ScreenShell from "@/components/pass/ScreenShell";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Sign-in failed", description: error.message, variant: "destructive" });
      setBusy(false);
      return;
    }
    navigate("/home", { replace: true });
  };

  return (
    <ScreenShell>
      <div className="px-6 pt-6 pb-12 min-h-screen flex flex-col">
        <Link to="/" aria-label="Back" className="text-[rgba(245,215,142,0.7)] mb-8">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </Link>

        <h1 className="text-[1.75rem] leading-tight mb-3">Welcome back, chef</h1>
        <p className="pass-muted text-[14px] leading-relaxed mb-10 max-w-[34ch]">
          Sign in to continue your challenges.
        </p>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            className="pass-input px-4 py-3.5 text-[15px]"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            className="pass-input px-4 py-3.5 text-[15px]"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button type="submit" disabled={busy} className="pass-btn-primary py-3.5 mt-6 text-[15px]">
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="pass-muted text-[13px] text-center mt-8">
          New here?{" "}
          <Link to="/signup" className="text-[#C97B1A]">Create your chef profile</Link>
        </p>
      </div>
    </ScreenShell>
  );
}
