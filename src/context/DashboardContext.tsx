import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { AIAnalysisResult, AIMode, VisualizerId } from "@/types";
import { VISUALIZER_MAP } from "@/data/visualizers";
import { analyzeWithGemini } from "@/services/gemini";

interface DashboardContextValue {
  selectedVisualizer: VisualizerId;
  setSelectedVisualizer: (id: VisualizerId) => void;

  ai: {
    status: "idle" | "loading" | "success" | "error";
    mode: AIMode;
    input: string;
    result: AIAnalysisResult | null;
    error: string | null;
  };
  setAIMode: (mode: AIMode) => void;
  setAIInput: (input: string) => void;
  runAnalysis: () => Promise<void>;
  resetAI: () => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [selectedVisualizer, setSelectedVisualizer] = useState<VisualizerId>("array");

  const [mode, setMode] = useState<AIMode>("ask");
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const analysis = await analyzeWithGemini(input, mode);
      setResult(analysis);
      setStatus("success");

      // Auto-route to the matching visualizer, if we recognize the data structure.
      const dsLower = analysis.dataStructure.toLowerCase();
      const match = Object.values(VISUALIZER_MAP).find(
        (v) => dsLower.includes(v.id.replace("-", " ")) || dsLower.includes(v.name.toLowerCase()),
      );
      if (match) setSelectedVisualizer(match.id);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }, [input, mode]);

  const resetAI = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setError(null);
  }, []);

  const value = useMemo<DashboardContextValue>(
    () => ({
      selectedVisualizer,
      setSelectedVisualizer,
      ai: { status, mode, input, result, error },
      setAIMode: setMode,
      setAIInput: setInput,
      runAnalysis,
      resetAI,
    }),
    [selectedVisualizer, status, mode, input, result, error, runAnalysis, resetAI],
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within a DashboardProvider");
  return ctx;
}
