import { TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { STATS } from "@/data/mockData";
import { ACCENT } from "@/lib/accent";

export function StatsPanel() {
  return (
    <div className="flex h-full flex-col gap-3">
      {STATS.map((stat) => {
        const accent = ACCENT[stat.accent];
        return (
          <GlassCard key={stat.id} padded={false} className="flex items-center justify-between gap-3 p-4">
            <div>
              <p className="font-mono text-xl font-semibold tracking-tight text-[var(--color-ink)]">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[11.5px] leading-tight text-[var(--color-ink-dim)]">{stat.label}</p>
            </div>
            <div
              className={`flex shrink-0 items-center gap-1 rounded-lg border px-2 py-1 font-mono text-[11px] font-medium ${accent.border} ${accent.bgSoft} ${accent.text}`}
            >
              <TrendingUp className="h-3 w-3" />
              {stat.delta}
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
