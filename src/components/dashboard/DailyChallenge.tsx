import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import { DAILY_CHALLENGE } from "@/data/mockData";
import { useDashboard } from "@/context/DashboardContext";

export function DailyChallenge() {
  const navigate = useNavigate();
  const { setSelectedVisualizer } = useDashboard();

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-orange-400/25 bg-gradient-to-b from-orange-400/[0.08] to-[var(--color-surface)] p-5">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-400/15 blur-3xl" />

      <div className="relative mb-4 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-orange-400/30 bg-orange-400/10 text-orange-400">
          <Zap className="h-3.5 w-3.5" strokeWidth={2.25} />
        </span>
        <p className="font-mono text-[11px] font-semibold tracking-[0.12em] text-orange-300/80">
          DAILY CHALLENGE
        </p>
      </div>

      <h3 className="relative text-[19px] font-semibold text-[var(--color-ink)]">
        {DAILY_CHALLENGE.title}
      </h3>
      <p className="relative mt-2 flex-1 text-[13.5px] leading-relaxed text-[var(--color-ink-dim)]">
        {DAILY_CHALLENGE.prompt}
      </p>

      <button
        type="button"
        onClick={() => {
          if (DAILY_CHALLENGE.visualizer === "hashmap") {
            window.open("/visualizer/hashmap", "_blank", "noopener,noreferrer");
          } else if (DAILY_CHALLENGE.visualizer === "linked-list") {
            window.open("/visualizer/linked-list", "_blank", "noopener,noreferrer");
          } else {
            setSelectedVisualizer(DAILY_CHALLENGE.visualizer);
            navigate(`/playground/${DAILY_CHALLENGE.visualizer}`);
          }
        }}
        className="relative mt-4 inline-flex w-fit items-center gap-1.5 rounded-lg bg-orange-400 px-3.5 py-2 text-[12.5px] font-semibold text-[#1a0f05] transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {DAILY_CHALLENGE.cta}
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
