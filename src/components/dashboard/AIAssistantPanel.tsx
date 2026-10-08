import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  MessageCircleQuestion,
  Code2,
  ListOrdered,
  Gauge,
  Loader2,
  AlertTriangle,
  ArrowRight,
  Key,
  Check,
  ExternalLink,
  X,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useDashboard } from "@/context/DashboardContext";
import { cn } from "@/lib/cn";
import { setCustomApiKey, hasApiKey } from "@/services/gemini";
import type { AIMode } from "@/types";

const MODES: { id: AIMode; label: string; icon: typeof MessageCircleQuestion; placeholder: string }[] = [
  {
    id: "ask",
    label: "Ask a question",
    icon: MessageCircleQuestion,
    placeholder: "e.g. Why is a hash map's average lookup O(1) but worst case O(n)?",
  },
  {
    id: "explain",
    label: "Explain code",
    icon: Code2,
    placeholder: "Paste a C++ function and the AI will explain what it does...",
  },
  {
    id: "dryrun",
    label: "Dry run",
    icon: ListOrdered,
    placeholder: "Paste code or describe a problem to trace step-by-step...",
  },
  {
    id: "complexity",
    label: "Complexity",
    icon: Gauge,
    placeholder: "Paste code or an algorithm to get a Big-O breakdown...",
  },
];

export function AIAssistantPanel() {
  const { ai, setAIMode, setAIInput, runAnalysis } = useDashboard();
  const [expandedSteps, setExpandedSteps] = useState(true);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [hasKey, setHasKey] = useState(false);
  const [keySavedMessage, setKeySavedMessage] = useState(false);
  const activeMode = MODES.find((m) => m.id === ai.mode) ?? MODES[0];

  useEffect(() => {
    setHasKey(hasApiKey());
  }, []);

  const handleSaveKey = () => {
    if (!apiKeyInput.trim()) return;
    setCustomApiKey(apiKeyInput.trim());
    setHasKey(true);
    setKeySavedMessage(true);
    setTimeout(() => {
      setKeySavedMessage(false);
      setShowKeyModal(false);
    }, 1200);
    if (ai.input.trim()) {
      runAnalysis();
    }
  };

  const handleClearKey = () => {
    setCustomApiKey("");
    setApiKeyInput("");
    setHasKey(hasApiKey());
    setShowKeyModal(false);
  };

  return (
    <GlassCard id="ai-assistant" raised className="scroll-mt-24">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-400/30 bg-violet-400/10 text-violet-300">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[14px] font-semibold text-[var(--color-ink)]">AI Assistant</p>
              <button
                type="button"
                onClick={() => setShowKeyModal((v) => !v)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium transition-colors",
                  hasKey
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                    : "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20",
                )}
                title="Configure Gemini API Key"
              >
                <Key className="h-2.5 w-2.5" />
                <span>{hasKey ? "Key Configured" : "Add Key"}</span>
              </button>
            </div>
            <p className="text-[11.5px] text-[var(--color-ink-faint)]">Powered by Gemini AI</p>
          </div>
        </div>

        {/* Mode tabs */}
        <div className="flex flex-wrap gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
          {MODES.map((mode) => {
            const Icon = mode.icon;
            const active = mode.id === ai.mode;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setAIMode(mode.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition-colors",
                  active
                    ? "bg-violet-400/15 text-violet-200"
                    : "text-[var(--color-ink-dim)] hover:text-[var(--color-ink)]",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Key Config Banner / Card */}
      <AnimatePresence>
        {showKeyModal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-5 overflow-hidden rounded-xl border border-violet-400/25 bg-violet-950/20 p-4"
          >
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-violet-300" />
                <span className="text-[13px] font-semibold text-[var(--color-ink)]">
                  Gemini API Key Configuration
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[12px] text-[var(--color-ink-dim)]">
              You can paste your key here directly (stored in your browser) or set{" "}
              <code className="rounded bg-white/10 px-1 py-0.5 text-violet-200">VITE_GEMINI_API_KEY</code> in{" "}
              <code className="rounded bg-white/10 px-1 py-0.5 text-violet-200">.env</code> and restart your Vite
              server.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="min-w-[240px] flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 font-mono text-[12px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] outline-none focus:border-violet-400/50"
              />
              <button
                type="button"
                onClick={handleSaveKey}
                className="inline-flex items-center gap-1.5 rounded-lg bg-violet-400 px-3.5 py-1.5 text-[12px] font-semibold text-[#0e0a1a] hover:bg-violet-300"
              >
                {keySavedMessage ? <Check className="h-3.5 w-3.5" /> : null}
                {keySavedMessage ? "Saved!" : "Save Key"}
              </button>
              {hasKey && (
                <button
                  type="button"
                  onClick={handleClearKey}
                  className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-[12px] font-medium text-red-300 hover:bg-red-500/20"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--color-ink-faint)]">
              <span>Status: {hasKey ? "Key active" : "No key detected"}</span>
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-violet-300 hover:underline"
              >
                Get a free key from Google AI Studio <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Input */}
        <div className="flex flex-col">
          <textarea
            value={ai.input}
            onChange={(e) => setAIInput(e.target.value)}
            placeholder={activeMode.placeholder}
            rows={8}
            className="w-full flex-1 resize-none rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 font-mono text-[12.5px] leading-relaxed text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] outline-none transition-colors focus:border-violet-400/40"
          />
          <button
            type="button"
            onClick={runAnalysis}
            disabled={ai.status === "loading"}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-400 px-4 py-2.5 text-[13px] font-semibold text-[#0e0a1a] transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {ai.status === "loading" ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                AI Analysis
              </>
            )}
          </button>
        </div>

        {/* Output */}
        <div className="min-h-[220px] rounded-xl border border-[var(--color-border)] bg-[var(--color-abyss)]/60 p-4">
          <AnimatePresence mode="wait">
            {ai.status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-[190px] flex-col items-center justify-center gap-2 text-center"
              >
                <Sparkles className="h-5 w-5 text-[var(--color-ink-faint)]" />
                <p className="max-w-[220px] text-[12.5px] text-[var(--color-ink-faint)]">
                  Structured analysis — data structure, algorithm, complexity, and a step-by-step dry run —
                  will appear here.
                </p>
              </motion.div>
            )}

            {ai.status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-[190px] flex-col items-center justify-center gap-2.5 p-3 text-center"
              >
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                <p className="max-w-[320px] text-[12.5px] leading-relaxed text-orange-300">{ai.error}</p>
                {(!hasKey || ai.error?.toLowerCase().includes("key")) && (
                  <div className="mt-2 flex w-full max-w-sm flex-col gap-2 rounded-xl border border-violet-500/20 bg-violet-950/40 p-3 text-left">
                    <p className="text-[11.5px] font-medium text-violet-200">
                      Paste Gemini API key to activate:
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        placeholder="AIzaSy..."
                        value={apiKeyInput}
                        onChange={(e) => setApiKeyInput(e.target.value)}
                        className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 font-mono text-[12px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] outline-none focus:border-violet-400/50"
                      />
                      <button
                        type="button"
                        onClick={handleSaveKey}
                        className="rounded-lg bg-violet-400 px-3 py-1.5 text-[12px] font-semibold text-[#0e0a1a] hover:bg-violet-300 transition-colors"
                      >
                        Save & Run
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[var(--color-ink-faint)]">
                      <span>Stored in your browser</span>
                      <a
                        href="https://aistudio.google.com/apikey"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-violet-300 hover:underline"
                      >
                        Get free key <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {ai.status === "success" && ai.result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3.5"
              >
                <div>
                  <p className="text-[13.5px] font-semibold text-[var(--color-ink)]">{ai.result.topic}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Tag label="Structure" value={ai.result.dataStructure} tone="lime" />
                    <Tag label="Algorithm" value={ai.result.algorithm} tone="cyan" />
                    <Tag label="Time" value={ai.result.timeComplexity} tone="orange" mono />
                    <Tag label="Space" value={ai.result.spaceComplexity} tone="violet" mono />
                  </div>
                </div>

                <p className="text-[12.5px] leading-relaxed text-[var(--color-ink-dim)]">
                  {ai.result.explanation}
                </p>

                {ai.result.steps.length > 0 && (
                  <div>
                    <button
                      type="button"
                      onClick={() => setExpandedSteps((v) => !v)}
                      className="flex items-center gap-1.5 text-[11.5px] font-medium text-[var(--color-ink-dim)] hover:text-[var(--color-ink)]"
                    >
                      <ArrowRight
                        className={cn("h-3 w-3 transition-transform", expandedSteps && "rotate-90")}
                      />
                      Execution steps ({ai.result.steps.length})
                    </button>
                    {expandedSteps && (
                      <ol className="mt-2 flex flex-col gap-2 border-l border-[var(--color-border)] pl-3">
                        {ai.result.steps.map((s) => (
                          <li key={s.step} className="text-[12px] leading-relaxed text-[var(--color-ink-dim)]">
                            <span className="mr-1.5 font-mono text-lime-400">{s.step}.</span>
                            {s.description}
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </GlassCard>
  );
}

function Tag({
  label,
  value,
  tone,
  mono = false,
}: {
  label: string;
  value: string;
  tone: "lime" | "cyan" | "orange" | "violet";
  mono?: boolean;
}) {
  const map = {
    lime: "border-lime-400/30 bg-lime-400/10 text-lime-300",
    cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
    orange: "border-orange-400/30 bg-orange-400/10 text-orange-300",
    violet: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  } as const;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px]", map[tone])}>
      <span className="text-[var(--color-ink-faint)]">{label}</span>
      <span className={cn("font-medium", mono && "font-mono")}>{value}</span>
    </span>
  );
}
