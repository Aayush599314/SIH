import { motion, AnimatePresence } from 'framer-motion';
import type { ArrayElementState } from '../types';

interface ArrayVisualizerProps {
  elements: ArrayElementState[];
  low: number;
  mid: number;
  high: number;
  result?: 'found' | 'not-found' | 'in-progress' | 'success';
}

const stateStyles: Record<string, { bg: string; border: string; text: string; shadow: string }> = {
  default: {
    bg: 'bg-slate-800/60',
    border: 'border-slate-700',
    text: 'text-slate-200',
    shadow: '',
  },
  'active-range': {
    bg: 'bg-blue-950/40',
    border: 'border-blue-500/50',
    text: 'text-blue-200',
    shadow: 'shadow-sm shadow-blue-500/20',
  },
  low: {
    bg: 'bg-emerald-950/50',
    border: 'border-emerald-500',
    text: 'text-emerald-300',
    shadow: 'shadow-md shadow-emerald-500/30 ring-1 ring-emerald-400/40',
  },
  mid: {
    bg: 'bg-amber-950/60',
    border: 'border-amber-400',
    text: 'text-amber-300',
    shadow: 'shadow-lg shadow-amber-500/40 ring-2 ring-amber-400/60',
  },
  high: {
    bg: 'bg-purple-950/50',
    border: 'border-purple-400',
    text: 'text-purple-300',
    shadow: 'shadow-md shadow-purple-500/30 ring-1 ring-purple-400/40',
  },
  target: {
    bg: 'bg-blue-900/50',
    border: 'border-blue-400',
    text: 'text-blue-300',
    shadow: 'shadow-md shadow-blue-500/30',
  },
  eliminated: {
    bg: 'bg-slate-900/40',
    border: 'border-slate-800',
    text: 'text-slate-600',
    shadow: 'opacity-35',
  },
  found: {
    bg: 'bg-emerald-500',
    border: 'border-emerald-400',
    text: 'text-slate-950',
    shadow: 'shadow-xl shadow-emerald-500/50 ring-4 ring-emerald-400/40 font-black',
  },
};

export function ArrayVisualizer({ elements, low, mid, high, result }: ArrayVisualizerProps) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-center gap-2 sm:gap-3 py-2">
        {elements.map((el, i) => {
          const style = stateStyles[el.state] || stateStyles.default;
          const isFoundResult = result === 'found';
          const showLowLabel = el.index === low && !isFoundResult;
          const showMidLabel = el.index === mid && mid !== -1 && !isFoundResult;
          const showHighLabel = el.index === high && !isFoundResult && high !== low;

          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-5 text-[10px] font-mono font-bold flex flex-col items-center justify-end gap-0.5">
                <AnimatePresence mode="wait">
                  {showLowLabel && (
                    <motion.span
                      key="low"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-emerald-400"
                    >
                      low
                    </motion.span>
                  )}
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  {showMidLabel && (
                    <motion.span
                      key="mid"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-amber-400"
                    >
                      mid
                    </motion.span>
                  )}
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  {showHighLabel && (
                    <motion.span
                      key="high"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-purple-400"
                    >
                      high
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl border-2 font-mono font-bold text-lg transition-all duration-300 ${style.bg} ${style.border} ${style.text} ${style.shadow}`}
              >
                {el.value}
                <span className="absolute -top-1 -right-1 rounded bg-black/40 px-1 text-[9px] font-mono font-normal text-slate-400">
                  {el.index}
                </span>
              </motion.div>

              <div className="h-5">
                {el.state === 'found' && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-[10px] font-mono font-bold text-emerald-400"
                  >
                    FOUND
                  </motion.span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded border-2 border-emerald-500 bg-emerald-500/20" />
          <span className="text-slate-400">low</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded border-2 border-amber-400 bg-amber-500/20" />
          <span className="text-slate-400">mid</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded border-2 border-purple-400 bg-purple-500/20" />
          <span className="text-slate-400">high</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded border-2 border-slate-700 bg-slate-800/40 opacity-40" />
          <span className="text-slate-400">eliminated</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded border-2 border-emerald-400 bg-emerald-500" />
          <span className="text-slate-400">found</span>
        </div>
      </div>
    </div>
  );
}
