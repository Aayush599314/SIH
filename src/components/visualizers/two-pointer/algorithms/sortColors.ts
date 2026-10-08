import type { TwoPointerProblem, Step } from '../types';
import { parseArray, clampArrayLength } from '../utils/parsers';

export const sortColors: TwoPointerProblem = {
  metadata: {
    id: 75,
    title: 'Sort Colors',
    leetcode: 75,
    difficulty: 'Medium',
    pattern: 'Partition',
    dataStructure: 'Array',
    visualizationType: 'array',
    companies: ['Amazon', 'Microsoft', 'Google'],
    description:
      'Given an array with values 0 (red), 1 (white), and 2 (blue), sort them in-place so that same colors are adjacent (Dutch National Flag problem).',
    defaultInput: '2,0,2,1,1,0',
    whyItWorks: [
      'We maintain three regions: [0..low-1] are all 0s, [low..mid-1] are all 1s, and [high+1..end] are all 2s.',
      'mid scans the unknown region. Based on nums[mid], we swap to grow the 0-region, 1-region, or 2-region.',
      'When mid passes high, the entire array is partitioned.',
    ],
    commonMistakes: [
      'Swapping with high and then incrementing mid (the swapped-in value is unknown).',
      'Using the wrong boundary for the 2s region.',
      'Forgetting that mid should not advance after swapping with high.',
    ],
    hints: [
      'Use three pointers: low, mid, high.',
      'If nums[mid] == 0, swap with low and advance both low and mid.',
      'If nums[mid] == 1, just advance mid.',
      'If nums[mid] == 2, swap with high and decrement high (do not advance mid).',
    ],
  },

  generateSteps(input: string): Step[] {
    const nums = clampArrayLength(parseArray(input) ?? [2, 0, 2, 1, 1, 0]);
    const steps: Step[] = [];
    let low = 0;
    let mid = 0;
    let high = nums.length - 1;

    steps.push({
      pointers: [
        { name: 'low', index: low, color: 'sky' },
        { name: 'mid', index: mid, color: 'amber' },
        { name: 'high', index: high, color: 'rose' },
      ],
      array: [...nums],
      activeLine: 1,
      comparison: 'Initialize',
      values: { low, mid, high },
      action: 'Initialize pointers',
      explanation: `low=0 marks the boundary for 0s. mid=0 scans unknown elements. high=${high} marks the boundary for 2s. The region between mid and high is unknown.`,
      highlights: { [low]: 'active', [mid]: 'active', [high]: 'active' },
    });

    while (mid <= high) {
      steps.push({
        pointers: [
          { name: 'low', index: low, color: 'sky' },
          { name: 'mid', index: mid, color: 'amber' },
          { name: 'high', index: high, color: 'rose' },
        ],
        array: [...nums],
        activeLine: 4,
        comparison: `nums[mid] = ${nums[mid]}`,
        values: { low, mid, high, 'nums[mid]': nums[mid] },
        action: `Examine nums[mid] = ${nums[mid]}`,
        explanation: `Examine the element at mid (${nums[mid]}). ${nums[mid] === 0 ? 'It is a 0 — swap to the low region.' : nums[mid] === 1 ? 'It is a 1 — it is already in the correct region, just advance mid.' : 'It is a 2 — swap to the high region.'}`,
        highlights: { [mid]: 'compare', [low]: 'active', [high]: 'active' },
      });

      if (nums[mid] === 0) {
        steps.push({
          pointers: [
            { name: 'low', index: low, color: 'sky' },
            { name: 'mid', index: mid, color: 'amber' },
            { name: 'high', index: high, color: 'rose' },
          ],
          array: [...nums],
          activeLine: 5,
          comparison: `swap nums[low]=${nums[low]} ↔ nums[mid]=${nums[mid]}`,
          values: { low, mid, high, 'nums[low]': nums[low], 'nums[mid]': nums[mid] },
          action: 'Swap 0 to low region',
          explanation: `Swap ${nums[low]} and ${nums[mid]} to move the 0 into the 0s region. Then advance both low and mid.`,
          highlights: { [low]: 'swap', [mid]: 'swap' },
        });
        [nums[low], nums[mid]] = [nums[mid], nums[low]];
        low++;
        mid++;
      } else if (nums[mid] === 1) {
        mid++;
        steps.push({
          pointers: [
            { name: 'low', index: low, color: 'sky' },
            { name: 'mid', index: mid, color: 'amber' },
            { name: 'high', index: high, color: 'rose' },
          ],
          array: [...nums],
          activeLine: 7,
          comparison: `nums[mid] == 1 → mid++`,
          values: { low, mid, high },
          action: 'Advance mid (1 is in correct region)',
          explanation: `The element is a 1, which belongs in the middle region. Just advance mid.`,
          highlights: { [mid - 1]: 'success', [low]: 'active', [high]: 'active' },
        });
      } else {
        steps.push({
          pointers: [
            { name: 'low', index: low, color: 'sky' },
            { name: 'mid', index: mid, color: 'amber' },
            { name: 'high', index: high, color: 'rose' },
          ],
          array: [...nums],
          activeLine: 9,
          comparison: `swap nums[mid]=${nums[mid]} ↔ nums[high]=${nums[high]}`,
          values: { low, mid, high, 'nums[mid]': nums[mid], 'nums[high]': nums[high] },
          action: 'Swap 2 to high region',
          explanation: `Swap ${nums[mid]} and ${nums[high]} to move the 2 into the 2s region. Decrement high but do NOT advance mid — the swapped-in value is unknown.`,
          highlights: { [mid]: 'swap', [high]: 'swap' },
        });
        [nums[mid], nums[high]] = [nums[high], nums[mid]];
        high--;
      }
    }

    steps.push({
      pointers: [
        { name: 'low', index: low, color: 'sky' },
        { name: 'mid', index: mid, color: 'amber' },
        { name: 'high', index: high, color: 'rose' },
      ],
      array: [...nums],
      activeLine: 12,
      comparison: 'mid > high',
      values: { low, mid, high },
      action: 'Done',
      explanation: `mid has passed high, so the unknown region is empty. The array is sorted: [${nums.join(', ')}].`,
      result: `[${nums.join(', ')}]`,
      done: true,
    });
    return steps;
  },

  getCode() {
    return {
      c: [
        'void sortColors(int* nums, int size) {',
        '    int low = 0, mid = 0, high = size - 1;',
        '    while (mid <= high) {',
        '        if (nums[mid] == 0) {',
        '            swap(&nums[low], &nums[mid]);',
        '            low++; mid++;',
        '        } else if (nums[mid] == 1) {',
        '            mid++;',
        '        } else {',
        '            swap(&nums[mid], &nums[high]);',
        '            high--;',
        '        }',
        '    }',
        '}',
      ],
      cpp: [
        'void sortColors(vector<int>& nums) {',
        '    int low = 0, mid = 0, high = nums.size() - 1;',
        '    while (mid <= high) {',
        '        if (nums[mid] == 0) {',
        '            swap(nums[low], nums[mid]);',
        '            low++; mid++;',
        '        } else if (nums[mid] == 1) {',
        '            mid++;',
        '        } else {',
        '            swap(nums[mid], nums[high]);',
        '            high--;',
        '        }',
        '    }',
        '}',
      ],
      java: [
        'void sortColors(int[] nums) {',
        '    int low = 0, mid = 0, high = nums.length - 1;',
        '    while (mid <= high) {',
        '        if (nums[mid] == 0) {',
        '            int t = nums[low]; nums[low] = nums[mid]; nums[mid] = t;',
        '            low++; mid++;',
        '        } else if (nums[mid] == 1) {',
        '            mid++;',
        '        } else {',
        '            int t = nums[mid]; nums[mid] = nums[high]; nums[high] = t;',
        '            high--;',
        '        }',
        '    }',
        '}',
      ],
    };
  },

  validateInput(input: string): string | null {
    const nums = parseArray(input);
    if (!nums) return 'Enter a valid comma-separated list of 0s, 1s, and 2s.';
    if (nums.some((n) => n < 0 || n > 2 || !Number.isInteger(n)))
      return 'Values must be 0, 1, or 2 only.';
    return null;
  },

  getComplexity() {
    return { time: 'O(n)', space: 'O(1)' };
  },
};
