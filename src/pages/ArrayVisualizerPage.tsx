import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ArrayVisualizer } from "@/components/visualizers/array";

export function ArrayVisualizerPage() {
  const [light, setLight] = useState(false);

  return (
    <div className={`arrayscope-root ${light ? "light" : ""} min-h-screen bg-[var(--background)] flex flex-col`}>
      {/* Dedicated top navigation bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--panel)]/90 px-5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-glass)] px-2.5 py-1.5 text-[12px] font-medium text-[var(--mist)] transition-colors hover:border-[var(--aurora)] hover:text-[var(--frost)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>

          <div className="h-4 w-px bg-[var(--border)]" />

          <div className="flex items-center gap-2.5">
            <div className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-[var(--aurora)]/25 to-[var(--aurora3)]/25 ring-1 ring-[var(--border)]">
              <span className="font-mono text-xs font-semibold text-[var(--aurora)]">A:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[13px] font-semibold tracking-tight text-[var(--frost)]">
                AlgoMinds<span className="text-[var(--aurora)]">.AI</span>
              </span>
              <span className="font-mono text-[11px] font-medium tracking-wide text-[var(--mist)]">
                / 01 ARRAYS
              </span>
              <span className="hidden sm:inline-block rounded border border-[var(--aurora2)]/30 bg-[var(--aurora2)]/10 px-1.5 py-0.5 font-mono text-[10px] text-[var(--aurora2)]">
                ArrayScope
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLight((v) => !v)}
            className="glass h-8 rounded-lg px-3 font-mono text-[11px] text-[var(--mist)] transition-colors hover:text-[var(--frost)]"
          >
            {light ? "Dark" : "Light"}
          </button>
          <span className="inline-flex items-center rounded-full border border-[var(--aurora)]/30 bg-[var(--aurora)]/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-[var(--aurora)]">
            DEDICATED PLAYGROUND
          </span>
        </div>
      </header>

      {/* Main visualizer workspace */}
      <main className="flex-1 w-full overflow-y-auto aurora-field">
        <ArrayVisualizer
          light={light}
          onToggleLight={() => setLight((v) => !v)}
          hideHeader={true}
        />
      </main>
    </div>
  );
}

export default ArrayVisualizerPage;
