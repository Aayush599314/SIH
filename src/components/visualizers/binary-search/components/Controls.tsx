import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import type { PlayState } from '../hooks/useVisualizer';

interface ControlsProps {
  playState: PlayState;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

const speedOptions = [0.5, 1, 1.5, 2];

export function Controls({
  playState,
  currentStep,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onPrev,
  onNext,
  onReset,
  onSpeedChange,
}: ControlsProps) {
  const isPlaying = playState === 'playing';
  const atStart = currentStep === 0;
  const atEnd = currentStep >= totalSteps - 1;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={atStart}
            className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 text-slate-200"
            title="Previous Step (Left Arrow)"
          >
            <SkipBack className="h-4 w-4" />
          </button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={isPlaying ? onPause : onPlay}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all duration-200"
            title="Play/Pause (Space)"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current" />
                <span>Play</span>
              </>
            )}
          </motion.button>

          <button
            onClick={onNext}
            disabled={atEnd}
            className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 text-slate-200"
            title="Next Step (Right Arrow)"
          >
            <SkipForward className="h-4 w-4" />
          </button>

          <button
            onClick={onReset}
            className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 active:scale-95 text-slate-200"
            title="Reset (R)"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono text-slate-400 mr-1">Speed:</span>
          {speedOptions.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 ${
                speed === s
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 border border-white/5'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-slate-400 min-w-[70px]">
          {currentStep + 1} / {totalSteps}
        </span>
        <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
            initial={false}
            animate={{ width: `${totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
      </div>
    </div>
  );
}
