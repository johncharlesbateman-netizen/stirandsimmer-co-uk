import { useRef, useState } from "react";
import { Camera, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface LogDishPromptProps {
  recipeId: string;
  recipeName: string;
  onComplete: () => void;
}

const LogDishPrompt = ({ recipeId, recipeName, onComplete }: LogDishPromptProps) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const logDish = async (photoUrl: string | null) => {
    if (!user) {
      toast({ title: "Sign in to log your dishes", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("cooked_dishes").insert({
      user_id: user.id,
      recipe_id: recipeId,
      recipe_name: recipeName,
      photo_url: photoUrl,
      photo_verified: !!photoUrl,
    });
    if (error) throw error;
  };

  const handleUpload = async (file: File) => {
    if (!user) {
      toast({ title: "Sign in to log your dishes", variant: "destructive" });
      return;
    }
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${user.id}/${recipeId}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("dish-photos")
        .upload(path, file, { upsert: false, contentType: file.type });
      if (upErr) throw upErr;
      const { data: signed } = await supabase.storage
        .from("dish-photos")
        .createSignedUrl(path, 60 * 60 * 24 * 365);
      await logDish(signed?.signedUrl ?? path);
      toast({ title: "Dish logged", description: "Nice work — full progress credited." });
      onComplete();
    } catch (err: any) {
      toast({ title: "Couldn't upload", description: err.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const handleSkip = async () => {
    setBusy(true);
    try {
      await logDish(null);
      toast({ title: "Dish logged", description: "Add a photo next time for full credit." });
      onComplete();
    } catch (err: any) {
      toast({ title: "Couldn't log dish", description: err.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center">
      <div className="relative w-full max-w-md rounded-t-3xl bg-[#0d0d0d] px-6 pb-8 pt-7 sm:rounded-3xl"
        style={{ borderTop: "1px solid rgba(180,83,9,0.2)" }}
      >
        <button
          type="button"
          onClick={onComplete}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-white/10 sm:hidden" />

        <h2 className="font-display text-2xl text-white">Show us what you made</h2>
        <p className="mt-2 text-sm text-white/55">
          A quick photo logs your dish and earns your progress.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleUpload(f);
          }}
        />

        <button
          type="button"
          disabled={busy}
          onClick={() => fileInputRef.current?.click()}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#B45309] px-6 py-4 text-sm font-medium text-white shadow-[0_10px_40px_rgba(180,83,9,0.4)] transition hover:bg-[#a04808] disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
          {busy ? "Uploading…" : "Take or upload a photo"}
        </button>

        <button
          type="button"
          disabled={busy}
          onClick={handleSkip}
          className="mt-4 block w-full text-center text-xs text-white/40 transition hover:text-white/70 disabled:opacity-40"
        >
          Skip for now
        </button>

        <p className="mt-5 rounded-2xl border border-white/8 bg-white/[0.02] p-3 text-center text-[11px] leading-relaxed text-white/45">
          Photo verification earns full progression credit.
        </p>
      </div>
    </div>
  );
};

export default LogDishPrompt;
