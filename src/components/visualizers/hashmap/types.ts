// ─── Data Structures ────────────────────────────────────────────────

export interface HashEntry {
  key: number;
  value: string;
  id: string; // unique id for animation keying
}

export interface Bucket {
  index: number;
  entries: HashEntry[];
}

// ─── Execution Steps ────────────────────────────────────────────────

export type OperationType =
  | 'insert'
  | 'search'
  | 'delete'
  | 'idle';

export interface ExecutionStep {
  /** Which operation produced this step */
  operation: OperationType;
  /** Human-readable explanation shown in the UI */
  explanation: string;
  /** Bucket index to highlight (null = none) */
  highlightBucket: number | null;
  /** Entry id to highlight within the bucket (null = none) */
  highlightEntryId: string | null;
  /** Snapshot of all buckets AFTER this step completes */
  bucketsSnapshot: Bucket[];
}

// ─── Component Props ────────────────────────────────────────────────

export interface HashMapVisualizerProps {
  /**
   * Optional pre-built list of execution steps.
   * When provided, the visualizer replays these steps instead of
   * accepting manual operations.  This is the integration point for
   * the AI pipeline in later phases.
   */
  steps?: ExecutionStep[];

  /** Number of buckets to display (default 8) */
  bucketCount?: number;

  /** Optional CSS class for theming overrides */
  className?: string;
}
