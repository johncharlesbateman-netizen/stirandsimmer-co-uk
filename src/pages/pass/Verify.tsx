import { useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Camera, ExternalLink } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ScreenShell from "@/components/pass/ScreenShell";
import AuthGuard from "@/components/pass/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { fetchChallenges, verifyDish } from "@/lib/pass";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

function VerifyInner() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const { data: challenges = [] } = useQuery({ queryKey: ["challenges"], queryFn: fetchChallenges });
  const challenge = challenges.find((c) => c.id === id);

  const onPick = (f: File | null) => {
    setFile(f);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(f ? URL.createObjectURL(f) : null);
  };

  const submit = async () => {
    if (!file || !user || !challenge) return;
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${user.id}/${challenge.id}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("dish-verifications")
        .upload(path, file, { upsert: false, contentType: file.type });
      if (upErr) throw upErr;

      const result = await verifyDish(challenge.id, path);
      await Promise.all([
        refreshProfile(),
        queryClient.invalidateQueries({ queryKey: ["progress"] }),
        queryClient.invalidateQueries({ queryKey: ["unlocked-secrets"] }),
        queryClient.invalidateQueries({ queryKey: ["recent-cooks"] }),
      ]);
      navigate(`/unlock/${result.verification_id}`, { state: result, replace: true });
    } catch (e) {
      toast({
        title: "Verification failed",
        description: e instanceof Error ? e.message : "Try again",
        variant: "destructive",
      });
      setBusy(false);
    }
  };

  if (!challenge) {
    return (
      <ScreenShell>
        <div className="p-6 pass-muted">Loading challenge…</div>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell>
      <div className="px-6 pt-6 pb-12 min-h-screen flex flex-col">
        <button onClick={() => navigate(-1)} aria-label="Back" className="text-[rgba(245,215,142,0.7)] mb-6 self-start">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>

        <p className="pass-eyebrow mb-2">Verify a dish</p>
        <h1 className="text-[1.75rem] leading-tight mb-3">{challenge.recipe_name}</h1>
        <p className="pass-muted text-[13px] mb-6">
          {challenge.cuisine_region} · {challenge.cook_time_minutes} min
        </p>

        <a
          href={`https://stirandsimmer.co.uk/recipes/${challenge.recipe_name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pass-btn-ghost inline-flex items-center justify-center gap-2 py-3 text-[14px] mb-8"
        >
          Open recipe on stirandsimmer.co.uk
          <ExternalLink size={14} strokeWidth={1.5} />
        </a>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => onPick(e.target.files?.[0] ?? null)}
        />

        <button
          onClick={() => fileRef.current?.click()}
          className="rounded-[14px] flex flex-col items-center justify-center py-12 mb-3 transition-colors"
          style={{
            background: "#1a0e00",
            border: "1.5px dashed rgba(245,215,142,0.3)",
          }}
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Dish preview" className="max-h-56 rounded-[10px]" />
          ) : (
            <>
              <Camera size={28} color="#C97B1A" strokeWidth={1.5} />
              <p className="mt-3 text-[14px]">Photograph your dish</p>
              <p className="pass-muted text-[12px] mt-1">Tap to use camera or upload</p>
            </>
          )}
        </button>

        <p className="pass-muted text-[12px] leading-relaxed mb-8">
          Your photo proves you cooked it. It may be shared in the community with your permission.
        </p>

        <button
          onClick={submit}
          disabled={!file || busy}
          className="pass-btn-primary py-3.5 text-[15px] mt-auto"
        >
          {busy ? "Verifying…" : "Submit dish"}
        </button>
      </div>
    </ScreenShell>
  );
}

export default function Verify() {
  return <AuthGuard><VerifyInner /></AuthGuard>;
}
