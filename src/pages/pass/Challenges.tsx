import { useQuery } from "@tanstack/react-query";
import { Camera, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import ScreenShell from "@/components/pass/ScreenShell";
import AuthGuard from "@/components/pass/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { fetchAllSecretsMeta, fetchChallenges, fetchProgress, isChallengeLocked, type ChallengeProgress } from "@/lib/pass";

function ChallengesInner() {
  const { user, profile } = useAuth();
  const { data: challenges = [] } = useQuery({ queryKey: ["challenges"], queryFn: fetchChallenges });
  const { data: progress = [] } = useQuery({
    queryKey: ["progress", user?.id],
    queryFn: () => fetchProgress(user!.id),
    enabled: !!user,
  });
  const { data: secrets = [] } = useQuery({ queryKey: ["secrets-meta"], queryFn: fetchAllSecretsMeta });

  const progressMap = new Map<string, ChallengeProgress>();
  progress.forEach((p) => progressMap.set(p.challenge_id, p));
  const secretMap = new Map(secrets.map((s) => [s.id, s.title]));
  const totalPoints = profile?.total_points ?? 0;

  return (
    <ScreenShell showNav>
      <div className="px-5 pt-8">
        <p className="pass-eyebrow mb-1">The Pass</p>
        <h1 className="text-[1.75rem] mb-2">Challenges</h1>
        <p className="pass-muted text-[14px] mb-8">Cook, verify, unlock.</p>

        <ul className="flex flex-col gap-3">
          {challenges.map((c) => {
            const p = progressMap.get(c.id);
            const locked = isChallengeLocked(c, totalPoints);
            const done = p?.completed;
            const reward = c.unlock_reward_id ? secretMap.get(c.unlock_reward_id) : null;
            return (
              <li key={c.id} className="pass-card p-5" style={{ opacity: locked ? 0.5 : 1 }}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {locked && <Lock size={14} strokeWidth={1.5} />}
                    <h2 className="text-[15px] font-medium truncate">{c.title}</h2>
                  </div>
                  <span className="text-[12px] whitespace-nowrap" style={{ color: "#C97B1A" }}>
                    +{c.points_reward}
                  </span>
                </div>
                <p className="pass-muted text-[13px] leading-relaxed mb-3">{c.description}</p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] pass-muted mb-4">
                  <span>{done ? "Complete" : `${p?.verified_count ?? 0} of ${c.required_count} verified`}</span>
                  {reward && <span>Unlocks: {reward}</span>}
                  {locked && <span>Unlock at {c.is_locked_until_points} points</span>}
                </div>

                {!locked && !done && (
                  <Link
                    to={`/verify/${c.id}`}
                    className="pass-btn-primary inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[13px]"
                  >
                    <Camera size={14} strokeWidth={1.5} />
                    Verify a dish
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </ScreenShell>
  );
}

export default function Challenges() {
  return <AuthGuard><ChallengesInner /></AuthGuard>;
}
