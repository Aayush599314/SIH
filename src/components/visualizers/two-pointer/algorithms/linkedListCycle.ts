import type { TwoPointerProblem, Step } from '../types';
import { parseLinkedList } from '../utils/parsers';

export const linkedListCycle: TwoPointerProblem = {
  metadata: {
    id: 141,
    title: 'Linked List Cycle',
    leetcode: 141,
    difficulty: 'Easy',
    pattern: 'Linked List',
    dataStructure: 'Linked List',
    visualizationType: 'linked-list',
    companies: ['Amazon', 'Microsoft', 'Google'],
    description:
      'Given head of a linked list, determine if the list has a cycle. A cycle exists if a node can be reached again by following next pointers.',
    defaultInput: '3,2,0,-4',
    defaultTarget: '2',
    whyItWorks: [
      'Floyd\'s Tortoise and Hare: slow moves one step, fast moves two steps.',
      'If there is a cycle, fast will eventually lap slow and they will meet.',
      'If there is no cycle, fast reaches null (end of list) first.',
      'This uses O(1) space, unlike a hash-set approach.',
    ],
    commonMistakes: [
      'Moving fast by one instead of two.',
      'Not checking fast and fast.next for null before advancing.',
      'Using slow === fast as the initial condition (they start equal).',
    ],
    hints: [
      'Initialize slow and fast at head.',
      'Move slow by one, fast by two.',
      'If slow === fast after moving, there is a cycle.',
      'If fast or fast.next is null, there is no cycle.',
    ],
  },

  generateSteps(input: string, target?: string): Step[] {
    const nodes = parseLinkedList(input) ?? [
      { value: 3, next: 1 },
      { value: 2, next: 2 },
      { value: 0, next: 3 },
      { value: -4, next: 1 },
    ];
    const cycleTo = target ? parseInt(target, 10) : 1;
    if (!Number.isNaN(cycleTo) && cycleTo >= 0 && cycleTo < nodes.length) {
      nodes[nodes.length - 1].next = cycleTo;
    }
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
      explanation: `Both slow and fast start at the head (index 0). slow will move 1 step at a time, fast will move 2 steps.`,
      highlights: { [slow]: 'active', [fast]: 'active' },
    });

    let stepCount = 0;
    const maxSteps = nodes.length * 3 + 5;
    while (stepCount < maxSteps) {
      stepCount++;
      if (nodes[fast].next === -1) {
        steps.push({
          pointers: [{ name: 'fast', index: fast, color: 'rose' }],
          array: [],
          linkedList: nodes.map((n) => ({ ...n })),
          activeLine: 4,
          comparison: 'fast.next == null',
          values: { slow, fast },
          action: 'No cycle',
          explanation: `fast reached the end of the list (null). There is no cycle.`,
          result: 'No cycle',
          done: true,
        });
        return steps;
      }
      slow = nodes[slow].next;
      fast = nodes[fast].next;
      if (nodes[fast].next === -1) {
        steps.push({
          pointers: [{ name: 'fast', index: fast, color: 'rose' }],
          array: [],
          linkedList: nodes.map((n) => ({ ...n })),
          activeLine: 4,
          comparison: 'fast.next == null',
          values: { slow, fast },
          action: 'No cycle',
          explanation: `fast reached the end of the list (null). There is no cycle.`,
          result: 'No cycle',
          done: true,
        });
        return steps;
      }
      fast = nodes[fast].next;

      steps.push({
        pointers: [
          { name: 'slow', index: slow, color: 'sky' },
          { name: 'fast', index: fast, color: 'rose' },
        ],
        array: [],
        linkedList: nodes.map((n) => ({ ...n })),
        activeLine: 5,
        comparison: `slow at ${slow}, fast at ${fast} → ${slow === fast ? 'met!' : 'not equal'}`,
        values: { slow, fast, 'slow.val': nodes[slow].value, 'fast.val': nodes[fast].value },
        action: slow === fast ? 'Pointers met — cycle detected!' : 'Move pointers',
        explanation:
          slow === fast
            ? `slow and fast are both at index ${slow}. They have met, which proves the list has a cycle.`
            : `slow moved 1 step to index ${slow} (value ${nodes[slow].value}). fast moved 2 steps to index ${fast} (value ${nodes[fast].value}). They have not met yet.`,
        highlights: { [slow]: 'active', [fast]: 'compare' },
        done: slow === fast,
        result: slow === fast ? 'Has cycle' : undefined,
      });
      if (slow === fast) return steps;
    }

    steps.push({
      pointers: [],
      array: [],
      linkedList: nodes.map((n) => ({ ...n })),
      activeLine: 8,
      comparison: 'Max steps reached',
      values: {},
      action: 'Timeout',
      explanation: `Too many steps without meeting. Assuming no cycle.`,
      result: 'No cycle',
      done: true,
    });
    return steps;
  },

  getCode() {
    return {
      c: [
        'bool hasCycle(ListNode* head) {',
        '    ListNode* slow = head; ListNode* fast = head;',
        '    while (fast && fast->next) {',
        '        slow = slow->next;',
        '        fast = fast->next->next;',
        '        if (slow == fast) return true;',
        '    }',
        '    return false;',
        '}',
      ],
      cpp: [
        'bool hasCycle(ListNode* head) {',
        '    ListNode* slow = head; ListNode* fast = head;',
        '    while (fast && fast->next) {',
        '        slow = slow->next;',
        '        fast = fast->next->next;',
        '        if (slow == fast) return true;',
        '    }',
        '    return false;',
        '}',
      ],
      java: [
        'boolean hasCycle(ListNode head) {',
        '    ListNode slow = head, fast = head;',
        '    while (fast != null && fast.next != null) {',
        '        slow = slow.next;',
        '        fast = fast.next.next;',
        '        if (slow == fast) return true;',
        '    }',
        '    return false;',
        '}',
      ],
    };
  },

  validateInput(input: string, target?: string): string | null {
    const nodes = parseLinkedList(input);
    if (!nodes) return 'Enter a linked list like 3 -> 2 -> 0 -> -4.';
    if (target) {
      const t = parseInt(target, 10);
      if (Number.isNaN(t) || t < 0 || t >= nodes.length)
        return `Cycle target index must be 0 to ${nodes.length - 1}.`;
    }
    return null;
  },

  getComplexity() {
    return { time: 'O(n)', space: 'O(1)' };
  },
};
