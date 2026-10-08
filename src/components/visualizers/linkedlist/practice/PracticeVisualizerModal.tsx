import React, { useState, useEffect, useRef } from 'react';
import type { Problem, TraceStep } from './types';
import { generateTrace } from './traceGenerator';

interface PracticeVisualizerModalProps {
  problem: Problem;
  initialTrace?: TraceStep[];
  onClose: () => void;
}

export const PracticeVisualizerModal: React.FC<PracticeVisualizerModalProps> = ({
  problem,
  initialTrace,
  onClose,
}) => {
  const [selectedTestCaseIdx, setSelectedTestCaseIdx] = useState(0);
  const [steps, setSteps] = useState<TraceStep[]>(() => {
    if (initialTrace && initialTrace.length > 0) return initialTrace;
    return generateTrace(problem.id, problem.visibleTestCases[0].rawInput);
  });
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000); // ms per step
  const timerRef = useRef<number | null>(null);

  // When changing test case, regenerate trace
  const handleTestCaseChange = (idx: number) => {
    setSelectedTestCaseIdx(idx);
    const newTrace = generateTrace(problem.id, problem.visibleTestCases[idx].rawInput);
    setSteps(newTrace);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  // Playback timer
  useEffect(() => {
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timerRef.current = window.setTimeout(() => {
        setCurrentStepIdx((prev) => prev + 1);
      }, playbackSpeed);
    } else if (currentStepIdx >= steps.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIdx, steps.length, playbackSpeed]);

  const currentStep: TraceStep | undefined = steps[currentStepIdx];

  // Helper to reorder nodes starting from head for linear layout
  const orderedNodes = React.useMemo(() => {
    if (!currentStep) return [];
    const ordered: typeof currentStep.nodes = [];
    const visited = new Set<string>();

    let currId = currentStep.headId;
    while (currId !== null && !visited.has(currId)) {
      const node = currentStep.nodes.find((n) => n.id === currId);
      if (!node) break;
      ordered.push(node);
      visited.add(node.id);
      currId = node.next;
    }

    // Include any detached nodes (e.g. newly created, deleted, or dummy)
    currentStep.nodes.forEach((n) => {
      if (!visited.has(n.id)) {
        ordered.push(n);
      }
    });

    return ordered;
  }, [currentStep]);

  return (
    <div className="practice-modal-backdrop" onClick={onClose}>
      <div
        className="practice-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="practice-modal-header">
          <div className="practice-modal-title">
            <span className="practice-modal-badge">Execution Trace</span>
            <h3>{problem.title} — Solution Visualizer</h3>
          </div>
          <button
            type="button"
            className="practice-modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Test Case Selector & Playback Speed */}
        <div className="practice-modal-subnav">
          <div className="practice-testcase-picker">
            <span className="picker-label">Test Input:</span>
            {problem.visibleTestCases.map((tc, idx) => (
              <button
                key={tc.id || idx}
                type="button"
                className={`practice-testcase-pill ${selectedTestCaseIdx === idx ? 'is-selected' : ''}`}
                onClick={() => handleTestCaseChange(idx)}
              >
                Case {idx + 1}
              </button>
            ))}
          </div>

          <div className="practice-speed-picker">
            <span className="picker-label">Speed:</span>
            <button
              type="button"
              className={`speed-btn ${playbackSpeed === 1500 ? 'is-active' : ''}`}
              onClick={() => setPlaybackSpeed(1500)}
            >
              0.7x
            </button>
            <button
              type="button"
              className={`speed-btn ${playbackSpeed === 1000 ? 'is-active' : ''}`}
              onClick={() => setPlaybackSpeed(1000)}
            >
              1x
            </button>
            <button
              type="button"
              className={`speed-btn ${playbackSpeed === 500 ? 'is-active' : ''}`}
              onClick={() => setPlaybackSpeed(500)}
            >
              2x
            </button>
          </div>
        </div>

        {/* Step Narration Card */}
        <div className="practice-narration-card">
          <div className="practice-step-tag">
            Step {steps.length > 0 ? currentStepIdx + 1 : 0} of {steps.length}
          </div>
          <div className="practice-step-desc">
            {currentStep?.description || 'Ready to begin simulation.'}
          </div>
        </div>

        {/* Visual Linked-List Stage */}
        <div className="practice-stage-canvas">
          <div className="practice-canvas-inner">
            {orderedNodes.length === 0 ? (
              <div className="ll-null">NULL (Empty List)</div>
            ) : (
              orderedNodes.map((node) => {
                const isHead = node.id === currentStep?.headId;
                const isHighlighted = currentStep?.highlightedNodeIds?.includes(node.id);
                const isModified = currentStep?.modifiedPointerIds?.some((p) => p.fromId === node.id);

                // Find all pointers pointing to this node
                const activePointers = (currentStep?.pointers || []).filter(
                  (p) => p.nodeId === node.id
                );

                return (
                  <div key={node.id} className="practice-node-wrapper">
                    {/* Pointer Badges Stack above the node */}
                    <div className="practice-pointer-stack">
                      {isHead && (
                        <div className="practice-pointer-tag head-tag">HEAD</div>
                      )}
                      {activePointers.map((p, pIdx) => (
                        <div
                          key={pIdx}
                          className="practice-pointer-tag var-tag"
                          style={{ backgroundColor: p.color || '#3b82f6' }}
                        >
                          {p.name}
                        </div>
                      ))}
                    </div>

                    {/* Node Visual Box */}
                    <div
                      className={`ll-node ${isHighlighted ? 'is-current' : ''} ${isModified ? 'is-target' : ''}`}
                    >
                      <div className="ll-node-value">{node.value}</div>
                      <div className="ll-node-next">•</div>
                    </div>

                    {/* Pointer Arrow */}
                    <div className="ll-pointer-container">
                      <div
                        className={`ll-pointer ${isModified ? 'is-modified' : ''}`}
                      ></div>
                    </div>

                    {/* NULL Terminator indicator if last node */}
                    {node.next === null && (
                      <div className="ll-null">NULL</div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Playback Controls Footer */}
        <div className="practice-modal-controls">
          <div className="practice-playback-buttons">
            <button
              type="button"
              className="ll-btn"
              disabled={currentStepIdx <= 0}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIdx(0);
              }}
              title="First Step"
            >
              ⏮ Reset
            </button>
            <button
              type="button"
              className="ll-btn"
              disabled={currentStepIdx <= 0}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIdx((p) => p - 1);
              }}
              title="Previous Step"
            >
              ◀ Prev
            </button>
            <button
              type="button"
              className="ll-btn ll-btn-primary"
              disabled={steps.length === 0 || currentStepIdx >= steps.length - 1}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <button
              type="button"
              className="ll-btn"
              disabled={currentStepIdx >= steps.length - 1}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIdx((p) => p + 1);
              }}
              title="Next Step"
            >
              Next ▶
            </button>
          </div>

          {/* Scrubber slider */}
          <div className="practice-scrubber-box">
            <input
              type="range"
              min={0}
              max={Math.max(0, steps.length - 1)}
              value={currentStepIdx}
              onChange={(e) => {
                setIsPlaying(false);
                setCurrentStepIdx(Number(e.target.value));
              }}
              className="practice-scrubber"
            />
            <span className="practice-scrubber-label">
              {currentStepIdx + 1} / {steps.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
