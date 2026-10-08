import { useAuthContext } from "@/context/AuthContext";

/**
 * Access the current authentication state and actions (login, register, logout).
 * Thin wrapper around AuthContext so pages/components import from `@/hooks`.
 */
export function useAuth() {
  return useAuthContext();
}
