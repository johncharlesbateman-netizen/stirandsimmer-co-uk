import { useQuery } from "@tanstack/react-query";
import { Lock } from "lucide-react";
import ScreenShell from "@/components/pass/ScreenShell";
import AuthGuard from "@/components/pass/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { fetchChallenges, fetchUnlockedSecrets, fetchAllSecretsMeta } from "@/lib/pass";

function SecretsInner() {
  const { user } = useAuth();
  const { data: unlocked = [] } = useQuery({
    queryKey: ["unlocked-secrets", user?.id],
    queryFn: () => fetchUnlockedSecrets(user!.id),
    enabled: !!user,
  });
  const { data: allSecrets = [] } = useQuery({ queryKey: ["secrets-meta"], queryFn: fetchAllSecretsMeta });
  const { data: challenges = [] } = useQuery({ queryKey: ["challenges"], queryFn: fetchChallenges });

  const unlockedIds = new Set(unlocked.map((s) => s.id));
  const locked = allSecrets.filter((s) => !unlockedIds.has(s.id));

  const lockedRequirement = (secretId: string) => {
    const ch = challenges.find((c) => c.unlock_reward_id === secretId);
    return ch ? `Unlock by completing ${ch.title}` : "Locked";
  };

  return (
    <ScreenShell showNav>
      <div className="px-5 pt-8">
        <p className="pass-eyebrow mb-1">The Pass</p>
        <h1 className="text-[1.75rem] mb-2">Chef's secrets</h1>
        <p className="pass-muted text-[14px] mb-8">Unlocked as you complete challenges.</p>

        {unlocked.length > 0 && (
          <ul className="flex flex-col gap-3 mb-8">
            {unlocked.map((s) => (
              <li key={s.id} className="pass-card p-5">
                <p className="pass-eyebrow mb-2" style={{ color: "#C97B1A" }}>Chef's secret</p>
                <h2 className="text-[15px] font-medium mb-2">{s.title}</h2>
                <p className="pass-muted text-[13px] leading-relaxed" style={{ color: "rgba(245,215,142,0.75)" }}>
                  {s.content}
                </p>
              </li>
            ))}
          </ul>
        )}

        {locked.length > 0 && (
          <>
            <p className="pass-eyebrow mb-3">Still locked</p>
            <ul className="flex flex-col gap-3">
              {locked.map((s) => (
                <li
                  key={s.id}
                  className="p-5 rounded-[14px]"
                  style={{ background: "transparent", border: "1.5px dashed rgba(245,215,142,0.2)" }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Lock size={14} strokeWidth={1.5} className="pass-muted" />
                    <h2 className="text-[14px] font-medium pass-muted">{s.title}</h2>
                  </div>
                  <p className="pass-muted text-[12px]">{lockedRequirement(s.id)}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </ScreenShell>
  );
}

export default function Secrets() {
  return <AuthGuard><SecretsInner /></AuthGuard>;
}
