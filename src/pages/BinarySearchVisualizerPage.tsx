import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { BinarySearchVisualizer } from "@/components/visualizers/binary-search/BinarySearchVisualizer";

export function BinarySearchVisualizerPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-[#c9d1d9] flex flex-col">
      {/* Dedicated top navigation bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-[#07090e]/95 px-5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[12px] font-medium text-slate-300 transition-colors hover:border-blue-400/40 hover:text-blue-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>

          <div className="h-4 w-px bg-white/10" />

          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-blue-400/30 bg-blue-500/10 text-blue-400">
              <Search className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
            <span className="font-mono text-[13px] font-semibold tracking-tight text-white">
              AlgoMinds<span className="text-blue-400">.AI</span>
            </span>
            <span className="font-mono text-[11px] font-medium tracking-wide text-slate-500">
              / BINARY SEARCH
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-blue-400/30 bg-blue-500/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-blue-400">
            DEDICATED PLAYGROUND
          </span>
        </div>
      </header>

      {/* Main visualizer workspace */}
      <main className="flex-1 w-full overflow-y-auto">
        <BinarySearchVisualizer />
      </main>
    </div>
  );
}

export default BinarySearchVisualizerPage;
