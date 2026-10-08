import type { Problem } from './types';

const LISTNODE_PREAMBLE = `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode* next;
 *     ListNode(int x) : val(x), next(nullptr) {}
 * };
 */
`;

export const PROBLEMS: Problem[] = [
  // ==========================================
  // BEGINNER / EASY
  // ==========================================
  {
    id: 'traverse-list',
    number: 1,
    title: 'Traverse a Linked List',
    difficulty: 'Easy',
    category: 'Beginner',
    description: 'Given the head of a singly linked list, traverse the list from start to finish and return a vector containing all node values in the order they appear.',
    inputDesc: 'The head node of a singly linked list.',
    outputDesc: 'A std::vector<int> containing the node values from head to tail.',
    constraints: [
      'The number of nodes in the list is in the range [0, 1000].',
      '-10^4 <= Node.val <= 10^4'
    ],
    examples: [
      {
        input: 'head = [1, 2, 3, 4]',
        output: '[1, 2, 3, 4]',
        explanation: 'Visiting nodes in sequence gives values 1, 2, 3, and 4.'
      },
      {
        input: 'head = [42]',
        output: '[42]',
        explanation: 'The list contains a single node.'
      },
      {
        input: 'head = []',
        output: '[]',
        explanation: 'An empty list has 0 nodes.'
      }
    ],
    starterCode: `${LISTNODE_PREAMBLE}#include <vector>

std::vector<int> traverseList(ListNode* head) {
    std::vector<int> result;
    // Write your solution here
    
    return result;
}`,
    functionName: 'traverseList',
    visibleTestCases: [
      {
        id: 'tc-1',
        input: 'head = [1, 2, 3, 4]',
        expectedOutput: '[1, 2, 3, 4]',
        rawInput: { list: [1, 2, 3, 4] },
        expectedRawOutput: [1, 2, 3, 4],
        explanation: 'Standard 4-node traversal'
      },
      {
        id: 'tc-2',
        input: 'head = [10]',
        expectedOutput: '[10]',
        rawInput: { list: [10] },
        expectedRawOutput: [10],
        explanation: 'Single element list'
      },
      {
        id: 'tc-3',
        input: 'head = []',
        expectedOutput: '[]',
        rawInput: { list: [] },
        expectedRawOutput: [],
        explanation: 'Empty list edge case',
        isEdgeCase: true
      }
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 'head = [5, -2, 10, 0, 7]',
        expectedOutput: '[5, -2, 10, 0, 7]',
        rawInput: { list: [5, -2, 10, 0, 7] },
        expectedRawOutput: [5, -2, 10, 0, 7]
      },
      {
        id: 'htc-2',
        input: 'head = [1, 1, 1, 1]',
        expectedOutput: '[1, 1, 1, 1]',
        rawInput: { list: [1, 1, 1, 1] },
        expectedRawOutput: [1, 1, 1, 1]
      },
      {
        id: 'htc-3',
        input: 'head = [100, 200, 300, 400, 500, 600]',
        expectedOutput: '[100, 200, 300, 400, 500, 600]',
        rawInput: { list: [100, 200, 300, 400, 500, 600] },
        expectedRawOutput: [100, 200, 300, 400, 500, 600]
      }
    ],
    hints: [
      'Initialize a pointer `curr = head` to track the current position.',
      'Use a `while (curr != nullptr)` loop to step through each node.',
      'Push `curr->val` into your result vector, then advance using `curr = curr->next`.'
    ],
    expectedComplexity: {
      time: 'O(n)',
      space: 'O(1) extra space (excluding returned vector)'
    },
    explanation: 'We maintain a pointer starting at the head. At each step, we record the node\'s value and advance to `curr->next` until reaching `nullptr`.',
    approachDescription: 'Iterative traversal with a single pointer `curr`. Visits each of the n nodes exactly once.',
    referenceSolution: `std::vector<int> traverseList(ListNode* head) {
    std::vector<int> result;
    ListNode* curr = head;
    while (curr != nullptr) {
        result.push_back(curr->val);
        curr = curr->next;
    }
    return result;
}`
  },

  {
    id: 'find-length',
    number: 2,
    title: 'Find the Length of a Linked List',
    difficulty: 'Easy',
    category: 'Beginner',
    description: 'Given the head of a singly linked list, count and return the total number of nodes in the list.',
    inputDesc: 'The head node of a singly linked list.',
    outputDesc: 'An integer representing the count of nodes.',
    constraints: [
      'The number of nodes in the list is in the range [0, 5000].',
      '-10^9 <= Node.val <= 10^9'
    ],
    examples: [
      {
        input: 'head = [1, 2, 3, 4, 5]',
        output: '5',
        explanation: 'There are 5 nodes.'
      },
      {
        input: 'head = []',
        output: '0',
        explanation: 'An empty list has 0 nodes.'
      },
      {
        input: 'head = [7]',
        output: '1',
        explanation: 'Single node list has length 1.'
      }
    ],
    starterCode: `${LISTNODE_PREAMBLE}int getLength(ListNode* head) {
    // Write your solution here
    
    return 0;
}`,
    functionName: 'getLength',
    visibleTestCases: [
      {
        id: 'tc-1',
        input: 'head = [1, 2, 3, 4, 5]',
        expectedOutput: '5',
        rawInput: { list: [1, 2, 3, 4, 5] },
        expectedRawOutput: 5
      },
      {
        id: 'tc-2',
        input: 'head = []',
        expectedOutput: '0',
        rawInput: { list: [] },
        expectedRawOutput: 0,
        isEdgeCase: true
      },
      {
        id: 'tc-3',
        input: 'head = [99]',
        expectedOutput: '1',
        rawInput: { list: [99] },
        expectedRawOutput: 1
      }
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 'head = [10, 20, 30]',
        expectedOutput: '3',
        rawInput: { list: [10, 20, 30] },
        expectedRawOutput: 3
      },
      {
        id: 'htc-2',
        input: 'head = [0, 0, 0, 0, 0, 0, 0, 0]',
        expectedOutput: '8',
        rawInput: { list: [0, 0, 0, 0, 0, 0, 0, 0] },
        expectedRawOutput: 8
      }
    ],
    hints: [
      'Initialize an integer counter variable `count = 0`.',
      'Start a pointer at `head` and increment `count` for every non-null node.',
      'When `curr == nullptr`, return the accumulated counter.'
    ],
    expectedComplexity: {
      time: 'O(n)',
      space: 'O(1)'
    },
    explanation: 'Iterate node by node, incrementing a counter until the end of the list is reached.',
    approachDescription: 'Single-pass pointer traversal with constant O(1) auxiliary space.',
    referenceSolution: `int getLength(ListNode* head) {
    int count = 0;
    ListNode* curr = head;
    while (curr != nullptr) {
        count++;
        curr = curr->next;
    }
    return count;
}`
  },

  {
    id: 'search-linked-list',
    number: 3,
    title: 'Search in a Linked List',
    difficulty: 'Easy',
    category: 'Beginner',
    description: 'Given the head of a singly linked list and an integer `target`, return `true` if the target value exists in the list, otherwise return `false`.',
    inputDesc: 'The head node of a singly linked list and a target integer value.',
    outputDesc: 'Boolean true if found, false otherwise.',
    constraints: [
      'The number of nodes in the list is in the range [0, 1000].',
      '-10^5 <= Node.val, target <= 10^5'
    ],
    examples: [
      {
        input: 'head = [1, 2, 3, 4], target = 3',
        output: 'true',
        explanation: '3 is present in the third node.'
      },
      {
        input: 'head = [1, 2, 3, 4], target = 5',
        output: 'false',
        explanation: '5 does not appear anywhere in the list.'
      },
      {
        input: 'head = [], target = 1',
        output: 'false',
        explanation: 'An empty list cannot contain any value.'
      }
    ],
    starterCode: `${LISTNODE_PREAMBLE}bool search(ListNode* head, int target) {
    // Write your solution here
    
    return false;
}`,
    functionName: 'search',
    visibleTestCases: [
      {
        id: 'tc-1',
        input: 'head = [1, 2, 3, 4], target = 3',
        expectedOutput: 'true',
        rawInput: { list: [1, 2, 3, 4], target: 3 },
        expectedRawOutput: true
      },
      {
        id: 'tc-2',
        input: 'head = [1, 2, 3, 4], target = 5',
        expectedOutput: 'false',
        rawInput: { list: [1, 2, 3, 4], target: 5 },
        expectedRawOutput: false
      },
      {
        id: 'tc-3',
        input: 'head = [], target = 1',
        expectedOutput: 'false',
        rawInput: { list: [], target: 1 },
        expectedRawOutput: false,
        isEdgeCase: true
      }
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 'head = [10, 20, 30, 40], target = 10',
        expectedOutput: 'true',
        rawInput: { list: [10, 20, 30, 40], target: 10 },
        expectedRawOutput: true,
        explanation: 'Target at head'
      },
      {
        id: 'htc-2',
        input: 'head = [10, 20, 30, 40], target = 40',
        expectedOutput: 'true',
        rawInput: { list: [10, 20, 30, 40], target: 40 },
        expectedRawOutput: true,
        explanation: 'Target at tail'
      }
    ],
    hints: [
      'Traverse through the list with a pointer `curr`.',
      'At each node, check if `curr->val == target`.',
      'If matched, return true immediately. If loop finishes without match, return false.'
    ],
    expectedComplexity: {
      time: 'O(n)',
      space: 'O(1)'
    },
    explanation: 'Perform linear search along the chain. Return early when the target value matches.',
    approachDescription: 'Early-exit linear search through node values.',
    referenceSolution: `bool search(ListNode* head, int target) {
    ListNode* curr = head;
    while (curr != nullptr) {
        if (curr->val == target) return true;
        curr = curr->next;
    }
    return false;
}`
  },

  {
    id: 'insert-at-beginning',
    number: 4,
    title: 'Insert at the Beginning',
    difficulty: 'Easy',
    category: 'Beginner',
    description: 'Given the head of a singly linked list and an integer `val`, create a new node with this value, insert it at the very beginning of the list, and return the new head.',
    inputDesc: 'The head node of a singly linked list and an integer value to insert.',
    outputDesc: 'The new head node of the modified linked list.',
    constraints: [
      'The number of nodes in the list is in the range [0, 1000].',
      '-10^4 <= Node.val, val <= 10^4'
    ],
    examples: [
      {
        input: 'head = [2, 3, 4], val = 1',
        output: '[1, 2, 3, 4]',
        explanation: 'New node with value 1 is placed before 2.'
      },
      {
        input: 'head = [], val = 5',
        output: '[5]',
        explanation: 'Inserting into an empty list makes the new node the head.'
      }
    ],
    starterCode: `${LISTNODE_PREAMBLE}ListNode* insertAtBeginning(ListNode* head, int val) {
    // Write your solution here
    
    return nullptr;
}`,
    functionName: 'insertAtBeginning',
    visibleTestCases: [
      {
        id: 'tc-1',
        input: 'head = [2, 3, 4], val = 1',
        expectedOutput: '[1, 2, 3, 4]',
        rawInput: { list: [2, 3, 4], val: 1 },
        expectedRawOutput: [1, 2, 3, 4]
      },
      {
        id: 'tc-2',
        input: 'head = [], val = 5',
        expectedOutput: '[5]',
        rawInput: { list: [], val: 5 },
        expectedRawOutput: [5],
        isEdgeCase: true
      },
      {
        id: 'tc-3',
        input: 'head = [10], val = 20',
        expectedOutput: '[20, 10]',
        rawInput: { list: [10], val: 20 },
        expectedRawOutput: [20, 10]
      }
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 'head = [-1, -2, -3], val = 0',
        expectedOutput: '[0, -1, -2, -3]',
        rawInput: { list: [-1, -2, -3], val: 0 },
        expectedRawOutput: [0, -1, -2, -3]
      }
    ],
    hints: [
      'Dynamically allocate a new node: `ListNode* newNode = new ListNode(val);`.',
      'Point the new node\'s next pointer to the current `head`.',
      'Return `newNode` as the new head of the list.'
    ],
    expectedComplexity: {
      time: 'O(1)',
      space: 'O(1) extra space'
    },
    explanation: 'Creating a new node and linking its `next` pointer to `head` takes constant time O(1).',
    approachDescription: 'Constant-time front insertion by updating the next pointer and returning the new node.',
    referenceSolution: `ListNode* insertAtBeginning(ListNode* head, int val) {
    ListNode* newNode = new ListNode(val);
    newNode->next = head;
    return newNode;
}`
  },

  {
    id: 'insert-at-end',
    number: 5,
    title: 'Insert at the End',
    difficulty: 'Easy',
    category: 'Beginner',
    description: 'Given the head of a singly linked list and an integer `val`, insert a new node containing `val` at the end of the list and return the head of the list.',
    inputDesc: 'The head node of a singly linked list and an integer value to append.',
    outputDesc: 'The head node of the modified linked list.',
    constraints: [
      'The number of nodes in the list is in the range [0, 1000].',
      '-10^4 <= Node.val, val <= 10^4'
    ],
    examples: [
      {
        input: 'head = [1, 2, 3], val = 4',
        output: '[1, 2, 3, 4]',
        explanation: 'Node 4 is attached to the tail of the list.'
      },
      {
        input: 'head = [], val = 1',
        output: '[1]',
        explanation: 'If the list is empty, the new node becomes the head.'
      }
    ],
    starterCode: `${LISTNODE_PREAMBLE}ListNode* insertAtEnd(ListNode* head, int val) {
    // Write your solution here
    
    return nullptr;
}`,
    functionName: 'insertAtEnd',
    visibleTestCases: [
      {
        id: 'tc-1',
        input: 'head = [1, 2, 3], val = 4',
        expectedOutput: '[1, 2, 3, 4]',
        rawInput: { list: [1, 2, 3], val: 4 },
        expectedRawOutput: [1, 2, 3, 4]
      },
      {
        id: 'tc-2',
        input: 'head = [], val = 1',
        expectedOutput: '[1]',
        rawInput: { list: [], val: 1 },
        expectedRawOutput: [1],
        isEdgeCase: true
      },
      {
        id: 'tc-3',
        input: 'head = [7], val = 9',
        expectedOutput: '[7, 9]',
        rawInput: { list: [7], val: 9 },
        expectedRawOutput: [7, 9]
      }
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 'head = [10, 20, 30, 40], val = 50',
        expectedOutput: '[10, 20, 30, 40, 50]',
        rawInput: { list: [10, 20, 30, 40], val: 50 },
        expectedRawOutput: [10, 20, 30, 40, 50]
      }
    ],
    hints: [
      'Handle the edge case where `head == nullptr`: return `new ListNode(val)`.',
      'Otherwise, traverse with a pointer `curr` until `curr->next == nullptr`.',
      'Attach `curr->next = new ListNode(val);` and return `head`.'
    ],
    expectedComplexity: {
      time: 'O(n)',
      space: 'O(1) extra space'
    },
    explanation: 'Traverse until the last node (`curr->next == nullptr`), then point its next pointer to the newly allocated node.',
    approachDescription: 'Single-pass traversal to the tail node followed by pointer assignment.',
    referenceSolution: `ListNode* insertAtEnd(ListNode* head, int val) {
    ListNode* newNode = new ListNode(val);
    if (head == nullptr) return newNode;
    ListNode* curr = head;
    while (curr->next != nullptr) {
        curr = curr->next;
    }
    curr->next = newNode;
    return head;
}`
  },

  {
    id: 'delete-node-by-value',
    number: 6,
    title: 'Delete a Node by Value',
    difficulty: 'Easy',
    category: 'Beginner',
    description: 'Given the head of a singly linked list and an integer `val`, remove the first node containing `val` from the list and return the head of the modified list.',
    inputDesc: 'The head node of a singly linked list and the value to remove.',
    outputDesc: 'The head node of the linked list after deletion.',
    constraints: [
      'The number of nodes in the list is in the range [0, 1000].',
      '-10^4 <= Node.val, val <= 10^4'
    ],
    examples: [
      {
        input: 'head = [1, 2, 3, 4], val = 3',
        output: '[1, 2, 4]',
        explanation: 'Node with value 3 is removed.'
      },
      {
        input: 'head = [1, 2, 3], val = 1',
        output: '[2, 3]',
        explanation: 'Deleting the head node moves head to the next node.'
      },
      {
        input: 'head = [1], val = 1',
        output: '[]',
        explanation: 'Deleting the sole node leaves an empty list.'
      }
    ],
    starterCode: `${LISTNODE_PREAMBLE}ListNode* deleteNode(ListNode* head, int val) {
    // Write your solution here
    
    return nullptr;
}`,
    functionName: 'deleteNode',
    visibleTestCases: [
      {
        id: 'tc-1',
        input: 'head = [1, 2, 3, 4], val = 3',
        expectedOutput: '[1, 2, 4]',
        rawInput: { list: [1, 2, 3, 4], val: 3 },
        expectedRawOutput: [1, 2, 4]
      },
      {
        id: 'tc-2',
        input: 'head = [1, 2, 3], val = 1',
        expectedOutput: '[2, 3]',
        rawInput: { list: [1, 2, 3], val: 1 },
        expectedRawOutput: [2, 3],
        explanation: 'Deleting head node'
      },
      {
        id: 'tc-3',
        input: 'head = [1], val = 1',
        expectedOutput: '[]',
        rawInput: { list: [1], val: 1 },
        expectedRawOutput: [],
        isEdgeCase: true
      }
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 'head = [1, 2, 3, 4], val = 4',
        expectedOutput: '[1, 2, 3]',
        rawInput: { list: [1, 2, 3, 4], val: 4 },
        expectedRawOutput: [1, 2, 3],
        explanation: 'Deleting tail node'
      },
      {
        id: 'htc-2',
        input: 'head = [1, 2, 3], val = 99',
        expectedOutput: '[1, 2, 3]',
        rawInput: { list: [1, 2, 3], val: 99 },
        expectedRawOutput: [1, 2, 3],
        explanation: 'Value not found'
      }
    ],
    hints: [
      'If `head == nullptr`, there is nothing to delete.',
      'If `head->val == val`, the new head is `head->next`.',
      'Otherwise, track `prev` and `curr`. When `curr->val == val`, set `prev->next = curr->next` and break.'
    ],
    expectedComplexity: {
      time: 'O(n)',
      space: 'O(1)'
    },
    explanation: 'Check if head contains the target value. If so, return `head->next`. Otherwise, find the node using two pointers and bypass it.',
    approachDescription: 'Two-pointer traversal (`prev`, `curr`) to locate the target node and relink `prev->next = curr->next`.',
    referenceSolution: `ListNode* deleteNode(ListNode* head, int val) {
    if (head == nullptr) return nullptr;
    if (head->val == val) return head->next;
    ListNode* prev = head;
    ListNode* curr = head->next;
    while (curr != nullptr) {
        if (curr->val == val) {
            prev->next = curr->next;
            break;
        }
        prev = curr;
        curr = curr->next;
    }
    return head;
}`
  },

  // ==========================================
  // INTERMEDIATE / MEDIUM
  // ==========================================
  {
    id: 'find-middle-node',
    number: 7,
    title: 'Find the Middle of a Linked List',
    difficulty: 'Medium',
    category: 'Intermediate',
    description: 'Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes (even length), return the second middle node.',
    inputDesc: 'The head node of a singly linked list.',
    outputDesc: 'The middle node of the linked list.',
    constraints: [
      'The number of nodes in the list is in the range [1, 1000].',
      '1 <= Node.val <= 1000'
    ],
    examples: [
      {
        input: 'head = [1, 2, 3, 4, 5]',
        output: '[3, 4, 5]',
        explanation: 'The middle node of the list is node 3.'
      },
      {
        input: 'head = [1, 2, 3, 4, 5, 6]',
        output: '[4, 5, 6]',
        explanation: 'Since the list has two middle nodes with values 3 and 4, we return the second one.'
      }
    ],
    starterCode: `${LISTNODE_PREAMBLE}ListNode* findMiddle(ListNode* head) {
    // Write your solution here
    
    return nullptr;
}`,
    functionName: 'findMiddle',
    visibleTestCases: [
      {
        id: 'tc-1',
        input: 'head = [1, 2, 3, 4, 5]',
        expectedOutput: '[3, 4, 5]',
        rawInput: { list: [1, 2, 3, 4, 5] },
        expectedRawOutput: [3, 4, 5]
      },
      {
        id: 'tc-2',
        input: 'head = [1, 2, 3, 4, 5, 6]',
        expectedOutput: '[4, 5, 6]',
        rawInput: { list: [1, 2, 3, 4, 5, 6] },
        expectedRawOutput: [4, 5, 6]
      },
      {
        id: 'tc-3',
        input: 'head = [1]',
        expectedOutput: '[1]',
        rawInput: { list: [1] },
        expectedRawOutput: [1],
        isEdgeCase: true
      }
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 'head = [10, 20]',
        expectedOutput: '[20]',
        rawInput: { list: [10, 20] },
        expectedRawOutput: [20]
      },
      {
        id: 'htc-2',
        input: 'head = [7, 8, 9, 10, 11, 12, 13]',
        expectedOutput: '[10, 11, 12, 13]',
        rawInput: { list: [7, 8, 9, 10, 11, 12, 13] },
        expectedRawOutput: [10, 11, 12, 13]
      }
    ],
    hints: [
      'Can you solve it in a single pass without counting total nodes first?',
      'Use two pointers: a `slow` pointer moving 1 step at a time, and a `fast` pointer moving 2 steps at a time.',
      'When `fast == nullptr` or `fast->next == nullptr`, `slow` will be precisely at the middle node.'
    ],
    expectedComplexity: {
      time: 'O(n)',
      space: 'O(1)'
    },
    explanation: 'Using Floyd\'s Tortoise and Hare algorithm: `fast` travels at 2x the speed of `slow`. When `fast` reaches the end, `slow` is at the halfway point.',
    approachDescription: 'Fast & slow two-pointer technique in a single pass.',
    referenceSolution: `ListNode* findMiddle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`
  },

  {
    id: 'reverse-linked-list',
    number: 8,
    title: 'Reverse a Linked List',
    difficulty: 'Medium',
    category: 'Intermediate',
    description: 'Given the head of a singly linked list, reverse the list iteratively, and return the reversed list\'s new head.',
    inputDesc: 'The head node of a singly linked list.',
    outputDesc: 'The head node of the reversed list.',
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    examples: [
      {
        input: 'head = [1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]',
        explanation: 'All pointer directions are inverted.'
      },
      {
        input: 'head = [1, 2]',
        output: '[2, 1]',
        explanation: '2 -> 1 -> null'
      },
      {
        input: 'head = []',
        output: '[]',
        explanation: 'An empty list reversed is still empty.'
      }
    ],
    starterCode: `${LISTNODE_PREAMBLE}ListNode* reverseList(ListNode* head) {
    // Write your solution here
    
    return nullptr;
}`,
    functionName: 'reverseList',
    visibleTestCases: [
      {
        id: 'tc-1',
        input: 'head = [1, 2, 3, 4, 5]',
        expectedOutput: '[5, 4, 3, 2, 1]',
        rawInput: { list: [1, 2, 3, 4, 5] },
        expectedRawOutput: [5, 4, 3, 2, 1]
      },
      {
        id: 'tc-2',
        input: 'head = [1, 2]',
        expectedOutput: '[2, 1]',
        rawInput: { list: [1, 2] },
        expectedRawOutput: [2, 1]
      },
      {
        id: 'tc-3',
        input: 'head = []',
        expectedOutput: '[]',
        rawInput: { list: [] },
        expectedRawOutput: [],
        isEdgeCase: true
      }
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 'head = [42]',
        expectedOutput: '[42]',
        rawInput: { list: [42] },
        expectedRawOutput: [42]
      },
      {
        id: 'htc-2',
        input: 'head = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]',
        expectedOutput: '[0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 9]',
        rawInput: { list: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] },
        expectedRawOutput: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    ],
    hints: [
      'Think about what information you need to keep before changing `curr->next`.',
      'You need three pointers: `prev` (starts as nullptr), `curr` (starts as head), and `next` (temporarily stores curr->next).',
      'Inside the loop: `next = curr->next; curr->next = prev; prev = curr; curr = next;`. When done, `prev` is the new head.'
    ],
    expectedComplexity: {
      time: 'O(n)',
      space: 'O(1)'
    },
    explanation: 'Iterate through the list using three pointers (`prev`, `curr`, `next`), flipping each node\'s `next` pointer backward.',
    approachDescription: 'In-place iterative pointer reversal using three pointers.',
    referenceSolution: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`
  },

  {
    id: 'remove-duplicates-sorted',
    number: 9,
    title: 'Remove Duplicates from a Sorted Linked List',
    difficulty: 'Medium',
    category: 'Intermediate',
    description: 'Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.',
    inputDesc: 'The head node of a sorted singly linked list.',
    outputDesc: 'The head node of the list with duplicate values removed.',
    constraints: [
      'The number of nodes in the list is in the range [0, 300].',
      '-100 <= Node.val <= 100',
      'The list is guaranteed to be sorted in ascending order.'
    ],
    examples: [
      {
        input: 'head = [1, 1, 2]',
        output: '[1, 2]',
        explanation: 'The duplicate 1 is bypassed.'
      },
      {
        input: 'head = [1, 1, 2, 3, 3]',
        output: '[1, 2, 3]',
        explanation: 'Duplicates of 1 and 3 are removed.'
      }
    ],
    starterCode: `${LISTNODE_PREAMBLE}ListNode* deleteDuplicates(ListNode* head) {
    // Write your solution here
    
    return nullptr;
}`,
    functionName: 'deleteDuplicates',
    visibleTestCases: [
      {
        id: 'tc-1',
        input: 'head = [1, 1, 2]',
        expectedOutput: '[1, 2]',
        rawInput: { list: [1, 1, 2] },
        expectedRawOutput: [1, 2]
      },
      {
        id: 'tc-2',
        input: 'head = [1, 1, 2, 3, 3]',
        expectedOutput: '[1, 2, 3]',
        rawInput: { list: [1, 1, 2, 3, 3] },
        expectedRawOutput: [1, 2, 3]
      },
      {
        id: 'tc-3',
        input: 'head = []',
        expectedOutput: '[]',
        rawInput: { list: [] },
        expectedRawOutput: [],
        isEdgeCase: true
      }
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 'head = [1, 1, 1, 1]',
        expectedOutput: '[1]',
        rawInput: { list: [1, 1, 1, 1] },
        expectedRawOutput: [1]
      },
      {
        id: 'htc-2',
        input: 'head = [1, 2, 3, 4]',
        expectedOutput: '[1, 2, 3, 4]',
        rawInput: { list: [1, 2, 3, 4] },
        expectedRawOutput: [1, 2, 3, 4]
      }
    ],
    hints: [
      'Since the list is already sorted, duplicate elements are always adjacent.',
      'Compare `curr->val` with `curr->next->val`.',
      'If equal, bypass the adjacent node: `curr->next = curr->next->next`. Do not advance `curr` yet!'
    ],
    expectedComplexity: {
      time: 'O(n)',
      space: 'O(1)'
    },
    explanation: 'Check if `curr->val == curr->next->val`. If so, skip the next node. Otherwise, advance `curr = curr->next`.',
    approachDescription: 'Single-pointer adjacent duplicate skipping on sorted list.',
    referenceSolution: `ListNode* deleteDuplicates(ListNode* head) {
    ListNode* curr = head;
    while (curr != nullptr && curr->next != nullptr) {
        if (curr->val == curr->next->val) {
            curr->next = curr->next->next;
        } else {
            curr = curr->next;
        }
    }
    return head;
}`
  },

  {
    id: 'remove-nth-from-end',
    number: 10,
    title: 'Remove the Nth Node from the End',
    difficulty: 'Medium',
    category: 'Intermediate',
    description: 'Given the head of a singly linked list, remove the nth node from the end of the list and return its head.',
    inputDesc: 'The head node of a singly linked list and an integer n.',
    outputDesc: 'The head node of the modified list.',
    constraints: [
      'The number of nodes in the list is sz.',
      '1 <= sz <= 1000',
      '1 <= n <= sz'
    ],
    examples: [
      {
        input: 'head = [1, 2, 3, 4, 5], n = 2',
        output: '[1, 2, 3, 5]',
        explanation: 'The 2nd node from the end is 4. Removing it leaves [1, 2, 3, 5].'
      },
      {
        input: 'head = [1], n = 1',
        output: '[]',
        explanation: 'Removing the single node leaves an empty list.'
      },
      {
        input: 'head = [1, 2], n = 1',
        output: '[1]',
        explanation: 'The 1st node from end is 2.'
      }
    ],
    starterCode: `${LISTNODE_PREAMBLE}ListNode* removeNthFromEnd(ListNode* head, int n) {
    // Write your solution here
    
    return nullptr;
}`,
    functionName: 'removeNthFromEnd',
    visibleTestCases: [
      {
        id: 'tc-1',
        input: 'head = [1, 2, 3, 4, 5], n = 2',
        expectedOutput: '[1, 2, 3, 5]',
        rawInput: { list: [1, 2, 3, 4, 5], n: 2 },
        expectedRawOutput: [1, 2, 3, 5]
      },
      {
        id: 'tc-2',
        input: 'head = [1], n = 1',
        expectedOutput: '[]',
        rawInput: { list: [1], n: 1 },
        expectedRawOutput: [],
        isEdgeCase: true
      },
      {
        id: 'tc-3',
        input: 'head = [1, 2], n = 1',
        expectedOutput: '[1]',
        rawInput: { list: [1, 2], n: 1 },
        expectedRawOutput: [1]
      }
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 'head = [1, 2], n = 2',
        expectedOutput: '[2]',
        rawInput: { list: [1, 2], n: 2 },
        expectedRawOutput: [2],
        explanation: 'Removing the head node'
      },
      {
        id: 'htc-2',
        input: 'head = [10, 20, 30, 40, 50, 60], n = 4',
        expectedOutput: '[10, 20, 40, 50, 60]',
        rawInput: { list: [10, 20, 30, 40, 50, 60], n: 4 },
        expectedRawOutput: [10, 20, 40, 50, 60]
      }
    ],
    hints: [
      'Use a dummy node pointing to `head` to simplify edge cases where `head` itself is deleted.',
      'Advance a `fast` pointer `n + 1` steps ahead of `slow`.',
      'Move both `fast` and `slow` together until `fast` reaches null. Then `slow->next` is the node to delete!'
    ],
    expectedComplexity: {
      time: 'O(n)',
      space: 'O(1)'
    },
    explanation: 'By maintaining an n-step gap between two pointers, the slow pointer stops immediately before the target node when the fast pointer reaches the end.',
    approachDescription: 'Two-pointer window with a dummy head node.',
    referenceSolution: `ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode* dummy = new ListNode(0);
    dummy->next = head;
    ListNode* fast = dummy;
    ListNode* slow = dummy;
    
    for (int i = 0; i <= n; i++) {
        fast = fast->next;
    }
    
    while (fast != nullptr) {
        fast = fast->next;
        slow = slow->next;
    }
    
    slow->next = slow->next->next;
    return dummy->next;
}`
  },

  {
    id: 'merge-two-sorted-lists',
    number: 11,
    title: 'Merge Two Sorted Linked Lists',
    difficulty: 'Medium',
    category: 'Intermediate',
    description: 'You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
    inputDesc: 'Two sorted singly linked list heads, list1 and list2.',
    outputDesc: 'The head node of the merged sorted list.',
    constraints: [
      'The number of nodes in both lists is in the range [0, 50].',
      '-100 <= Node.val <= 100',
      'Both list1 and list2 are sorted in non-decreasing order.'
    ],
    examples: [
      {
        input: 'list1 = [1, 2, 4], list2 = [1, 3, 4]',
        output: '[1, 1, 2, 3, 4, 4]',
        explanation: 'Nodes are spliced in ascending numerical order.'
      },
      {
        input: 'list1 = [], list2 = []',
        output: '[]',
        explanation: 'Both empty lists merge into an empty list.'
      },
      {
        input: 'list1 = [], list2 = [0]',
        output: '[0]',
        explanation: 'One list is empty, returns the other.'
      }
    ],
    starterCode: `${LISTNODE_PREAMBLE}ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    // Write your solution here
    
    return nullptr;
}`,
    functionName: 'mergeTwoLists',
    visibleTestCases: [
      {
        id: 'tc-1',
        input: 'list1 = [1, 2, 4], list2 = [1, 3, 4]',
        expectedOutput: '[1, 1, 2, 3, 4, 4]',
        rawInput: { list1: [1, 2, 4], list2: [1, 3, 4] },
        expectedRawOutput: [1, 1, 2, 3, 4, 4]
      },
      {
        id: 'tc-2',
        input: 'list1 = [], list2 = []',
        expectedOutput: '[]',
        rawInput: { list1: [], list2: [] },
        expectedRawOutput: [],
        isEdgeCase: true
      },
      {
        id: 'tc-3',
        input: 'list1 = [], list2 = [0]',
        expectedOutput: '[0]',
        rawInput: { list1: [], list2: [0] },
        expectedRawOutput: [0]
      }
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 'list1 = [2, 5, 7], list2 = [1, 3, 4, 8, 9]',
        expectedOutput: '[1, 2, 3, 4, 5, 7, 8, 9]',
        rawInput: { list1: [2, 5, 7], list2: [1, 3, 4, 8, 9] },
        expectedRawOutput: [1, 2, 3, 4, 5, 7, 8, 9]
      },
      {
        id: 'htc-2',
        input: 'list1 = [5], list2 = [1, 2, 3]',
        expectedOutput: '[1, 2, 3, 5]',
        rawInput: { list1: [5], list2: [1, 2, 3] },
        expectedRawOutput: [1, 2, 3, 5]
      }
    ],
    hints: [
      'Create a `dummy` node to serve as the start of the merged chain.',
      'Maintain a `tail` pointer pointing to the current end of the merged list.',
      'Compare `list1->val` and `list2->val`, attach the smaller node to `tail->next`, and advance that list\'s pointer.'
    ],
    expectedComplexity: {
      time: 'O(n + m)',
      space: 'O(1)'
    },
    explanation: 'Compare the heads of both lists, attach the smaller node to the merged list\'s tail, and repeat until one list is exhausted.',
    approachDescription: 'Iterative two-pointer merge with dummy head.',
    referenceSolution: `ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;
    
    while (list1 != nullptr && list2 != nullptr) {
        if (list1->val <= list2->val) {
            tail->next = list1;
            list1 = list1->next;
        } else {
            tail->next = list2;
            list2 = list2->next;
        }
        tail = tail->next;
    }
    
    tail->next = (list1 != nullptr) ? list1 : list2;
    return dummy.next;
}`
  },

  {
    id: 'find-kth-from-end',
    number: 12,
    title: 'Find the Kth Node from the End',
    difficulty: 'Medium',
    category: 'Intermediate',
    description: 'Given the head of a singly linked list and an integer `k`, return the node which is k positions from the end of the list (1-indexed, meaning k = 1 is the last node). If k is greater than the length of the list, return nullptr.',
    inputDesc: 'The head node of a singly linked list and an integer k.',
    outputDesc: 'The kth node from the end of the list.',
    constraints: [
      'The number of nodes in the list is in the range [1, 1000].',
      '1 <= Node.val <= 10^5',
      '1 <= k <= 1000'
    ],
    examples: [
      {
        input: 'head = [1, 2, 3, 4, 5], k = 2',
        output: '[4, 5]',
        explanation: 'Node 4 is the 2nd node from the end.'
      },
      {
        input: 'head = [10, 20, 30], k = 1',
        output: '[30]',
        explanation: 'Node 30 is the 1st node from the end (tail).'
      }
    ],
    starterCode: `${LISTNODE_PREAMBLE}ListNode* findKthFromEnd(ListNode* head, int k) {
    // Write your solution here
    
    return nullptr;
}`,
    functionName: 'findKthFromEnd',
    visibleTestCases: [
      {
        id: 'tc-1',
        input: 'head = [1, 2, 3, 4, 5], k = 2',
        expectedOutput: '[4, 5]',
        rawInput: { list: [1, 2, 3, 4, 5], k: 2 },
        expectedRawOutput: [4, 5]
      },
      {
        id: 'tc-2',
        input: 'head = [10, 20, 30], k = 1',
        expectedOutput: '[30]',
        rawInput: { list: [10, 20, 30], k: 1 },
        expectedRawOutput: [30]
      },
      {
        id: 'tc-3',
        input: 'head = [1, 2, 3], k = 3',
        expectedOutput: '[1, 2, 3]',
        rawInput: { list: [1, 2, 3], k: 3 },
        expectedRawOutput: [1, 2, 3]
      }
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 'head = [1, 2, 3], k = 5',
        expectedOutput: 'null',
        rawInput: { list: [1, 2, 3], k: 5 },
        expectedRawOutput: null,
        isEdgeCase: true,
        explanation: 'k greater than length'
      },
      {
        id: 'htc-2',
        input: 'head = [100, 200, 300, 400, 500], k = 4',
        expectedOutput: '[200, 300, 400, 500]',
        rawInput: { list: [100, 200, 300, 400, 500], k: 4 },
        expectedRawOutput: [200, 300, 400, 500]
      }
    ],
    hints: [
      'Can you locate the node in a single pass without computing list length first?',
      'Use two pointers `fast` and `slow`. Advance `fast` by `k` nodes first.',
      'Then advance both `fast` and `slow` by 1 node at each step until `fast == nullptr`. `slow` will point to the kth node from the end.'
    ],
    expectedComplexity: {
      time: 'O(n)',
      space: 'O(1)'
    },
    explanation: 'Fast pointer creates a k-node lead. When fast hits null, slow is exactly k nodes behind the end.',
    approachDescription: 'Two-pointer sliding window with fixed distance k.',
    referenceSolution: `ListNode* findKthFromEnd(ListNode* head, int k) {
    ListNode* fast = head;
    ListNode* slow = head;
    
    for (int i = 0; i < k; i++) {
        if (fast == nullptr) return nullptr;
        fast = fast->next;
    }
    
    while (fast != nullptr) {
        fast = fast->next;
        slow = slow->next;
    }
    
    return slow;
}`
  },

  // ==========================================
  // ADVANCED / HARD
  // ==========================================
  {
    id: 'detect-cycle',
    number: 13,
    title: 'Detect a Cycle in a Linked List',
    difficulty: 'Hard',
    category: 'Advanced',
    description: 'Given `head`, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Return `true` if there is a cycle, otherwise return `false`.',
    inputDesc: 'The head node of a singly linked list.',
    outputDesc: 'Boolean true if a cycle exists, false otherwise.',
    constraints: [
      'The number of the nodes in the list is in the range [0, 10^4].',
      '-10^5 <= Node.val <= 10^5'
    ],
    examples: [
      {
        input: 'head = [3, 2, 0, -4], pos = 1 (tail connects to node index 1)',
        output: 'true',
        explanation: 'There is a cycle where the tail node points back to the node with value 2.'
      },
      {
        input: 'head = [1, 2], pos = 0',
        output: 'true',
        explanation: 'There is a cycle connecting the tail back to the head.'
      },
      {
        input: 'head = [1], pos = -1',
        output: 'false',
        explanation: 'No cycle exists.'
      }
    ],
    starterCode: `${LISTNODE_PREAMBLE}bool hasCycle(ListNode* head) {
    // Write your solution here
    
    return false;
}`,
    functionName: 'hasCycle',
    visibleTestCases: [
      {
        id: 'tc-1',
        input: 'head = [3, 2, 0, -4], cycleIndex = 1',
        expectedOutput: 'true',
        rawInput: { list: [3, 2, 0, -4], cycleIndex: 1 },
        expectedRawOutput: true
      },
      {
        id: 'tc-2',
        input: 'head = [1, 2], cycleIndex = 0',
        expectedOutput: 'true',
        rawInput: { list: [1, 2], cycleIndex: 0 },
        expectedRawOutput: true
      },
      {
        id: 'tc-3',
        input: 'head = [1], cycleIndex = -1',
        expectedOutput: 'false',
        rawInput: { list: [1], cycleIndex: -1 },
        expectedRawOutput: false,
        isEdgeCase: true
      }
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 'head = [], cycleIndex = -1',
        expectedOutput: 'false',
        rawInput: { list: [], cycleIndex: -1 },
        expectedRawOutput: false,
        isEdgeCase: true
      },
      {
        id: 'htc-2',
        input: 'head = [1, 2, 3, 4, 5, 6], cycleIndex = -1',
        expectedOutput: 'false',
        rawInput: { list: [1, 2, 3, 4, 5, 6], cycleIndex: -1 },
        expectedRawOutput: false
      },
      {
        id: 'htc-3',
        input: 'head = [10, 20, 30, 40], cycleIndex = 2',
        expectedOutput: 'true',
        rawInput: { list: [10, 20, 30, 40], cycleIndex: 2 },
        expectedRawOutput: true
      }
    ],
    hints: [
      'Can you solve it using O(1) memory without a hash set?',
      'Use Floyd\'s Cycle Detection algorithm (Tortoise and Hare): two pointers moving at speeds 1 and 2.',
      'If the fast pointer ever meets the slow pointer (`slow == fast`), a cycle is confirmed.'
    ],
    expectedComplexity: {
      time: 'O(n)',
      space: 'O(1)'
    },
    explanation: 'If a cycle exists, the fast runner will eventually lap and meet the slow runner inside the cycle loop.',
    approachDescription: 'Floyd\'s Cycle Finding Algorithm with slow and fast pointers.',
    referenceSolution: `bool hasCycle(ListNode* head) {
    if (head == nullptr || head->next == nullptr) return false;
    ListNode* slow = head;
    ListNode* fast = head;
    
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    
    return false;
}`
  },

  {
    id: 'find-cycle-start',
    number: 14,
    title: 'Find the Starting Node of a Cycle',
    difficulty: 'Hard',
    category: 'Advanced',
    description: 'Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return `nullptr`. Do not modify the linked list.',
    inputDesc: 'The head node of a singly linked list.',
    outputDesc: 'The node where the cycle begins, or nullptr if acyclic.',
    constraints: [
      'The number of the nodes in the list is in the range [0, 10^4].',
      '-10^5 <= Node.val <= 10^5'
    ],
    examples: [
      {
        input: 'head = [3, 2, 0, -4], pos = 1',
        output: 'Node with value 2',
        explanation: 'Cycle starts at the node with value 2.'
      },
      {
        input: 'head = [1, 2], pos = 0',
        output: 'Node with value 1',
        explanation: 'Cycle starts at head node.'
      },
      {
        input: 'head = [1], pos = -1',
        output: 'null',
        explanation: 'There is no cycle in the list.'
      }
    ],
    starterCode: `${LISTNODE_PREAMBLE}ListNode* detectCycle(ListNode* head) {
    // Write your solution here
    
    return nullptr;
}`,
    functionName: 'detectCycle',
    visibleTestCases: [
      {
        id: 'tc-1',
        input: 'head = [3, 2, 0, -4], cycleIndex = 1',
        expectedOutput: 'node(2)',
        rawInput: { list: [3, 2, 0, -4], cycleIndex: 1 },
        expectedRawOutput: 2
      },
      {
        id: 'tc-2',
        input: 'head = [1, 2], cycleIndex = 0',
        expectedOutput: 'node(1)',
        rawInput: { list: [1, 2], cycleIndex: 0 },
        expectedRawOutput: 1
      },
      {
        id: 'tc-3',
        input: 'head = [1], cycleIndex = -1',
        expectedOutput: 'null',
        rawInput: { list: [1], cycleIndex: -1 },
        expectedRawOutput: null,
        isEdgeCase: true
      }
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 'head = [5, 10, 15, 20, 25], cycleIndex = 2',
        expectedOutput: 'node(15)',
        rawInput: { list: [5, 10, 15, 20, 25], cycleIndex: 2 },
        expectedRawOutput: 15
      },
      {
        id: 'htc-2',
        input: 'head = [], cycleIndex = -1',
        expectedOutput: 'null',
        rawInput: { list: [], cycleIndex: -1 },
        expectedRawOutput: null,
        isEdgeCase: true
      }
    ],
    hints: [
      'First phase: Find intersection node where `slow == fast` using Floyd\'s algorithm.',
      'If fast reaches null, return null (no cycle).',
      'Second phase: Reset one pointer to `head`. Move both pointers 1 step at a time. Their meeting point is the cycle origin!'
    ],
    expectedComplexity: {
      time: 'O(n)',
      space: 'O(1)'
    },
    explanation: 'Mathematical proof of Floyd\'s algorithm: Distance from head to cycle entrance equals distance from meeting point to cycle entrance modulo cycle length.',
    approachDescription: 'Two-phase Floyd\'s cycle detection and origin rendezvous.',
    referenceSolution: `ListNode* detectCycle(ListNode* head) {
    if (head == nullptr || head->next == nullptr) return nullptr;
    ListNode* slow = head;
    ListNode* fast = head;
    
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            ListNode* entry = head;
            while (entry != slow) {
                entry = entry->next;
                slow = slow->next;
            }
            return entry;
        }
    }
    
    return nullptr;
}`
  },

  {
    id: 'reverse-nodes-in-k-group',
    number: 15,
    title: 'Reverse Nodes in Groups of K',
    difficulty: 'Hard',
    category: 'Advanced',
    description: 'Given the head of a linked list, reverse the nodes of the list `k` at a time, and return the modified list. `k` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of `k` then left-out nodes, in the end, should remain as it is.',
    inputDesc: 'The head node of a singly linked list and an integer k.',
    outputDesc: 'The head node of the list with nodes reversed in k-groups.',
    constraints: [
      'The number of nodes in the list is n.',
      '1 <= k <= n <= 5000',
      '0 <= Node.val <= 1000'
    ],
    examples: [
      {
        input: 'head = [1, 2, 3, 4, 5], k = 2',
        output: '[2, 1, 4, 3, 5]',
        explanation: 'Reversing groups of 2: [1,2] -> [2,1], [3,4] -> [4,3], [5] remains unchanged.'
      },
      {
        input: 'head = [1, 2, 3, 4, 5], k = 3',
        output: '[3, 2, 1, 4, 5]',
        explanation: 'Reversing groups of 3: [1,2,3] -> [3,2,1], [4,5] remains unchanged.'
      }
    ],
    starterCode: `${LISTNODE_PREAMBLE}ListNode* reverseKGroup(ListNode* head, int k) {
    // Write your solution here
    
    return nullptr;
}`,
    functionName: 'reverseKGroup',
    visibleTestCases: [
      {
        id: 'tc-1',
        input: 'head = [1, 2, 3, 4, 5], k = 2',
        expectedOutput: '[2, 1, 4, 3, 5]',
        rawInput: { list: [1, 2, 3, 4, 5], k: 2 },
        expectedRawOutput: [2, 1, 4, 3, 5]
      },
      {
        id: 'tc-2',
        input: 'head = [1, 2, 3, 4, 5], k = 3',
        expectedOutput: '[3, 2, 1, 4, 5]',
        rawInput: { list: [1, 2, 3, 4, 5], k: 3 },
        expectedRawOutput: [3, 2, 1, 4, 5]
      },
      {
        id: 'tc-3',
        input: 'head = [1, 2, 3, 4], k = 4',
        expectedOutput: '[4, 3, 2, 1]',
        rawInput: { list: [1, 2, 3, 4], k: 4 },
        expectedRawOutput: [4, 3, 2, 1]
      }
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 'head = [1, 2, 3, 4, 5, 6], k = 2',
        expectedOutput: '[2, 1, 4, 3, 6, 5]',
        rawInput: { list: [1, 2, 3, 4, 5, 6], k: 2 },
        expectedRawOutput: [2, 1, 4, 3, 6, 5]
      },
      {
        id: 'htc-2',
        input: 'head = [1, 2, 3], k = 1',
        expectedOutput: '[1, 2, 3]',
        rawInput: { list: [1, 2, 3], k: 1 },
        expectedRawOutput: [1, 2, 3]
      }
    ],
    hints: [
      'First check if there are at least k nodes remaining before reversing the current segment.',
      'If fewer than k nodes remain, leave them untouched and break.',
      'Reverse the k nodes using standard 3-pointer reversal, then reconnect the previous group\'s tail to the new group head and the new group tail to `nextGroup`.'
    ],
    expectedComplexity: {
      time: 'O(n)',
      space: 'O(1)'
    },
    explanation: 'Count k nodes ahead; if they exist, reverse the sublist in-place and splice with the surrounding segments.',
    approachDescription: 'Iterative subsegment reversal with dummy sentinel node.',
    referenceSolution: `ListNode* reverseKGroup(ListNode* head, int k) {
    if (head == nullptr || k == 1) return head;
    ListNode dummy(0);
    dummy.next = head;
    ListNode* prevGroup = &dummy;
    
    while (true) {
        ListNode* kth = prevGroup;
        for (int i = 0; i < k && kth != nullptr; i++) {
            kth = kth->next;
        }
        if (kth == nullptr) break;
        
        ListNode* nextGroup = kth->next;
        ListNode* prev = nextGroup;
        ListNode* curr = prevGroup->next;
        
        while (curr != nextGroup) {
            ListNode* temp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = temp;
        }
        
        ListNode* newGroupTail = prevGroup->next;
        prevGroup->next = kth;
        prevGroup = newGroupTail;
    }
    
    return dummy.next;
}`
  }
];
