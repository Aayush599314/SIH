import type { TwoPointerProblem, Step } from '../types';

export const isSubsequence: TwoPointerProblem = {
  metadata: {
    id: 392,
    title: 'Is Subsequence',
    leetcode: 392,
    difficulty: 'Easy',
    pattern: 'String',
    dataStructure: 'String',
    visualizationType: 'string',
    companies: ['Google', 'Amazon', 'Facebook'],
    description:
      'Given two strings s and t, return true if s is a subsequence of t. A subsequence is formed by deleting characters from t without changing the order of remaining characters.',
    defaultInput: 'abc',
    defaultTarget: 'ahbgdc',
    whyItWorks: [
      'We scan t with one pointer and s with another.',
      'Each time t[tp] matches s[sp], we advance sp (we found the next character of s).',
      'If sp reaches the end of s, every character was found in order — s is a subsequence.',
      'If tp reaches the end of t first, not all characters were found.',
    ],
    commonMistakes: [
      'Advancing sp on a mismatch instead of only on a match.',
      'Confusing the roles of s and t.',
      'Returning true when only some characters matched.',
    ],
    hints: [
      'Use sp for string s and tp for string t.',
      'Only advance sp when s[sp] == t[tp].',
      'Always advance tp. If sp reaches s.length, return true.',
    ],
  },

  generateSteps(input: string, target?: string): Step[] {
    const s = (input.trim() || 'abc').split('');
    const t = (target?.trim() || 'ahbgdc').split('');
    const steps: Step[] = [];
    let sp = 0;
    let tp = 0;

    steps.push({
      pointers: [
        { name: 'sp', index: sp, color: 'sky' },
        { name: 'tp', index: tp, color: 'rose' },
      ],
      array: [],
      stringData: [...t],
      activeLine: 1,
      comparison: 'Initialize',
      values: { sp, tp, s: s.join(''), t: t.join('') },
      action: 'Initialize pointers',
      explanation: `We look for "${s.join('')}" as a subsequence of "${t.join('')}". sp tracks our position in s, tp scans through t.`,
      highlights: { [tp]: 'active' },
    });

    while (sp < s.length && tp < t.length) {
      const match = s[sp] === t[tp];
      steps.push({
        pointers: [
          { name: 'sp', index: sp, color: 'sky' },
          { name: 'tp', index: tp, color: 'rose' },
        ],
        array: [],
        stringData: [...t],
        activeLine: 3,
        comparison: `s[sp]='${s[sp]}' vs t[tp]='${t[tp]}' → ${match ? 'match' : 'no match'}`,
        values: { sp, tp, 's[sp]': s[sp], 't[tp]': t[tp], match },
        action: match ? 'Match found — advance sp' : 'No match — advance tp',
        explanation: match
          ? `t[tp]='${t[tp]}' matches s[sp]='${s[sp]}'. Advance sp to look for the next character of s.`
          : `t[tp]='${t[tp]}' does not match s[sp]='${s[sp]}'. Advance tp to check the next character of t.`,
        highlights: { [tp]: 'compare' },
      });
      if (match) sp++;
      tp++;
    }

    const found = sp === s.length;
    steps.push({
      pointers: [
        { name: 'sp', index: sp, color: 'sky' },
        { name: 'tp', index: tp, color: 'rose' },
      ],
      array: [],
      stringData: [...t],
      activeLine: 7,
      comparison: found ? 'sp reached end of s' : 'tp reached end of t',
      values: { sp, tp, found },
      action: 'Done',
      explanation: found
        ? `All characters of s were found in order within t. "${s.join('')}" is a subsequence of "${t.join('')}".`
        : `Not all characters of s were found in t. "${s.join('')}" is NOT a subsequence of "${t.join('')}".`,
      result: found ? 'True — is a subsequence' : 'False — not a subsequence',
      done: true,
    });
    return steps;
  },

  getCode() {
    return {
      c: [
        'bool isSubsequence(char* s, char* t) {',
        '    int sp = 0, tp = 0;',
        '    while (s[sp] && t[tp]) {',
        '        if (s[sp] == t[tp]) sp++;',
        '        tp++;',
        '    }',
        '    return s[sp] == 0;',
        '}',
      ],
      cpp: [
        'bool isSubsequence(string s, string t) {',
        '    int sp = 0, tp = 0;',
        '    while (sp < s.size() && tp < t.size()) {',
        '        if (s[sp] == t[tp]) sp++;',
        '        tp++;',
        '    }',
        '    return sp == s.size();',
        '}',
      ],
      java: [
        'boolean isSubsequence(String s, String t) {',
        '    int sp = 0, tp = 0;',
        '    while (sp < s.length() && tp < t.length()) {',
        '        if (s.charAt(sp) == t.charAt(tp)) sp++;',
        '        tp++;',
        '    }',
        '    return sp == s.length();',
        '}',
      ],
    };
  },

  validateInput(input: string, target?: string): string | null {
    if (!input.trim()) return 'Enter the subsequence string s.';
    if (!target?.trim()) return 'Enter the target string t.';
    return null;
  },

  getComplexity() {
    return { time: 'O(|t|)', space: 'O(1)' };
  },
};
