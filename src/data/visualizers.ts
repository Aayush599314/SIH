import type { VisualizerMeta, VisualizerId } from "@/types";

// Single source of truth for the left sidebar navigation.
// Hash Maps intentionally stays at position 05 — do not reorder.
export const VISUALIZERS: VisualizerMeta[] = [
  {
    id: "array",
    number: "01",
    name: "Arrays",
    shortLabel: "ARRAY",
    description: "Contiguous, index-addressed memory.",
  },
  {
    id: "linked-list",
    number: "02",
    name: "Linked Lists",
    shortLabel: "LINKED LIST",
    description: "Nodes chained by reference.",
  },
  {
    id: "binary-search",
    number: "03",
    name: "Binary Search",
    shortLabel: "BINARY SEARCH",
    description: "Divide and conquer search.",
  },
  {
    id: "dynamic-programming",
    number: "04",
    name: "Dynamic Programming",
    shortLabel: "DYNAMIC PROG",
    description: "Optimal substructure and overlapping subproblems.",
  },
  {
    id: "hashmap",
    number: "05",
    name: "Hash Maps",
    shortLabel: "HASH MAP",
    description: "Buckets, keys and collisions.",
  },
  {
    id: "tree",
    number: "06",
    name: "Trees",
    shortLabel: "TREE",
    description: "Hierarchical branching nodes.",
  },
  {
    id: "sorting",
    number: "07",
    name: "Sorting",
    shortLabel: "SORTING",
    description: "Ordering elements by comparison.",
  },
  {
    id: "two-pointer",
    number: "08",
    name: "Two Pointer",
    shortLabel: "TWO POINTER",
    description: "Opposite direction and fast & slow pointers.",
  },
];

const STACK_FALLBACK: VisualizerMeta = {
  id: "stack",
  number: "03",
  name: "Stacks",
  shortLabel: "STACK",
  description: "Last in, first out.",
};

const QUEUE_FALLBACK: VisualizerMeta = {
  id: "queue",
  number: "04",
  name: "Queues",
  shortLabel: "QUEUE",
  description: "First in, first out.",
};

const GRAPH_FALLBACK: VisualizerMeta = {
  id: "graph",
  number: "07",
  name: "Graphs",
  shortLabel: "GRAPH",
  description: "Vertices connected by edges.",
};

export const VISUALIZER_MAP: Record<VisualizerId, VisualizerMeta> = (() => {
  const map: Record<string, VisualizerMeta> = {
    stack: STACK_FALLBACK,
    queue: QUEUE_FALLBACK,
    graph: GRAPH_FALLBACK,
  };
  for (const v of VISUALIZERS) {
    map[v.id] = v;
  }
  return map as Record<VisualizerId, VisualizerMeta>;
})();

// Loose keyword matching used to route free-form Gemini output
// ("dataStructure": "Hash Table") back to a concrete VisualizerId.
const ALIASES: Record<VisualizerId, string[]> = {
  array: ["array", "arrays", "list", "vector"],
  "linked-list": ["linked list", "linkedlist", "singly linked", "doubly linked"],
  "binary-search": ["binary search", "binarysearch"],
  stack: ["stack"],
  queue: ["queue", "deque", "circular queue"],
  "dynamic-programming": [
    "dynamic programming",
    "dp",
    "memoization",
    "tabulation",
    "knapsack",
    "subsequence",
  ],
  hashmap: ["hash map", "hashmap", "hash table", "hashtable", "dictionary", "map"],
  tree: ["tree", "bst", "binary search tree", "heap", "trie", "avl"],
  graph: ["graph", "adjacency", "dijkstra", "bfs", "dfs"],
  sorting: ["sort", "sorting", "bubble", "merge sort", "quick sort", "quicksort", "insertion sort"],
  "two-pointer": ["two pointer", "two-pointer", "twopointer", "two pointers", "slow fast", "two sum"],
};

export function detectVisualizerId(text: string): VisualizerId | null {
  const lower = text.toLowerCase();
  for (const id of Object.keys(ALIASES) as VisualizerId[]) {
    if (ALIASES[id].some((kw) => lower.includes(kw))) return id;
  }
  return null;
}
