import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: ReactNode;
  requireProfile?: boolean;
}

export default function AuthGuard({ children, requireProfile = true }: Props) {
  const { session, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pass-muted text-sm">
        Loading…
      </div>
    );
  }

  if (!session) return <Navigate to="/" replace />;

  if (requireProfile && (!profile?.chef_name || !profile?.cooking_style) && location.pathname !== "/profile-setup") {
    return <Navigate to="/profile-setup" replace />;
  }

  return <>{children}</>;
}
