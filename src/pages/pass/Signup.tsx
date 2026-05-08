import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ScreenShell from "@/components/pass/ScreenShell";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || password.length < 6) {
      toast({ title: "Add your details", description: "Name, email and a password of 6+ characters.", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/profile-setup`,
        data: { first_name: name },
      },
    });
    if (error) {
      toast({ title: "Could not sign up", description: error.message, variant: "destructive" });
      setBusy(false);
      return;
    }
    // Seed profile chef_name immediately
    if (data.user) {
      await supabase
        .from("profiles")
        .upsert(
          { user_id: data.user.id, first_name: name, chef_name: name },
          { onConflict: "user_id" }
        );
    }
    navigate("/profile-setup", { replace: true });
  };

  return (
    <ScreenShell>
      <div className="px-6 pt-6 pb-12 min-h-screen flex flex-col">
        <Link to="/" aria-label="Back" className="text-[rgba(245,215,142,0.7)] mb-8">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </Link>

        <h1 className="text-[1.75rem] leading-tight mb-3">Join The Pass</h1>
        <p className="pass-muted text-[14px] leading-relaxed mb-10 max-w-[34ch]">
          Create your account to start earning points and unlocking chef secrets.
        </p>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            className="pass-input px-4 py-3.5 text-[15px]"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
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
            autoComplete="new-password"
          />

          <button type="submit" disabled={busy} className="pass-btn-primary py-3.5 mt-6 text-[15px]">
            {busy ? "Creating…" : "Continue to chef profile"}
          </button>
        </form>

        <p className="pass-muted text-[13px] text-center mt-8">
          Already have an account?{" "}
          <Link to="/signin" className="text-[#C97B1A]">Sign in</Link>
        </p>
      </div>
    </ScreenShell>
  );
}
