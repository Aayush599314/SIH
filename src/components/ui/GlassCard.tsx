import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  raised?: boolean;
  padded?: boolean;
}

export function GlassCard({
  children,
  raised = false,
  padded = true,
  className,
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border",
        raised ? "glass-panel-raised" : "glass-panel",
        padded && "p-5",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
