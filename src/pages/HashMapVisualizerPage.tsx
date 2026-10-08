import { Link } from "react-router-dom";
import { ArrowLeft, Braces } from "lucide-react";
import { HashMapVisualizer } from "@/components/visualizers/hashmap";

export function HashMapVisualizerPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#c9d1d9] flex flex-col">
      {/* Minimal dedicated top navigation bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-abyss)]/90 px-5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 text-[12px] font-medium text-[var(--color-ink-dim)] transition-colors hover:border-lime-400/40 hover:text-lime-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>

          <div className="h-4 w-px bg-[var(--color-border)]" />

          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-lime-400/25 bg-lime-400/10 text-lime-400">
              <Braces className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
            <span className="font-mono text-[13px] font-semibold tracking-tight text-[var(--color-ink)]">
              AlgoMinds<span className="text-lime-400">.AI</span>
            </span>
            <span className="font-mono text-[11px] font-medium tracking-wide text-[var(--color-ink-faint)]">
              / 05 HASH MAPS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-lime-400/30 bg-lime-400/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-lime-400">
            DEDICATED PLAYGROUND
          </span>
        </div>
      </header>

      {/* Main visualizer workspace */}
      <main className="flex flex-1 justify-center overflow-y-auto px-4 py-8 sm:px-6">
        <div className="flex w-full max-w-[960px] justify-center">
          <HashMapVisualizer />
        </div>
      </main>
    </div>
  );
}
