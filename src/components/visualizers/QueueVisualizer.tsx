import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogIn, LogOut, Shuffle } from "lucide-react";
import { VisualizerShell } from "./VisualizerShell";
import { ControlButton, ControlInput } from "@/components/ui/Controls";
import { VISUALIZER_MAP } from "@/data/visualizers";

let uid = 0;
const nextId = () => `q-${uid++}`;

function seed() {
  return [4, 9, 16, 2].map((v) => ({ id: nextId(), value: v }));
}

export function QueueVisualizer() {
  const [items, setItems] = useState(seed);
  const [value, setValue] = useState("");
  const [log, setLog] = useState("A FIFO queue. Enqueue adds at the back, dequeue removes from the front — both O(1).");

  function enqueue() {
    const v = Number(value);
    if (Number.isNaN(v)) return;
    setItems([...items, { id: nextId(), value: v }]);
    setLog(`Enqueued ${v} at the back — O(1).`);
    setValue("");
  }

  function dequeue() {
    if (items.length === 0) return;
    const front = items[0];
    setItems(items.slice(1));
    setLog(`Dequeued ${front.value} from the front — O(1).`);
  }

  function reset() {
    setItems(seed());
    setLog("Queue reset with fresh sample data.");
  }

  return (
    <VisualizerShell
      meta={VISUALIZER_MAP.queue}
      controls={
        <>
          <ControlInput placeholder="value" value={value} onChange={(e) => setValue(e.target.value)} />
          <ControlButton tone="lime" onClick={enqueue}>
            <LogIn className="h-3.5 w-3.5" /> Enqueue
          </ControlButton>
          <ControlButton tone="orange" onClick={dequeue} disabled={items.length === 0}>
            <LogOut className="h-3.5 w-3.5" /> Dequeue
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
            <p>Enqueue: O(1)</p>
            <p>Dequeue: O(1)</p>
            <p>Peek: O(1)</p>
          </div>
        </div>
      }
    >
      <div className="flex min-h-[280px] flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10.5px] tracking-widest text-[var(--color-ink-faint)]">FRONT</span>
          <div className="flex items-center gap-2 rounded-2xl border border-dashed border-[var(--color-border)] p-3">
            <AnimatePresence initial={false}>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20, scale: 0.85 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 340, damping: 26 }}
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border font-mono text-[15px] font-semibold ${
                    i === 0
                      ? "border-lime-400/60 bg-lime-400/15 text-lime-300 ring-glow-lime"
                      : "border-orange-400/30 bg-orange-400/10 text-orange-300"
                  }`}
                >
                  {item.value}
                </motion.div>
              ))}
            </AnimatePresence>
            {items.length === 0 && (
              <p className="px-2 text-[13px] text-[var(--color-ink-faint)]">Queue is empty.</p>
            )}
          </div>
          <span className="font-mono text-[10.5px] tracking-widest text-[var(--color-ink-faint)]">BACK</span>
        </div>
      </div>
    </VisualizerShell>
  );
}
