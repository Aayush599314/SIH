import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function CTASection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-lime-400/25 bg-[var(--color-surface)] p-12 text-center sm:p-16">
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-lime-400/20 blur-[100px]" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-cyan-400/15 blur-[100px]" />

        <h2 className="relative text-3xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl">
          Start your DSA journey today
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-[15px] text-[var(--color-ink-dim)]">
          Join thousands of developers learning data structures the visual way — step-by-step,
          with AI guidance the whole time.
        </p>

        <div className="relative mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to={isAuthenticated ? "/dashboard" : "/register"}
            className="rounded-full bg-lime-400 px-8 py-3.5 text-sm font-bold text-[#06070a] shadow-xl transition hover:brightness-110"
          >
            {isAuthenticated ? "Open dashboard" : "Get started free"}
          </Link>
          {!isAuthenticated && (
            <Link
              to="/login"
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-8 py-3.5 text-sm font-semibold text-[var(--color-ink)] transition hover:border-lime-400/40"
            >
              I already have an account
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
