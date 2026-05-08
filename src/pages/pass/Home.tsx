import { useQuery } from "@tanstack/react-query";
import { Camera, Lock, Medal } from "lucide-react";
import { Link } from "react-router-dom";
import ScreenShell from "@/components/pass/ScreenShell";
import AuthGuard from "@/components/pass/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { fetchChallenges, fetchProgress, isChallengeLocked, type Challenge, type ChallengeProgress } from "@/lib/pass";

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(245,215,142,0.12)" }}>
      <div className="h-full" style={{ width: `${pct}%`, background: "#C97B1A" }} />
    </div>
  );
}

function HomeInner() {
  const { user, profile } = useAuth();
  const { data: challenges = [] } = useQuery({ queryKey: ["challenges"], queryFn: fetchChallenges });
  const { data: progress = [] } = useQuery({
    queryKey: ["progress", user?.id],
    queryFn: () => fetchProgress(user!.id),
    enabled: !!user,
  });

  const progressMap = new Map<string, ChallengeProgress>();
  progress.forEach((p) => progressMap.set(p.challenge_id, p));

  const totalPoints = profile?.total_points ?? 0;

  // Active = first non-completed unlocked challenge
  const active = challenges.find((c) => {
    const p = progressMap.get(c.id);
    return !isChallengeLocked(c, totalPoints) && !(p?.completed);
  });

  const verifiedCount = (c: Challenge) => progressMap.get(c.id)?.verified_count ?? 0;

  return (
    <ScreenShell showNav>
      <div className="px-5 pt-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="pass-eyebrow mb-1">Welcome back</p>
            <h1 className="text-[1.75rem] leading-tight">
              {profile?.avatar ?? "🔥"} {profile?.chef_name ?? "Chef"}
            </h1>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-full"
            style={{ background: "#1a0e00", border: "1px solid rgba(245,215,142,0.15)" }}
          >
            <Medal size={16} color="#C97B1A" strokeWidth={1.5} />
            <span className="text-[13px] font-medium">{totalPoints}</span>
          </div>
        </div>

        {active ? (
          <div className="pass-card p-5 mb-8" style={{ borderColor: "#C97B1A" }}>
            <p className="pass-eyebrow mb-2" style={{ color: "#C97B1A" }}>Active challenge</p>
            <h2 className="text-[1.25rem] mb-2 leading-snug">{active.title}</h2>
            <p className="pass-muted text-[13px] leading-relaxed mb-5">{active.description}</p>

            <ProgressBar value={verifiedCount(active)} max={active.required_count} />
            <div className="flex justify-between items-center mt-2 mb-5">
              <span className="text-[12px]">
                {verifiedCount(active)} of {active.required_count} verified
              </span>
              <span className="pass-muted text-[12px]">+{active.points_reward} points</span>
            </div>

            <div className="flex items-center gap-2 pass-muted text-[12px] mb-5">
              <Lock size={12} strokeWidth={1.5} />
              <span>Unlocks a chef's secret on completion</span>
            </div>

            <Link
              to={`/verify/${active.id}`}
              className="pass-btn-primary flex items-center justify-center gap-2 py-3.5 text-[14px]"
            >
              <Camera size={16} strokeWidth={1.5} />
              Verify my dish
            </Link>
          </div>
        ) : (
          <div className="pass-card p-5 mb-8 text-center">
            <p className="text-[14px] mb-1">All current challenges complete</p>
            <p className="pass-muted text-[12px]">Earn more points to unlock the next.</p>
          </div>
        )}

        <p className="pass-eyebrow mb-3">All challenges</p>
        <ul className="flex flex-col gap-3">
          {challenges.map((c) => {
            const p = progressMap.get(c.id);
            const locked = isChallengeLocked(c, totalPoints);
            const done = p?.completed;
            return (
              <li
                key={c.id}
                className="pass-card p-4"
                style={{ opacity: locked ? 0.45 : 1 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {locked && <Lock size={12} strokeWidth={1.5} />}
                      <p className="text-[14px] font-medium truncate">{c.title}</p>
                    </div>
                    <p className="pass-muted text-[12px]">
                      {done ? "Complete" : `${p?.verified_count ?? 0} of ${c.required_count} verified`}
                    </p>
                  </div>
                  <span className="text-[12px] whitespace-nowrap" style={{ color: "#C97B1A" }}>
                    +{c.points_reward}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </ScreenShell>
  );
}

export default function Home() {
  return <AuthGuard><HomeInner /></AuthGuard>;
}
