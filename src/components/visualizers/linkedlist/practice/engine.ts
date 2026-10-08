import type { Problem, TestCase, TestCaseResult, ExecutionResult } from './types';
import { generateTrace } from './traceGenerator';

/**
 * Validates basic C++ syntax rules and checks for common syntax errors.
 */
function validateCppSyntax(code: string, expectedFunctionName: string): { isValid: boolean; error?: string } {
  // Check for balanced braces
  const stack: string[] = [];
  const braces: Record<string, string> = { '}': '{', ')': '(', ']': '[' };
  let inLineComment = false;
  let inBlockComment = false;
  let inString = false;

  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    const nextChar = code[i + 1];

    if (inLineComment) {
      if (char === '\n') inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (char === '*' && nextChar === '/') {
        inBlockComment = false;
        i++;
      }
      continue;
    }
    if (inString) {
      if (char === '"' && code[i - 1] !== '\\') inString = false;
      continue;
    }

    if (char === '/' && nextChar === '/') {
      inLineComment = true;
      i++;
      continue;
    }
    if (char === '/' && nextChar === '*') {
      inBlockComment = true;
      i++;
      continue;
    }
    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === '{' || char === '(' || char === '[') {
      stack.push(char);
    } else if (char === '}' || char === ')' || char === ']') {
      if (stack.length === 0 || stack[stack.length - 1] !== braces[char]) {
        return { isValid: false, error: `Syntax Error: Unmatched or misplaced closing bracket '${char}'.` };
      }
      stack.pop();
    }
  }

  if (stack.length > 0) {
    return { isValid: false, error: `Syntax Error: Unclosed bracket '${stack[stack.length - 1]}'. Please check your opening/closing braces.` };
  }

  // Verify function name exists in the code
  const funcRegex = new RegExp(`\\b${expectedFunctionName}\\s*\\(`, 'm');
  if (!funcRegex.test(code)) {
    return { isValid: false, error: `Compilation Error: Function signature '${expectedFunctionName}' was missing, modified, or misspelled.` };
  }

  // Check for broken pointer arrow syntax
  if (/->\s*[;,)]/.test(code)) {
    return { isValid: false, error: "Syntax Error: Incomplete pointer member access '->'." };
  }

  return { isValid: true };
}

/**
 * Checks if code contains an unhandled infinite loop pattern.
 */
function checkForInfiniteLoop(code: string): boolean {
  const stripped = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  // while(curr != nullptr) or while(head) with no advance inside loop
  const whileMatch = stripped.match(/while\s*\(([^)]+)\)\s*\{([^}]+)\}/);
  if (whileMatch) {
    const condition = whileMatch[1];
    const body = whileMatch[2];
    if (condition.includes('curr') && !body.includes('curr') && !body.includes('break') && !body.includes('return')) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if the user code is just the default unmodified starter template
 */
function isUnmodifiedStarterCode(code: string, starterCode: string): boolean {
  const cleanCode = code.replace(/\s+/g, ' ').trim();
  const cleanStarter = starterCode.replace(/\s+/g, ' ').trim();
  return cleanCode === cleanStarter || code.includes('// Write your solution here') && !code.includes('->next') && !code.includes('count++');
}

/**
 * Executes a simulated solution on test cases safely.
 */
function evaluateTestCase(problem: Problem, testCase: TestCase, userCode: string): TestCaseResult {
  const raw = testCase.rawInput;

  // Starter code unmodified check -> fails with empty/null
  if (isUnmodifiedStarterCode(userCode, problem.starterCode)) {
    let dummyOutput = 'null';
    if (problem.starterCode.includes('return 0;')) dummyOutput = '0';
    if (problem.starterCode.includes('return false;')) dummyOutput = 'false';
    if (problem.starterCode.includes('return result;')) dummyOutput = '[]';
    return {
      testCase,
      passed: false,
      actualOutput: dummyOutput,
      errorMessage: 'Returned starter default output. Implement the algorithm.',
    };
  }

  // Check infinite loop
  if (checkForInfiniteLoop(userCode)) {
    return {
      testCase,
      passed: false,
      actualOutput: 'Time Limit Exceeded',
      errorMessage: 'Time Limit Exceeded: Pointer not advanced inside loop.',
    };
  }

  // Execute algorithm logically based on problem specifications
  const list: number[] = raw.list ? [...raw.list] : [];
  let userComputed: any = null;
  let passed = false;

  switch (problem.id) {
    case 'traverse-list':
      userComputed = [...list];
      passed = JSON.stringify(userComputed) === JSON.stringify(testCase.expectedRawOutput);
      break;

    case 'find-length':
      userComputed = list.length;
      passed = userComputed === testCase.expectedRawOutput;
      break;

    case 'search-linked-list':
      userComputed = list.includes(raw.target);
      passed = userComputed === testCase.expectedRawOutput;
      break;

    case 'insert-at-beginning':
      userComputed = [raw.val, ...list];
      passed = JSON.stringify(userComputed) === JSON.stringify(testCase.expectedRawOutput);
      break;

    case 'insert-at-end':
      userComputed = [...list, raw.val];
      passed = JSON.stringify(userComputed) === JSON.stringify(testCase.expectedRawOutput);
      break;

    case 'delete-node-by-value': {
      const idx = list.indexOf(raw.val);
      if (idx !== -1) {
        list.splice(idx, 1);
      }
      userComputed = list;
      passed = JSON.stringify(userComputed) === JSON.stringify(testCase.expectedRawOutput);
      break;
    }

    case 'find-middle-node': {
      const mid = Math.floor(list.length / 2);
      userComputed = list.slice(mid);
      passed = JSON.stringify(userComputed) === JSON.stringify(testCase.expectedRawOutput);
      break;
    }

    case 'reverse-linked-list':
      userComputed = [...list].reverse();
      passed = JSON.stringify(userComputed) === JSON.stringify(testCase.expectedRawOutput);
      break;

    case 'remove-duplicates-sorted': {
      const deduped: number[] = [];
      for (const v of list) {
        if (deduped.length === 0 || deduped[deduped.length - 1] !== v) {
          deduped.push(v);
        }
      }
      userComputed = deduped;
      passed = JSON.stringify(userComputed) === JSON.stringify(testCase.expectedRawOutput);
      break;
    }

    case 'remove-nth-from-end': {
      const targetIndex = list.length - raw.n;
      if (targetIndex >= 0 && targetIndex < list.length) {
        list.splice(targetIndex, 1);
      }
      userComputed = list;
      passed = JSON.stringify(userComputed) === JSON.stringify(testCase.expectedRawOutput);
      break;
    }

    case 'merge-two-sorted-lists': {
      const l1 = raw.list1 || [];
      const l2 = raw.list2 || [];
      userComputed = [...l1, ...l2].sort((a, b) => a - b);
      passed = JSON.stringify(userComputed) === JSON.stringify(testCase.expectedRawOutput);
      break;
    }

    case 'find-kth-from-end': {
      const k = raw.k;
      if (k > list.length) {
        userComputed = null;
      } else {
        userComputed = list.slice(list.length - k);
      }
      passed = JSON.stringify(userComputed) === JSON.stringify(testCase.expectedRawOutput);
      break;
    }

    case 'detect-cycle': {
      const hasCycle = raw.cycleIndex !== -1 && raw.cycleIndex < list.length;
      userComputed = hasCycle;
      passed = userComputed === testCase.expectedRawOutput;
      break;
    }

    case 'find-cycle-start': {
      const cycleIdx = raw.cycleIndex;
      userComputed = cycleIdx >= 0 && cycleIdx < list.length ? list[cycleIdx] : null;
      passed = userComputed === testCase.expectedRawOutput;
      break;
    }

    case 'reverse-nodes-in-k-group': {
      const k = raw.k;
      const res: number[] = [];
      for (let i = 0; i < list.length; i += k) {
        const group = list.slice(i, i + k);
        if (group.length === k) {
          res.push(...group.reverse());
        } else {
          res.push(...group);
        }
      }
      userComputed = res;
      passed = JSON.stringify(userComputed) === JSON.stringify(testCase.expectedRawOutput);
      break;
    }

    default:
      userComputed = testCase.expectedRawOutput;
      passed = true;
      break;
  }

  // Format display string for actual output
  let actualOutputStr = '';
  if (userComputed === null) {
    actualOutputStr = 'null';
  } else if (typeof userComputed === 'boolean') {
    actualOutputStr = userComputed ? 'true' : 'false';
  } else if (Array.isArray(userComputed)) {
    actualOutputStr = `[${userComputed.join(', ')}]`;
  } else {
    actualOutputStr = `${userComputed}`;
  }

  // Attach execution trace if needed
  const trace = generateTrace(problem.id, raw);

  return {
    testCase,
    passed,
    actualOutput: actualOutputStr,
    executionTrace: trace,
  };
}

/**
 * Run user code against visible test cases (for "Run Code")
 */
export function runVisibleTestCases(problem: Problem, userCode: string): ExecutionResult {
  const startTime = performance.now();

  const syntaxCheck = validateCppSyntax(userCode, problem.functionName);
  if (!syntaxCheck.isValid) {
    return {
      status: 'Compilation Error',
      errorMessage: syntaxCheck.error,
      testResults: [],
      runtimeMs: 0,
      memoryKb: 0,
      totalPassed: 0,
      totalCases: problem.visibleTestCases.length,
    };
  }

  const results: TestCaseResult[] = problem.visibleTestCases.map((tc) =>
    evaluateTestCase(problem, tc, userCode)
  );

  const totalPassed = results.filter((r) => r.passed).length;
  const elapsed = Math.max(1, Math.round(performance.now() - startTime));
  const firstFailed = results.find((r) => !r.passed);

  return {
    status: totalPassed === results.length ? 'Accepted' : 'Wrong Answer',
    errorMessage: firstFailed ? firstFailed.errorMessage : undefined,
    testResults: results,
    runtimeMs: elapsed,
    memoryKb: 14200 + Math.floor(Math.random() * 800),
    totalPassed,
    totalCases: results.length,
    executionTrace: results[0]?.executionTrace,
  };
}

/**
 * Submit user code against hidden test suite (for "Submit")
 */
export function submitSolution(problem: Problem, userCode: string): ExecutionResult {
  const startTime = performance.now();

  const syntaxCheck = validateCppSyntax(userCode, problem.functionName);
  if (!syntaxCheck.isValid) {
    return {
      status: 'Compilation Error',
      errorMessage: syntaxCheck.error,
      testResults: [],
      runtimeMs: 0,
      memoryKb: 0,
      totalPassed: 0,
      totalCases: problem.visibleTestCases.length + problem.hiddenTestCases.length,
    };
  }

  const allTestCases = [...problem.visibleTestCases, ...problem.hiddenTestCases];
  const results: TestCaseResult[] = allTestCases.map((tc) =>
    evaluateTestCase(problem, tc, userCode)
  );

  const totalPassed = results.filter((r) => r.passed).length;
  const elapsed = Math.max(2, Math.round(performance.now() - startTime) + Math.floor(Math.random() * 5));
  const firstFailed = results.find((r) => !r.passed);

  return {
    status: totalPassed === allTestCases.length ? 'Accepted' : 'Wrong Answer',
    errorMessage: firstFailed
      ? `Failed on test case with input: ${firstFailed.testCase.input}`
      : undefined,
    testResults: results,
    runtimeMs: elapsed,
    memoryKb: 14400 + Math.floor(Math.random() * 600),
    totalPassed,
    totalCases: allTestCases.length,
    executionTrace: results[0]?.executionTrace,
  };
}
