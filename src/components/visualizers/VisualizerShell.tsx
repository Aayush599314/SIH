import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { VisualizerMeta } from "@/types";

interface Props {
  meta: VisualizerMeta;
  controls?: ReactNode;
  children: ReactNode;
  sidebar?: ReactNode;
}

export function VisualizerShell({ meta, controls, children, sidebar }: Props) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              to="/dashboard"
              className="mb-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[var(--color-ink-dim)] hover:text-lime-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to dashboard
            </Link>
            <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-lime-400">
              {meta.number} / {meta.shortLabel}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
              {meta.name} Playground
            </h1>
            <p className="mt-1 text-[13.5px] text-[var(--color-ink-dim)]">{meta.description}</p>
          </div>
          {controls && (
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
              {controls}
            </div>
          )}
        </div>

        <div className={sidebar ? "grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px]" : ""}>
          <div className="min-h-[420px] rounded-2xl border border-[var(--color-border)] glass-panel bg-grid p-6 sm:p-8">
            {children}
          </div>
          {sidebar && <div className="flex flex-col gap-4">{sidebar}</div>}
        </div>
      </div>
    </div>
  );
}
