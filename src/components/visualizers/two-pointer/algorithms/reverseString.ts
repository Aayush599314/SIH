import type { TwoPointerProblem, Step } from '../types';

export const reverseString: TwoPointerProblem = {
  metadata: {
    id: 344,
    title: 'Reverse String',
    leetcode: 344,
    difficulty: 'Easy',
    pattern: 'String',
    dataStructure: 'String',
    visualizationType: 'string',
    companies: ['Amazon', 'Microsoft', 'Apple'],
    description: 'Write a function that reverses a string. The input is given as an array of characters.',
    defaultInput: 'hello',
    whyItWorks: [
      'To reverse, we swap the first and last characters, then the second and second-to-last, and so on.',
      'The pointers meet in the middle, at which point every character has been swapped exactly once.',
      'This is an in-place operation requiring no extra space.',
    ],
    commonMistakes: [
      'Swapping past the midpoint (re-swapping and undoing the reversal).',
      'Using left <= right instead of left < right.',
      'Forgetting that strings are immutable in some languages (use char arrays).',
    ],
    hints: [
      'Place left at 0 and right at the last index.',
      'Swap s[left] and s[right], then move both inward.',
      'Stop when left >= right.',
    ],
  },

  generateSteps(input: string): Step[] {
    const chars = (input.trim() || 'hello').split('');
    const steps: Step[] = [];
    let left = 0;
    let right = chars.length - 1;

    steps.push({
      pointers: [
        { name: 'L', index: left, color: 'sky' },
        { name: 'R', index: right, color: 'rose' },
      ],
      array: [],
      stringData: [...chars],
      activeLine: 1,
      comparison: 'Initialize',
      values: { left, right },
      action: 'Initialize pointers',
      explanation: `Start with L at 0 and R at ${right}. We will swap characters at L and R, then move both inward.`,
      highlights: { [left]: 'active', [right]: 'active' },
    });

    while (left < right) {
      steps.push({
        pointers: [
          { name: 'L', index: left, color: 'sky' },
          { name: 'R', index: right, color: 'rose' },
        ],
        array: [],
        stringData: [...chars],
        activeLine: 3,
        comparison: `swap '${chars[left]}' ↔ '${chars[right]}'`,
        values: { left, right, 's[left]': chars[left], 's[right]': chars[right] },
        action: 'Swap characters',
        explanation: `Swap '${chars[left]}' at index ${left} with '${chars[right]}' at index ${right}.`,
        highlights: { [left]: 'swap', [right]: 'swap' },
      });
      [chars[left], chars[right]] = [chars[right], chars[left]];
      steps.push({
        pointers: [
          { name: 'L', index: left, color: 'sky' },
          { name: 'R', index: right, color: 'rose' },
        ],
        array: [],
        stringData: [...chars],
        activeLine: 3,
        comparison: `After swap: "${chars.join('')}"`,
        values: { left, right, 's[left]': chars[left], 's[right]': chars[right] },
        action: 'Swap complete',
        explanation: `After the swap, the string is "${chars.join('')}". Move both pointers inward.`,
        highlights: { [left]: 'success', [right]: 'success' },
      });
      left++;
      right--;
    }

    steps.push({
      pointers: [
        { name: 'L', index: left, color: 'sky' },
        { name: 'R', index: right, color: 'rose' },
      ],
      array: [],
      stringData: [...chars],
      activeLine: 5,
      comparison: 'left >= right',
      values: { left, right },
      action: 'Done',
      explanation: `The pointers have met or crossed. The string is fully reversed: "${chars.join('')}".`,
      result: chars.join(''),
      done: true,
    });
    return steps;
  },

  getCode() {
    return {
      c: [
        'void reverseString(char* s, int size) {',
        '    int left = 0, right = size - 1;',
        '    while (left < right) {',
        '        char temp = s[left];',
        '        s[left] = s[right];',
        '        s[right] = temp;',
        '        left++; right--;',
        '    }',
        '}',
      ],
      cpp: [
        'void reverseString(vector<char>& s) {',
        '    int left = 0, right = s.size() - 1;',
        '    while (left < right) {',
        '        swap(s[left], s[right]);',
        '        left++; right--;',
        '    }',
        '}',
      ],
      java: [
        'void reverseString(char[] s) {',
        '    int left = 0, right = s.length - 1;',
        '    while (left < right) {',
        '        char temp = s[left];',
        '        s[left] = s[right];',
        '        s[right] = temp;',
        '        left++; right--;',
        '    }',
        '}',
      ],
    };
  },

  validateInput(input: string): string | null {
    if (!input.trim()) return 'Enter a string to reverse.';
    return null;
  },

  getComplexity() {
    return { time: 'O(n)', space: 'O(1)' };
  },
};
