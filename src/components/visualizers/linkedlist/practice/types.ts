export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Category = 'Beginner' | 'Intermediate' | 'Advanced';

export interface TestCase {
  id: string;
  input: string; // Display string, e.g. "head = [1,2,3,4,5], k = 2"
  expectedOutput: string; // Display string, e.g. "[4,5]" or "true"
  rawInput: any; // Structured input values for engine evaluation
  expectedRawOutput: any; // Structured expected result
  explanation?: string;
  isEdgeCase?: boolean;
}

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  number: number;
  title: string;
  difficulty: Difficulty;
  category: Category;
  description: string;
  inputDesc: string;
  outputDesc: string;
  constraints: string[];
  examples: ProblemExample[];
  starterCode: string;
  functionName: string;
  visibleTestCases: TestCase[];
  hiddenTestCases: TestCase[];
  hints: string[]; // Progressive hints: Hint 1, Hint 2, Hint 3
  expectedComplexity: {
    time: string;
    space: string;
  };
  explanation: string;
  approachDescription: string;
  referenceSolution: string;
}

export interface TestCaseResult {
  testCase: TestCase;
  passed: boolean;
  actualOutput: string;
  errorMessage?: string;
  executionTrace?: TraceStep[];
}

export interface ExecutionResult {
  status: 'Accepted' | 'Wrong Answer' | 'Compilation Error' | 'Runtime Error';
  errorMessage?: string;
  testResults: TestCaseResult[];
  runtimeMs: number;
  memoryKb: number;
  totalPassed: number;
  totalCases: number;
  executionTrace?: TraceStep[];
}

export interface PointerInfo {
  name: string; // e.g. 'curr', 'prev', 'next', 'slow', 'fast', 'p1', 'p2', 'dummy'
  nodeId: string | null;
  color?: string; // Optional custom color badge
}

export interface VisualNode {
  id: string;
  value: number | string;
  next: string | null;
  isCycle?: boolean;
}

export interface TraceStep {
  stepNumber: number;
  description: string;
  nodes: VisualNode[];
  headId: string | null;
  pointers: PointerInfo[];
  highlightedNodeIds?: string[];
  modifiedPointerIds?: { fromId: string; toId: string | null }[];
  isTerminated?: boolean;
  returnValue?: string;
}
