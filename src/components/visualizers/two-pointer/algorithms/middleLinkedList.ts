import type { TwoPointerProblem, Step } from '../types';
import { parseLinkedList } from '../utils/parsers';

export const middleOfLinkedList: TwoPointerProblem = {
  metadata: {
    id: 876,
    title: 'Middle of the Linked List',
    leetcode: 876,
    difficulty: 'Easy',
    pattern: 'Linked List',
    dataStructure: 'Linked List',
    visualizationType: 'linked-list',
    companies: ['Amazon', 'Google', 'Microsoft'],
    description:
      'Given head of a singly linked list, return the middle node. If there are two middle nodes, return the second one.',
    defaultInput: '1,2,3,4,5',
    whyItWorks: [
      'slow moves 1 step, fast moves 2 steps.',
      'When fast reaches the end, slow is at the middle.',
      'For even-length lists, slow ends up at the second middle node because fast moves 2 at a time.',
    ],
    commonMistakes: [
      'Moving fast by 1 instead of 2.',
      'Using the wrong loop condition (fast vs fast.next).',
      'Returning the wrong node for even-length lists.',
    ],
    hints: [
      'Initialize slow and fast at head.',
      'While fast and fast.next are not null, move slow by 1 and fast by 2.',
      'When the loop ends, slow is the middle.',
    ],
  },

  generateSteps(input: string): Step[] {
    const nodes = parseLinkedList(input) ?? [
      { value: 1, next: 1 },
      { value: 2, next: 2 },
      { value: 3, next: 3 },
      { value: 4, next: 4 },
      { value: 5, next: -1 },
    ];
    const steps: Step[] = [];
    let slow = 0;
    let fast = 0;

    steps.push({
      pointers: [
        { name: 'slow', index: slow, color: 'sky' },
        { name: 'fast', index: fast, color: 'rose' },
      ],
      array: [],
      linkedList: nodes.map((n) => ({ ...n })),
      activeLine: 1,
      comparison: 'Initialize',
      values: { slow, fast },
      action: 'Initialize slow and fast at head',
      explanation: `Both pointers start at the head. slow moves 1 step, fast moves 2 steps. When fast reaches the end, slow will be at the middle.`,
      highlights: { [slow]: 'active', [fast]: 'active' },
    });

    while (fast !== -1 && nodes[fast].next !== -1) {
      slow = nodes[slow].next;
      fast = nodes[fast].next;
      fast = nodes[fast].next;

      const fastAtEnd = fast === -1 || nodes[fast].next === -1;
      steps.push({
        pointers: [
          { name: 'slow', index: slow, color: 'sky' },
          { name: 'fast', index: fast, color: 'rose' },
        ],
        array: [],
        linkedList: nodes.map((n) => ({ ...n })),
        activeLine: 4,
        comparison: `slow at ${slow}, fast at ${fast === -1 ? 'null' : fast}`,
        values: { slow, fast, 'slow.val': nodes[slow].value, 'fast.val': fast === -1 ? null : nodes[fast].value },
        action: fastAtEnd ? 'fast reached end — slow is the middle' : 'Move pointers',
        explanation: fastAtEnd
          ? `fast has reached the end of the list. slow is at index ${slow} (value ${nodes[slow].value}), which is the middle node.`
          : `slow moved 1 step to index ${slow}. fast moved 2 steps to index ${fast}. Continue until fast reaches the end.`,
        highlights: { [slow]: 'active', [fast]: fast === -1 ? undefined : 'compare' },
        done: fastAtEnd,
        result: fastAtEnd ? `Middle: ${nodes[slow].value}` : undefined,
      });
      if (fastAtEnd) return steps;
    }

    steps.push({
      pointers: [{ name: 'slow', index: slow, color: 'sky' }],
      array: [],
      linkedList: nodes.map((n) => ({ ...n })),
      activeLine: 6,
      comparison: 'Loop ended',
      values: { slow },
      action: 'Done',
      explanation: `The middle node is at index ${slow} with value ${nodes[slow].value}.`,
      result: `Middle: ${nodes[slow].value}`,
      done: true,
    });
    return steps;
  },

  getCode() {
    return {
      c: [
        'ListNode* middleNode(ListNode* head) {',
        '    ListNode* slow = head; ListNode* fast = head;',
        '    while (fast && fast->next) {',
        '        slow = slow->next;',
        '        fast = fast->next->next;',
        '    }',
        '    return slow;',
        '}',
      ],
      cpp: [
        'ListNode* middleNode(ListNode* head) {',
        '    ListNode* slow = head; ListNode* fast = head;',
        '    while (fast && fast->next) {',
        '        slow = slow->next;',
        '        fast = fast->next->next;',
        '    }',
        '    return slow;',
        '}',
      ],
      java: [
        'ListNode middleNode(ListNode head) {',
        '    ListNode slow = head, fast = head;',
        '    while (fast != null && fast.next != null) {',
        '        slow = slow.next;',
        '        fast = fast.next.next;',
        '    }',
        '    return slow;',
        '}',
      ],
    };
  },

  validateInput(input: string): string | null {
    const nodes = parseLinkedList(input);
    if (!nodes) return 'Enter a linked list like 1 -> 2 -> 3 -> 4 -> 5.';
    return null;
  },

  getComplexity() {
    return { time: 'O(n)', space: 'O(1)' };
  },
};
