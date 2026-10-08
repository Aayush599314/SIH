import type { Complexity } from '../types';
import { Clock, Database } from 'lucide-react';

export function ComplexityCard({ complexity }: { complexity: Complexity }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Complexity
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10">
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Time</div>
            <div className="font-mono text-sm font-semibold text-slate-100">{complexity.time}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-500/10">
            <Database className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Space</div>
            <div className="font-mono text-sm font-semibold text-slate-100">{complexity.space}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
