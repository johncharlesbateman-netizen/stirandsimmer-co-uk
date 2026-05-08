import { supabase } from "@/integrations/supabase/client";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  cuisine_region: string;
  recipe_name: string;
  recipe_url: string;
  cook_time_minutes: number;
  required_count: number;
  points_reward: number;
  unlock_reward_id: string | null;
  is_locked_until_points: number;
  sort_order: number;
}

export interface ChallengeProgress {
  challenge_id: string;
  verified_count: number;
  completed: boolean;
  completed_at: string | null;
}

export interface SecretRow {
  id: string;
  title: string;
  content: string;
}

export async function fetchChallenges(): Promise<Challenge[]> {
  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data as Challenge[]) ?? [];
}

export async function fetchProgress(userId: string): Promise<ChallengeProgress[]> {
  const { data, error } = await supabase
    .from("challenge_progress")
    .select("challenge_id, verified_count, completed, completed_at")
    .eq("user_id", userId);
  if (error) throw error;
  return (data as ChallengeProgress[]) ?? [];
}

export async function fetchUnlockedSecrets(userId: string): Promise<SecretRow[]> {
  const { data, error } = await supabase
    .from("unlocked_secrets")
    .select("secret:secrets_pass(id, title, content)")
    .eq("user_id", userId);
  if (error) throw error;
  return (data ?? []).map((r: { secret: SecretRow }) => r.secret).filter(Boolean);
}

export interface SecretMeta {
  id: string;
  title: string;
  content: string;
  is_welcome: boolean;
}

export async function fetchAllSecretsMeta(): Promise<SecretMeta[]> {
  const { data, error } = await supabase
    .from("secrets_pass")
    .select("id, title, content, is_welcome");
  if (error) throw error;
  return (data as SecretMeta[]) ?? [];
}

export interface VerifyResult {
  verification_id: string;
  points_awarded: number;
  completed: boolean;
  secret_id: string | null;
  verified_count: number;
  required_count: number;
}

export async function verifyDish(challengeId: string, photoUrl: string): Promise<VerifyResult> {
  const { data, error } = await supabase.rpc("verify_dish", {
    p_challenge_id: challengeId,
    p_photo_url: photoUrl,
  });
  if (error) throw error;
  return data as unknown as VerifyResult;
}

export function isChallengeLocked(c: Challenge, totalPoints: number) {
  return c.is_locked_until_points > totalPoints;
}
