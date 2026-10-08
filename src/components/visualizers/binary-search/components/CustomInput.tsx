import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, AlertCircle, Wand2 } from 'lucide-react';
import type { AlgorithmInput } from '../types';

interface CustomInputProps {
  array: number[];
  target: number;
  extra?: Record<string, unknown>;
  onApply: (input: AlgorithmInput) => void;
  showTarget?: boolean;
  showHours?: boolean;
  needsSorted?: boolean;
}

export function CustomInput({
  array,
  target,
  extra,
  onApply,
  showTarget = true,
  showHours = false,
  needsSorted = true,
}: CustomInputProps) {
  const [arrayStr, setArrayStr] = useState(array.join(', '));
  const [targetStr, setTargetStr] = useState(String(target));
  const [hoursStr, setHoursStr] = useState(String((extra?.h as number) ?? 8));
  const [error, setError] = useState<string | null>(null);
  const [showSortPrompt, setShowSortPrompt] = useState(false);

  const handleApply = (sortedArray?: number[]) => {
    setError(null);
    setShowSortPrompt(false);

    try {
      const rawArray = sortedArray ?? arrayStr.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
      const parsed = rawArray.map((s) => {
        const n = Number(s);
        if (Number.isNaN(n)) throw new Error(`"${s}" is not a valid number`);
        return n;
      });

      if (parsed.length === 0) {
        setError('Array cannot be empty.');
        return;
      }
      if (parsed.length > 100) {
        setError('Array too large for visualization (max 100 elements).');
        return;
      }

      if (needsSorted && !sortedArray) {
        for (let i = 1; i < parsed.length; i++) {
          if (parsed[i] < parsed[i - 1]) {
            setShowSortPrompt(true);
            return;
          }
        }
      }

      const parsedTarget = showTarget ? Number(targetStr) : target;
      if (showTarget && Number.isNaN(parsedTarget)) {
        setError('Target must be a valid number.');
        return;
      }

      const input: AlgorithmInput = { array: parsed, target: parsedTarget };
      if (showHours) {
        const h = Number(hoursStr);
        if (Number.isNaN(h) || h < parsed.length) {
          setError('Hours must be at least equal to the number of piles.');
          return;
        }
        input.extra = { h };
      }

      onApply(input);
      setArrayStr(parsed.join(', '));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid input');
    }
  };

  const handleSortAuto = () => {
    const parsed = arrayStr
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map(Number)
      .sort((a, b) => a - b);
    const sortedStr = parsed.join(', ');
    setArrayStr(sortedStr);
    handleApply(parsed);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
          Array (comma separated)
        </label>
        <input
          type="text"
          value={arrayStr}
          onChange={(e) => setArrayStr(e.target.value)}
          placeholder="1, 3, 5, 7, 9"
          className="input-field font-mono text-sm"
        />
      </div>

      {showTarget && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">Target</label>
          <input
            type="text"
            value={targetStr}
            onChange={(e) => setTargetStr(e.target.value)}
            placeholder="5"
            className="input-field font-mono text-sm"
          />
        </div>
      )}

      {showHours && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">Hours (h)</label>
          <input
            type="text"
            value={hoursStr}
            onChange={(e) => setHoursStr(e.target.value)}
            placeholder="8"
            className="input-field font-mono text-sm"
          />
        </div>
      )}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 rounded-lg bg-rose-500/10 border border-rose-500/30 p-3"
          >
            <AlertCircle className="h-4 w-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm text-rose-300 font-mono">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSortPrompt && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-3 rounded-lg bg-amber-500/10 border border-amber-500/30 p-3"
          >
            <span className="text-xs sm:text-sm text-amber-300">
              Binary Search requires a sorted array. Would you like us to sort it automatically?
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleSortAuto}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all active:scale-95"
              >
                <Wand2 className="h-3.5 w-3.5" />
                Sort automatically
              </button>
              <button
                onClick={() => {
                  setShowSortPrompt(false);
                  const parsed = arrayStr.split(',').map((s) => s.trim()).filter((s) => s.length > 0).map(Number);
                  onApply({ array: parsed, target: Number(targetStr) });
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold transition-all active:scale-95"
              >
                Keep my input
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => handleApply()}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-blue-600/30"
      >
        <Play className="h-4 w-4 fill-current" />
        Apply & Visualize
      </button>
    </div>
  );
}
