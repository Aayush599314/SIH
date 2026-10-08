import type { Step } from '../types';
import { Terminal } from 'lucide-react';

export function Inspector({ step }: { step: Step }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Terminal className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Visualization Inspector
        </h3>
      </div>
      <div className="space-y-2 font-mono text-xs">
        <div>
          <span className="text-slate-500">comparison:</span>{' '}
          <span className="text-amber-300">{step.comparison || '—'}</span>
        </div>
        <div>
          <span className="text-slate-500">action:</span>{' '}
          <span className="text-sky-300">{step.action}</span>
        </div>
        <div>
          <span className="text-slate-500">activeLine:</span>{' '}
          <span className="text-violet-300">{step.activeLine}</span>
        </div>
        <div>
          <span className="text-slate-500">pointers:</span>{' '}
          <span className="text-emerald-300">
            [{step.pointers.map((p) => `${p.name}=${p.index}`).join(', ')}]
          </span>
        </div>
        <div>
          <span className="text-slate-500">highlights:</span>{' '}
          <span className="text-rose-300">
            {step.highlights
              ? Object.entries(step.highlights).map(([k, v]) => `[${k}]=${v}`).join(', ')
              : 'none'}
          </span>
        </div>
        {step.done && (
          <div>
            <span className="text-slate-500">done:</span>{' '}
            <span className="text-emerald-400 font-bold">true</span>
          </div>
        )}
      </div>
    </div>
  );
}
