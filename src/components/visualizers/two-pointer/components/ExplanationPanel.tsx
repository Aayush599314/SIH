import type { Step } from '../types';
import { Lightbulb, Info } from 'lucide-react';

export function ExplanationPanel({ step, stepIndex, total }: { step: Step; stepIndex: number; total: number }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Step Explanation
        </h3>
        <span className="ml-auto text-xs font-mono text-slate-500">
          Step {stepIndex + 1} / {total}
        </span>
      </div>
      <div className="mb-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/30 text-sky-300 text-sm font-medium">
          {step.action}
        </div>
      </div>
      {step.comparison && (
        <div className="mb-3 font-mono text-sm text-amber-300/90 bg-amber-500/5 border border-amber-500/20 rounded-lg px-3 py-2">
          {step.comparison}
        </div>
      )}
      <p className="text-sm text-slate-300 leading-relaxed">{step.explanation}</p>
      {step.result !== undefined && step.result !== null && (
        <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-sm text-emerald-300 font-medium">
            Result: {String(step.result)}
          </span>
        </div>
      )}
    </div>
  );
}
