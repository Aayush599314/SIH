import type { VisualizerId } from "@/types";
import { ArrayVisualizer } from "./ArrayVisualizer";
import { LinkedListVisualizer } from "./LinkedListVisualizer";
import { StackVisualizer } from "./StackVisualizer";
import { QueueVisualizer } from "./QueueVisualizer";
import { DynamicProgrammingVisualizer } from "./DynamicProgrammingVisualizer";
import { BinarySearchVisualizer } from "./binary-search";
import { HashMapVisualizer } from "./HashMapVisualizer";
import { TreeVisualizer } from "./TreeVisualizer";
import { GraphVisualizer } from "./GraphVisualizer";
import { SortingVisualizer } from "./SortingVisualizer";
import { TwoPointerVisualizer } from "./two-pointer";

// Single dispatch point between the dashboard's selectedVisualizer state and
// the concrete, independent visualizer modules. Each module owns its own
// state and rendering — this router never reaches into their internals.
const REGISTRY: Record<VisualizerId, React.ComponentType> = {
  array: ArrayVisualizer,
  "linked-list": LinkedListVisualizer,
  stack: StackVisualizer,
  queue: QueueVisualizer,
  "binary-search": BinarySearchVisualizer,
  "dynamic-programming": DynamicProgrammingVisualizer,
  hashmap: HashMapVisualizer,
  tree: TreeVisualizer,
  graph: GraphVisualizer,
  sorting: SortingVisualizer,
  "two-pointer": TwoPointerVisualizer,
};

export function VisualizerRouter({ visualizer }: { visualizer: VisualizerId }) {
  const Component = REGISTRY[visualizer];
  return <Component />;
}
