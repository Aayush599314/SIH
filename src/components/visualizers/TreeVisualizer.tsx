import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Shuffle, GitBranch } from "lucide-react";
import { VisualizerShell } from "./VisualizerShell";
import { ControlButton, ControlInput } from "@/components/ui/Controls";
import { VISUALIZER_MAP } from "@/data/visualizers";

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function insertBST(root: TreeNode | null, value: number): TreeNode {
  if (!root) return { value, left: null, right: null };
  if (value < root.value) return { ...root, left: insertBST(root.left, value) };
  if (value > root.value) return { ...root, right: insertBST(root.right, value) };
  return root;
}

interface Positioned {
  node: TreeNode;
  x: number;
  y: number;
}

function layout(root: TreeNode | null): { positions: Positioned[]; width: number; height: number } {
  const positions: Positioned[] = [];
  let counter = 0;
  const SPACING_X = 56;
  const SPACING_Y = 68;

  function walk(node: TreeNode | null, depth: number) {
    if (!node) return;
    walk(node.left, depth + 1);
    const x = counter * SPACING_X + 40;
    counter += 1;
    positions.push({ node, x, y: depth * SPACING_Y + 34 });
    walk(node.right, depth + 1);
  }
  walk(root, 0);

  const width = Math.max(counter * SPACING_X + 40, 240);
  const maxDepth = positions.reduce((m, p) => Math.max(m, p.y), 0);
  return { positions, width, height: maxDepth + 60 };
}

function findEdges(root: TreeNode | null, positions: Positioned[]) {
  const map = new Map(positions.map((p) => [p.node, p]));
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  function walk(node: TreeNode | null) {
    if (!node) return;
    const from = map.get(node)!;
    if (node.left) {
      const to = map.get(node.left)!;
      edges.push({ x1: from.x, y1: from.y, x2: to.x, y2: to.y });
      walk(node.left);
    }
    if (node.right) {
      const to = map.get(node.right)!;
      edges.push({ x1: from.x, y1: from.y, x2: to.x, y2: to.y });
      walk(node.right);
    }
  }
  walk(root);
  return edges;
}

function seedTree(): TreeNode {
  let root: TreeNode | null = null;
  for (const v of [50, 28, 74, 12, 39, 61, 88, 6]) root = insertBST(root, v);
  return root!;
}

export function TreeVisualizer() {
  const [root, setRoot] = useState<TreeNode>(seedTree);
  const [value, setValue] = useState("");
  const [inserted, setInserted] = useState<number | null>(null);
  const [log, setLog] = useState("A binary search tree: left < parent < right. Insert takes O(log n) when balanced.");

  const { positions, width, height } = useMemo(() => layout(root), [root]);
  const edges = useMemo(() => findEdges(root, positions), [root, positions]);

  function insert() {
    const v = Number(value);
    if (Number.isNaN(v)) return;
    setRoot((r) => insertBST(r, v));
    setInserted(v);
    setLog(`Inserted ${v}. Traversed left/right comparing against each node — O(log n) average.`);
    setValue("");
  }

  function reset() {
    setRoot(seedTree());
    setInserted(null);
    setLog("Tree reset with fresh sample data.");
  }

  return (
    <VisualizerShell
      meta={VISUALIZER_MAP.tree}
      controls={
        <>
          <ControlInput placeholder="value" value={value} onChange={(e) => setValue(e.target.value)} />
          <ControlButton tone="lime" onClick={insert}>
            <PlusCircle className="h-3.5 w-3.5" /> Insert
          </ControlButton>
          <ControlButton onClick={reset}>
            <Shuffle className="h-3.5 w-3.5" /> Reset
          </ControlButton>
        </>
      }
      sidebar={
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <div className="mb-3 flex items-center gap-2">
            <GitBranch className="h-3.5 w-3.5 text-cyan-400" />
            <p className="font-mono text-[11px] font-semibold tracking-[0.1em] text-[var(--color-ink-faint)]">
              LOG
            </p>
          </div>
          <p className="text-[13px] leading-relaxed text-[var(--color-ink-dim)]">{log}</p>
          <div className="mt-4 space-y-1.5 border-t border-[var(--color-border)] pt-3 font-mono text-[11.5px] text-[var(--color-ink-faint)]">
            <p>Search: O(log n)*</p>
            <p>Insert: O(log n)*</p>
            <p>*balanced case, O(n) worst</p>
          </div>
        </div>
      }
    >
      <div className="flex min-h-[280px] items-center justify-center overflow-x-auto">
        <svg width={width} height={height} className="max-w-full">
          {edges.map((e, i) => (
            <line
              key={i}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke="var(--color-cyan)"
              strokeOpacity={0.4}
              strokeWidth={1.5}
            />
          ))}
          {positions.map((p) => (
            <g key={p.node.value} transform={`translate(${p.x}, ${p.y})`}>
              <motion.circle
                initial={{ r: 0 }}
                animate={{ r: 17 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                fill={p.node.value === inserted ? "color-mix(in srgb, var(--color-lime) 18%, var(--color-surface-2))" : "var(--color-surface-2)"}
                stroke={p.node.value === inserted ? "var(--color-lime)" : "var(--color-cyan)"}
                strokeWidth={1.5}
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fontWeight={600}
                fill={p.node.value === inserted ? "var(--color-lime)" : "var(--color-ink)"}
              >
                {p.node.value}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </VisualizerShell>
  );
}
