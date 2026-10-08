import { AnimatePresence, motion } from "framer-motion";
import type { VisualizerId } from "@/types";

interface Props {
  visualizer: VisualizerId;
}

const ARRAY_VALUES = [12, 24, 8, 31, 5];
const LL_VALUES = [7, 19, 3, 42];
const STACK_VALUES = [3, 8, 15];
const QUEUE_VALUES = [4, 9, 16, 2];
const HASH_BUCKETS = [
  { key: "id", value: "104", bucket: 0 },
  { key: "name", value: "\"AY\"", bucket: 2 },
  { key: "role", value: "\"dev\"", bucket: 2 },
  { key: "active", value: "true", bucket: 4 },
];

function Chip({ children, tone = "lime" }: { children: React.ReactNode; tone?: "lime" | "cyan" | "orange" | "violet" }) {
  const map = {
    lime: "border-lime-400/35 bg-lime-400/10 text-lime-300",
    cyan: "border-cyan-400/35 bg-cyan-400/10 text-cyan-200",
    orange: "border-orange-400/35 bg-orange-400/10 text-orange-300",
    violet: "border-violet-400/35 bg-violet-400/10 text-violet-200",
  } as const;
  return (
    <span className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 font-mono text-[12px] font-medium ${map[tone]}`}>
      {children}
    </span>
  );
}

function ArrayPreview() {
  return (
    <div className="flex items-end gap-1.5">
      {ARRAY_VALUES.map((v, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 22 + v * 1.6, opacity: 1 }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 180, damping: 20 }}
            className="w-8 rounded-md border border-lime-400/35 bg-gradient-to-t from-lime-400/25 to-lime-400/5"
          />
          <span className="font-mono text-[10px] text-[var(--color-ink-faint)]">{i}</span>
        </div>
      ))}
    </div>
  );
}

function LinkedListPreview() {
  return (
    <div className="flex items-center">
      {LL_VALUES.map((v, i) => (
        <div key={i} className="flex items-center">
          <Chip tone="cyan">{v}</Chip>
          {i < LL_VALUES.length - 1 && (
            <svg width="26" height="12" viewBox="0 0 26 12" className="mx-0.5 text-cyan-400/60">
              <line x1="0" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16 2 L21 6 L16 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      ))}
      <span className="ml-1 font-mono text-[10px] text-[var(--color-ink-faint)]">null</span>
    </div>
  );
}

function StackPreview() {
  return (
    <div className="flex flex-col-reverse items-center gap-1.5">
      {STACK_VALUES.map((v, i) => (
        <motion.div
          key={i}
          initial={{ x: -12, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.08 }}
        >
          <Chip tone="violet">{v}</Chip>
        </motion.div>
      ))}
      <span className="font-mono text-[9px] tracking-wider text-[var(--color-ink-faint)]">TOP ↓</span>
    </div>
  );
}

function QueuePreview() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-[9px] tracking-wider text-[var(--color-ink-faint)]">OUT ←</span>
      {QUEUE_VALUES.map((v, i) => (
        <Chip key={i} tone="orange">
          {v}
        </Chip>
      ))}
      <span className="font-mono text-[9px] tracking-wider text-[var(--color-ink-faint)]">← IN</span>
    </div>
  );
}

function HashMapPreview() {
  return (
    <div className="grid grid-cols-5 gap-1.5">
      {Array.from({ length: 5 }).map((_, bucketIdx) => {
        const items = HASH_BUCKETS.filter((h) => h.bucket === bucketIdx);
        return (
          <div key={bucketIdx} className="flex flex-col items-center gap-1">
            <div className="flex h-8 w-9 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] font-mono text-[10px] text-[var(--color-ink-faint)]">
              {bucketIdx}
            </div>
            {items.map((item) => (
              <div
                key={item.key}
                className="rounded-md border border-lime-400/35 bg-lime-400/10 px-1.5 py-0.5 text-center font-mono text-[9px] leading-tight text-lime-300"
              >
                {item.key}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function TreePreview() {
  return (
    <svg viewBox="0 0 220 120" className="h-[100px] w-[220px]">
      {[
        ["110", "20", "60", "55"],
        ["110", "20", "160", "55"],
        ["60", "55", "30", "95"],
        ["60", "55", "90", "95"],
        ["160", "55", "190", "95"],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-cyan)" strokeOpacity={0.4} strokeWidth={1.5} />
      ))}
      {[
        [110, 20],
        [60, 55],
        [160, 55],
        [30, 95],
        [90, 95],
        [190, 95],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={11} fill="var(--color-surface-2)" stroke="var(--color-cyan)" strokeWidth={1.5} />
      ))}
    </svg>
  );
}

function GraphPreview() {
  const nodes = [
    [30, 20],
    [110, 10],
    [190, 30],
    [50, 90],
    [140, 95],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 4],
    [3, 4],
    [2, 4],
  ];
  return (
    <svg viewBox="0 0 220 110" className="h-[95px] w-[220px]">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="var(--color-violet)"
          strokeOpacity={0.45}
          strokeWidth={1.5}
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={10} fill="var(--color-surface-2)" stroke="var(--color-violet)" strokeWidth={1.5} />
      ))}
    </svg>
  );
}

function SortingPreview() {
  const bars = [40, 90, 25, 65, 50, 80, 15];
  return (
    <div className="flex items-end gap-1">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: h }}
          transition={{ delay: i * 0.05, type: "spring", stiffness: 160, damping: 18 }}
          className="w-5 rounded-t-sm bg-gradient-to-t from-orange-400/20 to-orange-400/70"
        />
      ))}
    </div>
  );
}

function DynamicProgrammingPreview() {
  const dpVals = [1, 1, 2, 3, 5, 8];
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1.5">
        {dpVals.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.2 }}
            className={`flex h-10 w-10 flex-col items-center justify-center rounded-lg border font-mono text-xs ${
              i === 5
                ? "border-cyan-400/50 bg-cyan-400/20 text-cyan-200 shadow-md shadow-cyan-400/20"
                : i >= 3
                ? "border-violet-400/40 bg-violet-400/10 text-violet-300"
                : "border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-ink-dim)]"
            }`}
          >
            <span className="text-[9px] text-[var(--color-ink-faint)]">dp[{i}]</span>
            <span className="font-semibold">{v}</span>
          </motion.div>
        ))}
      </div>
      <span className="font-mono text-[10px] text-cyan-400/80">dp[i] = dp[i-1] + dp[i-2]</span>
    </div>
  );
}

const TWO_POINTER_VALUES = [2, 7, 11, 15];

function TwoPointerPreview() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        {TWO_POINTER_VALUES.map((v, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="font-mono text-[10px] font-bold text-sky-400">
              {i === 0 ? "L" : i === 3 ? "R" : ""}
            </span>
            <Chip tone={i === 0 || i === 3 ? "cyan" : "violet"}>{v}</Chip>
            <span className="font-mono text-[9px] text-[var(--color-ink-faint)]">{i}</span>
          </div>
        ))}
      </div>
      <span className="font-mono text-[10px] text-sky-400/80">target = 9 (L + R = 2 + 15 = 17 &gt; 9, R--)</span>
    </div>
  );
}

const PREVIEW_MAP: Record<VisualizerId, React.ComponentType> = {
  array: ArrayPreview,
  "linked-list": LinkedListPreview,
  stack: StackPreview,
  queue: QueuePreview,
  "binary-search": DynamicProgrammingPreview,
  "dynamic-programming": DynamicProgrammingPreview,
  hashmap: HashMapPreview,
  tree: TreePreview,
  graph: GraphPreview,
  sorting: SortingPreview,
  "two-pointer": TwoPointerPreview,
};

export function VisualizerPreview({ visualizer }: Props) {
  const Preview = PREVIEW_MAP[visualizer];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={visualizer}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.22 }}
        className="flex min-h-[120px] items-center justify-center"
      >
        <Preview />
      </motion.div>
    </AnimatePresence>
  );
}
