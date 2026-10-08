import type { ListState, NodeData, StepInfo } from './types';

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function cloneNodes(nodes: NodeData[]): NodeData[] {
  return nodes.map((n) => ({ ...n }));
}

class StepBuilder {
  public currentState: ListState;
  private steps: StepInfo[] = [];
  private operationName: string;

  constructor(initialState: ListState, operationName: string) {
    this.currentState = {
      nodes: cloneNodes(initialState.nodes),
      headId: initialState.headId,
    };
    this.operationName = operationName;
  }

  addStep(
    description: string,
    highlights: Partial<Omit<StepInfo, 'nodes' | 'headId' | 'currentOperation' | 'stepDescription'>> = {}
  ) {
    this.steps.push({
      nodes: cloneNodes(this.currentState.nodes),
      headId: this.currentState.headId,
      currentOperation: this.operationName,
      stepDescription: description,
      ...highlights,
    });
  }

  getSteps(): StepInfo[] {
    return this.steps;
  }

  getNode(id: string): NodeData | undefined {
    return this.currentState.nodes.find((n) => n.id === id);
  }
}

export function insertNode(initialState: ListState, value: number, position: number): StepInfo[] {
  const builder = new StepBuilder(initialState, 'Insert');
  const newNodeId = generateId();
  const newNode: NodeData = { id: newNodeId, value, next: null };

  builder.addStep(`Preparing to insert node with value ${value}.`);
  builder.currentState.nodes.push(newNode);
  builder.addStep(`Created new node with value ${value}.`, { newNodeId });

  if (position === 0 || builder.currentState.headId === null) {
    builder.addStep(`Inserting at the beginning.`, { newNodeId });
    newNode.next = builder.currentState.headId;
    builder.addStep(`Point new node's next to current HEAD.`, {
      newNodeId,
      pointersModified: [{ fromId: newNodeId, toId: builder.currentState.headId }],
    });

    builder.currentState.headId = newNodeId;
    builder.addStep(`Update HEAD to point to the new node.`, {
      newNodeId,
      pointersModified: [{ fromId: 'HEAD', toId: newNodeId }],
    });

    return builder.getSteps();
  }

  let currentId: string | null = builder.currentState.headId;
  let currentIndex = 0;
  let prevId: string | null = null;
  const visited: string[] = [];

  builder.addStep(`Traversing to position ${position}.`, { currentNodeId: currentId });

  while (currentId !== null && currentIndex < position) {
    visited.push(currentId);
    builder.addStep(`Checking node at index ${currentIndex}.`, { currentNodeId: currentId, visitedNodeIds: [...visited] });
    prevId = currentId;
    currentId = builder.getNode(currentId)?.next || null;
    currentIndex++;
    if (currentId !== null && currentIndex < position) {
      builder.addStep(`Moving to next node.`, { currentNodeId: currentId, visitedNodeIds: [...visited] });
    }
  }

  if (prevId) {
    const prevNode = builder.getNode(prevId)!;
    builder.addStep(`Found insertion point after node with value ${prevNode.value}.`, { currentNodeId: prevId, newNodeId });

    newNode.next = prevNode.next;
    builder.addStep(`Connect new node to the next node in sequence.`, {
      newNodeId,
      currentNodeId: prevId,
      pointersModified: [{ fromId: newNodeId, toId: newNode.next }],
    });

    prevNode.next = newNodeId;
    builder.addStep(`Update previous node's next to point to new node.`, {
      newNodeId,
      currentNodeId: prevId,
      pointersModified: [{ fromId: prevId, toId: newNodeId }],
    });
  }

  return builder.getSteps();
}

export function deleteNode(initialState: ListState, value: number): StepInfo[] {
  const builder = new StepBuilder(initialState, 'Delete');

  builder.addStep(`Preparing to delete node with value ${value}.`);

  if (builder.currentState.headId === null) {
    builder.addStep(`List is empty. Nothing to delete.`);
    return builder.getSteps();
  }

  let currentId: string | null = builder.currentState.headId;
  let prevId: string | null = null;
  const visited: string[] = [];

  const headNode = builder.getNode(currentId)!;
  if (headNode.value === value) {
    builder.addStep(`Found target value ${value} at HEAD.`, { targetNodeId: currentId });
    builder.currentState.headId = headNode.next;
    builder.addStep(`Update HEAD pointer to skip the deleted node.`, {
      deletedNodeId: currentId,
      pointersModified: [{ fromId: 'HEAD', toId: headNode.next }],
    });
    
    // Remove from nodes array
    builder.currentState.nodes = builder.currentState.nodes.filter(n => n.id !== currentId);
    builder.addStep(`Node removed from memory.`);
    return builder.getSteps();
  }

  while (currentId !== null) {
    const currentNode: NodeData = builder.getNode(currentId)!;
    visited.push(currentId);
    builder.addStep(`Checking node with value ${currentNode.value}.`, { currentNodeId: currentId, visitedNodeIds: [...visited] });

    if (currentNode.value === value) {
      builder.addStep(`Found target value ${value}!`, { targetNodeId: currentId, currentNodeId: currentId, visitedNodeIds: [...visited] });
      const prevNode = builder.getNode(prevId!)!;
      
      prevNode.next = currentNode.next;
      builder.addStep(`Update previous node's next pointer to skip the current node.`, {
        deletedNodeId: currentId,
        currentNodeId: prevId,
        pointersModified: [{ fromId: prevId!, toId: currentNode.next }],
      });

      builder.currentState.nodes = builder.currentState.nodes.filter(n => n.id !== currentId);
      builder.addStep(`Node removed from memory.`);
      return builder.getSteps();
    }

    prevId = currentId;
    currentId = currentNode.next;
    if (currentId !== null) {
      builder.addStep(`Moving to next node.`, { currentNodeId: currentId, visitedNodeIds: [...visited] });
    }
  }

  builder.addStep(`Value ${value} not found in the list.`);
  return builder.getSteps();
}

export function searchNode(initialState: ListState, value: number): StepInfo[] {
  const builder = new StepBuilder(initialState, 'Search');
  builder.addStep(`Searching for value ${value}.`);

  let currentId = builder.currentState.headId;
  const visited: string[] = [];

  while (currentId !== null) {
    const currentNode = builder.getNode(currentId)!;
    visited.push(currentId);
    builder.addStep(`Checking node with value ${currentNode.value}...`, { currentNodeId: currentId, visitedNodeIds: [...visited] });

    if (currentNode.value === value) {
      builder.addStep(`${value} found!`, { targetNodeId: currentId, currentNodeId: currentId, visitedNodeIds: [...visited] });
      return builder.getSteps();
    }

    currentId = currentNode.next;
    if (currentId !== null) {
      builder.addStep(`Not ${value}, moving to next node.`, { currentNodeId: currentId, visitedNodeIds: [...visited] });
    }
  }

  builder.addStep(`Value ${value} not found in the list.`);
  return builder.getSteps();
}

export function traverseList(initialState: ListState): StepInfo[] {
  const builder = new StepBuilder(initialState, 'Traverse');
  builder.addStep(`Starting traversal from HEAD.`);

  let currentId = builder.currentState.headId;
  const visited: string[] = [];

  while (currentId !== null) {
    const currentNode = builder.getNode(currentId)!;
    visited.push(currentId);
    builder.addStep(`Visiting node with value ${currentNode.value}.`, { currentNodeId: currentId, visitedNodeIds: [...visited] });
    currentId = currentNode.next;
    
    if (currentId !== null) {
      builder.addStep(`Moving to next node.`, { currentNodeId: currentId, visitedNodeIds: [...visited] });
    }
  }

  builder.addStep(`Reached the end of the list (NULL).`, { visitedNodeIds: [...visited] });
  return builder.getSteps();
}

export function reverseList(initialState: ListState): StepInfo[] {
  const builder = new StepBuilder(initialState, 'Reverse');
  builder.addStep(`Preparing to reverse the linked list.`);

  let prevId: string | null = null;
  let currentId = builder.currentState.headId;
  let nextId: string | null = null;

  while (currentId !== null) {
    const currentNode = builder.getNode(currentId)!;
    nextId = currentNode.next;
    
    builder.addStep(`Current node is ${currentNode.value}. Save its next pointer.`, { 
      currentNodeId: currentId,
      targetNodeId: nextId 
    });

    currentNode.next = prevId;
    builder.addStep(`Reverse current node's next pointer to point to previous node.`, {
      currentNodeId: currentId,
      pointersModified: [{ fromId: currentId, toId: prevId }]
    });

    prevId = currentId;
    currentId = nextId;

    if (currentId !== null) {
      builder.addStep(`Move forward to the next node.`, { currentNodeId: currentId });
    }
  }

  builder.currentState.headId = prevId;
  builder.addStep(`Update HEAD to point to the new first node.`, {
    pointersModified: [{ fromId: 'HEAD', toId: prevId }]
  });

  return builder.getSteps();
}

// Initial demo data
export function getInitialDemoState(): ListState {
  const node1: NodeData = { id: generateId(), value: 10, next: null };
  const node2: NodeData = { id: generateId(), value: 20, next: null };
  const node3: NodeData = { id: generateId(), value: 30, next: null };
  const node4: NodeData = { id: generateId(), value: 40, next: null };

  node1.next = node2.id;
  node2.next = node3.id;
  node3.next = node4.id;

  return {
    nodes: [node1, node2, node3, node4],
    headId: node1.id,
  };
}
