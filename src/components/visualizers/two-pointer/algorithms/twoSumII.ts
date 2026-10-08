import type { TwoPointerProblem, Step } from '../types';
import { parseArray, parseNumber, clampArrayLength } from '../utils/parsers';

export const twoSumII: TwoPointerProblem = {
  metadata: {
    id: 167,
    title: 'Two Sum II - Input Array Is Sorted',
    leetcode: 167,
    difficulty: 'Easy',
    pattern: 'Opposite Direction',
    dataStructure: 'Array',
    visualizationType: 'array',
    companies: ['Google', 'Amazon', 'Microsoft'],
    description:
      'Given a 1-indexed sorted array and a target, return the 1-based indices of the two numbers that add up to target.',
    defaultInput: '2,7,11,15',
    defaultTarget: '9',
    whyItWorks: [
      'The array is sorted in non-decreasing order.',
      'If sum < target, moving left forward increases the sum.',
      'If sum > target, moving right backward decreases the sum.',
      'Each step eliminates one element from consideration, guaranteeing we find the answer if it exists.',
    ],
    commonMistakes: [
      'Forgetting that the array must be sorted for this approach.',
      'Moving the wrong pointer (left when you should move right).',
      'Using left <= right instead of left < right.',
    ],
    hints: [
      'Start with left at 0 and right at the last index.',
      'Compare the sum of the two elements to the target.',
      'Move left forward if the sum is too small, right backward if too large.',
    ],
  },

  generateSteps(input: string, target?: string): Step[] {
    const nums = clampArrayLength(parseArray(input) ?? [2, 7, 11, 15]);
    const t = parseNumber(target ?? '9') ?? 9;
    const steps: Step[] = [];
    let left = 0;
    let right = nums.length - 1;

    steps.push({
      pointers: [
        { name: 'left', index: left, color: 'sky' },
        { name: 'right', index: right, color: 'rose' },
      ],
      array: [...nums],
      activeLine: 1,
      comparison: 'Initialize',
      values: { left, right, target: t, 'nums[left]': nums[left], 'nums[right]': nums[right] },
      action: 'Initialize pointers',
      explanation: `We start with left at index 0 and right at index ${right}. The array is sorted, so we can use opposite-direction two pointers.`,
      highlights: { [left]: 'active', [right]: 'active' },
    });

    while (left < right) {
      const sum = nums[left] + nums[right];
      steps.push({
        pointers: [
          { name: 'left', index: left, color: 'sky' },
          { name: 'right', index: right, color: 'rose' },
        ],
        array: [...nums],
        activeLine: 4,
        comparison: `nums[left] + nums[right] = ${nums[left]} + ${nums[right]} = ${sum}`,
        values: {
          left,
          right,
          target: t,
          'nums[left]': nums[left],
          'nums[right]': nums[right],
          sum,
        },
        action: 'Compare sum to target',
        explanation: `The current sum is ${sum}. The target is ${t}.`,
        highlights: { [left]: 'compare', [right]: 'compare' },
      });

      if (sum === t) {
        steps.push({
          pointers: [
            { name: 'left', index: left, color: 'sky' },
            { name: 'right', index: right, color: 'rose' },
          ],
          array: [...nums],
          activeLine: 5,
          comparison: `sum == target`,
          values: { left, right, target: t, sum, 'nums[left]': nums[left], 'nums[right]': nums[right] },
          action: 'Found the answer!',
          explanation: `The sum equals the target. Return [${left + 1}, ${right + 1}] (1-indexed).`,
          result: [left + 1, right + 1],
          done: true,
          highlights: { [left]: 'success', [right]: 'success' },
        });
        return steps;
      }

      if (sum < t) {
        steps.push({
          pointers: [
            { name: 'left', index: left, color: 'sky' },
            { name: 'right', index: right, color: 'rose' },
          ],
          array: [...nums],
          activeLine: 8,
          comparison: `sum < target → move left`,
          values: { left, right, target: t, sum },
          action: 'Move left forward (left++)',
          explanation: `The sum ${sum} is smaller than the target ${t}. Since the array is sorted, moving left forward will give us a larger value and increase the sum.`,
          highlights: { [left]: 'eliminated', [right]: 'active' },
        });
        left++;
      } else {
        steps.push({
          pointers: [
            { name: 'left', index: left, color: 'sky' },
            { name: 'right', index: right, color: 'rose' },
          ],
          array: [...nums],
          activeLine: 10,
          comparison: `sum > target → move right`,
          values: { left, right, target: t, sum },
          action: 'Move right backward (right--)',
          explanation: `The sum ${sum} is larger than the target ${t}. Since the array is sorted, moving right backward will give us a smaller value and decrease the sum.`,
          highlights: { [left]: 'active', [right]: 'eliminated' },
        });
        right--;
      }
    }

    steps.push({
      pointers: [
        { name: 'left', index: left, color: 'sky' },
        { name: 'right', index: right, color: 'rose' },
      ],
      array: [...nums],
      activeLine: 12,
      comparison: `left >= right`,
      values: { left, right, target: t },
      action: 'No solution found',
      explanation: `The pointers have crossed. No pair sums to ${t}.`,
      result: null,
      done: true,
    });
    return steps;
  },

  getCode() {
    return {
      c: [
        'int* twoSum(int* numbers, int size, int target, int* returnSize) {',
        '    int left = 0, right = size - 1;',
        '    int* result = malloc(2 * sizeof(int));',
        '    while (left < right) {',
        '        int sum = numbers[left] + numbers[right];',
        '        if (sum == target) {',
        '            result[0] = left + 1; result[1] = right + 1;',
        '            *returnSize = 2; return result;',
        '        }',
        '        if (sum < target) left++;',
        '        else right--;',
        '    }',
        '    *returnSize = 0; return result;',
        '}',
      ],
      cpp: [
        'vector<int> twoSum(vector<int>& numbers, int target) {',
        '    int left = 0, right = numbers.size() - 1;',
        '    while (left < right) {',
        '        int sum = numbers[left] + numbers[right];',
        '        if (sum == target)',
        '            return {left + 1, right + 1};',
        '        if (sum < target) left++;',
        '        else right--;',
        '    }',
        '    return {};',
        '}',
      ],
      java: [
        'int[] twoSum(int[] numbers, int target) {',
        '    int left = 0, right = numbers.length - 1;',
        '    while (left < right) {',
        '        int sum = numbers[left] + numbers[right];',
        '        if (sum == target)',
        '            return new int[]{left + 1, right + 1};',
        '        if (sum < target) left++;',
        '        else right--;',
        '    }',
        '    return new int[]{};',
        '}',
      ],
    };
  },

  validateInput(input: string, target?: string): string | null {
    const nums = parseArray(input);
    if (!nums) return 'Enter a valid comma-separated list of numbers.';
    if (nums.length < 2) return 'Array must have at least 2 elements.';
    const t = parseNumber(target ?? '');
    if (t === null) return 'Enter a valid target number.';
    return null;
  },

  getComplexity() {
    return { time: 'O(n)', space: 'O(1)' };
  },
};
