import React, { useState, useEffect } from 'react';
import { PROBLEMS } from './problems';
import type { Problem, Difficulty, ExecutionResult } from './types';
import { CodeEditor } from './CodeEditor';
import { TestResultsPanel } from './TestResultsPanel';
import { PracticeVisualizerModal } from './PracticeVisualizerModal';
import { SolutionModal } from './SolutionModal';
import { runVisibleTestCases, submitSolution } from './engine';
import './Practice.css';

export const PracticeView: React.FC = () => {
  const [selectedProblemId, setSelectedProblemId] = useState<string>(PROBLEMS[0].id);
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // User code drafted per problem (keyed by problem id)
  const [codeMap, setCodeMap] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    PROBLEMS.forEach((p) => {
      initial[p.id] = p.starterCode;
    });
    return initial;
  });

  // Set of solved problem IDs
  const [solvedIds, setSolvedIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('sih_linkedlist_solved_problems');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Hints revealed count per problem (0 to 3)
  const [hintsRevealedMap, setHintsRevealedMap] = useState<Record<string, number>>({});

  // Execution result for the current problem
  const [executionResultMap, setExecutionResultMap] = useState<Record<string, ExecutionResult | null>>({});
  const [executionState, setExecutionState] = useState<'idle' | 'running' | 'submitting' | 'done'>('idle');

  // Visualization modal state
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);

  // Solution/Answer modal state
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);

  // Active problem
  const activeProblem: Problem = PROBLEMS.find((p) => p.id === selectedProblemId) || PROBLEMS[0];
  const currentCode = codeMap[activeProblem.id] || activeProblem.starterCode;
  const currentResult = executionResultMap[activeProblem.id] || null;
  const currentHintsRevealed = hintsRevealedMap[activeProblem.id] || 0;

  // Persist solved problems
  useEffect(() => {
    try {
      localStorage.setItem('sih_linkedlist_solved_problems', JSON.stringify(Array.from(solvedIds)));
    } catch {
      // Ignore local storage error
    }
  }, [solvedIds]);

  const handleCodeChange = (newCode: string) => {
    setCodeMap((prev) => ({ ...prev, [activeProblem.id]: newCode }));
  };

  const handleResetCode = () => {
    if (window.confirm('Reset code to initial template? Any unsaved edits will be cleared.')) {
      setCodeMap((prev) => ({ ...prev, [activeProblem.id]: activeProblem.starterCode }));
      setExecutionResultMap((prev) => ({ ...prev, [activeProblem.id]: null }));
    }
  };

  const handleRevealNextHint = () => {
    setHintsRevealedMap((prev) => ({
      ...prev,
      [activeProblem.id]: Math.min(3, (prev[activeProblem.id] || 0) + 1),
    }));
  };

  const handleRunCode = () => {
    setExecutionState('running');
    setTimeout(() => {
      const res = runVisibleTestCases(activeProblem, currentCode);
      setExecutionResultMap((prev) => ({ ...prev, [activeProblem.id]: res }));
      setExecutionState('done');
    }, 400);
  };

  const handleSubmit = () => {
    setExecutionState('submitting');
    setTimeout(() => {
      const res = submitSolution(activeProblem, currentCode);
      setExecutionResultMap((prev) => ({ ...prev, [activeProblem.id]: res }));
      setExecutionState('done');

      if (res.status === 'Accepted') {
        setSolvedIds((prev) => new Set([...prev, activeProblem.id]));
      }
    }, 600);
  };

  // Filter problems for sidebar
  const filteredProblems = PROBLEMS.filter((p) => {
    const matchesDiff = filterDifficulty === 'All' || p.difficulty === filterDifficulty;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiff && matchesSearch;
  });

  return (
    <div className="practice-container">
      {/* Mobile Sidebar Toggle */}
      <div className="practice-mobile-bar">
        <button
          type="button"
          className="practice-toggle-btn"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          {isSidebarOpen ? '◀ Hide Problems' : '▶ Problem List (' + solvedIds.size + '/' + PROBLEMS.length + ' Solved)'}
        </button>
      </div>

      <div className="practice-main-layout">
        {/* ========================================================= */}
        {/* 1. PROBLEMS SIDEBAR */}
        {/* ========================================================= */}
        {isSidebarOpen && (
          <aside className="practice-sidebar">
            <div className="practice-sidebar-header">
              <div className="practice-sidebar-title">
                <span>PROBLEMS</span>
                <span className="practice-solved-counter">
                  {solvedIds.size} / {PROBLEMS.length} Solved
                </span>
              </div>

              {/* Search Bar */}
              <input
                type="text"
                className="practice-search-input"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Difficulty Filter Tabs */}
              <div className="practice-filter-group">
                {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    className={`practice-filter-pill ${filterDifficulty === diff ? 'is-active' : ''}`}
                    onClick={() => setFilterDifficulty(diff)}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Problem List Items */}
            <div className="practice-problem-list">
              {filteredProblems.map((prob) => {
                const isSelected = prob.id === activeProblem.id;
                const isSolved = solvedIds.has(prob.id);

                return (
                  <button
                    key={prob.id}
                    type="button"
                    className={`practice-problem-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedProblemId(prob.id)}
                  >
                    <span className={`practice-status-icon ${isSolved ? 'is-solved' : ''}`}>
                      {isSolved ? '✓' : '○'}
                    </span>
                    <span className="practice-item-number">{prob.number}.</span>
                    <span className="practice-item-title">{prob.title}</span>
                    <span className={`practice-diff-tag diff-${prob.difficulty.toLowerCase()}`}>
                      {prob.difficulty}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* ========================================================= */}
        {/* 2. PROBLEM WORKSPACE (SPLIT LAYOUT) */}
        {/* ========================================================= */}
        <div className="practice-workspace">
          {/* LEFT: PROBLEM STATEMENT & EXAMPLES */}
          <div className="practice-desc-panel">
            <div className="practice-desc-header">
              <div className="practice-desc-title-row">
                <h2>
                  {activeProblem.number}. {activeProblem.title}
                </h2>
                <div className="practice-desc-badges">
                  <span className={`practice-diff-tag diff-${activeProblem.difficulty.toLowerCase()}`}>
                    {activeProblem.difficulty}
                  </span>
                  <span className="practice-category-tag">
                    {activeProblem.category}
                  </span>
                  {solvedIds.has(activeProblem.id) && (
                    <span className="practice-solved-badge">✓ Solved</span>
                  )}
                  <button
                    type="button"
                    className="practice-pill-btn practice-pill-solution"
                    onClick={() => setIsSolutionOpen(true)}
                    title="View model C++ answer and explanation"
                  >
                    💡 Answer
                  </button>
                  <button
                    type="button"
                    className="practice-pill-btn practice-pill-visualize"
                    onClick={() => setIsVisualizerOpen(true)}
                    title="Visualize algorithm execution step-by-step"
                  >
                    🎬 Visualize
                  </button>
                </div>
              </div>
            </div>

            <div className="practice-desc-scroll">
              {/* Problem Statement */}
              <div className="practice-section">
                <p className="practice-statement">{activeProblem.description}</p>
              </div>

              {/* Input & Output format */}
              <div className="practice-section">
                <div className="practice-io-desc">
                  <strong>Input:</strong> {activeProblem.inputDesc}
                </div>
                <div className="practice-io-desc">
                  <strong>Output:</strong> {activeProblem.outputDesc}
                </div>
              </div>

              {/* Examples */}
              <div className="practice-section">
                <h4 className="practice-subheading">Examples</h4>
                {activeProblem.examples.map((ex, i) => (
                  <div key={i} className="practice-example-box">
                    <div className="practice-example-title">Example {i + 1}:</div>
                    <div className="practice-example-row">
                      <span className="example-label">Input:</span>
                      <code>{ex.input}</code>
                    </div>
                    <div className="practice-example-row">
                      <span className="example-label">Output:</span>
                      <code>{ex.output}</code>
                    </div>
                    {ex.explanation && (
                      <div className="practice-example-row">
                        <span className="example-label">Explanation:</span>
                        <span className="example-exp">{ex.explanation}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="practice-section">
                <h4 className="practice-subheading">Constraints</h4>
                <ul className="practice-constraints-list">
                  {activeProblem.constraints.map((c, i) => (
                    <li key={i}>
                      <code>{c}</code>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progressive Hints Accordion */}
              <div className="practice-section practice-hints-container">
                <div className="practice-hints-header">
                  <span className="practice-hints-title">
                    💡 Progressive Hints ({currentHintsRevealed} / {activeProblem.hints.length})
                  </span>
                  {currentHintsRevealed < activeProblem.hints.length && (
                    <button
                      type="button"
                      className="practice-btn-hint"
                      onClick={handleRevealNextHint}
                    >
                      Reveal Hint {currentHintsRevealed + 1}
                    </button>
                  )}
                </div>

                {currentHintsRevealed > 0 && (
                  <div className="practice-hints-list">
                    {activeProblem.hints.slice(0, currentHintsRevealed).map((h, i) => (
                      <div key={i} className="practice-hint-item">
                        <div className="practice-hint-badge">Hint {i + 1}</div>
                        <div className="practice-hint-text">{h}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: CODE EDITOR & TEST RESULTS */}
          <div className="practice-code-panel">
            {/* Action Bar */}
            <div className="practice-action-bar">
              <div className="practice-action-left">
                <span className="practice-engine-notice" title="Safe client-side C++ simulation engine">
                  Sandboxed C++ Engine
                </span>
                <button
                  type="button"
                  className="ll-btn practice-btn-answer"
                  onClick={() => setIsSolutionOpen(true)}
                  title="View model C++ solution and algorithm breakdown"
                >
                  💡 Model Answer
                </button>
                <button
                  type="button"
                  className="ll-btn practice-btn-visualize-top"
                  onClick={() => setIsVisualizerOpen(true)}
                  title="Visualize this algorithm step-by-step"
                >
                  🎬 Visualize Algorithm
                </button>
              </div>
              <div className="practice-action-right">
                <button
                  type="button"
                  className="ll-btn practice-btn-run"
                  onClick={handleRunCode}
                  disabled={executionState === 'running' || executionState === 'submitting'}
                >
                  ▶ Run Code
                </button>
                <button
                  type="button"
                  className="ll-btn ll-btn-primary practice-btn-submit"
                  onClick={handleSubmit}
                  disabled={executionState === 'running' || executionState === 'submitting'}
                >
                  ✓ Submit
                </button>
              </div>
            </div>

            {/* Code Editor */}
            <div className="practice-editor-slot">
              <CodeEditor
                code={currentCode}
                onChange={handleCodeChange}
                onReset={handleResetCode}
                disabled={executionState === 'running' || executionState === 'submitting'}
              />
            </div>

            {/* Test Results Area */}
            <div className="practice-results-slot">
              <TestResultsPanel
                problem={activeProblem}
                result={currentResult}
                mode={executionState}
                onVisualize={() => setIsVisualizerOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. VISUALIZE MY SOLUTION MODAL */}
      {/* ========================================================= */}
      {isVisualizerOpen && (
        <PracticeVisualizerModal
          problem={activeProblem}
          initialTrace={currentResult?.executionTrace}
          onClose={() => setIsVisualizerOpen(false)}
        />
      )}

      {/* ========================================================= */}
      {/* 4. SOLUTION / ANSWER MODAL */}
      {/* ========================================================= */}
      {isSolutionOpen && (
        <SolutionModal
          problem={activeProblem}
          onClose={() => setIsSolutionOpen(false)}
          onLoadIntoEditor={(solutionCode) => {
            setCodeMap((prev) => ({ ...prev, [activeProblem.id]: solutionCode }));
          }}
          onVisualize={() => setIsVisualizerOpen(true)}
        />
      )}
    </div>
  );
};
