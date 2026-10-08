import { Clock, Database, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Complexity } from '../types';

interface ComplexityCardProps {
  complexity: Complexity;
}

export function ComplexityCard({ complexity }: ComplexityCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">Time</span>
          </div>
          <div className="font-mono text-xl font-bold text-blue-400">{complexity.time}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Database className="h-4 w-4 text-purple-400" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">Space</span>
          </div>
          <div className="font-mono text-xl font-bold text-purple-400">{complexity.space}</div>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{complexity.description}</p>

      {/* Visual comparison: Linear vs Binary Search */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">Search Space Reduction</span>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Linear Search O(n)</span>
              <span className="font-mono text-rose-400">1000 steps</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Binary Search O(log n)</span>
              <span className="font-mono text-emerald-400">~10 steps</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '1%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
