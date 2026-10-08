import type { TwoPointerProblem, Step } from '../types';
import { parseArray, clampArrayLength } from '../utils/parsers';

export const trappingRainWater: TwoPointerProblem = {
  metadata: {
    id: 42,
    title: 'Trapping Rain Water',
    leetcode: 42,
    difficulty: 'Hard',
    pattern: 'Opposite Direction',
    dataStructure: 'Array',
    visualizationType: 'array',
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple'],
    description:
      'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water can be trapped after raining.',
    defaultInput: '0,1,0,2,1,0,1,3,2,1,2,1',
    whyItWorks: [
      'Water trapped at any position depends on the minimum of the maximum heights to its left and right.',
      'We track leftMax and rightMax. The side with the smaller max limits the water at that pointer.',
      'If leftMax < rightMax, water at left is determined by leftMax (regardless of what is to the right). Move left.',
      'If rightMax <= leftMax, water at right is determined by rightMax. Move right.',
      'This avoids precomputing prefix/suffix max arrays and uses O(1) space.',
    ],
    commonMistakes: [
      'Moving the wrong pointer (the one with the larger max).',
      'Forgetting to update leftMax/rightMax before computing water.',
      'Using the current height instead of the running max for water calculation.',
    ],
    hints: [
      'Track leftMax and rightMax as you go.',
      'Always move the pointer on the side with the smaller max.',
      'Water at a position = max(0, min(leftMax, rightMax) - height).',
    ],
  },

  generateSteps(input: string): Step[] {
    const nums = clampArrayLength(parseArray(input) ?? [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
    const steps: Step[] = [];
    let left = 0;
    let right = nums.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;

    steps.push({
      pointers: [
        { name: 'left', index: left, color: 'sky' },
        { name: 'right', index: right, color: 'rose' },
      ],
      array: [...nums],
      activeLine: 1,
      comparison: 'Initialize',
      values: { left, right, leftMax, rightMax, water },
      action: 'Initialize',
      explanation: `Start with left at 0, right at ${nums.length - 1}. leftMax and rightMax track the tallest bars seen from each side. water accumulates trapped water.`,
      highlights: { [left]: 'active', [right]: 'active' },
    });

    while (left < right) {
      if (nums[left] < nums[right]) {
        if (nums[left] >= leftMax) {
          leftMax = nums[left];
          steps.push({
            pointers: [
              { name: 'left', index: left, color: 'sky' },
              { name: 'right', index: right, color: 'rose' },
            ],
            array: [...nums],
            activeLine: 6,
            comparison: `nums[left]=${nums[left]} >= leftMax=${leftMax - nums[left] >= 0 ? leftMax - nums[left] : leftMax} → update leftMax=${nums[left]}`,
            values: { left, right, leftMax: nums[left], rightMax, water },
            action: 'Update leftMax',
            explanation: `nums[left] (${nums[left]}) is >= leftMax. Update leftMax to ${nums[left]}. No water trapped here (this is the tallest bar on the left so far).`,
            highlights: { [left]: 'compare', [right]: 'active' },
          });
        } else {
          const trapped = leftMax - nums[left];
          water += trapped;
          steps.push({
            pointers: [
              { name: 'left', index: left, color: 'sky' },
              { name: 'right', index: right, color: 'rose' },
            ],
            array: [...nums],
            activeLine: 8,
            comparison: `leftMax(${leftMax}) - nums[left](${nums[left]}) = ${trapped} water`,
            values: { left, right, leftMax, rightMax, trapped, water },
            action: `Trap ${trapped} units of water`,
            explanation: `nums[left] (${nums[left]}) < leftMax (${leftMax}). Water trapped at index ${left} = ${leftMax} - ${nums[left]} = ${trapped}. Total water = ${water}.`,
            highlights: { [left]: 'success', [right]: 'active' },
          });
        }
        left++;
      } else {
        if (nums[right] >= rightMax) {
          rightMax = nums[right];
          steps.push({
            pointers: [
              { name: 'left', index: left, color: 'sky' },
              { name: 'right', index: right, color: 'rose' },
            ],
            array: [...nums],
            activeLine: 11,
            comparison: `nums[right]=${nums[right]} >= rightMax → update rightMax=${nums[right]}`,
            values: { left, right, leftMax, rightMax: nums[right], water },
            action: 'Update rightMax',
            explanation: `nums[right] (${nums[right]}) is >= rightMax. Update rightMax to ${nums[right]}. No water trapped here.`,
            highlights: { [left]: 'active', [right]: 'compare' },
          });
        } else {
          const trapped = rightMax - nums[right];
          water += trapped;
          steps.push({
            pointers: [
              { name: 'left', index: left, color: 'sky' },
              { name: 'right', index: right, color: 'rose' },
            ],
            array: [...nums],
            activeLine: 13,
            comparison: `rightMax(${rightMax}) - nums[right](${nums[right]}) = ${trapped} water`,
            values: { left, right, leftMax, rightMax, trapped, water },
            action: `Trap ${trapped} units of water`,
            explanation: `nums[right] (${nums[right]}) < rightMax (${rightMax}). Water trapped at index ${right} = ${rightMax} - ${nums[right]} = ${trapped}. Total water = ${water}.`,
            highlights: { [left]: 'active', [right]: 'success' },
          });
        }
        right--;
      }
    }

    steps.push({
      pointers: [
        { name: 'left', index: left, color: 'sky' },
        { name: 'right', index: right, color: 'rose' },
      ],
      array: [...nums],
      activeLine: 16,
      comparison: 'left >= right',
      values: { water },
      action: 'Done',
      explanation: `The pointers have crossed. Total trapped rain water = ${water} units.`,
      result: water,
      done: true,
    });
    return steps;
  },

  getCode() {
    return {
      c: [
        'int trap(int* height, int size) {',
        '    int left = 0, right = size - 1;',
        '    int leftMax = 0, rightMax = 0, water = 0;',
        '    while (left < right) {',
        '        if (height[left] < height[right]) {',
        '            if (height[left] >= leftMax)',
        '                leftMax = height[left];',
        '            else water += leftMax - height[left];',
        '            left++;',
        '        } else {',
        '            if (height[right] >= rightMax)',
        '                rightMax = height[right];',
        '            else water += rightMax - height[right];',
        '            right--;',
        '        }',
        '    }',
        '    return water;',
        '}',
      ],
      cpp: [
        'int trap(vector<int>& height) {',
        '    int left = 0, right = height.size() - 1;',
        '    int leftMax = 0, rightMax = 0, water = 0;',
        '    while (left < right) {',
        '        if (height[left] < height[right]) {',
        '            if (height[left] >= leftMax) leftMax = height[left];',
        '            else water += leftMax - height[left];',
        '            left++;',
        '        } else {',
        '            if (height[right] >= rightMax) rightMax = height[right];',
        '            else water += rightMax - height[right];',
        '            right--;',
        '        }',
        '    }',
        '    return water;',
        '}',
      ],
      java: [
        'int trap(int[] height) {',
        '    int left = 0, right = height.length - 1;',
        '    int leftMax = 0, rightMax = 0, water = 0;',
        '    while (left < right) {',
        '        if (height[left] < height[right]) {',
        '            if (height[left] >= leftMax) leftMax = height[left];',
        '            else water += leftMax - height[left];',
        '            left++;',
        '        } else {',
        '            if (height[right] >= rightMax) rightMax = height[right];',
        '            else water += rightMax - height[right];',
        '            right--;',
        '        }',
        '    }',
        '    return water;',
        '}',
      ],
    };
  },

  validateInput(input: string): string | null {
    const nums = parseArray(input);
    if (!nums) return 'Enter a valid comma-separated list of non-negative heights.';
    if (nums.some((n) => n < 0)) return 'Heights cannot be negative.';
    return null;
  },

  getComplexity() {
    return { time: 'O(n)', space: 'O(1)' };
  },
};
