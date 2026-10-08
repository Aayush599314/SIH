import { GoogleGenerativeAI, SchemaType, type Schema } from "@google/generative-ai";
import type { AIAnalysisResult, AIMode } from "@/types";

// ---------------------------------------------------------------------------
// Frontend-only Gemini integration. No backend, no proxy — the browser talks
// to Google's API directly using an API key exposed as a Vite env var
// or stored locally in localStorage.
//
// Setup: copy .env.example to .env and set VITE_GEMINI_API_KEY.
// Get a key at https://aistudio.google.com/apikey
// ---------------------------------------------------------------------------

const CANDIDATE_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];

export class GeminiConfigError extends Error {}

export function getApiKey(): string | undefined {
  const envKey = (import.meta.env.VITE_GEMINI_API_KEY as string | undefined)?.trim();
  if (envKey) return envKey;
  try {
    const localKey = localStorage.getItem("algominds_gemini_api_key")?.trim();
    if (localKey) return localKey;
  } catch {
    // ignore
  }
  return undefined;
}

export function setCustomApiKey(key: string): void {
  try {
    const trimmed = key.trim();
    if (!trimmed) {
      localStorage.removeItem("algominds_gemini_api_key");
    } else {
      localStorage.setItem("algominds_gemini_api_key", trimmed);
    }
  } catch {
    // ignore
  }
}

export function hasApiKey(): boolean {
  return Boolean(getApiKey());
}

function getModel(modelName: string) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new GeminiConfigError(
      "VITE_GEMINI_API_KEY is not set. Add it to .env or configure your key in the AI Assistant panel.",
    );
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: ANALYSIS_SCHEMA,
      temperature: 0.4,
    },
  });
}

const ANALYSIS_SCHEMA: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    topic: { type: SchemaType.STRING, description: "Short title for what was analyzed" },
    dataStructure: {
      type: SchemaType.STRING,
      description:
        "The primary data structure involved, e.g. Array, Linked List, Stack, Queue, Hash Map, Tree, Graph",
    },
    algorithm: { type: SchemaType.STRING, description: "The primary algorithm or technique used" },
    timeComplexity: { type: SchemaType.STRING, description: "Big-O time complexity, e.g. O(n log n)" },
    spaceComplexity: { type: SchemaType.STRING, description: "Big-O space complexity, e.g. O(n)" },
    explanation: { type: SchemaType.STRING, description: "A clear, concise explanation, 3-6 sentences" },
    steps: {
      type: SchemaType.ARRAY,
      description: "Ordered dry-run / execution steps",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          step: { type: SchemaType.NUMBER },
          description: { type: SchemaType.STRING },
        },
        required: ["step", "description"],
      },
    },
  },
  required: [
    "topic",
    "dataStructure",
    "algorithm",
    "timeComplexity",
    "spaceComplexity",
    "explanation",
    "steps",
  ],
};

const MODE_INSTRUCTIONS: Record<AIMode, string> = {
  ask: "Answer the following DSA (data structures & algorithms) question in depth.",
  explain: "Explain what the following code does, structurally and algorithmically.",
  dryrun: "Perform a careful step-by-step dry run / execution trace of the following code or problem.",
  complexity: "Focus primarily on a rigorous time and space complexity analysis of the following.",
};

const SYSTEM_PREAMBLE = `You are the AI engine inside AlgoMinds.AI, a data-structures-and-algorithms
learning playground. You analyze C++ code, DSA problems, or plain-language DSA
questions submitted by a learner and return a single structured JSON object
describing the data structure, algorithm, complexity and an ordered dry run.
Be precise, technically correct, and concise. If the input does not name an
explicit data structure, infer the most relevant one from context. Always
produce at least 3 dry-run steps unless the concept genuinely has fewer.`;

export async function analyzeWithGemini(
  input: string,
  mode: AIMode,
): Promise<AIAnalysisResult> {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Please enter some code, a problem statement, or a question first.");
  }

  const prompt = `${SYSTEM_PREAMBLE}\n\nTask: ${MODE_INSTRUCTIONS[mode]}\n\nUser input:\n"""\n${trimmed}\n"""\n\nRespond with ONLY the JSON object matching the required schema.`;

  let text: string | undefined;
  let lastError: unknown;

  for (const modelName of CANDIDATE_MODELS) {
    try {
      const model = getModel(modelName);
      const result = await model.generateContent(prompt);
      text = result.response.text();
      if (text) break;
    } catch (err) {
      lastError = err;
      const msg = err instanceof Error ? err.message : String(err);
      // Fallback if model is not found/unsupported on this API key tier
      if (
        msg.includes("404") ||
        msg.toLowerCase().includes("not found") ||
        msg.toLowerCase().includes("unsupported") ||
        msg.toLowerCase().includes("is not supported for generatecontent")
      ) {
        continue;
      }
      throw normalizeGeminiError(err);
    }
  }

  if (!text) {
    throw normalizeGeminiError(lastError ?? new Error("No response returned from Gemini."));
  }

  return parseAnalysis(text);
}

function parseAnalysis(raw: string): AIAnalysisResult {
  const cleaned = raw.trim().replace(/^```json\s*|^```\s*|```$/g, "");
  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("The AI response could not be parsed. Please try again.");
  }

  const p = parsed as Partial<AIAnalysisResult>;
  if (!p || typeof p !== "object" || !Array.isArray(p.steps)) {
    throw new Error("The AI response was missing required fields. Please try again.");
  }

  return {
    topic: p.topic ?? "Untitled analysis",
    dataStructure: p.dataStructure ?? "Unknown",
    algorithm: p.algorithm ?? "Unknown",
    timeComplexity: p.timeComplexity ?? "—",
    spaceComplexity: p.spaceComplexity ?? "—",
    explanation: p.explanation ?? "",
    steps: p.steps.map((s, i) => ({
      step: s?.step ?? i + 1,
      description: s?.description ?? "",
    })),
  };
}

function normalizeGeminiError(err: unknown): Error {
  const message = err instanceof Error ? err.message : String(err);
  if (message.includes("API_KEY_INVALID") || message.includes("API key not valid")) {
    return new Error("That Gemini API key looks invalid. Double-check your API key.");
  }
  if (message.includes("429") || message.toLowerCase().includes("quota")) {
    return new Error("Gemini rate limit hit. Wait a moment and try again.");
  }
  if (message.toLowerCase().includes("fetch") || message.toLowerCase().includes("network")) {
    return new Error(
      "Network/CORS error reaching Google Gemini API directly from the browser. Your browser or ISP/proxy may be blocking direct calls to generativelanguage.googleapis.com, or this API key type may require a backend proxy. Try using a standard Google AI Studio key (AIzaSy...) or check your internet/VPN.",
    );
  }
  return new Error(message || "Something went wrong talking to Gemini.");
}
