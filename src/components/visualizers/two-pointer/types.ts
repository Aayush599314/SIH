export type Language = 'c' | 'cpp' | 'java';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Pattern =
  | 'Opposite Direction'
  | 'Fast & Slow'
  | 'Linked List'
  | 'Partition'
  | 'String'
  | 'Sorting + Two Pointers';

export type DataStructure = 'Array' | 'String' | 'Linked List';

export type VisualizationType = 'array' | 'string' | 'linked-list';

export interface PointerState {
  name: string;
  index: number;
  color: string;
}

export interface Step {
  pointers: PointerState[];
  array: number[];
  stringData?: string[];
  linkedList?: { value: number; next: number }[];
  activeLine: number;
  comparison?: string;
  values: Record<string, number | string | boolean | null>;
  action: string;
  explanation: string;
  result?: number[] | number | string | null;
  done?: boolean;
  highlights?: Record<number, 'active' | 'compare' | 'eliminated' | 'success' | 'swap' | 'result' | undefined>;
}

export interface Complexity {
  time: string;
  space: string;
}

export interface ProblemMetadata {
  id: number;
  title: string;
  leetcode: number;
  difficulty: Difficulty;
  pattern: Pattern;
  dataStructure: DataStructure;
  visualizationType: VisualizationType;
  companies: string[];
  description: string;
  defaultInput: string;
  defaultTarget?: string;
  whyItWorks: string[];
  commonMistakes: string[];
  hints: string[];
}

export interface CodeMap {
  c: string[];
  cpp: string[];
  java: string[];
}

export interface TwoPointerProblem {
  metadata: ProblemMetadata;
  generateSteps(input: string, target?: string): Step[];
  getCode(): CodeMap;
  validateInput(input: string, target?: string): string | null;
  getComplexity(): Complexity;
}

export interface ProblemSummary {
  id: number;
  title: string;
  difficulty: Difficulty;
  pattern: Pattern;
  dataStructure: DataStructure;
  companies: string[];
  leetcode: number;
  visualizationType: VisualizationType;
}
