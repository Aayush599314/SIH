import { VisualizerNavigation } from "./VisualizerNavigation";
import { StreakCard } from "./StreakCard";

export function Sidebar() {
  return (
    <aside className="flex h-full w-[248px] shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-abyss)]">
      <div className="flex-1 overflow-y-auto px-3 py-5 scrollbar-none">
        <VisualizerNavigation />
      </div>
      <div className="border-t border-[var(--color-border)] p-3">
        <StreakCard />
      </div>
    </aside>
  );
}
