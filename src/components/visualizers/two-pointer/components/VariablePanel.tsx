import type { Step } from '../types';

export function VariablePanel({ step }: { step: Step }) {
  const entries = Object.entries(step.values);
  if (entries.length === 0) return null;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Live Variables
      </h3>
      <div className="space-y-1.5">
        {entries.map(([key, value]) => (
          <div key={key} className="flex items-center justify-between font-mono text-sm">
            <span className="text-slate-400">{key}</span>
            <span className="text-slate-100 font-semibold">
              {value === null ? 'null' : String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
