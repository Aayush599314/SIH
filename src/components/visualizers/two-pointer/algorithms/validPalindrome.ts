import type { TwoPointerProblem, Step } from '../types';

export const validPalindrome: TwoPointerProblem = {
  metadata: {
    id: 125,
    title: 'Valid Palindrome',
    leetcode: 125,
    difficulty: 'Easy',
    pattern: 'String',
    dataStructure: 'String',
    visualizationType: 'string',
    companies: ['Facebook', 'Amazon', 'Microsoft'],
    description:
      'Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring case.',
    defaultInput: 'racecar',
    whyItWorks: [
      'A palindrome reads the same forwards and backwards.',
      'By comparing characters from both ends moving inward, every mismatch proves it is not a palindrome.',
      'If all character pairs match, the string is a palindrome.',
    ],
    commonMistakes: [
      'Not skipping non-alphanumeric characters.',
      'Forgetting case-insensitive comparison.',
      'Using left <= right instead of left < right.',
    ],
    hints: [
      'Place one pointer at the start and one at the end.',
      'Skip non-alphanumeric characters on both sides.',
      'Compare the characters (case-insensitive). Move inward if they match.',
    ],
  },

  generateSteps(input: string): Step[] {
    const raw = input.trim() || 'racecar';
    const chars = raw.split('');
    const alnum = chars.map((c) => c.toLowerCase());
    const steps: Step[] = [];
    let left = 0;
    let right = alnum.length - 1;

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
      explanation: `We start with L at position 0 and R at position ${right}. We will compare characters moving inward.`,
      highlights: { [left]: 'active', [right]: 'active' },
    });

    while (left < right) {
      while (left < right && !/[a-z0-9]/.test(alnum[left])) {
        steps.push({
          pointers: [
            { name: 'L', index: left, color: 'sky' },
            { name: 'R', index: right, color: 'rose' },
          ],
          array: [],
          stringData: [...chars],
          activeLine: 4,
          comparison: `Skip non-alphanumeric '${alnum[left]}'`,
          values: { left, right },
          action: 'Skip non-alphanumeric (left++)',
          explanation: `The character '${alnum[left]}' is not alphanumeric, so we skip it by moving L forward.`,
          highlights: { [left]: 'eliminated', [right]: 'active' },
        });
        left++;
      }
      while (left < right && !/[a-z0-9]/.test(alnum[right])) {
        steps.push({
          pointers: [
            { name: 'L', index: left, color: 'sky' },
            { name: 'R', index: right, color: 'rose' },
          ],
          array: [],
          stringData: [...chars],
          activeLine: 5,
          comparison: `Skip non-alphanumeric '${alnum[right]}'`,
          values: { left, right },
          action: 'Skip non-alphanumeric (right--)',
          explanation: `The character '${alnum[right]}' is not alphanumeric, so we skip it by moving R backward.`,
          highlights: { [left]: 'active', [right]: 'eliminated' },
        });
        right--;
      }

      if (left < right) {
        const match = alnum[left] === alnum[right];
        steps.push({
          pointers: [
            { name: 'L', index: left, color: 'sky' },
            { name: 'R', index: right, color: 'rose' },
          ],
          array: [],
          stringData: [...chars],
          activeLine: 6,
          comparison: `'${alnum[left]}' == '${alnum[right]}' → ${match}`,
          values: { left, right, 's[left]': alnum[left], 's[right]': alnum[right], match },
          action: match ? 'Characters match — move both inward' : 'Mismatch — not a palindrome',
          explanation: match
            ? `Characters '${alnum[left]}' and '${alnum[right]}' match. Move both pointers inward.`
            : `Characters '${alnum[left]}' and '${alnum[right]}' do not match. The string is not a palindrome.`,
          highlights: match
            ? { [left]: 'success', [right]: 'success' }
            : { [left]: 'compare', [right]: 'compare' },
          result: match ? undefined : 'Not a palindrome',
          done: !match,
        });
        if (!match) return steps;
        left++;
        right--;
      }
    }

    steps.push({
      pointers: [
        { name: 'L', index: left, color: 'sky' },
        { name: 'R', index: right, color: 'rose' },
      ],
      array: [],
      stringData: [...chars],
      activeLine: 10,
      comparison: `left >= right`,
      values: { left, right },
      action: 'All characters matched',
      explanation: `All character pairs matched. The string is a valid palindrome.`,
      result: 'Valid palindrome',
      done: true,
    });
    return steps;
  },

  getCode() {
    return {
      c: [
        'bool isPalindrome(char* s) {',
        '    int left = 0, right = strlen(s) - 1;',
        '    while (left < right) {',
        '        while (left < right && !isalnum(s[left])) left++;',
        '        while (left < right && !isalnum(s[right])) right--;',
        '        if (tolower(s[left]) != tolower(s[right]))',
        '            return false;',
        '        left++; right--;',
        '    }',
        '    return true;',
        '}',
      ],
      cpp: [
        'bool isPalindrome(string s) {',
        '    int left = 0, right = s.size() - 1;',
        '    while (left < right) {',
        '        while (left < right && !isalnum(s[left])) left++;',
        '        while (left < right && !isalnum(s[right])) right--;',
        '        if (tolower(s[left]) != tolower(s[right]))',
        '            return false;',
        '        left++; right--;',
        '    }',
        '    return true;',
        '}',
      ],
      java: [
        'boolean isPalindrome(String s) {',
        '    int left = 0, right = s.length() - 1;',
        '    while (left < right) {',
        '        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;',
        '        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;',
        '        if (Character.toLowerCase(s.charAt(left))',
        '            != Character.toLowerCase(s.charAt(right)))',
        '            return false;',
        '        left++; right--;',
        '    }',
        '    return true;',
        '}',
      ],
    };
  },

  validateInput(input: string): string | null {
    if (!input.trim()) return 'Enter a string to check.';
    return null;
  },

  getComplexity() {
    return { time: 'O(n)', space: 'O(1)' };
  },
};
