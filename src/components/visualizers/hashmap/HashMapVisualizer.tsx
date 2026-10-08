import React, { useState, useCallback, useEffect, useRef, Suspense } from 'react';
import type { Bucket, ExecutionStep, HashMapVisualizerProps, OperationType } from './types';
import {
  createInitialBuckets,
  cloneBuckets,
  generateInsertSteps,
  generateSearchSteps,
  generateDeleteSteps,
} from './hashUtils';
import { BucketView } from './BucketView';
import { OperationControls, ExecutionControls } from './ControlPanel';
import { StepExplanation } from './StepExplanation';
import { ComplexityInfo } from './ComplexityInfo';
import { Scene3D } from './Scene3D';
import './HashMapVisualizer.css';

type ViewMode = '2d' | '3d';

const DEFAULT_BUCKET_COUNT = 8;
const PLAY_INTERVAL_MS = 1000;

export const HashMapVisualizer: React.FC<HashMapVisualizerProps> = ({
  steps: externalSteps,
  bucketCount = DEFAULT_BUCKET_COUNT,
  className,
}) => {
  // ── Core state ───────────────────────────────────────────────────
  const [buckets, setBuckets] = useState<Bucket[]>(() =>
    createInitialBuckets(bucketCount),
  );
  const [steps, setSteps] = useState<ExecutionStep[]>(externalSteps ?? []);
  const [stepIndex, setStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentOp, setCurrentOp] = useState<OperationType>('idle');
  const [viewMode, setViewMode] = useState<ViewMode>('2d');

  // Persist the "base" buckets (state before the current operation started)
  const baseBucketsRef = useRef<Bucket[]>(cloneBuckets(buckets));

  // Sync external steps if provided
  useEffect(() => {
    if (externalSteps) {
      setSteps(externalSteps);
      setStepIndex(0);
    }
  }, [externalSteps]);

  // ── Derived state ────────────────────────────────────────────────
  const currentStep: ExecutionStep | null =
    steps.length > 0 && stepIndex >= 0 && stepIndex < steps.length
      ? steps[stepIndex]
      : null;

  const displayBuckets = currentStep ? currentStep.bucketsSnapshot : buckets;

  // ── Auto-play timer ──────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) return;
    if (stepIndex >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setStepIndex((i) => i + 1);
    }, PLAY_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [isPlaying, stepIndex, steps.length]);

  // When the last step finishes, commit the final bucket state
  useEffect(() => {
    if (
      steps.length > 0 &&
      stepIndex === steps.length - 1 &&
      !isPlaying
    ) {
      const finalBuckets = steps[steps.length - 1].bucketsSnapshot;
      setBuckets(cloneBuckets(finalBuckets));
      baseBucketsRef.current = cloneBuckets(finalBuckets);
    }
  }, [stepIndex, steps, isPlaying]);

  // ── Operation handlers ───────────────────────────────────────────
  const runSteps = useCallback(
    (newSteps: ExecutionStep[], op: OperationType) => {
      setSteps(newSteps);
      setStepIndex(0);
      setCurrentOp(op);
      setIsPlaying(false);
    },
    [],
  );

  const handleInsert = useCallback(
    (key: number, value: string) => {
      const workBuckets = cloneBuckets(baseBucketsRef.current);
      const newSteps = generateInsertSteps(workBuckets, key, value);
      runSteps(newSteps, 'insert');
    },
    [runSteps],
  );

  const handleSearch = useCallback(
    (key: number) => {
      const workBuckets = cloneBuckets(baseBucketsRef.current);
      const newSteps = generateSearchSteps(workBuckets, key);
      runSteps(newSteps, 'search');
    },
    [runSteps],
  );

  const handleDelete = useCallback(
    (key: number) => {
      const workBuckets = cloneBuckets(baseBucketsRef.current);
      const newSteps = generateDeleteSteps(workBuckets, key);
      runSteps(newSteps, 'delete');
    },
    [runSteps],
  );

  // ── Execution control handlers ───────────────────────────────────
  const handlePrev = () => setStepIndex((i) => Math.max(0, i - 1));
  const handleNext = () =>
    setStepIndex((i) => Math.min(steps.length - 1, i + 1));
  const handlePlayPause = () => setIsPlaying((p) => !p);
  const handleReset = () => {
    setSteps([]);
    setStepIndex(-1);
    setIsPlaying(false);
    setCurrentOp('idle');
    setBuckets(createInitialBuckets(bucketCount));
    baseBucketsRef.current = createInitialBuckets(bucketCount);
  };

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div className={`hm-visualizer ${viewMode === '3d' ? 'hm-visualizer--3d' : ''} ${className ?? ''}`}>
      {/* Header */}
      <header className="hm-header">
        <div className="hm-header__left">
          <h2 className="hm-header__title">HashMap Visualizer</h2>
          <span className="hm-header__subtitle">
            {bucketCount} buckets · chaining collision resolution
          </span>
        </div>
        <div className="hm-view-toggle">
          <button
            className={`hm-view-toggle__btn ${viewMode === '2d' ? 'hm-view-toggle__btn--active' : ''}`}
            onClick={() => setViewMode('2d')}
          >
            2D
          </button>
          <button
            className={`hm-view-toggle__btn ${viewMode === '3d' ? 'hm-view-toggle__btn--active' : ''}`}
            onClick={() => setViewMode('3d')}
          >
            3D
          </button>
        </div>
      </header>

      <div className="hm-layout">
        {/* Left — Bucket visualization (2D or 3D) */}
        {viewMode === '2d' ? (
          <section className="hm-buckets">
            {displayBuckets.map((bucket) => (
              <BucketView
                key={bucket.index}
                bucket={bucket}
                isHighlighted={currentStep?.highlightBucket === bucket.index}
                highlightEntryId={
                  currentStep?.highlightBucket === bucket.index
                    ? currentStep.highlightEntryId
                    : null
                }
              />
            ))}
          </section>
        ) : (
          <Suspense fallback={<div className="hm-3d-loading">Loading 3D…</div>}>
            <Scene3D
              buckets={displayBuckets}
              highlightBucket={currentStep?.highlightBucket ?? null}
              highlightEntryId={currentStep?.highlightEntryId ?? null}
              onFallbackTo2D={() => setViewMode('2d')}
            />
          </Suspense>
        )}

        {/* Right — Controls & info */}
        <aside className="hm-sidebar">
          <OperationControls
            onInsert={handleInsert}
            onSearch={handleSearch}
            onDelete={handleDelete}
            disabled={isPlaying}
          />

          <ExecutionControls
            currentStep={stepIndex}
            totalSteps={steps.length}
            isPlaying={isPlaying}
            onPrev={handlePrev}
            onNext={handleNext}
            onPlayPause={handlePlayPause}
            onReset={handleReset}
            currentOperation={currentOp}
          />

          <StepExplanation step={currentStep} />

          <ComplexityInfo />
        </aside>
      </div>
    </div>
  );
};
