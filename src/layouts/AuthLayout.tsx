import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Braces } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

/**
 * Shared chrome for the Login and Register screens: ambient background,
 * a "back to home" link, the brand mark, and a centered glass card that
 * wraps whatever form the page passes in as children.
 */
export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-void)] px-4 py-12 text-[var(--color-ink)]">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" />
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-lime-400/[0.08] blur-[130px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/3 h-96 w-96 translate-x-1/2 rounded-full bg-cyan-400/[0.08] blur-[130px]" />

      <Link
        to="/"
        className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-dim)] backdrop-blur transition hover:text-[var(--color-ink)] sm:left-8 sm:top-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to home
      </Link>

      <div className="glass-panel-raised relative w-full max-w-md rounded-2xl border border-[var(--color-border)] p-8 shadow-2xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-lime-400/25 bg-lime-400/10 text-lime-400">
            <Braces className="h-6 w-6" strokeWidth={2.25} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">{title}</h1>
          <p className="mt-2 text-[13px] text-[var(--color-ink-dim)]">{subtitle}</p>
        </div>

        {children}

        {footer && <div className="mt-6 text-center text-[13px] text-[var(--color-ink-dim)]">{footer}</div>}
      </div>
    </div>
  );
}
