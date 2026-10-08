import { useDashboard } from "@/context/DashboardContext";
import { VISUALIZER_MAP } from "@/data/visualizers";

function getGreeting(hour: number) {
  if (hour < 5) return "Burning the midnight oil,";
  if (hour < 12) return "Good morning,";
  if (hour < 18) return "Good afternoon,";
  return "Good evening,";
}

const USER_NAME = "Aayush";

export function PlaygroundHero() {
  const { selectedVisualizer } = useDashboard();
  const meta = VISUALIZER_MAP[selectedVisualizer];
  const greeting = getGreeting(new Date().getHours());

  return (
    <div className="mb-5">
      <p className="mb-2 font-mono text-[11px] font-medium tracking-[0.14em] text-lime-400">
        {meta.number} / {meta.shortLabel}
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-[28px]">
        {greeting} <span className="text-glow-lime text-lime-400">{USER_NAME}</span>.
      </h1>
      <p className="mt-1.5 text-[14px] text-[var(--color-ink-dim)]">
        Make algorithms visible. Make them click.
      </p>
    </div>
  );
}
