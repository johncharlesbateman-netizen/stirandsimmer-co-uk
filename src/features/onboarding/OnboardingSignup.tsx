import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "@/hooks/use-toast";
import { OnboardShell, PrimaryButton, ProgressDots, TopBar } from "./shared";

const OnboardingSignup = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [mode, setMode] = useState<"signup" | "signin">(
    params.get("mode") === "signin" ? "signin" : "signup",
  );
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/onboarding/preferences`,
            data: { first_name: firstName },
          },
        });
        if (error) throw error;
        toast({ title: "Check your email to confirm your account" });
        navigate("/onboarding/preferences");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/onboarding/preferences");
      }
    } catch (err: any) {
      toast({ title: "Sign-in failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "apple") => {
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: `${window.location.origin}/onboarding/preferences`,
    });
    if (result.error) {
      toast({ title: "Sign-in failed", description: result.error.message, variant: "destructive" });
    }
  };

  return (
    <OnboardShell>
      <TopBar onBack={() => navigate("/onboarding")} onSkip={() => navigate("/onboarding/preferences")} />
      <div className="mt-8 flex-1">
        <h1 className="font-display text-3xl text-white">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-white/55">
          {mode === "signup" ? "So we can save your journey." : "Sign in to continue."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-3">
          {mode === "signup" && (
            <input
              type="text"
              required
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#B45309]"
            />
          )}
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#B45309]"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#B45309]"
          />
          <PrimaryButton type="submit" disabled={loading}>
            Continue →
          </PrimaryButton>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm text-white transition hover:bg-white/[0.06]"
          >
            <span className="text-base">G</span> Continue with Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuth("apple")}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm text-white transition hover:bg-white/[0.06]"
          >
            <span className="text-base"></span> Continue with Apple
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
          className="mt-6 block w-full text-center text-xs text-white/40 hover:text-white/70"
        >
          {mode === "signup" ? "Already have an account? Sign in" : "New here? Create an account"}
        </button>
      </div>
      <div className="pt-4">
        <ProgressDots current={1} total={5} />
      </div>
    </OnboardShell>
  );
};

export default OnboardingSignup;
