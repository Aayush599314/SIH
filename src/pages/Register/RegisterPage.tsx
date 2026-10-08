import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User, ArrowRight, AlertCircle } from "lucide-react";
import { AuthLayout } from "@/layouts/AuthLayout";
import { PasswordField } from "@/components/auth/PasswordField";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { useAuth } from "@/hooks/useAuth";

export function RegisterPage() {
  const { register, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (password !== confirmPassword) {
      setFormError("Passwords don't match.");
      return;
    }

    try {
      await register({ name, email, password });
      // A brand-new account is signed in immediately and dropped onto the dashboard.
      navigate("/dashboard", { replace: true });
    } catch {
      // error state is already surfaced via the auth context
    }
  };

  const displayError = formError ?? error;

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join AlgoMinds.AI and start visualizing DSA today"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-lime-400 hover:underline">
            Sign in instead
          </Link>
        </>
      }
    >
      {displayError && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {displayError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-[var(--color-ink-dim)]">
            Full name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[var(--color-ink-faint)]" />
            <input
              id="name"
              type="text"
              required
              value={name}
              autoComplete="name"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
                if (displayError) {
                  setFormError(null);
                  clearError();
                }
              }}
              placeholder="Ada Lovelace"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-10 pr-3 text-sm text-[var(--color-ink)] placeholder-[var(--color-ink-faint)] outline-none transition focus:border-lime-400/50 focus:ring-1 focus:ring-lime-400/40"
            />
          </div>
        </div>

        <div>
          <label htmlFor="reg-email" className="mb-1.5 block text-xs font-medium text-[var(--color-ink-dim)]">
            Email address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[var(--color-ink-faint)]" />
            <input
              id="reg-email"
              type="email"
              required
              value={email}
              autoComplete="email"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                if (displayError) {
                  setFormError(null);
                  clearError();
                }
              }}
              placeholder="student@university.edu"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-10 pr-3 text-sm text-[var(--color-ink)] placeholder-[var(--color-ink-faint)] outline-none transition focus:border-lime-400/50 focus:ring-1 focus:ring-lime-400/40"
            />
          </div>
        </div>

        <PasswordField
          id="reg-password"
          label="Password"
          value={password}
          onChange={(v) => {
            setPassword(v);
            if (displayError) {
              setFormError(null);
              clearError();
            }
          }}
          autoComplete="new-password"
        />

        <PasswordField
          id="confirm-password"
          label="Confirm password"
          value={confirmPassword}
          onChange={(v) => {
            setConfirmPassword(v);
            if (displayError) {
              setFormError(null);
              clearError();
            }
          }}
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-lime-400 py-3.5 text-sm font-semibold text-[#06070a] transition hover:brightness-110 disabled:opacity-60"
        >
          {isLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#06070a] border-t-transparent" />
          ) : (
            <>
              <span>Create Account</span>
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
