import { GlassCard } from "@/components/ui/GlassCard";
import { ACTIVITY_FEED } from "@/data/mockData";
import { ACCENT } from "@/lib/accent";

export function ActivityFeed() {
  return (
    <GlassCard className="flex h-full flex-col">
      <p className="mb-4 font-mono text-[11px] font-semibold tracking-[0.12em] text-[var(--color-ink-faint)]">
        ACTIVITY FEED
      </p>

      <ul className="flex flex-1 flex-col gap-3.5">
        {ACTIVITY_FEED.map((item) => {
          const accent = ACCENT[item.accent];
          return (
            <li key={item.id} className="flex items-start gap-2.5">
              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-[var(--color-ink)]">{item.title}</p>
                <p className="text-[11.5px] text-[var(--color-ink-dim)]">{item.detail}</p>
              </div>
              <span className="shrink-0 font-mono text-[10.5px] text-[var(--color-ink-faint)]">
                {item.time}
              </span>
            </li>
          );
        })}
      </ul>
    </GlassCard>
  );
}
