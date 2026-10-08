export interface NodeData {
  id: string;
  value: number;
  next: string | null; // ID of the next node, or null
}

export type OperationType = 'Insert' | 'Delete' | 'Search' | 'Traverse' | 'Reverse' | 'None';

export interface ModifiedPointer {
  fromId: string | 'HEAD';
  toId: string | null;
}

export interface StepInfo {
  nodes: NodeData[]; // Full state of the list at this step (cloned for immutability)
  headId: string | null;
  
  currentOperation: string;
  stepDescription: string;
  
  // Highlight states to drive visual changes
  currentNodeId?: string | null;
  targetNodeId?: string | null;
  newNodeId?: string | null;
  deletedNodeId?: string | null;
  visitedNodeIds?: string[];
  pointersModified?: ModifiedPointer[];
}

export interface ListState {
  nodes: NodeData[];
  headId: string | null;
}
