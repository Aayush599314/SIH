import { useEffect, useRef, useState } from "react";
import { Play, Pause, Shuffle, RotateCcw } from "lucide-react";
import { VisualizerShell } from "./VisualizerShell";
import { ControlButton } from "@/components/ui/Controls";
import { VISUALIZER_MAP } from "@/data/visualizers";
import { cn } from "@/lib/cn";

type Algo = "bubble" | "selection" | "insertion" | "quick";

interface Step {
  array: number[];
  compare: number[];
  swap: number[];
  sorted: number[];
}

const ALGOS: { id: Algo; label: string; time: string }[] = [
  { id: "bubble", label: "Bubble Sort", time: "O(n²)" },
  { id: "selection", label: "Selection Sort", time: "O(n²)" },
  { id: "insertion", label: "Insertion Sort", time: "O(n²)" },
  { id: "quick", label: "Quick Sort", time: "O(n log n) avg" },
];

function randomArray(n = 9) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10);
}

function bubbleSteps(input: number[]): Step[] {
  const arr = [...input];
  const steps: Step[] = [];
  const sorted: number[] = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      steps.push({ array: [...arr], compare: [j, j + 1], swap: [], sorted: [...sorted] });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ array: [...arr], compare: [], swap: [j, j + 1], sorted: [...sorted] });
      }
    }
    sorted.unshift(arr.length - 1 - i);
  }
  sorted.push(0);
  steps.push({ array: [...arr], compare: [], swap: [], sorted: [...sorted] });
  return steps;
}

function selectionSteps(input: number[]): Step[] {
  const arr = [...input];
  const steps: Step[] = [];
  const sorted: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      steps.push({ array: [...arr], compare: [min, j], swap: [], sorted: [...sorted] });
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
      steps.push({ array: [...arr], compare: [], swap: [i, min], sorted: [...sorted] });
    }
    sorted.push(i);
  }
  steps.push({ array: [...arr], compare: [], swap: [], sorted: [...sorted] });
  return steps;
}

function insertionSteps(input: number[]): Step[] {
  const arr = [...input];
  const steps: Step[] = [];
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0) {
      steps.push({ array: [...arr], compare: [j - 1, j], swap: [], sorted: Array.from({ length: i }, (_, k) => k).slice(0, j) });
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        steps.push({ array: [...arr], compare: [], swap: [j - 1, j], sorted: [] });
        j--;
      } else break;
    }
  }
  steps.push({ array: [...arr], compare: [], swap: [], sorted: arr.map((_, i) => i) });
  return steps;
}

function quickSteps(input: number[]): Step[] {
  const arr = [...input];
  const steps: Step[] = [];
  const sorted = new Set<number>();

  function partition(lo: number, hi: number): number {
    const pivot = arr[hi];
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      steps.push({ array: [...arr], compare: [j, hi], swap: [], sorted: [...sorted] });
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({ array: [...arr], compare: [], swap: [i, j], sorted: [...sorted] });
      }
    }
    [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
    steps.push({ array: [...arr], compare: [], swap: [i + 1, hi], sorted: [...sorted] });
    sorted.add(i + 1);
    return i + 1;
  }

  function sort(lo: number, hi: number) {
    if (lo >= hi) {
      if (lo === hi) sorted.add(lo);
      return;
    }
    const p = partition(lo, hi);
    sort(lo, p - 1);
    sort(p + 1, hi);
  }

  sort(0, arr.length - 1);
  steps.push({ array: [...arr], compare: [], swap: [], sorted: arr.map((_, i) => i) });
  return steps;
}

const GENERATORS: Record<Algo, (arr: number[]) => Step[]> = {
  bubble: bubbleSteps,
  selection: selectionSteps,
  insertion: insertionSteps,
  quick: quickSteps,
};

export function SortingVisualizer() {
  const [base, setBase] = useState<number[]>(() => randomArray());
  const [algo, setAlgo] = useState<Algo>("bubble");
  const [steps, setSteps] = useState<Step[]>(() => bubbleSteps(base));
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setSteps(GENERATORS[algo](base));
    setIndex(0);
    setPlaying(false);
  }, [algo, base]);

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => {
        setIndex((i) => {
          if (i >= steps.length - 1) {
            setPlaying(false);
            return i;
          }
          return i + 1;
        });
      }, 260);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, steps.length]);

  const current = steps[index] ?? steps[steps.length - 1];
  const maxVal = Math.max(...base, 1);

  return (
    <VisualizerShell
      meta={VISUALIZER_MAP.sorting}
      controls={
        <>
          <select
            value={algo}
            onChange={(e) => setAlgo(e.target.value as Algo)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 text-[12.5px] text-[var(--color-ink)] outline-none"
          >
            {ALGOS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
          <ControlButton tone="lime" onClick={() => setPlaying((p) => !p)}>
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {playing ? "Pause" : "Play"}
          </ControlButton>
          <ControlButton onClick={() => setIndex(0)}>
            <RotateCcw className="h-3.5 w-3.5" /> Restart
          </ControlButton>
          <ControlButton
            onClick={() => {
              setBase(randomArray());
              setPlaying(false);
            }}
          >
            <Shuffle className="h-3.5 w-3.5" /> Shuffle
          </ControlButton>
        </>
      }
      sidebar={
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="mb-2 font-mono text-[11px] font-semibold tracking-[0.1em] text-[var(--color-ink-faint)]">
            STATUS
          </p>
          <p className="text-[13px] leading-relaxed text-[var(--color-ink-dim)]">
            Step {Math.min(index + 1, steps.length)} of {steps.length}
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-surface-3)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-300 transition-all"
              style={{ width: `${((index + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="mt-4 space-y-1.5 border-t border-[var(--color-border)] pt-3 font-mono text-[11.5px] text-[var(--color-ink-faint)]">
            <p>{ALGOS.find((a) => a.id === algo)?.label}</p>
            <p>Time: {ALGOS.find((a) => a.id === algo)?.time}</p>
            <p>Space: O(1){algo === "quick" ? " – O(log n)" : ""}</p>
          </div>
        </div>
      }
    >
      <div className="flex min-h-[280px] items-end justify-center gap-2 pb-6">
        {current.array.map((val, i) => {
          const isCompare = current.compare.includes(i);
          const isSwap = current.swap.includes(i);
          const isSorted = current.sorted.includes(i);
          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-9 rounded-t-md border-x border-t transition-all duration-200",
                  isSwap
                    ? "border-orange-400 bg-orange-400/60"
                    : isCompare
                      ? "border-cyan-400 bg-cyan-400/40"
                      : isSorted
                        ? "border-lime-400/60 bg-lime-400/40"
                        : "border-[var(--color-border)] bg-[var(--color-surface-3)]",
                )}
                style={{ height: `${(val / maxVal) * 190 + 12}px` }}
              />
              <span className="font-mono text-[10px] text-[var(--color-ink-faint)]">{val}</span>
            </div>
          );
        })}
      </div>
    </VisualizerShell>
  );
}
