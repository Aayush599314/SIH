import type { TwoPointerProblem, Step } from '../types';
import { parseArray, clampArrayLength } from '../utils/parsers';

export const containerWithMostWater: TwoPointerProblem = {
  metadata: {
    id: 11,
    title: 'Container With Most Water',
    leetcode: 11,
    difficulty: 'Medium',
    pattern: 'Opposite Direction',
    dataStructure: 'Array',
    visualizationType: 'array',
    companies: ['Google', 'Amazon', 'Bloomberg'],
    description:
      'Given n vertical lines, find two lines that together with the x-axis form a container holding the most water.',
    defaultInput: '1,8,6,2,5,4,8,3,7',
    whyItWorks: [
      'The area is determined by the shorter line and the distance between pointers.',
      'Moving the taller pointer cannot increase the limiting height, so it cannot improve the area.',
      'Moving the shorter pointer might find a taller line that increases the area.',
      'We always move the pointer at the shorter line.',
    ],
    commonMistakes: [
      'Moving the taller pointer instead of the shorter one.',
      'Computing area as height * height instead of height * width.',
      'Using a greedy approach that does not explore enough candidates.',
    ],
    hints: [
      'Area = min(height[left], height[right]) * (right - left).',
      'Always move the pointer pointing to the shorter line.',
      'Track the maximum area seen so far.',
    ],
  },

  generateSteps(input: string): Step[] {
    const nums = clampArrayLength(parseArray(input) ?? [1, 8, 6, 2, 5, 4, 8, 3, 7]);
    const steps: Step[] = [];
    let left = 0;
    let right = nums.length - 1;
    let maxArea = 0;

    steps.push({
      pointers: [
        { name: 'left', index: left, color: 'sky' },
        { name: 'right', index: right, color: 'rose' },
      ],
      array: [...nums],
      activeLine: 1,
      comparison: 'Initialize',
      values: { left, right, 'height[left]': nums[left], 'height[right]': nums[right], maxArea: 0 },
      action: 'Initialize pointers',
      explanation: `Start with left at 0 and right at ${right}. maxArea tracks the best container found.`,
      highlights: { [left]: 'active', [right]: 'active' },
    });

    while (left < right) {
      const width = right - left;
      const h = Math.min(nums[left], nums[right]);
      const area = h * width;
      if (area > maxArea) maxArea = area;

      steps.push({
        pointers: [
          { name: 'left', index: left, color: 'sky' },
          { name: 'right', index: right, color: 'rose' },
        ],
        array: [...nums],
        activeLine: 4,
        comparison: `area = min(${nums[left]}, ${nums[right]}) * ${width} = ${area}`,
        values: {
          left,
          right,
          'height[left]': nums[left],
          'height[right]': nums[right],
          width,
          height: h,
          area,
          maxArea,
        },
        action: 'Compute area and update max',
        explanation: `The container height is limited by the shorter line (${h}). Width is ${width}. Area = ${area}. maxArea = ${maxArea}.`,
        highlights: { [left]: 'compare', [right]: 'compare' },
      });

      if (nums[left] < nums[right]) {
        steps.push({
          pointers: [
            { name: 'left', index: left, color: 'sky' },
            { name: 'right', index: right, color: 'rose' },
          ],
          array: [...nums],
          activeLine: 8,
          comparison: `height[left] < height[right] → move left`,
          values: { left, right, 'height[left]': nums[left], 'height[right]': nums[right], maxArea },
          action: 'Move left forward (left++)',
          explanation: `The left line (${nums[left]}) is shorter than the right (${nums[right]}). Moving the taller (right) pointer cannot increase the limiting height, so we move left.`,
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
          comparison: `height[left] >= height[right] → move right`,
          values: { left, right, 'height[left]': nums[left], 'height[right]': nums[right], maxArea },
          action: 'Move right backward (right--)',
          explanation: `The right line (${nums[right]}) is shorter than or equal to the left (${nums[left]}). Moving the taller (left) pointer cannot increase the limiting height, so we move right.`,
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
      activeLine: 13,
      comparison: `left >= right`,
      values: { maxArea },
      action: 'Done',
      explanation: `The pointers have crossed. The maximum water container has area ${maxArea}.`,
      result: maxArea,
      done: true,
    });
    return steps;
  },

  getCode() {
    return {
      c: [
        'int maxArea(int* height, int size) {',
        '    int left = 0, right = size - 1, maxArea = 0;',
        '    while (left < right) {',
        '        int h = min(height[left], height[right]);',
        '        int area = h * (right - left);',
        '        maxArea = area > maxArea ? area : maxArea;',
        '        if (height[left] < height[right]) left++;',
        '        else right--;',
        '    }',
        '    return maxArea;',
        '}',
      ],
      cpp: [
        'int maxArea(vector<int>& height) {',
        '    int left = 0, right = height.size() - 1, maxArea = 0;',
        '    while (left < right) {',
        '        int h = min(height[left], height[right]);',
        '        int area = h * (right - left);',
        '        maxArea = max(maxArea, area);',
        '        if (height[left] < height[right]) left++;',
        '        else right--;',
        '    }',
        '    return maxArea;',
        '}',
      ],
      java: [
        'int maxArea(int[] height) {',
        '    int left = 0, right = height.length - 1, maxArea = 0;',
        '    while (left < right) {',
        '        int h = Math.min(height[left], height[right]);',
        '        int area = h * (right - left);',
        '        maxArea = Math.max(maxArea, area);',
        '        if (height[left] < height[right]) left++;',
        '        else right--;',
        '    }',
        '    return maxArea;',
        '}',
      ],
    };
  },

  validateInput(input: string): string | null {
    const nums = parseArray(input);
    if (!nums) return 'Enter a valid comma-separated list of non-negative heights.';
    if (nums.length < 2) return 'Need at least 2 lines.';
    if (nums.some((n) => n < 0)) return 'Heights cannot be negative.';
    return null;
  },

  getComplexity() {
    return { time: 'O(n)', space: 'O(1)' };
  },
};
