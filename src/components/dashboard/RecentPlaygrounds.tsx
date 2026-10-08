import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GlassCard } from "@/components/ui/GlassCard";
import { RECENT_PLAYGROUNDS } from "@/data/mockData";
import { useDashboard } from "@/context/DashboardContext";

export function RecentPlaygrounds() {
  const navigate = useNavigate();
  const { setSelectedVisualizer } = useDashboard();

  return (
    <GlassCard className="flex h-full flex-col">
      <p className="mb-4 font-mono text-[11px] font-semibold tracking-[0.12em] text-[var(--color-ink-faint)]">
        RECENT PLAYGROUNDS
      </p>

      <div className="flex flex-1 flex-col gap-2.5">
        {RECENT_PLAYGROUNDS.map((rp) => (
          <button
            key={rp.id}
            type="button"
            onClick={() => {
              if (rp.visualizer === "array") {
                window.open("/visualizer/array", "_blank", "noopener,noreferrer");
              } else if (rp.visualizer === "hashmap") {
                window.open("/visualizer/hashmap", "_blank", "noopener,noreferrer");
              } else if (rp.visualizer === "linked-list") {
                window.open("/visualizer/linked-list", "_blank", "noopener,noreferrer");
              } else if (rp.visualizer === "dynamic-programming") {
                window.open("/visualizer/dynamic-programming", "_blank", "noopener,noreferrer");
              } else if (rp.visualizer === "binary-search") {
                window.open("/visualizer/binary-search", "_blank", "noopener,noreferrer");
              } else if (rp.visualizer === "two-pointer") {
                window.open("/visualizer/two-pointer", "_blank", "noopener,noreferrer");
              } else {
                setSelectedVisualizer(rp.visualizer);
                navigate(`/playground/${rp.visualizer}`);
              }
            }}
            className="group flex w-full items-center justify-between gap-3 rounded-xl border border-transparent p-2.5 text-left transition-colors hover:border-[var(--color-border)] hover:bg-[var(--color-surface-2)]/60"
          >
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-[var(--color-ink)]">{rp.title}</p>
              <p className="mt-0.5 truncate text-[11.5px] text-[var(--color-ink-dim)]">{rp.meta}</p>
              <div className="mt-1.5 flex gap-1">
                {rp.preview.map((val, i) => (
                  <span
                    key={i}
                    className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-ink-dim)]"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <ArrowRight className="h-3.5 w-3.5 text-[var(--color-ink-faint)] transition-transform group-hover:translate-x-0.5 group-hover:text-lime-400" />
              <span className="whitespace-nowrap font-mono text-[10px] text-[var(--color-ink-faint)]">
                {rp.lastOpened}
              </span>
            </div>
          </button>
        ))}
      </div>
    </GlassCard>
  );
}
