export type Language = 'c' | 'cpp' | 'java';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Pattern =
  | 'Basic Binary Search'
  | 'Search Range'
  | 'Rotated Array'
  | 'Peak Finding'
  | 'Binary Search on Answer';

export type VisualizationType =
  | 'binary-search'
  | 'binary-search-range'
  | 'rotated-binary-search'
  | 'peak-finding'
  | 'binary-search-on-answer';

export type ElementState =
  | 'default'
  | 'active-range'
  | 'low'
  | 'mid'
  | 'high'
  | 'target'
  | 'eliminated'
  | 'found';

export interface ArrayElementState {
  value: number | string;
  index: number;
  state: ElementState;
}

export interface VisualizationStep {
  array: ArrayElementState[];
  low: number;
  mid: number;
  high: number;
  target: number;
  activeLine: number;
  explanation: string;
  condition?: string;
  action?: string;
  result?: 'found' | 'not-found' | 'in-progress' | 'success';
  comparisons?: number;
  [key: string]: unknown;
}

export interface Complexity {
  time: string;
  space: string;
  description: string;
}

export interface AlgorithmInput {
  array: number[];
  target: number;
  extra?: Record<string, unknown>;
}

export interface Algorithm {
  id: string;
  name: string;
  description: string;
  pattern: string;
  visualizationType: string;
  generateSteps(input: AlgorithmInput): VisualizationStep[];
  getComplexity(): Complexity;
  getCode(language: Language): string[];
  getDefaultInput(): AlgorithmInput;
  validateInput(input: AlgorithmInput): string | null;
}
