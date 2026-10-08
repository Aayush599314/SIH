import type { Bucket, ExecutionStep, HashEntry } from './types';

// ─── Helpers ────────────────────────────────────────────────────────

let _idCounter = 0;

/** Generate a unique ID for an entry (used as React key & highlight target). */
export function uid(): string {
  return `entry-${++_idCounter}-${Date.now()}`;
}

/** Simple modular hash: key % bucketCount */
export function hashKey(key: number, bucketCount: number): number {
  return ((key % bucketCount) + bucketCount) % bucketCount; // handles negatives
}

/** Deep-clone buckets so each snapshot is independent. */
export function cloneBuckets(buckets: Bucket[]): Bucket[] {
  return buckets.map((b) => ({
    index: b.index,
    entries: b.entries.map((e) => ({ ...e })),
  }));
}

/** Create empty buckets. */
export function createEmptyBuckets(count: number): Bucket[] {
  return Array.from({ length: count }, (_, i) => ({ index: i, entries: [] }));
}

// ─── Initial state with sample data ────────────────────────────────

export function createInitialBuckets(bucketCount: number): Bucket[] {
  const buckets = createEmptyBuckets(bucketCount);

  const samples: { key: number; value: string }[] = [
    { key: 5, value: 'apple' },
    { key: 13, value: 'banana' },
    { key: 2, value: 'cherry' },
  ];

  for (const s of samples) {
    const idx = hashKey(s.key, bucketCount);
    buckets[idx].entries.push({ key: s.key, value: s.value, id: uid() });
  }

  return buckets;
}

// ─── Operation step generators ──────────────────────────────────────

/**
 * INSERT key→value.
 * Returns an array of ExecutionSteps describing the operation.
 */
export function generateInsertSteps(
  buckets: Bucket[],
  key: number,
  value: string,
): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  const bucketCount = buckets.length;
  const idx = hashKey(key, bucketCount);

  // Step 1 — hash calculation
  steps.push({
    operation: 'insert',
    explanation: `Hashing key ${key}…  hash(${key}) = ${key} % ${bucketCount} = ${idx}`,
    highlightBucket: null,
    highlightEntryId: null,
    bucketsSnapshot: cloneBuckets(buckets),
  });

  // Step 2 — select bucket
  steps.push({
    operation: 'insert',
    explanation: `Key ${key} maps to bucket ${idx}.`,
    highlightBucket: idx,
    highlightEntryId: null,
    bucketsSnapshot: cloneBuckets(buckets),
  });

  // Check if key already exists (update case)
  const existing = buckets[idx].entries.find((e) => e.key === key);

  if (existing) {
    existing.value = value;
    steps.push({
      operation: 'insert',
      explanation: `Key ${key} already exists — updated value to "${value}".`,
      highlightBucket: idx,
      highlightEntryId: existing.id,
      bucketsSnapshot: cloneBuckets(buckets),
    });
  } else {
    const newEntry: HashEntry = { key, value, id: uid() };
    buckets[idx].entries.push(newEntry);

    if (buckets[idx].entries.length > 1) {
      // Collision
      steps.push({
        operation: 'insert',
        explanation: `Collision at bucket ${idx}! Chaining key ${key} with existing entries.`,
        highlightBucket: idx,
        highlightEntryId: null,
        bucketsSnapshot: cloneBuckets(buckets),
      });
    }

    steps.push({
      operation: 'insert',
      explanation: `Inserted key ${key} → "${value}" into bucket ${idx}.`,
      highlightBucket: idx,
      highlightEntryId: newEntry.id,
      bucketsSnapshot: cloneBuckets(buckets),
    });
  }

  return steps;
}

/**
 * SEARCH for a key.
 */
export function generateSearchSteps(
  buckets: Bucket[],
  key: number,
): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  const bucketCount = buckets.length;
  const idx = hashKey(key, bucketCount);

  steps.push({
    operation: 'search',
    explanation: `Hashing key ${key}…  hash(${key}) = ${key} % ${bucketCount} = ${idx}`,
    highlightBucket: null,
    highlightEntryId: null,
    bucketsSnapshot: cloneBuckets(buckets),
  });

  steps.push({
    operation: 'search',
    explanation: `Searching in bucket ${idx}…`,
    highlightBucket: idx,
    highlightEntryId: null,
    bucketsSnapshot: cloneBuckets(buckets),
  });

  // Walk the chain
  const chain = buckets[idx].entries;
  for (const entry of chain) {
    if (entry.key === key) {
      steps.push({
        operation: 'search',
        explanation: `Found key ${key} → "${entry.value}" in bucket ${idx}.`,
        highlightBucket: idx,
        highlightEntryId: entry.id,
        bucketsSnapshot: cloneBuckets(buckets),
      });
      return steps;
    } else {
      steps.push({
        operation: 'search',
        explanation: `Checking key ${entry.key}… not a match.`,
        highlightBucket: idx,
        highlightEntryId: entry.id,
        bucketsSnapshot: cloneBuckets(buckets),
      });
    }
  }

  steps.push({
    operation: 'search',
    explanation: `Key ${key} not found in bucket ${idx}.`,
    highlightBucket: idx,
    highlightEntryId: null,
    bucketsSnapshot: cloneBuckets(buckets),
  });

  return steps;
}

/**
 * DELETE a key.
 */
export function generateDeleteSteps(
  buckets: Bucket[],
  key: number,
): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  const bucketCount = buckets.length;
  const idx = hashKey(key, bucketCount);

  steps.push({
    operation: 'delete',
    explanation: `Hashing key ${key}…  hash(${key}) = ${key} % ${bucketCount} = ${idx}`,
    highlightBucket: null,
    highlightEntryId: null,
    bucketsSnapshot: cloneBuckets(buckets),
  });

  steps.push({
    operation: 'delete',
    explanation: `Looking in bucket ${idx}…`,
    highlightBucket: idx,
    highlightEntryId: null,
    bucketsSnapshot: cloneBuckets(buckets),
  });

  const entryIndex = buckets[idx].entries.findIndex((e) => e.key === key);

  if (entryIndex === -1) {
    steps.push({
      operation: 'delete',
      explanation: `Key ${key} not found — nothing to delete.`,
      highlightBucket: idx,
      highlightEntryId: null,
      bucketsSnapshot: cloneBuckets(buckets),
    });
  } else {
    const entry = buckets[idx].entries[entryIndex];
    steps.push({
      operation: 'delete',
      explanation: `Found key ${key} → "${entry.value}". Removing…`,
      highlightBucket: idx,
      highlightEntryId: entry.id,
      bucketsSnapshot: cloneBuckets(buckets),
    });

    buckets[idx].entries.splice(entryIndex, 1);

    steps.push({
      operation: 'delete',
      explanation: `Deleted key ${key} from bucket ${idx}.`,
      highlightBucket: idx,
      highlightEntryId: null,
      bucketsSnapshot: cloneBuckets(buckets),
    });
  }

  return steps;
}
