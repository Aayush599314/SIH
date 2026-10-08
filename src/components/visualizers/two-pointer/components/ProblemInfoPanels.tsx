import type { TwoPointerProblem } from '../types';
import { HelpCircle, AlertTriangle, Lightbulb, Sparkles } from 'lucide-react';

export function ProblemInfoPanels({ problem }: { problem: TwoPointerProblem }) {
  const m = problem.metadata;
  return (
    <div className="space-y-4">
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-semibold text-slate-200">Why Does This Work?</h3>
        </div>
        <ul className="space-y-2">
          {m.whyItWorks.map((point, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-300 leading-relaxed">
              <span className="text-sky-400 shrink-0">→</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <h3 className="text-sm font-semibold text-slate-200">Common Mistakes</h3>
        </div>
        <ul className="space-y-2">
          {m.commonMistakes.map((point, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-300 leading-relaxed">
              <span className="text-rose-400 shrink-0">✕</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-slate-200">Hints</h3>
        </div>
        <ul className="space-y-2">
          {m.hints.map((hint, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-300 leading-relaxed">
              <span className="text-amber-400 shrink-0">{i + 1}.</span>
              {hint}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-4 h-4 text-violet-400" />
          <h3 className="text-sm font-semibold text-slate-200">Problem Description</h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{m.description}</p>
      </div>
    </div>
  );
}
