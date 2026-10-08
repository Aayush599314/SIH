export type Accent = "lime" | "cyan" | "orange" | "violet";

// Centralized accent → Tailwind class lookups. Tailwind v4 needs full class
// strings to appear statically in source for the scanner to pick them up,
// so this stays a plain object rather than string interpolation.
export const ACCENT = {
  lime: {
    text: "text-lime-400",
    bg: "bg-lime-400",
    bgSoft: "bg-lime-400/10",
    border: "border-lime-400/30",
    ring: "ring-lime-400/30",
    glow: "shadow-[0_0_24px_rgba(182,255,60,0.25)]",
    dot: "bg-[var(--color-lime)]",
  },
  cyan: {
    text: "text-cyan-300",
    bg: "bg-cyan-400",
    bgSoft: "bg-cyan-400/10",
    border: "border-cyan-400/30",
    ring: "ring-cyan-400/30",
    glow: "shadow-[0_0_24px_rgba(79,209,255,0.22)]",
    dot: "bg-[var(--color-cyan)]",
  },
  orange: {
    text: "text-orange-400",
    bg: "bg-orange-400",
    bgSoft: "bg-orange-400/10",
    border: "border-orange-400/30",
    ring: "ring-orange-400/30",
    glow: "shadow-[0_0_24px_rgba(255,138,61,0.22)]",
    dot: "bg-[var(--color-orange)]",
  },
  violet: {
    text: "text-violet-300",
    bg: "bg-violet-400",
    bgSoft: "bg-violet-400/10",
    border: "border-violet-400/30",
    ring: "ring-violet-400/30",
    glow: "shadow-[0_0_24px_rgba(167,139,250,0.22)]",
    dot: "bg-[var(--color-violet)]",
  },
} as const satisfies Record<Accent, Record<string, string>>;
