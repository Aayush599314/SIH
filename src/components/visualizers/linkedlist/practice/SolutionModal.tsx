import React, { useState } from 'react';
import type { Problem } from './types';
import { highlightCpp } from './cppHighlighter';

interface SolutionModalProps {
  problem: Problem;
  onClose: () => void;
  onLoadIntoEditor: (solutionCode: string) => void;
  onVisualize: () => void;
}

export const SolutionModal: React.FC<SolutionModalProps> = ({
  problem,
  onClose,
  onLoadIntoEditor,
  onVisualize,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(problem.referenceSolution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoad = () => {
    onLoadIntoEditor(problem.referenceSolution);
    onClose();
  };

  return (
    <div className="practice-modal-backdrop" onClick={onClose}>
      <div
        className="practice-modal-content practice-solution-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="practice-modal-header">
          <div className="practice-modal-title">
            <span className="practice-modal-badge" style={{ backgroundColor: '#10b981' }}>
              Model Answer
            </span>
            <h3>{problem.number}. {problem.title} — Reference Solution</h3>
          </div>
          <button
            type="button"
            className="practice-modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="practice-solution-body">
          {/* Complexity Cards */}
          <div className="practice-solution-meta-row">
            <div className="practice-solution-complexity-card">
              <span className="comp-label">Time Complexity:</span>
              <span className="comp-val">{problem.expectedComplexity.time}</span>
            </div>
            <div className="practice-solution-complexity-card">
              <span className="comp-label">Space Complexity:</span>
              <span className="comp-val">{problem.expectedComplexity.space}</span>
            </div>
            <div className="practice-solution-quick-actions">
              <button
                type="button"
                className="ll-btn ll-btn-primary"
                onClick={handleLoad}
                title="Load this C++ solution directly into your code editor"
              >
                📥 Load into Editor
              </button>
              <button
                type="button"
                className="ll-btn practice-btn-visualize"
                onClick={() => {
                  onClose();
                  onVisualize();
                }}
                title="Watch algorithm execution visually step-by-step"
              >
                🎬 Visualize Algorithm
              </button>
            </div>
          </div>

          {/* Algorithm Explanation */}
          <div className="practice-solution-section">
            <h4>Algorithm & Approach</h4>
            <p className="practice-solution-desc">{problem.explanation}</p>
            <div className="practice-solution-approach-note">
              <strong>Core Intuition:</strong> {problem.approachDescription}
            </div>
          </div>

          {/* Code Section */}
          <div className="practice-solution-section">
            <div className="practice-solution-code-header">
              <h4>Optimal C++ Solution</h4>
              <button
                type="button"
                className="practice-editor-btn"
                onClick={handleCopy}
              >
                {copied ? '✓ Copied' : 'Copy Code'}
              </button>
            </div>

            <div className="practice-solution-code-wrapper">
              <pre className="practice-solution-pre">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlightCpp(problem.referenceSolution),
                  }}
                />
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="practice-modal-controls" style={{ justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="ll-btn"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
