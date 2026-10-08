import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Search } from 'lucide-react';
import type { VisualizationStep } from '../types';

interface ExplanationPanelProps {
  step: VisualizationStep;
  stepIndex: number;
  totalSteps: number;
}

export function ExplanationPanel({ step, stepIndex, totalSteps }: ExplanationPanelProps) {
  const resultConfig = {
    found: {
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      label: 'Target Found',
    },
    'not-found': {
      icon: <XCircle className="h-4 w-4 text-rose-400" />,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/30',
      label: 'Not Found',
    },
    'in-progress': {
      icon: <Search className="h-4 w-4 text-blue-400" />,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/30',
      label: 'In Progress',
    },
    success: {
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      label: 'Completed',
    },
  };

  const rc = resultConfig[step.result || 'in-progress'] || resultConfig['in-progress'];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">Step Explanation</span>
        <span className="text-xs font-mono text-slate-500">
          Step {stepIndex + 1} / {totalSteps}
        </span>
      </div>

      <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${rc.bg}`}>
        {rc.icon}
        <span className={`text-xs font-mono font-semibold ${rc.color}`}>{rc.label}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
        >
          <p className="text-sm leading-relaxed text-slate-200">
            {step.explanation}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
