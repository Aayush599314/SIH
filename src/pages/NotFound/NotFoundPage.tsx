import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[var(--color-void)] text-center text-[var(--color-ink)]">
      <p className="font-mono text-[12px] tracking-[0.14em] text-lime-400">404</p>
      <h1 className="text-2xl font-semibold">This page doesn't exist.</h1>
      <Link to="/dashboard" className="mt-2 text-[13.5px] text-lime-400 hover:underline">
        Back to dashboard →
      </Link>
    </div>
  );
}
