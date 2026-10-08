import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuthContextValue, AuthUser, LoginCredentials, RegisterCredentials } from "@/types";

const STORAGE_KEY = "algominds.auth.user";

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function persistUser(user: AuthUser | null) {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable (private mode, SSR, etc.) — fail silently.
  }
}

// Simulates network latency for the mock auth calls below, so the UI's
// loading states are exercised the same way they would be against a real API.
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    persistUser(user);
  }, [user]);

  const login = useCallback(async ({ email, password }: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!email || !password) {
        throw new Error("Enter your email and password to continue.");
      }
      await delay(700);
      // Mock authentication — any well-formed credentials succeed.
      const name = email.split("@")[0].replace(/[._-]/g, " ") || "Learner";
      setUser({
        id: crypto.randomUUID(),
        name: name.replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in. Try again.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async ({ name, email, password }: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!name || !email || !password) {
        throw new Error("Fill in every field to create your account.");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }
      await delay(800);
      setUser({ id: crypto.randomUUID(), name, email });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create your account. Try again.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      error,
      login,
      register,
      logout,
      clearError,
    }),
    [user, isLoading, error, login, register, logout, clearError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within an AuthProvider");
  return ctx;
}
