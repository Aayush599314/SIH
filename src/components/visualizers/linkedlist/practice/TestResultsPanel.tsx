import React, { useState } from 'react';
import type { ExecutionResult, Problem } from './types';

interface TestResultsPanelProps {
  problem: Problem;
  result: ExecutionResult | null;
  mode: 'idle' | 'running' | 'submitting' | 'done';
  onVisualize: () => void;
}

export const TestResultsPanel: React.FC<TestResultsPanelProps> = ({
  problem,
  result,
  mode,
  onVisualize,
}) => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [showApproachExplanation, setShowApproachExplanation] = useState(false);

  if (mode === 'running' || mode === 'submitting') {
    return (
      <div className="practice-results-card">
        <div className="practice-results-loading">
          <div className="practice-spinner"></div>
          <span>{mode === 'running' ? 'Compiling & Running Visible Test Cases...' : 'Testing against Hidden Suite...'}</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="practice-results-card practice-results-empty">
        <div className="practice-results-header">
          <span className="practice-results-title">Test Results</span>
        </div>
        <div className="practice-empty-state">
          <span>Click <strong>Run Code</strong> to test with sample inputs, or <strong>Submit</strong> to evaluate across all test cases.</span>
        </div>
      </div>
    );
  }

  const isAccepted = result.status === 'Accepted';
  const isCompilationError = result.status === 'Compilation Error';

  return (
    <div className="practice-results-card">
      {/* Top Status Header */}
      <div className="practice-results-header">
        <div className="practice-results-status-line">
          <span className={`practice-status-badge status-${result.status.toLowerCase().replace(/\s+/g, '-')}`}>
            {result.status === 'Accepted' && '✓ '}
            {result.status === 'Wrong Answer' && '✗ '}
            {result.status}
          </span>
          <span className="practice-stats">
            Passed: {result.totalPassed} / {result.totalCases}
          </span>
          {result.runtimeMs > 0 && (
            <span className="practice-stats">
              Runtime: {result.runtimeMs} ms
            </span>
          )}
        </div>

        {/* Action Button: Visualize Solution (always available) */}
        <button
          type="button"
          className="practice-btn-visualize"
          onClick={onVisualize}
          title="Watch the algorithm execute step-by-step"
        >
          🎬 {isAccepted ? 'Visualize My Solution' : 'Visualize Algorithm'}
        </button>
      </div>

      {/* Compilation Error View */}
      {isCompilationError && (
        <div className="practice-error-box">
          <div className="practice-error-title">Compilation Output:</div>
          <pre className="practice-error-message">{result.errorMessage || 'Unknown compilation error'}</pre>
        </div>
      )}

      {/* Test Case Results View (Tabs + Details) */}
      {!isCompilationError && result.testResults.length > 0 && (
        <div className="practice-cases-container">
          {/* Test Case Selection Tabs */}
          <div className="practice-case-tabs">
            {result.testResults.map((tr, idx) => (
              <button
                key={tr.testCase.id || idx}
                type="button"
                className={`practice-case-tab ${selectedCaseIdx === idx ? 'is-active' : ''} ${tr.passed ? 'is-passed' : 'is-failed'}`}
                onClick={() => setSelectedCaseIdx(idx)}
              >
                <span className="case-tab-icon">{tr.passed ? '✓' : '✗'}</span>
                <span>Case {idx + 1}</span>
              </button>
            ))}
          </div>

          {/* Selected Case Detail */}
          {result.testResults[selectedCaseIdx] && (
            <div className="practice-case-detail">
              <div className="practice-io-row">
                <div className="practice-io-label">Input:</div>
                <div className="practice-io-value code-font">
                  {result.testResults[selectedCaseIdx].testCase.input}
                </div>
              </div>

              <div className="practice-io-row">
                <div className="practice-io-label">Expected Output:</div>
                <div className="practice-io-value code-font expected-color">
                  {result.testResults[selectedCaseIdx].testCase.expectedOutput}
                </div>
              </div>

              <div className="practice-io-row">
                <div className="practice-io-label">Your Output:</div>
                <div className={`practice-io-value code-font ${result.testResults[selectedCaseIdx].passed ? 'user-pass-color' : 'user-fail-color'}`}>
                  {result.testResults[selectedCaseIdx].actualOutput || 'void / empty'}
                </div>
              </div>

              {result.testResults[selectedCaseIdx].errorMessage && (
                <div className="practice-io-row">
                  <div className="practice-io-label">Note:</div>
                  <div className="practice-io-value note-color">
                    {result.testResults[selectedCaseIdx].errorMessage}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Post-Acceptance Complexity & Explanation */}
      {isAccepted && (
        <div className="practice-post-accept">
          <div className="practice-complexity-bar">
            <div className="practice-complexity-tag">
              <span className="label">Time Complexity:</span>
              <span className="val">{problem.expectedComplexity.time}</span>
            </div>
            <div className="practice-complexity-tag">
              <span className="label">Space Complexity:</span>
              <span className="val">{problem.expectedComplexity.space}</span>
            </div>
          </div>

          <div className="practice-approach-section">
            <button
              type="button"
              className="practice-approach-toggle"
              onClick={() => setShowApproachExplanation((prev) => !prev)}
            >
              {showApproachExplanation ? '▼ Hide Approach Explanation' : '► Explain My Approach'}
            </button>

            {showApproachExplanation && (
              <div className="practice-approach-content">
                <p className="practice-explanation-text">{problem.explanation}</p>
                <div className="practice-approach-sub">{problem.approachDescription}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
