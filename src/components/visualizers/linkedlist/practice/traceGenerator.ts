import type { TraceStep, VisualNode, PointerInfo } from './types';

// Helper to create nodes
function makeNodes(values: number[], cycleIndex: number = -1): { nodes: VisualNode[]; headId: string | null } {
  if (values.length === 0) return { nodes: [], headId: null };
  const nodes: VisualNode[] = values.map((val, idx) => ({
    id: `node-${idx}`,
    value: val,
    next: idx < values.length - 1 ? `node-${idx + 1}` : null,
    isCycle: false,
  }));

  if (cycleIndex >= 0 && cycleIndex < nodes.length) {
    nodes[nodes.length - 1].next = nodes[cycleIndex].id;
    nodes[nodes.length - 1].isCycle = true;
  }

  return { nodes, headId: nodes[0].id };
}

function cloneNodes(nodes: VisualNode[]): VisualNode[] {
  return nodes.map((n) => ({ ...n }));
}

export function generateTrace(problemId: string, rawInput: any): TraceStep[] {
  const steps: TraceStep[] = [];

  const addStep = (
    desc: string,
    currentNodes: VisualNode[],
    headId: string | null,
    pointers: PointerInfo[],
    highlighted: string[] = [],
    modifiedPointers: { fromId: string; toId: string | null }[] = [],
    isTerminated: boolean = false,
    returnValue?: string
  ) => {
    steps.push({
      stepNumber: steps.length + 1,
      description: desc,
      nodes: cloneNodes(currentNodes),
      headId,
      pointers,
      highlightedNodeIds: highlighted,
      modifiedPointerIds: modifiedPointers,
      isTerminated,
      returnValue,
    });
  };

  switch (problemId) {
    case 'traverse-list': {
      const listVals = rawInput.list || [];
      const { nodes, headId } = makeNodes(listVals);
      if (nodes.length === 0) {
        addStep('List is empty (head is nullptr). Traversal ends immediately.', [], null, [
          { name: 'head', nodeId: null },
        ], [], [], true, '[]');
        return steps;
      }

      let currId: string | null = headId;
      addStep('Initialize curr = head.', nodes, headId, [
        { name: 'curr', nodeId: currId, color: '#3b82f6' },
      ], currId ? [currId] : []);

      const collected: number[] = [];
      while (currId !== null) {
        const currNode = nodes.find((n) => n.id === currId);
        if (!currNode) break;
        collected.push(Number(currNode.value));
        addStep(
          `Visiting node [${currNode.value}]. Append value to result vector: [${collected.join(', ')}]`,
          nodes,
          headId,
          [{ name: 'curr', nodeId: currId, color: '#3b82f6' }],
          [currId]
        );

        const nextId = currNode.next;
        currId = nextId;
        if (currId !== null) {
          addStep(
            `Advance curr to curr->next.`,
            nodes,
            headId,
            [{ name: 'curr', nodeId: currId, color: '#3b82f6' }],
            [currId]
          );
        }
      }

      addStep(
        `curr is now nullptr. Traversal complete! Return [${collected.join(', ')}].`,
        nodes,
        headId,
        [{ name: 'curr', nodeId: null, color: '#3b82f6' }],
        [],
        [],
        true,
        `[${collected.join(', ')}]`
      );
      break;
    }

    case 'find-length': {
      const listVals = rawInput.list || [];
      const { nodes, headId } = makeNodes(listVals);
      if (nodes.length === 0) {
        addStep('List is empty (head == nullptr). Return count = 0.', [], null, [
          { name: 'head', nodeId: null },
        ], [], [], true, '0');
        return steps;
      }

      let count = 0;
      let currId: string | null = headId;
      addStep('Initialize count = 0, curr = head.', nodes, headId, [
        { name: 'curr', nodeId: currId, color: '#3b82f6' },
      ], currId ? [currId] : []);

      while (currId !== null) {
        count++;
        const currNode = nodes.find((n) => n.id === currId);
        addStep(
          `Node present! Increment count to ${count}.`,
          nodes,
          headId,
          [{ name: 'curr', nodeId: currId, color: '#3b82f6' }],
          currId ? [currId] : []
        );

        currId = currNode ? currNode.next : null;
        if (currId !== null) {
          addStep(
            `Advance curr = curr->next.`,
            nodes,
            headId,
            [{ name: 'curr', nodeId: currId, color: '#3b82f6' }],
            [currId]
          );
        }
      }

      addStep(
        `curr reached nullptr. Total nodes counted = ${count}. Return ${count}.`,
        nodes,
        headId,
        [{ name: 'curr', nodeId: null, color: '#3b82f6' }],
        [],
        [],
        true,
        `${count}`
      );
      break;
    }

    case 'search-linked-list': {
      const listVals = rawInput.list || [];
      const target = rawInput.target;
      const { nodes, headId } = makeNodes(listVals);

      if (nodes.length === 0) {
        addStep(`List is empty. Target ${target} cannot be found. Return false.`, [], null, [], [], [], true, 'false');
        return steps;
      }

      let currId: string | null = headId;
      addStep(`Start search for target = ${target}. Set curr = head.`, nodes, headId, [
        { name: 'curr', nodeId: currId, color: '#3b82f6' },
      ], [currId!]);

      let found = false;
      while (currId !== null) {
        const currNode = nodes.find((n) => n.id === currId);
        if (!currNode) break;

        if (currNode.value === target) {
          addStep(
            `Match found! curr->val (${currNode.value}) == target (${target}). Return true.`,
            nodes,
            headId,
            [{ name: 'curr', nodeId: currId, color: '#22c55e' }],
            [currId],
            [],
            true,
            'true'
          );
          found = true;
          break;
        } else {
          addStep(
            `curr->val (${currNode.value}) != target (${target}). Keep searching.`,
            nodes,
            headId,
            [{ name: 'curr', nodeId: currId, color: '#3b82f6' }],
            [currId]
          );
        }

        currId = currNode.next;
        if (currId !== null) {
          addStep(
            `Advance curr = curr->next.`,
            nodes,
            headId,
            [{ name: 'curr', nodeId: currId, color: '#3b82f6' }],
            [currId]
          );
        }
      }

      if (!found) {
        addStep(
          `Reached end of list (nullptr) without finding target ${target}. Return false.`,
          nodes,
          headId,
          [{ name: 'curr', nodeId: null, color: '#ef4444' }],
          [],
          [],
          true,
          'false'
        );
      }
      break;
    }

    case 'insert-at-beginning': {
      const listVals = rawInput.list || [];
      const val = rawInput.val;
      const { nodes, headId } = makeNodes(listVals);

      addStep(`Original list with head pointing to existing nodes.`, nodes, headId, [
        { name: 'head', nodeId: headId, color: '#3b82f6' },
      ]);

      const newNodeId = 'new-node';
      const newNode: VisualNode = { id: newNodeId, value: val, next: null };
      const extendedNodes = [newNode, ...nodes];

      addStep(
        `Allocate new node with value ${val}: newNode = new ListNode(${val}).`,
        extendedNodes,
        headId,
        [
          { name: 'head', nodeId: headId, color: '#3b82f6' },
          { name: 'newNode', nodeId: newNodeId, color: '#a855f7' },
        ],
        [newNodeId]
      );

      newNode.next = headId;
      addStep(
        `Link newNode->next = head.`,
        extendedNodes,
        headId,
        [
          { name: 'head', nodeId: headId, color: '#3b82f6' },
          { name: 'newNode', nodeId: newNodeId, color: '#a855f7' },
        ],
        [newNodeId],
        [{ fromId: newNodeId, toId: headId }]
      );

      addStep(
        `Update head: return newNode as the new head of the list.`,
        extendedNodes,
        newNodeId,
        [{ name: 'head', nodeId: newNodeId, color: '#22c55e' }],
        [newNodeId],
        [],
        true
      );
      break;
    }

    case 'insert-at-end': {
      const listVals = rawInput.list || [];
      const val = rawInput.val;
      const { nodes, headId } = makeNodes(listVals);

      if (nodes.length === 0) {
        const newNode: VisualNode = { id: 'new-node', value: val, next: null };
        addStep(`List is empty. Create and return new node with value ${val}.`, [newNode], 'new-node', [
          { name: 'newNode', nodeId: 'new-node', color: '#22c55e' },
        ], ['new-node'], [], true);
        return steps;
      }

      let currId: string | null = headId;
      addStep(`Start at head to traverse to the tail.`, nodes, headId, [
        { name: 'curr', nodeId: currId, color: '#3b82f6' },
      ], [currId!]);

      while (currId !== null) {
        const currNode = nodes.find((n) => n.id === currId)!;
        if (currNode.next === null) {
          addStep(`curr->next is nullptr. We found the tail node [${currNode.value}].`, nodes, headId, [
            { name: 'curr', nodeId: currId, color: '#22c55e' },
          ], [currId]);
          break;
        }
        currId = currNode.next;
        addStep(`Advance curr = curr->next.`, nodes, headId, [
          { name: 'curr', nodeId: currId, color: '#3b82f6' },
        ], [currId!]);
      }

      const newNodeId = 'new-node';
      const newNode: VisualNode = { id: newNodeId, value: val, next: null };
      nodes.push(newNode);

      addStep(`Allocate new node with value ${val}.`, nodes, headId, [
        { name: 'curr', nodeId: currId, color: '#3b82f6' },
        { name: 'newNode', nodeId: newNodeId, color: '#a855f7' },
      ], [newNodeId]);

      const tailNode = nodes.find((n) => n.id === currId)!;
      tailNode.next = newNodeId;

      addStep(
        `Connect tail node to new node: curr->next = newNode.`,
        nodes,
        headId,
        [
          { name: 'head', nodeId: headId, color: '#3b82f6' },
          { name: 'newNode', nodeId: newNodeId, color: '#22c55e' },
        ],
        [currId!, newNodeId],
        [{ fromId: currId!, toId: newNodeId }],
        true
      );
      break;
    }

    case 'delete-node-by-value': {
      const listVals = rawInput.list || [];
      const val = rawInput.val;
      const { nodes, headId } = makeNodes(listVals);

      if (nodes.length === 0) {
        addStep(`List is empty. Nothing to delete. Return nullptr.`, [], null, [], [], [], true);
        return steps;
      }

      const headNode = nodes.find((n) => n.id === headId)!;
      if (headNode.value === val) {
        addStep(`Target ${val} found at head!`, nodes, headId, [
          { name: 'head', nodeId: headId, color: '#ef4444' },
        ], [headId!]);

        const newHeadId = headNode.next;
        const remainingNodes = nodes.filter((n) => n.id !== headId);
        addStep(
          `Update head = head->next and delete old head node.`,
          remainingNodes,
          newHeadId,
          [{ name: 'head', nodeId: newHeadId, color: '#22c55e' }],
          newHeadId ? [newHeadId] : [],
          [],
          true
        );
        return steps;
      }

      let prevId: string | null = headId;
      let currId: string | null = headNode.next;

      addStep(`Initialize prev = head, curr = head->next.`, nodes, headId, [
        { name: 'prev', nodeId: prevId, color: '#f59e0b' },
        { name: 'curr', nodeId: currId, color: '#3b82f6' },
      ], [prevId!, currId!]);

      let deleted = false;
      while (currId !== null) {
        const currNode = nodes.find((n) => n.id === currId)!;
        if (currNode.value === val) {
          addStep(`Found target node [${val}] to delete!`, nodes, headId, [
            { name: 'prev', nodeId: prevId, color: '#f59e0b' },
            { name: 'curr', nodeId: currId, color: '#ef4444' },
          ], [currId]);

          const prevNode = nodes.find((n) => n.id === prevId)!;
          prevNode.next = currNode.next;

          addStep(
            `Bypass deleted node: prev->next = curr->next.`,
            nodes,
            headId,
            [
              { name: 'prev', nodeId: prevId, color: '#f59e0b' },
              { name: 'curr', nodeId: currId, color: '#ef4444' },
            ],
            [prevId!, currId],
            [{ fromId: prevId!, toId: currNode.next }]
          );

          const finalNodes = nodes.filter((n) => n.id !== currId);
          addStep(
            `Node [${val}] removed. Return head.`,
            finalNodes,
            headId,
            [{ name: 'head', nodeId: headId, color: '#22c55e' }],
            [],
            [],
            true
          );
          deleted = true;
          break;
        }

        prevId = currId;
        currId = currNode.next;
        if (currId !== null) {
          addStep(`Advance prev and curr pointers.`, nodes, headId, [
            { name: 'prev', nodeId: prevId, color: '#f59e0b' },
            { name: 'curr', nodeId: currId, color: '#3b82f6' },
          ], [prevId!, currId!]);
        }
      }

      if (!deleted) {
        addStep(`Target ${val} not found in the list. Return head unchanged.`, nodes, headId, [
          { name: 'head', nodeId: headId, color: '#3b82f6' },
        ], [], [], true);
      }
      break;
    }

    case 'find-middle-node': {
      const listVals = rawInput.list || [];
      const { nodes, headId } = makeNodes(listVals);
      if (nodes.length === 0) return steps;

      let slowId: string | null = headId;
      let fastId: string | null = headId;

      addStep('Initialize slow = head, fast = head.', nodes, headId, [
        { name: 'slow', nodeId: slowId, color: '#3b82f6' },
        { name: 'fast', nodeId: fastId, color: '#a855f7' },
      ], [headId!]);

      while (fastId !== null) {
        const fastNode = nodes.find((n) => n.id === fastId);
        if (!fastNode || fastNode.next === null) break;

        const slowNode = nodes.find((n) => n.id === slowId)!;
        slowId = slowNode.next;

        const fastNext = nodes.find((n) => n.id === fastNode.next);
        fastId = fastNext ? fastNext.next : null;

        addStep(
          `slow moves 1 step -> [${nodes.find((n) => n.id === slowId)?.value}]; fast moves 2 steps.`,
          nodes,
          headId,
          [
            { name: 'slow', nodeId: slowId, color: '#3b82f6' },
            { name: 'fast', nodeId: fastId, color: '#a855f7' },
          ],
          [slowId!, fastId].filter(Boolean) as string[]
        );
      }

      const middleVal = nodes.find((n) => n.id === slowId)?.value;
      addStep(
        `fast reached end (null or tail). slow is precisely at the middle node [${middleVal}]. Return slow.`,
        nodes,
        headId,
        [
          { name: 'slow (middle)', nodeId: slowId, color: '#22c55e' },
          { name: 'fast', nodeId: fastId, color: '#a855f7' },
        ],
        [slowId!],
        [],
        true
      );
      break;
    }

    case 'reverse-linked-list': {
      const listVals = rawInput.list || [];
      const { nodes, headId } = makeNodes(listVals);
      if (nodes.length === 0) {
        addStep('Empty list reversed is still empty (nullptr).', [], null, [], [], [], true);
        return steps;
      }

      let prevId: string | null = null;
      let currId: string | null = headId;

      addStep('Initialize prev = nullptr, curr = head.', nodes, headId, [
        { name: 'prev', nodeId: null, color: '#64748b' },
        { name: 'curr', nodeId: currId, color: '#3b82f6' },
      ], [currId!]);

      while (currId !== null) {
        const currNode = nodes.find((n) => n.id === currId)!;
        const nextId = currNode.next;

        addStep(
          `Save next = curr->next ([${nextId ? nodes.find((n) => n.id === nextId)?.value : 'NULL'}]).`,
          nodes,
          headId,
          [
            { name: 'prev', nodeId: prevId, color: '#f59e0b' },
            { name: 'curr', nodeId: currId, color: '#3b82f6' },
            { name: 'next', nodeId: nextId, color: '#a855f7' },
          ],
          [currId]
        );

        currNode.next = prevId;
        addStep(
          `Reverse pointer: curr->next = prev.`,
          nodes,
          headId,
          [
            { name: 'prev', nodeId: prevId, color: '#f59e0b' },
            { name: 'curr', nodeId: currId, color: '#22c55e' },
            { name: 'next', nodeId: nextId, color: '#a855f7' },
          ],
          [currId],
          [{ fromId: currId, toId: prevId }]
        );

        prevId = currId;
        currId = nextId;

        addStep(
          `Advance: prev = curr, curr = next.`,
          nodes,
          headId,
          [
            { name: 'prev', nodeId: prevId, color: '#f59e0b' },
            { name: 'curr', nodeId: currId, color: '#3b82f6' },
          ],
          prevId ? [prevId] : []
        );
      }

      addStep(
        `curr is nullptr. The reversed list head is prev [${nodes.find((n) => n.id === prevId)?.value}]. Return prev.`,
        nodes,
        prevId,
        [{ name: 'new head (prev)', nodeId: prevId, color: '#22c55e' }],
        [prevId!],
        [],
        true
      );
      break;
    }

    case 'remove-duplicates-sorted': {
      const listVals = rawInput.list || [];
      const { nodes, headId } = makeNodes(listVals);
      if (nodes.length <= 1) {
        addStep('List has 0 or 1 node. No duplicates possible. Return head.', nodes, headId, [
          { name: 'head', nodeId: headId, color: '#22c55e' },
        ], headId ? [headId] : [], [], true);
        return steps;
      }

      let currId: string | null = headId;
      addStep('Initialize curr = head.', nodes, headId, [
        { name: 'curr', nodeId: currId, color: '#3b82f6' },
      ], [currId!]);

      while (currId !== null) {
        const currNode = nodes.find((n) => n.id === currId);
        if (!currNode || currNode.next === null) break;

        const nextNode = nodes.find((n) => n.id === currNode.next)!;
        if (currNode.value === nextNode.value) {
          addStep(
            `Duplicate detected: curr->val (${currNode.value}) == curr->next->val (${nextNode.value})!`,
            nodes,
            headId,
            [
              { name: 'curr', nodeId: currId, color: '#3b82f6' },
              { name: 'dup', nodeId: nextNode.id, color: '#ef4444' },
            ],
            [currId, nextNode.id]
          );

          currNode.next = nextNode.next;
          addStep(
            `Bypass duplicate: curr->next = curr->next->next. (curr stays at [${currNode.value}] to check further duplicates).`,
            nodes,
            headId,
            [{ name: 'curr', nodeId: currId, color: '#22c55e' }],
            [currId],
            [{ fromId: currId, toId: currNode.next }]
          );
        } else {
          currId = currNode.next;
          addStep(
            `Values are distinct. Advance curr = curr->next.`,
            nodes,
            headId,
            [{ name: 'curr', nodeId: currId, color: '#3b82f6' }],
            [currId!]
          );
        }
      }

      addStep('All adjacent duplicates removed! Return head.', nodes, headId, [
        { name: 'head', nodeId: headId, color: '#22c55e' },
      ], [headId!], [], true);
      break;
    }

    case 'remove-nth-from-end': {
      const listVals = rawInput.list || [];
      const n = rawInput.n;
      const { nodes, headId } = makeNodes(listVals);

      const dummyNode: VisualNode = { id: 'dummy', value: 'DUMMY(0)', next: headId };
      const allNodes = [dummyNode, ...nodes];

      addStep('Create dummy node pointing to head to handle edge case of deleting head.', allNodes, 'dummy', [
        { name: 'dummy', nodeId: 'dummy', color: '#94a3b8' },
        { name: 'fast', nodeId: 'dummy', color: '#a855f7' },
        { name: 'slow', nodeId: 'dummy', color: '#3b82f6' },
      ], ['dummy']);

      let fastId: string | null = 'dummy';
      let slowId: string | null = 'dummy';

      for (let i = 0; i <= n; i++) {
        const fNode = allNodes.find((nd) => nd.id === fastId);
        fastId = fNode ? fNode.next : null;
      }

      addStep(
        `Advance fast by n+1 (${n + 1}) steps to create a gap of ${n} nodes.`,
        allNodes,
        'dummy',
        [
          { name: 'fast', nodeId: fastId, color: '#a855f7' },
          { name: 'slow', nodeId: slowId, color: '#3b82f6' },
        ],
        [slowId!, fastId].filter(Boolean) as string[]
      );

      while (fastId !== null) {
        const fNode = allNodes.find((nd) => nd.id === fastId)!;
        const sNode = allNodes.find((nd) => nd.id === slowId)!;
        fastId = fNode.next;
        slowId = sNode.next;

        addStep(
          `Move both slow and fast 1 step forward.`,
          allNodes,
          'dummy',
          [
            { name: 'slow', nodeId: slowId, color: '#3b82f6' },
            { name: 'fast', nodeId: fastId, color: '#a855f7' },
          ],
          [slowId!, fastId].filter(Boolean) as string[]
        );
      }

      const slowNode = allNodes.find((nd) => nd.id === slowId)!;
      const targetNode = allNodes.find((nd) => nd.id === slowNode.next)!;

      addStep(
        `fast reached nullptr. slow is positioned right before the nth node from end ([${targetNode.value}]).`,
        allNodes,
        'dummy',
        [
          { name: 'slow', nodeId: slowId, color: '#3b82f6' },
          { name: 'deleteTarget', nodeId: targetNode.id, color: '#ef4444' },
        ],
        [slowId!, targetNode.id]
      );

      slowNode.next = targetNode.next;
      addStep(
        `Bypass target node: slow->next = slow->next->next. Return dummy->next.`,
        allNodes,
        dummyNode.next,
        [
          { name: 'slow', nodeId: slowId, color: '#22c55e' },
          { name: 'newHead', nodeId: dummyNode.next, color: '#22c55e' },
        ],
        [slowId!],
        [{ fromId: slowId!, toId: targetNode.next }],
        true
      );
      break;
    }

    case 'detect-cycle': {
      const listVals = rawInput.list || [];
      const cycleIndex = rawInput.cycleIndex ?? -1;
      const { nodes, headId } = makeNodes(listVals, cycleIndex);

      if (nodes.length <= 1 && cycleIndex === -1) {
        addStep('Empty or single-node acyclic list. No cycle. Return false.', nodes, headId, [
          { name: 'head', nodeId: headId, color: '#3b82f6' },
        ], [], [], true, 'false');
        return steps;
      }

      let slowId: string | null = headId;
      let fastId: string | null = headId;

      addStep('Initialize slow = head, fast = head (Tortoise and Hare).', nodes, headId, [
        { name: 'slow', nodeId: slowId, color: '#3b82f6' },
        { name: 'fast', nodeId: fastId, color: '#a855f7' },
      ], [headId!]);

      let hasCycle = false;
      let stepsCount = 0;
      const MAX_STEPS = 20;

      while (fastId !== null && stepsCount < MAX_STEPS) {
        stepsCount++;
        const fastNode = nodes.find((n) => n.id === fastId);
        if (!fastNode || fastNode.next === null) break;

        const slowNode = nodes.find((n) => n.id === slowId)!;
        slowId = slowNode.next;

        const fastNext = nodes.find((n) => n.id === fastNode.next);
        fastId = fastNext ? fastNext.next : null;

        addStep(
          `slow moves 1 step; fast moves 2 steps.`,
          nodes,
          headId,
          [
            { name: 'slow', nodeId: slowId, color: '#3b82f6' },
            { name: 'fast', nodeId: fastId, color: '#a855f7' },
          ],
          [slowId!, fastId].filter(Boolean) as string[]
        );

        if (slowId === fastId && slowId !== null) {
          hasCycle = true;
          addStep(
            `Pointers meet at node [${nodes.find((n) => n.id === slowId)?.value}]! Cycle detected! Return true.`,
            nodes,
            headId,
            [
              { name: 'slow == fast', nodeId: slowId, color: '#22c55e' },
            ],
            [slowId],
            [],
            true,
            'true'
          );
          break;
        }
      }

      if (!hasCycle) {
        addStep(
          'fast reached nullptr. List is acyclic. Return false.',
          nodes,
          headId,
          [{ name: 'fast', nodeId: null, color: '#ef4444' }],
          [],
          [],
          true,
          'false'
        );
      }
      break;
    }

    case 'merge-two-sorted-lists': {
      const l1 = rawInput.list1 || [];
      const l2 = rawInput.list2 || [];

      if (l1.length === 0 && l2.length === 0) {
        addStep('Both list1 and list2 are empty. Return nullptr.', [], null, [
          { name: 'list1', nodeId: null },
          { name: 'list2', nodeId: null },
        ], [], [], true, 'nullptr');
        return steps;
      }

      // Create merged nodes display
      const mergedSorted = [...l1, ...l2].sort((a, b) => a - b);
      const { nodes, headId } = makeNodes(mergedSorted);

      const dummyNode: VisualNode = { id: 'dummy', value: 'DUMMY(0)', next: headId };
      const allNodes = [dummyNode, ...nodes];

      addStep('Initialize dummy sentinel node and tail pointer: tail = &dummy.', allNodes, 'dummy', [
        { name: 'dummy', nodeId: 'dummy', color: '#94a3b8' },
        { name: 'tail', nodeId: 'dummy', color: '#3b82f6' },
      ], ['dummy']);

      let tailId: string | null = 'dummy';
      let currSortedIdx = 0;
      let i = 0;
      let j = 0;

      while (i < l1.length && j < l2.length && currSortedIdx < nodes.length) {
        const v1 = l1[i];
        const v2 = l2[j];
        const nextNode = nodes[currSortedIdx];

        if (v1 <= v2) {
          addStep(
            `Compare: list1 val (${v1}) <= list2 val (${v2}). Attach node [${v1}] to tail->next. Advance list1.`,
            allNodes,
            'dummy',
            [
              { name: 'tail', nodeId: tailId, color: '#3b82f6' },
              { name: 'list1', nodeId: nextNode.id, color: '#22c55e' },
            ],
            [nextNode.id],
            tailId ? [{ fromId: tailId, toId: nextNode.id }] : []
          );
          i++;
        } else {
          addStep(
            `Compare: list2 val (${v2}) < list1 val (${v1}). Attach node [${v2}] to tail->next. Advance list2.`,
            allNodes,
            'dummy',
            [
              { name: 'tail', nodeId: tailId, color: '#3b82f6' },
              { name: 'list2', nodeId: nextNode.id, color: '#22c55e' },
            ],
            [nextNode.id],
            tailId ? [{ fromId: tailId, toId: nextNode.id }] : []
          );
          j++;
        }

        tailId = nextNode.id;
        currSortedIdx++;
      }

      // Attach remaining elements
      while (currSortedIdx < nodes.length) {
        const nextNode = nodes[currSortedIdx];
        addStep(
          `One list is exhausted. Splicing remaining node [${nextNode.value}] to merged chain.`,
          allNodes,
          'dummy',
          [{ name: 'tail', nodeId: nextNode.id, color: '#22c55e' }],
          [nextNode.id]
        );
        tailId = nextNode.id;
        currSortedIdx++;
      }

      addStep(
        `Merging complete! Return dummy.next as head of merged list.`,
        allNodes,
        headId,
        [{ name: 'head', nodeId: headId, color: '#22c55e' }],
        headId ? [headId] : [],
        [],
        true,
        `[${mergedSorted.join(', ')}]`
      );
      break;
    }

    case 'find-kth-from-end': {
      const listVals = rawInput.list || [];
      const k = rawInput.k || 1;
      const { nodes, headId } = makeNodes(listVals);

      if (nodes.length === 0) {
        addStep('List is empty. Return nullptr.', [], null, [], [], [], true, 'nullptr');
        return steps;
      }

      let fastId: string | null = headId;
      let slowId: string | null = headId;

      addStep(`Find ${k}th node from end. Initialize fast = head, slow = head.`, nodes, headId, [
        { name: 'slow', nodeId: slowId, color: '#3b82f6' },
        { name: 'fast', nodeId: fastId, color: '#a855f7' },
      ], [headId!]);

      // Move fast k steps ahead
      let canAdvance = true;
      for (let step = 1; step <= k; step++) {
        const fNode = nodes.find((n) => n.id === fastId);
        if (!fNode) {
          canAdvance = false;
          break;
        }
        fastId = fNode.next;
        addStep(
          `Advance fast ${step}/${k} steps ahead -> [${fastId ? nodes.find((n) => n.id === fastId)?.value : 'NULL'}].`,
          nodes,
          headId,
          [
            { name: 'slow', nodeId: slowId, color: '#3b82f6' },
            { name: 'fast', nodeId: fastId, color: '#a855f7' },
          ],
          [slowId!, fastId].filter(Boolean) as string[]
        );
      }

      if (!canAdvance && fastId === null && k > nodes.length) {
        addStep(`k (${k}) is larger than the list size (${nodes.length}). Return nullptr.`, nodes, headId, [
          { name: 'fast', nodeId: null, color: '#ef4444' },
        ], [], [], true, 'nullptr');
        return steps;
      }

      // Move both fast and slow until fast reaches null
      while (fastId !== null) {
        const fNode = nodes.find((n) => n.id === fastId)!;
        const sNode = nodes.find((n) => n.id === slowId)!;
        fastId = fNode.next;
        slowId = sNode.next;

        addStep(
          `Move both fast and slow 1 step forward (maintaining distance ${k}).`,
          nodes,
          headId,
          [
            { name: 'slow', nodeId: slowId, color: '#3b82f6' },
            { name: 'fast', nodeId: fastId, color: '#a855f7' },
          ],
          [slowId!, fastId].filter(Boolean) as string[]
        );
      }

      const kthNode = nodes.find((n) => n.id === slowId);
      addStep(
        `fast reached nullptr. slow is located at the ${k}th node from end ([${kthNode?.value}]). Return slow.`,
        nodes,
        headId,
        [{ name: `slow (${k}th from end)`, nodeId: slowId, color: '#22c55e' }],
        [slowId!],
        [],
        true
      );
      break;
    }

    case 'find-cycle-start': {
      const listVals = rawInput.list || [];
      const cycleIndex = rawInput.cycleIndex ?? -1;
      const { nodes, headId } = makeNodes(listVals, cycleIndex);

      if (nodes.length === 0 || cycleIndex === -1) {
        addStep('List is empty or acyclic. No cycle start exists. Return nullptr.', nodes, headId, [], [], [], true, 'nullptr');
        return steps;
      }

      let slowId: string | null = headId;
      let fastId: string | null = headId;

      addStep('Phase 1: Detect meeting point inside cycle using slow (1 step) and fast (2 steps).', nodes, headId, [
        { name: 'slow', nodeId: slowId, color: '#3b82f6' },
        { name: 'fast', nodeId: fastId, color: '#a855f7' },
      ], [headId!]);

      let met = false;
      let iterations = 0;
      while (fastId !== null && iterations < 20) {
        iterations++;
        const fastNode = nodes.find((n) => n.id === fastId);
        if (!fastNode || fastNode.next === null) break;

        const slowNode = nodes.find((n) => n.id === slowId)!;
        slowId = slowNode.next;

        const fastNext = nodes.find((n) => n.id === fastNode.next);
        fastId = fastNext ? fastNext.next : null;

        addStep(
          `slow moves to [${nodes.find((n) => n.id === slowId)?.value}], fast moves 2 steps.`,
          nodes,
          headId,
          [
            { name: 'slow', nodeId: slowId, color: '#3b82f6' },
            { name: 'fast', nodeId: fastId, color: '#a855f7' },
          ],
          [slowId!, fastId].filter(Boolean) as string[]
        );

        if (slowId === fastId && slowId !== null) {
          met = true;
          break;
        }
      }

      if (!met) {
        addStep('fast reached nullptr. List is acyclic. Return nullptr.', nodes, headId, [], [], [], true, 'nullptr');
        return steps;
      }

      addStep(
        `Phase 1 Complete: Pointers met at node [${nodes.find((n) => n.id === slowId)?.value}]. Now start Phase 2.`,
        nodes,
        headId,
        [{ name: 'meetingPoint', nodeId: slowId, color: '#f59e0b' }],
        [slowId!]
      );

      // Phase 2: Start entry at head
      let entryId: string | null = headId;
      addStep(
        `Phase 2: Reset entry = head. Move entry and slow 1 step each until they rendezvous.`,
        nodes,
        headId,
        [
          { name: 'entry', nodeId: entryId, color: '#38bdf8' },
          { name: 'slow', nodeId: slowId, color: '#a855f7' },
        ],
        [entryId!, slowId!]
      );

      while (entryId !== slowId) {
        const eNode = nodes.find((n) => n.id === entryId)!;
        const sNode = nodes.find((n) => n.id === slowId)!;
        entryId = eNode.next;
        slowId = sNode.next;

        addStep(
          `Move entry and slow 1 step forward.`,
          nodes,
          headId,
          [
            { name: 'entry', nodeId: entryId, color: '#38bdf8' },
            { name: 'slow', nodeId: slowId, color: '#a855f7' },
          ],
          [entryId!, slowId!]
        );
      }

      const cycleOriginNode = nodes.find((n) => n.id === entryId);
      addStep(
        `Rendezvous! entry meets slow at node [${cycleOriginNode?.value}]. This is the cycle start origin! Return node.`,
        nodes,
        headId,
        [{ name: 'cycleOrigin', nodeId: entryId, color: '#22c55e' }],
        [entryId!],
        [],
        true,
        `node(${cycleOriginNode?.value})`
      );
      break;
    }

    case 'reverse-nodes-in-k-group': {
      const listVals = rawInput.list || [];
      const k = rawInput.k || 2;
      const { nodes, headId } = makeNodes(listVals);

      if (nodes.length <= 1 || k === 1) {
        addStep('k == 1 or single-node list. No reversal needed. Return head.', nodes, headId, [
          { name: 'head', nodeId: headId, color: '#22c55e' },
        ], headId ? [headId] : [], [], true);
        return steps;
      }

      const dummyNode: VisualNode = { id: 'dummy', value: 'DUMMY(0)', next: headId };
      const allNodes = [dummyNode, ...nodes];

      addStep(`Initialize sentinel dummy node pointing to head. k = ${k}.`, allNodes, 'dummy', [
        { name: 'dummy', nodeId: 'dummy', color: '#94a3b8' },
        { name: 'prevGroup', nodeId: 'dummy', color: '#3b82f6' },
      ], ['dummy']);

      let prevGroupId: string | null = 'dummy';
      let groupCount = 1;

      while (true) {
        // Find kth node of this group
        let kthId: string | null = prevGroupId;
        for (let i = 0; i < k && kthId !== null; i++) {
          const kNode = allNodes.find((n) => n.id === kthId);
          kthId = kNode ? kNode.next : null;
        }

        if (kthId === null) {
          addStep(
            `Fewer than k (${k}) nodes remain in group ${groupCount}. Leaving remaining nodes unchanged.`,
            allNodes,
            dummyNode.next,
            [{ name: 'prevGroup', nodeId: prevGroupId, color: '#64748b' }]
          );
          break;
        }

        const kthNode = allNodes.find((n) => n.id === kthId)!;
        const prevGroupNode = allNodes.find((n) => n.id === prevGroupId)!;
        const nextGroupId = kthNode.next;
        const groupStartId = prevGroupNode.next;

        addStep(
          `Group ${groupCount}: Found ${k} nodes to reverse, ending at node [${kthNode.value}].`,
          allNodes,
          dummyNode.next,
          [
            { name: 'prevGroup', nodeId: prevGroupId, color: '#3b82f6' },
            { name: 'groupStart', nodeId: groupStartId, color: '#f59e0b' },
            { name: 'kth', nodeId: kthId, color: '#a855f7' },
          ],
          [groupStartId!, kthId]
        );

        // Reverse k nodes
        let prev = nextGroupId;
        let curr = groupStartId;
        while (curr !== nextGroupId && curr !== null) {
          const cNode = allNodes.find((n) => n.id === curr)!;
          const temp = cNode.next;
          cNode.next = prev;
          prev = curr;
          curr = temp;
        }

        // Connect prevGroup to kth (new head of reversed group)
        prevGroupNode.next = kthId;

        addStep(
          `Group ${groupCount} reversed! Relink prevGroup->next to [${kthNode.value}].`,
          allNodes,
          dummyNode.next,
          [
            { name: 'newGroupHead', nodeId: kthId, color: '#22c55e' },
            { name: 'newGroupTail', nodeId: groupStartId, color: '#f59e0b' },
          ],
          [kthId, groupStartId!],
          [{ fromId: prevGroupId!, toId: kthId }]
        );

        prevGroupId = groupStartId;
        groupCount++;
      }

      addStep(
        `All k-groups processed. Return dummy.next.`,
        allNodes,
        dummyNode.next,
        [{ name: 'head', nodeId: dummyNode.next, color: '#22c55e' }],
        dummyNode.next ? [dummyNode.next] : [],
        [],
        true
      );
      break;
    }

    default: {
      const listVals = rawInput.list || [1, 2, 3, 4, 5];
      const { nodes, headId } = makeNodes(listVals);
      addStep(`Executing algorithm for ${problemId}.`, nodes, headId, [
        { name: 'head', nodeId: headId, color: '#3b82f6' },
      ], headId ? [headId] : []);

      let curr = headId;
      while (curr !== null) {
        const cNode = nodes.find((n) => n.id === curr);
        if (!cNode) break;
        addStep(`Processing node [${cNode.value}].`, nodes, headId, [
          { name: 'curr', nodeId: curr, color: '#3b82f6' },
        ], [curr]);
        curr = cNode.next;
      }

      addStep(`Execution complete!`, nodes, headId, [
        { name: 'head', nodeId: headId, color: '#22c55e' },
      ], [], [], true);
      break;
    }
  }

  return steps;
}
