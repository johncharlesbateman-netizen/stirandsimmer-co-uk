import { useQuery } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import ScreenShell from "@/components/pass/ScreenShell";
import AuthGuard from "@/components/pass/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { fetchProgress, fetchUnlockedSecrets } from "@/lib/pass";

const STYLE_LABEL: Record<string, string> = {
  home_cook: "Home cook",
  explorer: "Explorer",
  entertainer: "Entertainer",
  speed_chef: "Speed chef",
};

interface RecentCook {
  id: string;
  recipe_name: string;
  verified_at: string;
  points_awarded: number;
}

function ProfileInner() {
  const { user, profile, signOut } = useAuth();

  const { data: progress = [] } = useQuery({
    queryKey: ["progress", user?.id],
    queryFn: () => fetchProgress(user!.id),
    enabled: !!user,
  });

  const { data: unlocked = [] } = useQuery({
    queryKey: ["unlocked-secrets", user?.id],
    queryFn: () => fetchUnlockedSecrets(user!.id),
    enabled: !!user,
  });

  const { data: recent = [] } = useQuery<RecentCook[]>({
    queryKey: ["recent-cooks", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("verifications")
        .select("id, recipe_name, verified_at, points_awarded")
        .eq("user_id", user!.id)
        .order("verified_at", { ascending: false })
        .limit(20);
      return (data as RecentCook[]) ?? [];
    },
    enabled: !!user,
  });

  const totalPoints = profile?.total_points ?? 0;
  const level = profile?.level ?? 1;
  const pointsIntoLevel = totalPoints % 200;
  const pctToNext = (pointsIntoLevel / 200) * 100;

  const dishes = recent.length;
  const challengesDone = progress.filter((p) => p.completed).length;

  return (
    <ScreenShell showNav>
      <div className="px-5 pt-8">
        <div className="pass-card p-5 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
              style={{ background: "#111008", border: "1.5px solid #C97B1A" }}
            >
              {profile?.avatar ?? "🔥"}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-[1.25rem] truncate">{profile?.chef_name ?? "Chef"}</h1>
              <p className="pass-muted text-[12px]">
                {profile?.cooking_style ? STYLE_LABEL[profile.cooking_style] ?? "Cook" : "Cook"} · Level {level}
              </p>
            </div>
            <button onClick={signOut} aria-label="Sign out" className="pass-muted">
              <LogOut size={18} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex justify-between text-[11px] mb-1.5">
            <span className="pass-muted">Level {level}</span>
            <span className="pass-muted">{pointsIntoLevel}/200 to level {level + 1}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(245,215,142,0.12)" }}>
            <div className="h-full" style={{ width: `${pctToNext}%`, background: "#C97B1A" }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <Stat label="Dishes cooked" value={dishes} />
          <Stat label="Challenges done" value={challengesDone} />
          <Stat label="Secrets unlocked" value={unlocked.length} />
          <Stat label="Total points" value={totalPoints} />
        </div>

        <p className="pass-eyebrow mb-3">Recent cooks</p>
        {recent.length === 0 ? (
          <p className="pass-muted text-[13px]">Verify your first dish to see it here.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {recent.map((r) => (
              <li key={r.id} className="pass-card p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[14px] truncate">{r.recipe_name}</p>
                  <p className="pass-muted text-[11px]">
                    {new Date(r.verified_at).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                {r.points_awarded > 0 && (
                  <span className="text-[12px] whitespace-nowrap" style={{ color: "#C97B1A" }}>
                    +{r.points_awarded}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </ScreenShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="pass-card p-4">
      <p className="pass-eyebrow mb-1">{label}</p>
      <p className="text-[1.5rem] leading-none" style={{ color: "#C97B1A" }}>{value}</p>
    </div>
  );
}

export default function Profile() {
  return <AuthGuard><ProfileInner /></AuthGuard>;
}
