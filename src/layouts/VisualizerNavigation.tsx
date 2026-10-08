import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { VISUALIZERS } from "@/data/visualizers";
import { useDashboard } from "@/context/DashboardContext";
import { cn } from "@/lib/cn";

export function VisualizerNavigation() {
  const { selectedVisualizer, setSelectedVisualizer } = useDashboard();

  return (
    <nav aria-label="Data structure playground navigation" className="flex flex-col gap-4">
      <p className="px-2 font-mono text-[11px] font-semibold tracking-[0.14em] text-[var(--color-ink-faint)]">
        DATA STRUCTURES
      </p>

      <ul className="flex flex-col gap-1">
        {VISUALIZERS.map((v) => {
          const isDedicated =
            v.id === "array" ||
            v.id === "hashmap" ||
            v.id === "linked-list" ||
            v.id === "dynamic-programming" ||
            v.id === "binary-search" ||
            v.id === "two-pointer";
          const dedicatedUrl =
            v.id === "array"
              ? "/visualizer/array"
              : v.id === "hashmap"
              ? "/visualizer/hashmap"
              : v.id === "dynamic-programming"
              ? "/visualizer/dynamic-programming"
              : v.id === "binary-search"
              ? "/visualizer/binary-search"
              : v.id === "two-pointer"
              ? "/visualizer/two-pointer"
              : "/visualizer/linked-list";
          const active = v.id === selectedVisualizer;

          if (isDedicated) {
            return (
              <li key={v.id} className="relative">
                <Link
                  to={dedicatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group relative flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-150",
                    "border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-surface-2)]/60",
                  )}
                >
                  <span className="font-mono text-[11px] tabular-nums text-[var(--color-ink-faint)] group-hover:text-[var(--color-ink-dim)]">
                    {v.number}
                  </span>
                  <span className="text-[13px] font-medium text-[var(--color-ink-dim)] group-hover:text-[var(--color-ink)]">
                    {v.name}
                  </span>
                </Link>
              </li>
            );
          }

          return (
            <li key={v.id} className="relative">
              <button
                type="button"
                onClick={() => setSelectedVisualizer(v.id)}
                aria-current={active}
                className={cn(
                  "group relative flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-150",
                  active
                    ? "border-lime-400/35 bg-lime-400/[0.07] ring-glow-lime"
                    : "border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-surface-2)]/60",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active-bar"
                    className="absolute -left-px top-1.5 bottom-1.5 w-[3px] rounded-full bg-lime-400"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span
                  className={cn(
                    "font-mono text-[11px] tabular-nums",
                    active ? "text-lime-400" : "text-[var(--color-ink-faint)] group-hover:text-[var(--color-ink-dim)]",
                  )}
                >
                  {v.number}
                </span>
                <span
                  className={cn(
                    "text-[13px] font-medium",
                    active ? "text-[var(--color-ink)]" : "text-[var(--color-ink-dim)] group-hover:text-[var(--color-ink)]",
                  )}
                >
                  {v.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

