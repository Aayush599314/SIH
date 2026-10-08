import { Braces } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <Braces className="h-4 w-4 text-lime-400" />
          <span className="font-semibold tracking-tight text-[var(--color-ink)]">AlgoMinds.AI</span>
          <span className="ml-2 text-xs text-[var(--color-ink-faint)]">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-[var(--color-ink-dim)]">
          <a href="#features" className="transition hover:text-[var(--color-ink)]">
            Features
          </a>
          <a href="#about" className="transition hover:text-[var(--color-ink)]">
            About
          </a>
          <a href="#testimonials" className="transition hover:text-[var(--color-ink)]">
            Testimonials
          </a>
        </div>
      </div>
    </footer>
  );
}
