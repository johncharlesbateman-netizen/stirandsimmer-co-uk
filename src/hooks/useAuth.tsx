import { createContext, ReactNode, useContext, useEffect, useState, useCallback } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface ChefProfile {
  user_id: string;
  chef_name: string | null;
  avatar: string | null;
  cooking_style: string | null;
  total_points: number;
  level: number;
}

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: ChefProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ChefProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("user_id, chef_name, avatar, cooking_style, total_points, level")
      .eq("user_id", userId)
      .maybeSingle();
    setProfile((data as ChefProfile) ?? null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (session?.user) await fetchProfile(session.user.id);
  }, [session, fetchProfile]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        setTimeout(() => fetchProfile(newSession.user.id), 0);
      } else {
        setProfile(null);
      }
    });

    supabase.auth.getSession().then(async ({ data: { session: existing } }) => {
      setSession(existing);
      if (existing?.user) await fetchProfile(existing.user.id);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user ?? null, profile, loading, refreshProfile, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
