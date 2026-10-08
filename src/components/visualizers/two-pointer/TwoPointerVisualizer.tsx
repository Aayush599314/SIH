import { useState, useEffect, useMemo } from 'react';
import { problems, getProblem } from './data/registry';
import type { Step } from './types';
import { useVisualizer } from './hooks/useVisualizer';
import { ArrayVisualizer } from './components/ArrayVisualizer';
import { LinkedListVisualizer } from './components/LinkedListVisualizer';
import { VariablePanel } from './components/VariablePanel';
import { ExplanationPanel } from './components/ExplanationPanel';
import { CodePanel } from './components/CodePanel';
import { Controls } from './components/Controls';
import { ComplexityCard } from './components/ComplexityCard';
import { Inspector } from './components/Inspector';
import { ProblemInfoPanels } from './components/ProblemInfoPanels';
import { TwoPointerProblems } from './TwoPointerProblems';
import { TwoPointerPatterns } from './TwoPointerPatterns';
import { ChevronDown, Settings, BookOpen, Layers, Play, Keyboard, X } from 'lucide-react';

interface TwoPointerVisualizerProps {
  initialProblemId?: number;
}

type TabMode = 'visualizer' | 'problems' | 'patterns';

export function TwoPointerVisualizer({ initialProblemId }: TwoPointerVisualizerProps) {
  const [activeTab, setActiveTab] = useState<TabMode>('visualizer');
  const [problemId, setProblemId] = useState(initialProblemId ?? 167);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const problem = getProblem(problemId) || problems[0];

  const [input, setInput] = useState(problem.metadata.defaultInput);
  const [target, setTarget] = useState(problem.metadata.defaultTarget ?? '');
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProblemId) {
      setProblemId(initialProblemId);
      setActiveTab('visualizer');
    }
  }, [initialProblemId]);

  useEffect(() => {
    setInput(problem.metadata.defaultInput);
    setTarget(problem.metadata.defaultTarget ?? '');
    setError(null);
  }, [problemId, problem.metadata.defaultInput, problem.metadata.defaultTarget]);

  const steps = useMemo<Step[]>(() => {
    const validation = problem.validateInput(input, target);
    if (validation) {
      setError(validation);
      return [];
    }
    setError(null);
    return problem.generateSteps(input, target);
  }, [problem, input, target]);

  const viz = useVisualizer(steps);
  const step = viz.step ?? steps[0];

  const handleSelectProblem = (id: number) => {
    setProblemId(id);
    setActiveTab('visualizer');
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-200">
      {/* Tab bar header */}
      <div className="border-b border-slate-800 bg-slate-950/90 backdrop-blur px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('visualizer')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'visualizer'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              Visualizer
            </button>
            <button
              onClick={() => setActiveTab('problems')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'problems'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Problems ({problems.length})
            </button>
            <button
              onClick={() => setActiveTab('patterns')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'patterns'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Patterns
            </button>
          </div>

          <button
            onClick={() => setShowShortcuts(true)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-300 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            title="Keyboard Shortcuts"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Shortcuts</span>
          </button>
        </div>
      </div>

      {activeTab === 'problems' && (
        <TwoPointerProblems onSelectProblem={handleSelectProblem} />
      )}

      {activeTab === 'patterns' && (
        <TwoPointerPatterns onSelectProblem={handleSelectProblem} />
      )}

      {activeTab === 'visualizer' && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Problem selector + title */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={problemId}
                onChange={(e) => setProblemId(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:border-sky-500"
              >
                {problems.map((p) => (
                  <option key={p.metadata.id} value={p.metadata.id}>
                    #{p.metadata.leetcode} — {p.metadata.title}
                  </option>
                ))}
              </select>
              <span
                className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                  problem.metadata.difficulty === 'Easy'
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                    : problem.metadata.difficulty === 'Medium'
                    ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                    : 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                }`}
              >
                {problem.metadata.difficulty}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full text-sky-300 bg-sky-500/10 font-medium">
                {problem.metadata.pattern}
              </span>
              <button
                onClick={() => setShowInput((s) => !s)}
                className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-medium transition-colors"
              >
                <Settings className="w-4 h-4" />
                Custom Input
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${showInput ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {showInput && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-slate-400 font-medium block mb-1">
                      {problem.metadata.visualizationType === 'linked-list'
                        ? 'Linked List (use -> or commas)'
                        : problem.metadata.visualizationType === 'string'
                        ? 'String'
                        : 'Array (comma-separated)'}
                    </label>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:border-sky-500"
                      placeholder={problem.metadata.defaultInput}
                    />
                  </div>
                  {problem.metadata.defaultTarget !== undefined && (
                    <div className="sm:w-40">
                      <label className="text-xs text-slate-400 font-medium block mb-1">
                        {problem.metadata.id === 141 ? 'Cycle to index' : 'Target'}
                      </label>
                      <input
                        type="text"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:border-sky-500"
                        placeholder={problem.metadata.defaultTarget}
                      />
                    </div>
                  )}
                </div>
                {error && (
                  <div className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2">
                    {error}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Main visualization area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-4 py-2 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {problem.metadata.visualizationType === 'linked-list'
                    ? 'Linked List Visualizer'
                    : problem.metadata.visualizationType === 'string'
                    ? 'String Visualizer'
                    : 'Array Visualizer'}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {problem.metadata.dataStructure}
                </span>
              </div>
              <div className="p-4 flex items-center justify-center min-h-[140px]">
                {problem.metadata.visualizationType === 'linked-list' ? (
                  <LinkedListVisualizer step={step} />
                ) : (
                  <ArrayVisualizer step={step} />
                )}
              </div>
            </div>
            <div className="space-y-4">
              <ComplexityCard complexity={problem.getComplexity()} />
              <VariablePanel step={step} />
            </div>
          </div>

          {/* Controls */}
          <div className="mb-4">
            <Controls
              isPlaying={viz.isPlaying}
              onTogglePlay={viz.togglePlay}
              onNext={viz.next}
              onPrev={viz.prev}
              onReset={viz.reset}
              speed={viz.speed}
              onSpeedChange={viz.setSpeed}
              currentStep={viz.currentStep}
              totalSteps={Math.max(viz.totalSteps, 1)}
              onStepSelect={viz.setStep}
            />
          </div>

          {/* Explanation + Code */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <ExplanationPanel
              step={step}
              stepIndex={viz.currentStep}
              total={Math.max(viz.totalSteps, 1)}
            />
            <CodePanel
              codeMap={problem.getCode()}
              activeLine={step?.activeLine ?? 0}
            />
          </div>

          {/* Inspector */}
          <div className="mb-4">
            <Inspector step={step} />
          </div>

          {/* Info panels */}
          <ProblemInfoPanels problem={problem} />

          {/* Back to problems link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setActiveTab('problems')}
              className="text-sm text-slate-400 hover:text-sky-300 transition-colors inline-flex items-center gap-1.5"
            >
              ← Back to Problem Library
            </button>
          </div>
        </div>
      )}

      {/* Keyboard shortcuts modal */}
      {showShortcuts && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Keyboard Shortcuts</h3>
              <button
                onClick={() => setShowShortcuts(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { key: 'Space', desc: 'Play / Pause animation' },
                { key: '←', desc: 'Previous step' },
                { key: '→', desc: 'Next step' },
                { key: 'R', desc: 'Reset to beginning' },
              ].map((s) => (
                <div key={s.key} className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{s.desc}</span>
                  <kbd className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-sm font-mono text-sky-300">
                    {s.key}
                  </kbd>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Shortcuts are active when not typing in an input field.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TwoPointerVisualizer;
