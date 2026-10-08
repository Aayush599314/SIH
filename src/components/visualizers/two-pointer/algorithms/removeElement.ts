import type { TwoPointerProblem, Step } from '../types';
import { parseArray, parseNumber, clampArrayLength } from '../utils/parsers';

export const removeElement: TwoPointerProblem = {
  metadata: {
    id: 27,
    title: 'Remove Element',
    leetcode: 27,
    difficulty: 'Easy',
    pattern: 'Fast & Slow',
    dataStructure: 'Array',
    visualizationType: 'array',
    companies: ['Microsoft', 'Amazon'],
    description:
      'Given an array and a value, remove all occurrences of that value in-place and return the new length.',
    defaultInput: '3,2,2,3',
    defaultTarget: '3',
    whyItWorks: [
      'The slow pointer marks the end of the kept portion.',
      'fast scans every element; when it finds a value different from the target, it copies it to slow and advances slow.',
      'All occurrences of the target are overwritten by non-target values.',
    ],
    commonMistakes: [
      'Advancing slow on a match instead of on a non-match.',
      'Returning the wrong length.',
      'Confusing this with the remove-duplicates pattern.',
    ],
    hints: [
      'slow tracks where the next kept element goes.',
      'When nums[fast] != val, copy nums[fast] to nums[slow] and advance slow.',
      'Return slow as the new length.',
    ],
  },

  generateSteps(input: string, target?: string): Step[] {
    const nums = clampArrayLength(parseArray(input) ?? [3, 2, 2, 3]);
    const val = parseNumber(target ?? '3') ?? 3;
    const steps: Step[] = [];
    let slow = 0;

    steps.push({
      pointers: [{ name: 'slow', index: slow, color: 'sky' }],
      array: [...nums],
      activeLine: 1,
      comparison: 'Initialize',
      values: { slow, fast: 0, val },
      action: 'Initialize slow = 0',
      explanation: `We want to remove all occurrences of ${val}. slow marks where the next kept element goes.`,
      highlights: { [slow]: 'active' },
    });

    for (let fast = 0; fast < nums.length; fast++) {
      const keep = nums[fast] !== val;
      steps.push({
        pointers: [
          { name: 'slow', index: slow, color: 'sky' },
          { name: 'fast', index: fast, color: 'rose' },
        ],
        array: [...nums],
        activeLine: 3,
        comparison: `nums[fast]=${nums[fast]} vs val=${val} → ${keep ? 'keep' : 'remove'}`,
        values: { slow, fast, 'nums[fast]': nums[fast], val, keep },
        action: keep ? 'Keep this element' : 'Skip (matches val)',
        explanation: keep
          ? `nums[fast]=${nums[fast]} is not ${val}. Copy it to position ${slow} and advance slow.`
          : `nums[fast]=${nums[fast]} equals ${val}. Skip it — it will be overwritten.`,
        highlights: { [fast]: 'compare', [slow]: 'active' },
      });
      if (keep) {
        nums[slow] = nums[fast];
        slow++;
        steps.push({
          pointers: [
            { name: 'slow', index: slow, color: 'sky' },
            { name: 'fast', index: fast, color: 'rose' },
          ],
          array: [...nums],
          activeLine: 5,
          comparison: `nums[slow-1] = ${nums[slow - 1]}, slow = ${slow}`,
          values: { slow, fast, 'nums[slow-1]': nums[slow - 1] },
          action: 'Copied element, advanced slow',
          explanation: `Copied ${nums[slow - 1]} into position ${slow - 1}. slow is now ${slow}.`,
          highlights: { [slow - 1]: 'success', [fast]: 'active' },
        });
      }
    }

    steps.push({
      pointers: [{ name: 'slow', index: slow, color: 'sky' }],
      array: [...nums],
      activeLine: 8,
      comparison: 'fast reached end',
      values: { slow, newLength: slow },
      action: 'Done',
      explanation: `All occurrences of ${val} have been removed. The new length is ${slow}.`,
      result: slow,
      done: true,
    });
    return steps;
  },

  getCode() {
    return {
      c: [
        'int removeElement(int* nums, int size, int val) {',
        '    int slow = 0;',
        '    for (int fast = 0; fast < size; fast++) {',
        '        if (nums[fast] != val) {',
        '            nums[slow] = nums[fast];',
        '            slow++;',
        '        }',
        '    }',
        '    return slow;',
        '}',
      ],
      cpp: [
        'int removeElement(vector<int>& nums, int val) {',
        '    int slow = 0;',
        '    for (int fast = 0; fast < nums.size(); fast++) {',
        '        if (nums[fast] != val) {',
        '            nums[slow] = nums[fast];',
        '            slow++;',
        '        }',
        '    }',
        '    return slow;',
        '}',
      ],
      java: [
        'int removeElement(int[] nums, int val) {',
        '    int slow = 0;',
        '    for (int fast = 0; fast < nums.length; fast++) {',
        '        if (nums[fast] != val) {',
        '            nums[slow] = nums[fast];',
        '            slow++;',
        '        }',
        '    }',
        '    return slow;',
        '}',
      ],
    };
  },

  validateInput(input: string, target?: string): string | null {
    const nums = parseArray(input);
    if (!nums) return 'Enter a valid comma-separated list of numbers.';
    const v = parseNumber(target ?? '');
    if (v === null) return 'Enter a valid value to remove.';
    return null;
  },

  getComplexity() {
    return { time: 'O(n)', space: 'O(1)' };
  },
};
