import { ReactNode } from "react";

// Auth temporarily disabled for design review. All routes pass through.
export default function AuthGuard({ children }: { children: ReactNode; requireProfile?: boolean }) {
  return <>{children}</>;
}
