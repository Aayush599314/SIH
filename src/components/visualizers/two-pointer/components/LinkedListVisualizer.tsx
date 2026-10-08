import type { Step } from '../types';

export function LinkedListVisualizer({ step }: { step: Step }) {
  const nodes = step.linkedList ?? [];
  if (nodes.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-2 py-6 overflow-x-auto">
      <div className="flex items-center gap-1 min-w-max px-4">
        {nodes.map((node, i) => {
          const hl = step.highlights?.[i];
          const pointers = step.pointers.filter((p) => p.index === i);
          const colorClass =
            hl === 'active'
              ? 'border-sky-400 bg-sky-500/20 text-sky-100'
              : hl === 'compare'
                ? 'border-amber-400 bg-amber-500/20 text-amber-100'
                : hl === 'success'
                  ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                  : 'border-slate-700 bg-slate-800/50 text-slate-200';

          return (
            <div key={i} className="flex items-center gap-1">
              <div className="flex flex-col items-center gap-1">
                <div className="h-6 flex flex-col items-center justify-end">
                  {pointers.map((p, pi) => (
                    <div key={pi} className="text-xs font-bold" style={{ color: getPointerColor(p.color) }}>
                      {p.name}
                    </div>
                  ))}
                </div>
                <div className={`min-w-[3rem] h-12 flex items-center justify-center rounded-lg border-2 font-mono text-lg font-semibold transition-all duration-300 ${colorClass}`}>
                  {node.value}
                </div>
                <div className="text-xs text-slate-500 font-mono">[{i}]</div>
              </div>
              {i < nodes.length - 1 && (
                <Arrow cycle={node.next < i} />
              )}
            </div>
          );
        })}
        <div className="flex flex-col items-center justify-center ml-1">
          <div className="h-6" />
          <div className="text-slate-600 font-mono text-sm px-2">null</div>
        </div>
      </div>
    </div>
  );
}

function getPointerColor(color: string): string {
  const map: Record<string, string> = {
    sky: '#38bdf8',
    rose: '#fb7185',
    amber: '#fbbf24',
    violet: '#a78bfa',
  };
  return map[color] || '#38bdf8';
}

function Arrow({ cycle }: { cycle: boolean }) {
  return (
    <div className={`flex items-center ${cycle ? 'text-amber-400' : 'text-slate-500'}`}>
      {cycle ? (
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M0 10 L18 10 M14 6 L18 10 L14 14" />
          <path d="M12 10 Q12 2 4 2" strokeDasharray="2 2" fill="none" />
        </svg>
      ) : (
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M0 10 L18 10 M14 6 L18 10 L14 14" />
        </svg>
      )}
    </div>
  );
}
