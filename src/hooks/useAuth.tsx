import { createContext, ReactNode, useContext, useEffect, useState, useCallback } from "react";

export interface ChefProfile {
  user_id: string;
  chef_name: string | null;
  avatar: string | null;
  cooking_style: string | null;
  total_points: number;
  level: number;
}

interface AuthContextValue {
  session: { user: { id: string } } | null;
  user: { id: string } | null;
  profile: ChefProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  updateProfile: (patch: Partial<ChefProfile>) => Promise<void>;
  signOut: () => Promise<void>;
}

const STORAGE_KEY = "pass_demo_profile";

function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "demo-" + Math.random().toString(36).slice(2);
}

function loadProfile(): ChefProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ChefProfile) : null;
  } catch {
    return null;
  }
}

function saveProfile(p: ChefProfile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

const AuthContext = createContext<AuthContextValue>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
  updateProfile: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ChefProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProfile(loadProfile());
    setLoading(false);
  }, []);

  const refreshProfile = useCallback(async () => {
    setProfile(loadProfile());
  }, []);

  const updateProfile = useCallback(async (patch: Partial<ChefProfile>) => {
    const current = loadProfile() ?? {
      user_id: uuid(),
      chef_name: null,
      avatar: null,
      cooking_style: null,
      total_points: 0,
      level: 1,
    };
    const next = { ...current, ...patch };
    saveProfile(next);
    setProfile(next);
  }, []);

  const signOut = async () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(null);
  };

  // Always provide a synthetic session so guarded screens render.
  const userId = profile?.user_id ?? "demo-anon";
  const session = { user: { id: userId } };

  return (
    <AuthContext.Provider
      value={{ session, user: session.user, profile, loading, refreshProfile, updateProfile, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
