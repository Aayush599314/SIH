import type { ProblemSummary } from '../types';
import { Play, BookOpen } from 'lucide-react';

interface ProblemCardProps {
  problem: ProblemSummary;
  onVisualize: () => void;
  onPractice?: () => void;
  solved?: boolean;
}

const difficultyColors: Record<string, string> = {
  Easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  Hard: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
};

const patternColors: Record<string, string> = {
  'Opposite Direction': 'text-sky-300 bg-sky-500/10',
  'Fast & Slow': 'text-violet-300 bg-violet-500/10',
  'Linked List': 'text-emerald-300 bg-emerald-500/10',
  Partition: 'text-amber-300 bg-amber-500/10',
  String: 'text-rose-300 bg-rose-500/10',
  'Sorting + Two Pointers': 'text-cyan-300 bg-cyan-500/10',
};

export function ProblemCard({ problem, onVisualize, onPractice, solved }: ProblemCardProps) {
  return (
    <div className="group bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-slate-900/50 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-slate-100 group-hover:text-white transition-colors">
            {problem.title}
          </h3>
          <div className="text-xs text-slate-500 font-mono mt-0.5">LeetCode #{problem.leetcode}</div>
        </div>
        {solved && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
            Solved
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${difficultyColors[problem.difficulty]}`}>
          {problem.difficulty}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${patternColors[problem.pattern] || 'text-slate-300 bg-slate-700/30'}`}>
          {problem.pattern}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full text-slate-400 bg-slate-800/50">
          {problem.dataStructure}
        </span>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {problem.companies.slice(0, 3).map((c) => (
          <span key={c} className="text-xs text-slate-500">
            {c}
          </span>
        )).reduce((acc: React.ReactNode[], el, i) => {
          if (i > 0) acc.push(<span key={`sep${i}`} className="text-slate-700">·</span>);
          acc.push(el);
          return acc;
        }, [])}
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={onVisualize}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/15 text-sky-300 hover:bg-sky-500/25 border border-sky-500/30 text-sm font-medium transition-colors"
        >
          <Play className="w-3.5 h-3.5" />
          Visualize
        </button>
        {onPractice && (
          <button
            onClick={onPractice}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-medium transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Practice
          </button>
        )}
      </div>
    </div>
  );
}
