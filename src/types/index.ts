// ---------------------------------------------------------------------------
// Core domain types shared across the dashboard, sidebar and visualizers.
// ---------------------------------------------------------------------------

export type VisualizerId =
  | "array"
  | "linked-list"
  | "binary-search"
  | "stack"
  | "queue"
  | "dynamic-programming"
  | "hashmap"
  | "tree"
  | "graph"
  | "sorting"
  | "two-pointer";

export interface VisualizerMeta {
  id: VisualizerId;
  number: string;
  name: string;
  shortLabel: string;
  description: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  delta: string;
  trend: "up" | "down" | "flat";
  accent: "lime" | "cyan" | "orange" | "violet";
}

export interface RecentPlayground {
  id: string;
  visualizer: VisualizerId;
  title: string;
  meta: string;
  preview: string[];
  lastOpened: string;
}

export interface ActivityItem {
  id: string;
  visualizer: VisualizerId;
  title: string;
  detail: string;
  time: string;
  accent: "lime" | "cyan" | "orange" | "violet";
}

export interface StreakInfo {
  days: number;
  weeklyGoalPct: number;
}

// ---------------------------------------------------------------------------
// Gemini AI analysis contract
// ---------------------------------------------------------------------------

export interface AIAnalysisStep {
  step: number;
  description: string;
}

export interface AIAnalysisResult {
  topic: string;
  dataStructure: string;
  algorithm: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  steps: AIAnalysisStep[];
}

export type AIMode = "ask" | "explain" | "dryrun" | "complexity";

export interface AIAssistantState {
  status: "idle" | "loading" | "success" | "error";
  mode: AIMode;
  input: string;
  result: AIAnalysisResult | null;
  error: string | null;
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}
