import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Upload } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { VisualizerPreview } from "@/components/visualizers/VisualizerPreview";
import { useDashboard } from "@/context/DashboardContext";
import { VISUALIZER_MAP } from "@/data/visualizers";

export function PlaygroundPreview() {
  const { selectedVisualizer, setAIInput, setAIMode } = useDashboard();
  const meta = VISUALIZER_MAP[selectedVisualizer];
  const navigate = useNavigate();
  const [importOpen, setImportOpen] = useState(false);
  const [code, setCode] = useState("");

  function handleImport() {
    if (!code.trim()) {
      setImportOpen((v) => !v);
      return;
    }
    setAIMode("explain");
    setAIInput(code);
    document.getElementById("ai-assistant")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setImportOpen(false);
  }

  return (
    <GlassCard raised padded={false} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl" />

      <div className="relative grid grid-cols-1 gap-6 p-6 sm:p-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        {/* Left: copy + actions */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.1em] text-[var(--color-ink-dim)]">
              INTERACTIVE PLAYGROUND
            </span>
            <h2 className="mt-4 text-[26px] font-semibold leading-[1.15] tracking-tight text-[var(--color-ink)] sm:text-[30px]">
              See the structure
              <br />
              come alive
            </h2>
            <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[var(--color-ink-dim)]">
              A visual sandbox for understanding data structures one operation at a time.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (meta.id === "array") {
                  window.open("/visualizer/array", "_blank", "noopener,noreferrer");
                } else if (meta.id === "hashmap") {
                  window.open("/visualizer/hashmap", "_blank", "noopener,noreferrer");
                } else if (meta.id === "linked-list") {
                  window.open("/visualizer/linked-list", "_blank", "noopener,noreferrer");
                } else if (meta.id === "dynamic-programming") {
                  window.open("/visualizer/dynamic-programming", "_blank", "noopener,noreferrer");
                } else if (meta.id === "binary-search") {
                  window.open("/visualizer/binary-search", "_blank", "noopener,noreferrer");
                } else if (meta.id === "two-pointer") {
                  window.open("/visualizer/two-pointer", "_blank", "noopener,noreferrer");
                } else {
                  navigate(`/playground/${meta.id}`);
                }
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-lime-400 px-4 py-2.5 text-[13px] font-semibold text-[#06070a] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="h-3.5 w-3.5" fill="currentColor" />
              Start
            </button>
            <button
              type="button"
              onClick={handleImport}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-2.5 text-[13px] font-medium text-[var(--color-ink)] transition-colors hover:border-cyan-400/30 hover:text-cyan-200"
            >
              <Upload className="h-3.5 w-3.5" />
              Import code
            </button>
          </div>

          {importOpen && (
            <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste C++ code to send to the AI assistant..."
                rows={4}
                className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] p-2.5 font-mono text-[12px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] outline-none focus:border-cyan-400/40"
              />
              <button
                type="button"
                onClick={handleImport}
                className="mt-2 rounded-lg bg-cyan-400/15 px-3 py-1.5 text-[12px] font-medium text-cyan-200 transition-colors hover:bg-cyan-400/25"
              >
                Send to AI Assistant →
              </button>
            </div>
          )}
        </div>

        {/* Right: live preview */}
        <div className="flex items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-abyss)]/60 p-6">
          <VisualizerPreview visualizer={selectedVisualizer} />
        </div>
      </div>
    </GlassCard>
  );
}
