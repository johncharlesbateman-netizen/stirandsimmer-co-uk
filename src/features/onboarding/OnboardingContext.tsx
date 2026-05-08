import { createContext, useContext, useState, ReactNode } from "react";

export type OnboardingPrefs = {
  skill_level: string;
  time_available: string;
  spice_tolerance: string;
  dietary: string;
  regions: string[];
};

type Ctx = {
  prefs: OnboardingPrefs;
  update: (patch: Partial<OnboardingPrefs>) => void;
};

const defaultPrefs: OnboardingPrefs = {
  skill_level: "",
  time_available: "",
  spice_tolerance: "",
  dietary: "",
  regions: [],
};

const OnboardingContext = createContext<Ctx>({ prefs: defaultPrefs, update: () => {} });

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [prefs, setPrefs] = useState<OnboardingPrefs>(defaultPrefs);
  const update = (patch: Partial<OnboardingPrefs>) => setPrefs((p) => ({ ...p, ...patch }));
  return <OnboardingContext.Provider value={{ prefs, update }}>{children}</OnboardingContext.Provider>;
};

export const useOnboarding = () => useContext(OnboardingContext);
