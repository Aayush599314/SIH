import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

/**
 * Wraps routes that require an authenticated session (the dashboard and
 * everything nested under it). Unauthenticated visitors are bounced to
 * /login, and the page they were trying to reach is preserved so we can
 * send them back after they sign in.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
