import type { TwoPointerProblem, Step } from '../types';
import { parseArray, clampArrayLength } from '../utils/parsers';

export const removeDuplicates: TwoPointerProblem = {
  metadata: {
    id: 26,
    title: 'Remove Duplicates from Sorted Array',
    leetcode: 26,
    difficulty: 'Easy',
    pattern: 'Fast & Slow',
    dataStructure: 'Array',
    visualizationType: 'array',
    companies: ['Google', 'Microsoft', 'Facebook'],
    description:
      'Given a sorted array, remove duplicates in-place and return the new length. Elements beyond the returned length are irrelevant.',
    defaultInput: '1,1,2,2,3,4,4,5',
    whyItWorks: [
      'The array is sorted, so duplicates are adjacent.',
      'slow marks the end of the unique portion.',
      'fast scans ahead; when it finds a value different from the last unique one, it copies it to slow+1.',
      'Each unique value is placed exactly once.',
    ],
    commonMistakes: [
      'Forgetting the array must be sorted.',
      'Comparing nums[fast] with nums[fast-1] instead of nums[slow].',
      'Returning the wrong length.',
    ],
    hints: [
      'Start slow at 0. The first element is always unique.',
      'For each fast from 1 to end, if nums[fast] != nums[slow], increment slow and copy.',
      'Return slow + 1 as the new length.',
    ],
  },

  generateSteps(input: string): Step[] {
    const nums = clampArrayLength(parseArray(input) ?? [1, 1, 2, 2, 3, 4, 4, 5]);
    const steps: Step[] = [];
    let slow = 0;

    steps.push({
      pointers: [{ name: 'slow', index: slow, color: 'sky' }],
      array: [...nums],
      activeLine: 1,
      comparison: 'Initialize',
      values: { slow, fast: 0, 'nums[slow]': nums[slow] },
      action: 'Initialize slow = 0',
      explanation: `The first element is always unique. slow marks the end of the unique portion, starting at index 0.`,
      highlights: { [slow]: 'success' },
    });

    for (let fast = 1; fast < nums.length; fast++) {
      steps.push({
        pointers: [
          { name: 'slow', index: slow, color: 'sky' },
          { name: 'fast', index: fast, color: 'rose' },
        ],
        array: [...nums],
        activeLine: 3,
        comparison: `nums[fast]=${nums[fast]} vs nums[slow]=${nums[slow]} → ${nums[fast] !== nums[slow] ? 'different' : 'duplicate'}`,
        values: { slow, fast, 'nums[slow]': nums[slow], 'nums[fast]': nums[fast] },
        action: nums[fast] !== nums[slow] ? 'New unique found' : 'Duplicate — skip',
        explanation:
          nums[fast] !== nums[slow]
            ? `nums[fast] (${nums[fast]}) is different from nums[slow] (${nums[slow]}). This is a new unique element.`
            : `nums[fast] (${nums[fast]}) equals nums[slow] (${nums[slow]}). It is a duplicate — skip it.`,
        highlights: { [slow]: 'active', [fast]: 'compare' },
      });

      if (nums[fast] !== nums[slow]) {
        slow++;
        nums[slow] = nums[fast];
        steps.push({
          pointers: [
            { name: 'slow', index: slow, color: 'sky' },
            { name: 'fast', index: fast, color: 'rose' },
          ],
          array: [...nums],
          activeLine: 5,
          comparison: `slow++ → slow=${slow}, nums[slow]=${nums[slow]}`,
          values: { slow, fast, 'nums[slow]': nums[slow], 'nums[fast]': nums[fast] },
          action: 'Copy unique element',
          explanation: `Increment slow to ${slow} and copy ${nums[fast]} into position ${slow}. The unique portion now extends one more element.`,
          highlights: { [slow]: 'success', [fast]: 'active' },
        });
      }
    }

    const newLen = slow + 1;
    steps.push({
      pointers: [{ name: 'slow', index: slow, color: 'sky' }],
      array: [...nums],
      activeLine: 8,
      comparison: 'fast reached end',
      values: { slow, newLength: newLen },
      action: 'Done',
      explanation: `All unique elements are in positions 0..${slow}. The new length is ${newLen}.`,
      result: newLen,
      done: true,
      highlights: Object.fromEntries(Array.from({ length: newLen }, (_, i) => [i, 'success' as const])),
    });
    return steps;
  },

  getCode() {
    return {
      c: [
        'int removeDuplicates(int* nums, int size) {',
        '    int slow = 0;',
        '    for (int fast = 1; fast < size; fast++) {',
        '        if (nums[fast] != nums[slow]) {',
        '            slow++;',
        '            nums[slow] = nums[fast];',
        '        }',
        '    }',
        '    return slow + 1;',
        '}',
      ],
      cpp: [
        'int removeDuplicates(vector<int>& nums) {',
        '    int slow = 0;',
        '    for (int fast = 1; fast < nums.size(); fast++) {',
        '        if (nums[fast] != nums[slow]) {',
        '            slow++;',
        '            nums[slow] = nums[fast];',
        '        }',
        '    }',
        '    return slow + 1;',
        '}',
      ],
      java: [
        'int removeDuplicates(int[] nums) {',
        '    int slow = 0;',
        '    for (int fast = 1; fast < nums.length; fast++) {',
        '        if (nums[fast] != nums[slow]) {',
        '            slow++;',
        '            nums[slow] = nums[fast];',
        '        }',
        '    }',
        '    return slow + 1;',
        '}',
      ],
    };
  },

  validateInput(input: string): string | null {
    const nums = parseArray(input);
    if (!nums) return 'Enter a valid sorted comma-separated list of numbers.';
    if (nums.length < 2) return 'Array must have at least 2 elements.';
    return null;
  },

  getComplexity() {
    return { time: 'O(n)', space: 'O(1)' };
  },
};
