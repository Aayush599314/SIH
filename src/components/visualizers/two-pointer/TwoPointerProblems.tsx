import { useState, useMemo } from 'react';
import { problemSummaries, allPatterns, allCompanies } from './data/registry';
import type { Difficulty, Pattern } from './types';
import { ProblemCard } from './components/ProblemCard';
import { Search, Filter } from 'lucide-react';

interface TwoPointerProblemsProps {
  onSelectProblem: (id: number) => void;
}

export function TwoPointerProblems({ onSelectProblem }: TwoPointerProblemsProps) {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All');
  const [pattern, setPattern] = useState<Pattern | 'All'>('All');
  const [company, setCompany] = useState<string>('All');

  const filtered = useMemo(() => {
    return problemSummaries.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !String(p.leetcode).includes(q)) return false;
      }
      if (difficulty !== 'All' && p.difficulty !== difficulty) return false;
      if (pattern !== 'All' && p.pattern !== pattern) return false;
      if (company !== 'All' && !p.companies.includes(company)) return false;
      return true;
    });
  }, [search, difficulty, pattern, company]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Problem Library</h2>
        <p className="text-slate-400">Curated Two-Pointer problems for technical interview prep.</p>
      </div>

      {/* Filters */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 mb-6 space-y-3">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or LeetCode number..."
            className="flex-1 bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="w-4 h-4 text-slate-500" />
          <FilterDropdown
            label="Difficulty"
            value={difficulty}
            options={['All', 'Easy', 'Medium', 'Hard']}
            onChange={(v) => setDifficulty(v as Difficulty | 'All')}
          />
          <FilterDropdown
            label="Pattern"
            value={pattern}
            options={['All', ...allPatterns]}
            onChange={(v) => setPattern(v as Pattern | 'All')}
          />
          <FilterDropdown
            label="Company"
            value={company}
            options={['All', ...allCompanies]}
            onChange={(v) => setCompany(v)}
          />
          <span className="ml-auto text-sm text-slate-500">
            {filtered.length} problem{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          No problems match your filters.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <ProblemCard
              key={p.id}
              problem={p}
              onVisualize={() => onSelectProblem(p.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-slate-500 font-medium">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-sky-500"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
