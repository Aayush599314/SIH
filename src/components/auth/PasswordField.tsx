import { useState } from "react";
import type { ChangeEvent } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
}

export function PasswordField({ id, label, value, onChange, placeholder, autoComplete }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-[var(--color-ink-dim)]">
        {label}
      </label>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[var(--color-ink-faint)]" />
        <input
          id={id}
          type={visible ? "text" : "password"}
          required
          value={value}
          autoComplete={autoComplete}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          placeholder={placeholder ?? "••••••••••••"}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-10 pr-11 text-sm text-[var(--color-ink)] placeholder-[var(--color-ink-faint)] outline-none transition focus:border-lime-400/50 focus:ring-1 focus:ring-lime-400/40"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3.5 top-3.5 text-[var(--color-ink-faint)] transition hover:text-[var(--color-ink-dim)]"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
