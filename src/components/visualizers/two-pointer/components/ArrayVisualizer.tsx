import type { Step } from '../types';

const highlightColors: Record<string, string> = {
  active: 'border-sky-400 bg-sky-500/20 text-sky-100',
  compare: 'border-amber-400 bg-amber-500/20 text-amber-100',
  eliminated: 'border-gray-700 bg-gray-800/40 text-gray-500 opacity-50',
  success: 'border-emerald-400 bg-emerald-500/20 text-emerald-100',
  swap: 'border-violet-400 bg-violet-500/20 text-violet-100',
  result: 'border-rose-400 bg-rose-500/20 text-rose-100',
};

const pointerColors: Record<string, string> = {
  sky: 'text-sky-400',
  rose: 'text-rose-400',
  amber: 'text-amber-400',
  violet: 'text-violet-400',
};

export function ArrayVisualizer({ step }: { step: Step }) {
  const data = step.stringData ?? step.array.map(String);

  if (data.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-2 py-6">
      <div className="flex flex-wrap items-end justify-center gap-2">
        {data.map((val, i) => {
          const hl = step.highlights?.[i];
          const colorClass = hl ? highlightColors[hl] : 'border-slate-700 bg-slate-800/50 text-slate-200';
          const pointers = step.pointers.filter((p) => p.index === i);
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-6 flex flex-col items-center justify-end gap-0.5">
                {pointers.map((p, pi) => (
                  <div key={pi} className="flex flex-col items-center">
                    <div className={`text-xs font-bold ${pointerColors[p.color] || 'text-sky-400'}`}>
                      {p.name}
                    </div>
                    <ChevronDown className={`w-3 h-3 ${pointerColors[p.color] || 'text-sky-400'}`} />
                  </div>
                ))}
              </div>
              <div
                className={`min-w-[2.5rem] h-12 flex items-center justify-center rounded-lg border-2 font-mono text-lg font-semibold transition-all duration-300 ${colorClass}`}
              >
                {val}
              </div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">{i}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChevronDown({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
