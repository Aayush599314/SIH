import type { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ControlButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: "lime" | "cyan" | "orange" | "violet" | "neutral";
}

const TONE_MAP = {
  lime: "border-lime-400/30 bg-lime-400/10 text-lime-300 hover:bg-lime-400/20",
  cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/20",
  orange: "border-orange-400/30 bg-orange-400/10 text-orange-300 hover:bg-orange-400/20",
  violet: "border-violet-400/30 bg-violet-400/10 text-violet-200 hover:bg-violet-400/20",
  neutral:
    "border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-ink)] hover:border-[var(--color-ink-faint)]",
} as const;

export function ControlButton({ tone = "neutral", className, children, ...rest }: ControlButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12.5px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        TONE_MAP[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ControlInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-20 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 font-mono text-[12.5px] text-[var(--color-ink)] outline-none focus:border-lime-400/40",
        props.className,
      )}
    />
  );
}
