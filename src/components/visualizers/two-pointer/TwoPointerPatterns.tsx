import { problemsByPattern, allPatterns } from './data/registry';
import type { Pattern, TwoPointerProblem } from './types';
import { ArrowRight, Zap } from 'lucide-react';

interface TwoPointerPatternsProps {
  onSelectProblem: (id: number) => void;
}

const patternMeta: Record<Pattern, { icon: string; color: string; desc: string }> = {
  'Opposite Direction': {
    icon: '⇄',
    color: 'sky',
    desc: 'Pointers start at both ends and move inward. Ideal for sorted arrays, palindromes, and container problems.',
  },
  'Fast & Slow': {
    icon: '⚡',
    color: 'violet',
    desc: 'Both pointers move in the same direction at different speeds. Perfect for in-place filtering and deduplication.',
  },
  'Linked List': {
    icon: '⛓️',
    color: 'emerald',
    desc: "Floyd's Tortoise and Hare technique. Detect cycles, find midpoints, and remove nth-from-end nodes.",
  },
  Partition: {
    icon: '▦',
    color: 'amber',
    desc: 'Rearrange elements into regions. The Dutch National Flag approach maintains ordered partitions.',
  },
  String: {
    icon: '🔤',
    color: 'rose',
    desc: 'Character-level two-pointer comparisons. Palindromes, reversals, and subsequence checks.',
  },
  'Sorting + Two Pointers': {
    icon: '🔢',
    color: 'cyan',
    desc: 'Sort first, then fix one element and use two pointers on the rest. Powers 3Sum, 4Sum, and closest variants.',
  },
};

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  sky: { bg: 'bg-sky-500/10', border: 'border-sky-500/30', text: 'text-sky-300', badge: 'bg-sky-500/15 text-sky-300' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-300', badge: 'bg-violet-500/15 text-violet-300' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-300', badge: 'bg-emerald-500/15 text-emerald-300' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-300', badge: 'bg-amber-500/15 text-amber-300' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-300', badge: 'bg-rose-500/15 text-rose-300' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-300', badge: 'bg-cyan-500/15 text-cyan-300' },
};

export function TwoPointerPatterns({ onSelectProblem }: TwoPointerPatternsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Two-Pointer Patterns</h2>
        <p className="text-slate-400">Learn to recognize the six core Two-Pointer patterns used in technical interviews.</p>
      </div>

      <div className="space-y-4">
        {allPatterns.map((pattern, idx) => {
          const meta = patternMeta[pattern];
          const colors = colorMap[meta.color];
          const probs = problemsByPattern[pattern] ?? [];
          return (
            <div key={pattern} className={`rounded-xl border p-5 ${colors.border} ${colors.bg}`}>
              <div className="flex items-start gap-4">
                <div className="text-3xl shrink-0">{meta.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-slate-500">Pattern {idx + 1}</span>
                    <h3 className="text-lg font-semibold text-white">{pattern}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}>
                      {probs.length} problem{probs.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">{meta.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {probs.map((p: TwoPointerProblem) => (
                      <button
                        key={p.metadata.id}
                        onClick={() => onSelectProblem(p.metadata.id)}
                        className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-700 text-sm text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <Zap className="w-3 h-3 text-slate-500 group-hover:text-sky-400 transition-colors" />
                        {p.metadata.title}
                        <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-sky-400 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
