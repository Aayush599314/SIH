import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, ArrowRight, AlertCircle } from "lucide-react";
import { AuthLayout } from "@/layouts/AuthLayout";
import { PasswordField } from "@/components/auth/PasswordField";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { useAuth } from "@/hooks/useAuth";

export function LoginPage() {
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const redirectTo = (location.state as { from?: Location })?.from?.pathname ?? "/dashboard";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ email, password, rememberMe });
      // Successful login always lands on the dashboard (or wherever the
      // visitor originally tried to go before being redirected to /login).
      navigate(redirectTo, { replace: true });
    } catch {
      // error state is already surfaced via the auth context
    }
  };

  return (
    <AuthLayout
      title="Sign in to AlgoMinds.AI"
      subtitle="Access your visualizer state, streaks, and AI assistant"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-lime-400 hover:underline">
            Create one for free
          </Link>
        </>
      }
    >
      {error && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-[var(--color-ink-dim)]">
            Email address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[var(--color-ink-faint)]" />
            <input
              id="email"
              type="email"
              required
              value={email}
              autoComplete="email"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                if (error) clearError();
              }}
              placeholder="student@university.edu"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-10 pr-3 text-sm text-[var(--color-ink)] placeholder-[var(--color-ink-faint)] outline-none transition focus:border-lime-400/50 focus:ring-1 focus:ring-lime-400/40"
            />
          </div>
        </div>

        <PasswordField
          id="password"
          label="Password"
          value={password}
          onChange={(v) => {
            setPassword(v);
            if (error) clearError();
          }}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between pt-1 text-xs">
          <label className="flex cursor-pointer items-center gap-2 text-[var(--color-ink-dim)]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-[var(--color-border)] bg-[var(--color-surface)] text-lime-400 focus:ring-lime-400"
            />
            Remember me
          </label>
          <a href="#" className="text-lime-400 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-lime-400 py-3.5 text-sm font-semibold text-[#06070a] transition hover:brightness-110 disabled:opacity-60"
        >
          {isLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#06070a] border-t-transparent" />
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--color-border)]" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[var(--color-surface)] px-3 font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-faint)]">
            Or continue with
          </span>
        </div>
      </div>

      <SocialAuthButtons />
    </AuthLayout>
  );
}
