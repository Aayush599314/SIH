import type {
  ActivityItem,
  RecentPlayground,
  StatItem,
  StreakInfo,
} from "@/types";

// This data stands in for the eventual progress/telemetry API.
// Shapes are intentionally final so a real data source can be swapped in later.

export const STATS: StatItem[] = [
  {
    id: "nodes",
    value: "128",
    label: "Nodes visualized",
    delta: "+18%",
    trend: "up",
    accent: "lime",
  },
  {
    id: "algorithms",
    value: "42",
    label: "Algorithms run",
    delta: "+6",
    trend: "up",
    accent: "cyan",
  },
  {
    id: "accuracy",
    value: "91%",
    label: "Quiz accuracy",
    delta: "+4.2%",
    trend: "up",
    accent: "violet",
  },
];

export const STREAK: StreakInfo = {
  days: 7,
  weeklyGoalPct: 78,
};

export const RECENT_PLAYGROUNDS: RecentPlayground[] = [
  {
    id: "rp-1",
    visualizer: "linked-list",
    title: "Linked List",
    meta: "Insert at tail • 4 operations",
    preview: ["12", "24", "8", "31"],
    lastOpened: "18 min ago",
  },
  {
    id: "rp-2",
    visualizer: "hashmap",
    title: "Hash Map",
    meta: "Collision chaining • 6 operations",
    preview: ["K1", "K7", "K3"],
    lastOpened: "1 hr ago",
  },
  {
    id: "rp-3",
    visualizer: "sorting",
    title: "Quick Sort",
    meta: "Partitioning • 12 comparisons",
    preview: ["5", "1", "9", "3"],
    lastOpened: "Yesterday",
  },
];

export const ACTIVITY_FEED: ActivityItem[] = [
  {
    id: "act-1",
    visualizer: "hashmap",
    title: "Hash Map",
    detail: "Collision resolved",
    time: "2m",
    accent: "lime",
  },
  {
    id: "act-2",
    visualizer: "tree",
    title: "Binary Tree",
    detail: "Traversal complete",
    time: "18m",
    accent: "cyan",
  },
  {
    id: "act-3",
    visualizer: "sorting",
    title: "Quick Sort",
    detail: "Pivot selected",
    time: "1h",
    accent: "orange",
  },
  {
    id: "act-4",
    visualizer: "binary-search",
    title: "Binary Search",
    detail: "Pivot search",
    time: "3h",
    accent: "cyan",
  },
];

export const DAILY_CHALLENGE = {
  title: "Hash it out.",
  prompt: "Resolve 3 collisions without rehashing.",
  cta: "Solve challenge",
  visualizer: "hashmap" as const,
};
