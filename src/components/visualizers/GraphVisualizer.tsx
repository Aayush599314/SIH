import { useEffect, useRef, useState } from "react";
import { Play, Link2, Shuffle } from "lucide-react";
import { VisualizerShell } from "./VisualizerShell";
import { ControlButton } from "@/components/ui/Controls";
import { VISUALIZER_MAP } from "@/data/visualizers";

interface Node {
  id: string;
  x: number;
  y: number;
}
interface Edge {
  a: string;
  b: string;
}

const NODES: Node[] = [
  { id: "A", x: 70, y: 40 },
  { id: "B", x: 200, y: 20 },
  { id: "C", x: 320, y: 60 },
  { id: "D", x: 60, y: 170 },
  { id: "E", x: 210, y: 160 },
  { id: "F", x: 330, y: 190 },
];

const INITIAL_EDGES: Edge[] = [
  { a: "A", b: "B" },
  { a: "B", b: "C" },
  { a: "A", b: "D" },
  { a: "B", b: "E" },
  { a: "D", b: "E" },
  { a: "C", b: "E" },
  { a: "E", b: "F" },
];

function buildAdjacency(edges: Edge[]) {
  const adj = new Map<string, string[]>(NODES.map((n) => [n.id, []]));
  for (const e of edges) {
    adj.get(e.a)!.push(e.b);
    adj.get(e.b)!.push(e.a);
  }
  return adj;
}

function bfsOrder(start: string, edges: Edge[]): string[] {
  const adj = buildAdjacency(edges);
  const visited = new Set([start]);
  const order = [start];
  const queue = [start];
  while (queue.length) {
    const cur = queue.shift()!;
    for (const next of [...(adj.get(cur) ?? [])].sort()) {
      if (!visited.has(next)) {
        visited.add(next);
        order.push(next);
        queue.push(next);
      }
    }
  }
  return order;
}

export function GraphVisualizer() {
  const [edges, setEdges] = useState<Edge[]>(INITIAL_EDGES);
  const [from, setFrom] = useState("A");
  const [to, setTo] = useState("F");
  const [start, setStart] = useState("A");
  const [visitedStep, setVisitedStep] = useState(0);
  const [order, setOrder] = useState<string[]>([]);
  const [log, setLog] = useState("A graph of nodes connected by edges. Run BFS to see traversal order.");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function addEdge() {
    if (from === to) return;
    if (edges.some((e) => (e.a === from && e.b === to) || (e.a === to && e.b === from))) return;
    setEdges([...edges, { a: from, b: to }]);
    setLog(`Added edge ${from} — ${to}.`);
  }

  function runBFS() {
    if (timer.current) clearInterval(timer.current);
    const computed = bfsOrder(start, edges);
    setOrder(computed);
    setVisitedStep(0);
    setLog(`Running BFS from ${start}: ${computed.join(" → ")}`);
    let i = 0;
    timer.current = setInterval(() => {
      i += 1;
      setVisitedStep(i);
      if (i >= computed.length && timer.current) {
        clearInterval(timer.current);
      }
    }, 550);
  }

  function reset() {
    if (timer.current) clearInterval(timer.current);
    setEdges(INITIAL_EDGES);
    setOrder([]);
    setVisitedStep(0);
    setLog("Graph reset with fresh sample data.");
  }

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const visited = new Set(order.slice(0, visitedStep));
  const current = order[visitedStep - 1];

  return (
    <VisualizerShell
      meta={VISUALIZER_MAP.graph}
      controls={
        <>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1.5 font-mono text-[12.5px] text-[var(--color-ink)] outline-none"
          >
            {NODES.map((n) => (
              <option key={n.id}>{n.id}</option>
            ))}
          </select>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1.5 font-mono text-[12.5px] text-[var(--color-ink)] outline-none"
          >
            {NODES.map((n) => (
              <option key={n.id}>{n.id}</option>
            ))}
          </select>
          <ControlButton tone="cyan" onClick={addEdge}>
            <Link2 className="h-3.5 w-3.5" /> Add edge
          </ControlButton>
          <select
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1.5 font-mono text-[12.5px] text-[var(--color-ink)] outline-none"
          >
            {NODES.map((n) => (
              <option key={n.id}>{n.id}</option>
            ))}
          </select>
          <ControlButton tone="lime" onClick={runBFS}>
            <Play className="h-3.5 w-3.5" /> Run BFS
          </ControlButton>
          <ControlButton onClick={reset}>
            <Shuffle className="h-3.5 w-3.5" /> Reset
          </ControlButton>
        </>
      }
      sidebar={
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="mb-2 font-mono text-[11px] font-semibold tracking-[0.1em] text-[var(--color-ink-faint)]">
            LOG
          </p>
          <p className="text-[13px] leading-relaxed text-[var(--color-ink-dim)]">{log}</p>
          <div className="mt-4 space-y-1.5 border-t border-[var(--color-border)] pt-3 font-mono text-[11.5px] text-[var(--color-ink-faint)]">
            <p>BFS / DFS: O(V + E)</p>
            <p>Adjacency list space: O(V + E)</p>
          </div>
        </div>
      }
    >
      <div className="flex min-h-[280px] items-center justify-center">
        <svg viewBox="0 0 380 220" className="w-full max-w-[420px]">
          {edges.map((e, i) => {
            const a = NODES.find((n) => n.id === e.a)!;
            const b = NODES.find((n) => n.id === e.b)!;
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--color-violet)"
                strokeOpacity={0.4}
                strokeWidth={1.5}
              />
            );
          })}
          {NODES.map((n) => {
            const isVisited = visited.has(n.id);
            const isCurrent = current === n.id;
            return (
              <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                <circle
                  r={17}
                  fill={
                    isCurrent
                      ? "color-mix(in srgb, var(--color-lime) 25%, var(--color-surface-2))"
                      : isVisited
                        ? "color-mix(in srgb, var(--color-violet) 20%, var(--color-surface-2))"
                        : "var(--color-surface-2)"
                  }
                  stroke={isCurrent ? "var(--color-lime)" : isVisited ? "var(--color-violet)" : "var(--color-border)"}
                  strokeWidth={isCurrent ? 2 : 1.5}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="var(--font-mono)"
                  fontSize="12"
                  fontWeight={600}
                  fill={isCurrent ? "var(--color-lime)" : "var(--color-ink)"}
                >
                  {n.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </VisualizerShell>
  );
}
