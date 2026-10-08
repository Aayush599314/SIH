import { Link } from "react-router-dom";
import { ArrowLeft, Brain } from "lucide-react";
import { DynamicProgrammingVisualizer } from "@/components/visualizers/dynamic-programming";

export function DynamicProgrammingVisualizerPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-[#c9d1d9] flex flex-col">
      {/* Dedicated top navigation bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-abyss)]/90 px-5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 text-[12px] font-medium text-[var(--color-ink-dim)] transition-colors hover:border-cyan-400/40 hover:text-cyan-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>

          <div className="h-4 w-px bg-[var(--color-border)]" />

          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-400/10 text-cyan-400">
              <Brain className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
            <span className="font-mono text-[13px] font-semibold tracking-tight text-[var(--color-ink)]">
              AlgoMinds<span className="text-cyan-400">.AI</span>
            </span>
            <span className="font-mono text-[11px] font-medium tracking-wide text-[var(--color-ink-faint)]">
              / DYNAMIC PROGRAMMING
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-cyan-400">
            DEDICATED PLAYGROUND
          </span>
        </div>
      </header>

      {/* Main visualizer workspace with full space */}
      <main className="flex-1 w-full overflow-y-auto">
        <DynamicProgrammingVisualizer />
      </main>
    </div>
  );
}

export default DynamicProgrammingVisualizerPage;
