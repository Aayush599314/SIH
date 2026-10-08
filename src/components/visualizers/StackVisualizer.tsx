import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp, Shuffle } from "lucide-react";
import { VisualizerShell } from "./VisualizerShell";
import { ControlButton, ControlInput } from "@/components/ui/Controls";
import { VISUALIZER_MAP } from "@/data/visualizers";

let uid = 0;
const nextId = () => `s-${uid++}`;

function seed() {
  return [3, 8, 15].map((v) => ({ id: nextId(), value: v }));
}

export function StackVisualizer() {
  const [items, setItems] = useState(seed);
  const [value, setValue] = useState("");
  const [log, setLog] = useState("A LIFO stack. Push adds to the top, pop removes from the top — both O(1).");

  function push() {
    const v = Number(value);
    if (Number.isNaN(v)) return;
    setItems([...items, { id: nextId(), value: v }]);
    setLog(`Pushed ${v} onto the stack — O(1).`);
    setValue("");
  }

  function pop() {
    if (items.length === 0) return;
    const top = items[items.length - 1];
    setItems(items.slice(0, -1));
    setLog(`Popped ${top.value} from the top — O(1).`);
  }

  function reset() {
    setItems(seed());
    setLog("Stack reset with fresh sample data.");
  }

  return (
    <VisualizerShell
      meta={VISUALIZER_MAP.stack}
      controls={
        <>
          <ControlInput placeholder="value" value={value} onChange={(e) => setValue(e.target.value)} />
          <ControlButton tone="lime" onClick={push}>
            <ArrowDown className="h-3.5 w-3.5" /> Push
          </ControlButton>
          <ControlButton tone="orange" onClick={pop} disabled={items.length === 0}>
            <ArrowUp className="h-3.5 w-3.5" /> Pop
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
            <p>Push: O(1)</p>
            <p>Pop: O(1)</p>
            <p>Peek: O(1)</p>
          </div>
        </div>
      }
    >
      <div className="flex min-h-[280px] flex-col items-center justify-end gap-2 pb-2">
        <span className="mb-1 font-mono text-[10.5px] tracking-widest text-[var(--color-ink-faint)]">TOP</span>
        <div className="flex flex-col-reverse gap-2">
          <AnimatePresence initial={false}>
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 340, damping: 26 }}
                className={`flex h-12 w-44 items-center justify-center rounded-xl border font-mono text-[15px] font-semibold ${
                  i === items.length - 1
                    ? "border-lime-400/60 bg-lime-400/15 text-lime-300 ring-glow-lime"
                    : "border-violet-400/30 bg-violet-400/10 text-violet-200"
                }`}
              >
                {item.value}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {items.length === 0 && <p className="text-[13px] text-[var(--color-ink-faint)]">Stack is empty.</p>}
        <div className="mt-3 h-1 w-52 rounded-full bg-[var(--color-surface-3)]" />
      </div>
    </VisualizerShell>
  );
}
