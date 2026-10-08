import { motion, AnimatePresence } from 'framer-motion';
import type { VisualizationStep } from '../types';

interface VariablePanelProps {
  step: VisualizationStep;
}

export function VariablePanel({ step }: VariablePanelProps) {
  const variables = [
    { label: 'low', value: step.low, color: 'emerald' },
    { label: 'mid', value: step.mid === -1 ? '—' : step.mid, color: 'amber' },
    { label: 'high', value: step.high, color: 'purple' },
  ];

  const colorMap: Record<string, string> = {
    emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    amber: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    purple: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-3">
        {variables.map((v) => (
          <div
            key={v.label}
            className={`rounded-xl border p-3 ${colorMap[v.color]}`}
          >
            <div className="text-xs font-mono uppercase tracking-wide opacity-80">{v.label}</div>
            <motion.div
              key={String(v.value)}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="font-mono text-2xl font-bold"
            >
              {v.value}
            </motion.div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <div className="text-xs font-mono uppercase tracking-wide text-slate-400">target</div>
          <div className="font-mono text-xl font-bold text-slate-100">{step.target}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <div className="text-xs font-mono uppercase tracking-wide text-slate-400">comparisons</div>
          <div className="font-mono text-xl font-bold text-slate-100">{step.comparisons ?? 0}</div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step.condition && (
          <motion.div
            key={step.condition}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3"
          >
            <div className="text-xs font-mono font-semibold uppercase tracking-wide text-blue-400 mb-1">Current Condition</div>
            <div className="font-mono text-sm text-slate-200">{step.condition}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step.action && (
          <motion.div
            key={step.action}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-3"
          >
            <div className="text-xs font-mono font-semibold uppercase tracking-wide text-purple-400 mb-1">Action</div>
            <div className="font-mono text-sm text-slate-200">{step.action}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
