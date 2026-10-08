import type { TwoPointerProblem, Step } from '../types';
import { parseArray, clampArrayLength } from '../utils/parsers';

export const threeSum: TwoPointerProblem = {
  metadata: {
    id: 15,
    title: '3Sum',
    leetcode: 15,
    difficulty: 'Medium',
    pattern: 'Sorting + Two Pointers',
    dataStructure: 'Array',
    visualizationType: 'array',
    companies: ['Amazon', 'Google', 'Microsoft', 'Facebook'],
    description:
      'Given an array, find all unique triplets [nums[i], nums[j], nums[k]] such that they sum to zero.',
    defaultInput: '-1,0,1,2,-1,-4',
    whyItWorks: [
      'Sorting the array lets us use two pointers moving in a predictable direction.',
      'For each fixed element i, we run a Two Sum II search on the remainder of the array.',
      'If the sum is too small, move left forward to increase it. If too large, move right backward to decrease it.',
      'Duplicate skipping on both i and the left/right pointers prevents repeated triplets.',
    ],
    commonMistakes: [
      'Forgetting to sort the array first.',
      'Not skipping duplicates for i, left, or right.',
      'Using the wrong loop bounds (i should stop before n-2).',
    ],
    hints: [
      'Sort the array first.',
      'Fix one element i, then use left = i+1 and right = n-1.',
      'Skip duplicate values of i to avoid repeated triplets.',
    ],
  },

  generateSteps(input: string): Step[] {
    const nums = clampArrayLength(parseArray(input) ?? [-1, 0, 1, 2, -1, -4]).sort((a, b) => a - b);
    const steps: Step[] = [];
    const triplets: number[][] = [];

    steps.push({
      pointers: [],
      array: [...nums],
      activeLine: 1,
      comparison: 'Sort the array',
      values: { sorted: nums.join(',') },
      action: 'Sort array',
      explanation: `First, sort the array: [${nums.join(', ')}]. Sorting enables the two-pointer approach on the remainder.`,
    });

    for (let i = 0; i < nums.length - 2; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) continue;
      let left = i + 1;
      let right = nums.length - 1;

      steps.push({
        pointers: [
          { name: 'i', index: i, color: 'violet' },
          { name: 'left', index: left, color: 'sky' },
          { name: 'right', index: right, color: 'rose' },
        ],
        array: [...nums],
        activeLine: 4,
        comparison: `Fix i=${i}, nums[i]=${nums[i]}`,
        values: { i, left, right, 'nums[i]': nums[i] },
        action: 'Fix element i',
        explanation: `Fix nums[i] = ${nums[i]} at index ${i}. Search for two more elements that sum to ${-nums[i]} in the range [${left}..${right}].`,
        highlights: { [i]: 'active', [left]: 'active', [right]: 'active' },
      });

      while (left < right) {
        const sum = nums[i] + nums[left] + nums[right];
        steps.push({
          pointers: [
            { name: 'i', index: i, color: 'violet' },
            { name: 'left', index: left, color: 'sky' },
            { name: 'right', index: right, color: 'rose' },
          ],
          array: [...nums],
          activeLine: 6,
          comparison: `${nums[i]} + ${nums[left]} + ${nums[right]} = ${sum}`,
          values: { i, left, right, 'nums[i]': nums[i], 'nums[left]': nums[left], 'nums[right]': nums[right], sum },
          action: 'Compare sum to 0',
          explanation: `The triplet sum is ${sum}. ${sum === 0 ? 'This equals zero — found a triplet!' : sum < 0 ? 'The sum is negative, so move left forward to increase it.' : 'The sum is positive, so move right backward to decrease it.'}`,
          highlights: { [i]: 'active', [left]: 'compare', [right]: 'compare' },
        });

        if (sum === 0) {
          triplets.push([nums[i], nums[left], nums[right]]);
          steps.push({
            pointers: [
              { name: 'i', index: i, color: 'violet' },
              { name: 'left', index: left, color: 'sky' },
              { name: 'right', index: right, color: 'rose' },
            ],
            array: [...nums],
            activeLine: 7,
            comparison: `Triplet: [${nums[i]}, ${nums[left]}, ${nums[right]}]`,
            values: { i, left, right, sum },
            action: 'Found triplet',
            explanation: `Found a triplet [${nums[i]}, ${nums[left]}, ${nums[right]}] that sums to zero. Now skip duplicates and continue.`,
            result: `[${nums[i]}, ${nums[left]}, ${nums[right]}]`,
            highlights: { [i]: 'success', [left]: 'success', [right]: 'success' },
          });
          while (left < right && nums[left] === nums[left + 1]) left++;
          while (left < right && nums[right] === nums[right - 1]) right--;
          left++;
          right--;
        } else if (sum < 0) {
          left++;
        } else {
          right--;
        }
      }
    }

    steps.push({
      pointers: [],
      array: [...nums],
      activeLine: 15,
      comparison: 'i loop complete',
      values: { triplets: triplets.length },
      action: 'Done',
      explanation: `All unique triplets found: ${triplets.length} triplet(s). ${triplets.map((t) => `[${t.join(', ')}]`).join(', ') || 'None'}.`,
      result: triplets.map((t) => `[${t.join(', ')}]`).join(', ') || 'No triplets',
      done: true,
    });
    return steps;
  },

  getCode() {
    return {
      c: [
        'int** threeSum(int* nums, int size, int* returnSize) {',
        '    qsort(nums, size, sizeof(int), cmp);',
        '    for (int i = 0; i < size - 2; i++) {',
        '        if (i > 0 && nums[i] == nums[i-1]) continue;',
        '        int left = i + 1, right = size - 1;',
        '        while (left < right) {',
        '            int sum = nums[i] + nums[left] + nums[right];',
        '            if (sum == 0) { /* store triplet */',
        '                while (nums[left]==nums[left+1]) left++;',
        '                while (nums[right]==nums[right-1]) right--;',
        '                left++; right--;',
        '            } else if (sum < 0) left++;',
        '            else right--;',
        '        }',
        '    }',
        '    return result;',
        '}',
      ],
      cpp: [
        'vector<vector<int>> threeSum(vector<int>& nums) {',
        '    sort(nums.begin(), nums.end());',
        '    for (int i = 0; i < nums.size()-2; i++) {',
        '        if (i > 0 && nums[i] == nums[i-1]) continue;',
        '        int left = i+1, right = nums.size()-1;',
        '        while (left < right) {',
        '            int sum = nums[i]+nums[left]+nums[right];',
        '            if (sum == 0) { result.push_back({nums[i],nums[left],nums[right]});',
        '                while (nums[left]==nums[left+1]) left++;',
        '                while (nums[right]==nums[right-1]) right--;',
        '                left++; right--;',
        '            } else if (sum < 0) left++;',
        '            else right--;',
        '        }',
        '    }',
        '    return result;',
        '}',
      ],
      java: [
        'List<List<Integer>> threeSum(int[] nums) {',
        '    Arrays.sort(nums);',
        '    for (int i = 0; i < nums.length-2; i++) {',
        '        if (i > 0 && nums[i] == nums[i-1]) continue;',
        '        int left = i+1, right = nums.length-1;',
        '        while (left < right) {',
        '            int sum = nums[i]+nums[left]+nums[right];',
        '            if (sum == 0) { result.add(Arrays.asList(nums[i],nums[left],nums[right]));',
        '                while (nums[left]==nums[left+1]) left++;',
        '                while (nums[right]==nums[right-1]) right--;',
        '                left++; right--;',
        '            } else if (sum < 0) left++;',
        '            else right--;',
        '        }',
        '    }',
        '    return result;',
        '}',
      ],
    };
  },

  validateInput(input: string): string | null {
    const nums = parseArray(input);
    if (!nums) return 'Enter a valid comma-separated list of numbers.';
    if (nums.length < 3) return 'Array must have at least 3 elements for a triplet.';
    return null;
  },

  getComplexity() {
    return { time: 'O(n²)', space: 'O(1)' };
  },
};
