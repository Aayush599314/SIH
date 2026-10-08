import { Link } from "react-router-dom";
import { Braces } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
];

export function LandingNavbar() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link to="/" className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-lime-400/25 bg-lime-400/10 text-lime-400">
          <Braces className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <span className="font-mono text-[13px] font-semibold tracking-tight text-[var(--color-ink)]">
          AlgoMinds<span className="text-lime-400">.AI</span>
        </span>
      </Link>

      <nav className="hidden items-center gap-1 md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[var(--color-ink-dim)] transition-colors hover:bg-[var(--color-surface-2)]/70 hover:text-[var(--color-ink)]"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="rounded-lg bg-lime-400 px-4 py-2 text-[13px] font-semibold text-[#06070a] transition hover:brightness-110"
          >
            Go to dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-ink)] transition-colors hover:border-lime-400/40"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-lime-400 px-3.5 py-1.5 text-[13px] font-semibold text-[#06070a] transition hover:brightness-110"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
