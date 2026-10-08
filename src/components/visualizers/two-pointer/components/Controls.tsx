import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (s: number) => void;
  currentStep: number;
  totalSteps: number;
  onStepSelect: (step: number) => void;
}

const speeds = [0.5, 1, 1.5, 2];

export function Controls({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  onReset,
  speed,
  onSpeedChange,
  currentStep,
  totalSteps,
  onStepSelect,
}: ControlsProps) {
  return (
    <div className="flex flex-col gap-3 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={currentStep === 0}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Previous step (←)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onTogglePlay}
          className="p-2.5 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-500/40 transition-colors"
          title="Play/Pause (Space)"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button
          onClick={onNext}
          disabled={currentStep >= totalSteps - 1}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Next step (→)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={onReset}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors ml-1"
          title="Reset (R)"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-xs text-slate-500 font-medium">Speed</span>
          <div className="flex gap-1">
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => onSpeedChange(s)}
                className={`px-2 py-1 rounded-md text-xs font-mono transition-colors ${
                  speed === s
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-slate-400 shrink-0">
          Step {currentStep + 1} / {totalSteps}
        </span>
        <input
          type="range"
          min={0}
          max={totalSteps - 1}
          value={currentStep}
          onChange={(e) => onStepSelect(Number(e.target.value))}
          className="flex-1 accent-sky-500 cursor-pointer"
        />
      </div>
    </div>
  );
}
