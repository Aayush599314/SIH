import type { TwoPointerProblem, Step } from '../types';
import { parseArray, clampArrayLength } from '../utils/parsers';

export const moveZeroes: TwoPointerProblem = {
  metadata: {
    id: 283,
    title: 'Move Zeroes',
    leetcode: 283,
    difficulty: 'Easy',
    pattern: 'Fast & Slow',
    dataStructure: 'Array',
    visualizationType: 'array',
    companies: ['Microsoft', 'Amazon', 'Facebook'],
    description:
      'Given an array, move all 0s to the end while maintaining the relative order of non-zero elements. Do this in-place.',
    defaultInput: '0,1,0,3,12',
    whyItWorks: [
      'The slow pointer marks the position where the next non-zero element should go.',
      'The fast pointer scans every element looking for non-zero values.',
      'When fast finds a non-zero, we swap it into the slow position and advance slow.',
      'This preserves order and places all zeros at the end in a single pass.',
    ],
    commonMistakes: [
      'Using opposite-direction pointers (left/right) which does not preserve order.',
      'Forgetting to swap instead of just overwriting.',
      'Not advancing slow after a swap.',
    ],
    hints: [
      'Use slow to track where the next non-zero goes.',
      'Use fast to scan through the array.',
      'When nums[fast] != 0, swap nums[slow] and nums[fast], then slow++.',
    ],
  },

  generateSteps(input: string): Step[] {
    const nums = clampArrayLength(parseArray(input) ?? [0, 1, 0, 3, 12]);
    const steps: Step[] = [];
    let slow = 0;

    steps.push({
      pointers: [{ name: 'slow', index: slow, color: 'sky' }],
      array: [...nums],
      activeLine: 1,
      comparison: 'Initialize',
      values: { slow, fast: 0 },
      action: 'Initialize slow = 0',
      explanation: `slow marks where the next non-zero element should be placed. We start at index 0.`,
      highlights: { [slow]: 'active' },
    });

    for (let fast = 0; fast < nums.length; fast++) {
      steps.push({
        pointers: [
          { name: 'slow', index: slow, color: 'sky' },
          { name: 'fast', index: fast, color: 'rose' },
        ],
        array: [...nums],
        activeLine: 3,
        comparison: `nums[fast] = ${nums[fast]} → ${nums[fast] !== 0 ? 'non-zero' : 'zero'}`,
        values: { slow, fast, 'nums[fast]': nums[fast], 'nums[slow]': nums[slow] },
        action: nums[fast] !== 0 ? 'Non-zero found' : 'Zero — skip',
        explanation:
          nums[fast] !== 0
            ? `Found a non-zero element ${nums[fast]} at index ${fast}. We will swap it into position ${slow}.`
            : `Found a zero at index ${fast}. Skip it — it will naturally end up at the end.`,
        highlights: { [fast]: 'compare', [slow]: 'active' },
      });

      if (nums[fast] !== 0) {
        if (slow !== fast) {
          steps.push({
            pointers: [
              { name: 'slow', index: slow, color: 'sky' },
              { name: 'fast', index: fast, color: 'rose' },
            ],
            array: [...nums],
            activeLine: 5,
            comparison: `swap nums[${slow}] ↔ nums[${fast}]`,
            values: { slow, fast, 'nums[slow]': nums[slow], 'nums[fast]': nums[fast] },
            action: `Swap ${nums[slow]} and ${nums[fast]}`,
            explanation: `Swap the non-zero element at index ${fast} into position ${slow}, placing it before the zeros.`,
            highlights: { [slow]: 'swap', [fast]: 'swap' },
          });
          [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
          steps.push({
            pointers: [
              { name: 'slow', index: slow, color: 'sky' },
              { name: 'fast', index: fast, color: 'rose' },
            ],
            array: [...nums],
            activeLine: 5,
            comparison: `After swap: [${nums.join(', ')}]`,
            values: { slow, fast, 'nums[slow]': nums[slow], 'nums[fast]': nums[fast] },
            action: 'Swap complete',
            explanation: `The array is now [${nums.join(', ')}]. The non-zero element is in its correct position.`,
            highlights: { [slow]: 'success', [fast]: 'active' },
          });
        }
        slow++;
        steps.push({
          pointers: [
            { name: 'slow', index: slow, color: 'sky' },
            { name: 'fast', index: fast, color: 'rose' },
          ],
          array: [...nums],
          activeLine: 6,
          comparison: `slow++ → slow = ${slow}`,
          values: { slow, fast },
          action: 'Advance slow',
          explanation: `Move slow forward to the next slot for a non-zero element.`,
          highlights: { [slow]: 'active', [fast]: 'active' },
        });
      }
    }

    steps.push({
      pointers: [{ name: 'slow', index: slow, color: 'sky' }],
      array: [...nums],
      activeLine: 8,
      comparison: 'fast reached end',
      values: { slow },
      action: 'Done',
      explanation: `All non-zero elements have been moved to the front. Zeros are at the end. Final array: [${nums.join(', ')}].`,
      result: `[${nums.join(', ')}]`,
      done: true,
    });
    return steps;
  },

  getCode() {
    return {
      c: [
        'void moveZeroes(int* nums, int size) {',
        '    int slow = 0;',
        '    for (int fast = 0; fast < size; fast++) {',
        '        if (nums[fast] != 0) {',
        '            int temp = nums[slow];',
        '            nums[slow] = nums[fast];',
        '            nums[fast] = temp;',
        '            slow++;',
        '        }',
        '    }',
        '}',
      ],
      cpp: [
        'void moveZeroes(vector<int>& nums) {',
        '    int slow = 0;',
        '    for (int fast = 0; fast < nums.size(); fast++) {',
        '        if (nums[fast] != 0) {',
        '            swap(nums[slow], nums[fast]);',
        '            slow++;',
        '        }',
        '    }',
        '}',
      ],
      java: [
        'void moveZeroes(int[] nums) {',
        '    int slow = 0;',
        '    for (int fast = 0; fast < nums.length; fast++) {',
        '        if (nums[fast] != 0) {',
        '            int temp = nums[slow];',
        '            nums[slow] = nums[fast];',
        '            nums[fast] = temp;',
        '            slow++;',
        '        }',
        '    }',
        '}',
      ],
    };
  },

  validateInput(input: string): string | null {
    const nums = parseArray(input);
    if (!nums) return 'Enter a valid comma-separated list of numbers.';
    return null;
  },

  getComplexity() {
    return { time: 'O(n)', space: 'O(1)' };
  },
};
