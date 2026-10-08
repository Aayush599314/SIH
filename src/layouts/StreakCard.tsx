import { Flame } from "lucide-react";
import { STREAK } from "@/data/mockData";

export function StreakCard() {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5">
      <div className="mb-2.5 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-400/10 text-orange-400">
          <Flame className="h-3.5 w-3.5" strokeWidth={2.25} />
        </span>
        <p className="font-mono text-[10px] font-semibold tracking-[0.12em] text-[var(--color-ink-faint)]">
          YOUR STREAK
        </p>
      </div>

      <p className="mb-2.5 text-[13px] text-[var(--color-ink)]">
        <span className="font-mono text-lg font-semibold text-[var(--color-ink)]">{STREAK.days}</span>{" "}
        <span className="text-[var(--color-ink-dim)]">days in a row</span>
      </p>

      <div className="mb-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-surface-3)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-lime-500 to-lime-400"
          style={{ width: `${STREAK.weeklyGoalPct}%` }}
        />
      </div>
      <p className="font-mono text-[10px] text-[var(--color-ink-faint)]">
        {STREAK.weeklyGoalPct}% weekly goal
      </p>
    </div>
  );
}
