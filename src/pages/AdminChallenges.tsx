import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const REGIONS: { id: string; name: string; emoji: string }[] = [
  { id: "uk", name: "United Kingdom", emoji: "🇬🇧" },
  { id: "italy", name: "Italy", emoji: "🇮🇹" },
  { id: "france", name: "France", emoji: "🇫🇷" },
  { id: "asia", name: "South & Southeast Asia", emoji: "🌶️" },
];

type Row = { region_id: string; challenge: string; updated_at: string };

const AdminChallenges = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["admin", "region-challenges"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("region_challenges")
        .select("region_id, challenge, updated_at");
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    const initial: Record<string, string> = {};
    for (const r of rows) initial[r.region_id] = r.challenge;
    setDrafts((prev) => ({ ...initial, ...prev }));
    // We intentionally only reseed when the row count or ids change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows.length]);

  const byId = Object.fromEntries(rows.map((r) => [r.region_id, r])) as Record<
    string,
    Row | undefined
  >;

  const handleSave = async (regionId: string) => {
    const text = (drafts[regionId] ?? "").trim();
    if (!text) {
      toast({
        title: "Challenge text required",
        description: "Please enter some text before saving.",
        variant: "destructive",
      });
      return;
    }
    setSavingId(regionId);
    const { error } = await supabase
      .from("region_challenges")
      .upsert(
        { region_id: regionId, challenge: text, updated_at: new Date().toISOString() },
        { onConflict: "region_id" },
      );
    setSavingId(null);

    if (error) {
      toast({
        title: "Couldn't save",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Challenge updated" });
    queryClient.invalidateQueries({ queryKey: ["admin", "region-challenges"] });
    queryClient.invalidateQueries({ queryKey: ["region-challenge", regionId] });
  };

  const formatDate = (iso?: string) => {
    if (!iso) return "Never";
    try {
      return new Date(iso).toLocaleString("en-GB", {
        dateStyle: "long",
        timeStyle: "short",
      });
    } catch {
      return iso;
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Manage weekly challenges | Stir & Simmer admin</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-3xl">
          <p className="micro-caption mb-4">Admin</p>
          <h1 className="heading-display mb-4">Weekly challenges</h1>
          <p className="text-muted-foreground text-lg">
            Update the challenge text shown for each active region on
            The Kitchen Atlas. Changes go live as soon as you save.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-3xl space-y-10">
          {isLoading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            REGIONS.map((region) => {
              const row = byId[region.id];
              const draft = drafts[region.id] ?? "";
              const original = row?.challenge ?? "";
              const dirty = draft.trim() !== original.trim();
              return (
                <div
                  key={region.id}
                  className="border border-border rounded-lg p-5 md:p-6 bg-card"
                >
                  <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                    <span className="text-2xl" aria-hidden>
                      {region.emoji}
                    </span>
                    <h2 className="font-display text-2xl text-foreground">
                      {region.name}
                    </h2>
                  </div>

                  <Label
                    htmlFor={`challenge-${region.id}`}
                    className="text-xs uppercase tracking-widest font-semibold text-muted-foreground"
                  >
                    Challenge
                  </Label>
                  <Textarea
                    id={`challenge-${region.id}`}
                    value={draft}
                    onChange={(e) =>
                      setDrafts((prev) => ({
                        ...prev,
                        [region.id]: e.target.value,
                      }))
                    }
                    rows={4}
                    className="mt-2"
                  />

                  <div className="mt-3 flex items-center justify-between gap-4 flex-wrap">
                    <p className="text-xs text-muted-foreground">
                      Last updated: {formatDate(row?.updated_at)}
                    </p>
                    <Button
                      onClick={() => handleSave(region.id)}
                      disabled={!dirty || savingId === region.id}
                      size="sm"
                    >
                      {savingId === region.id ? "Saving…" : "Save"}
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AdminChallenges;
