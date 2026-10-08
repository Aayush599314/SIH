import { useState, useEffect, useRef } from 'react';
import './LinkedListVisualizer.css';
import {
  getInitialDemoState,
  insertNode,
  deleteNode,
  searchNode,
  traverseList,
  reverseList,
} from './linkedListLogic';
import type { StepInfo, OperationType, NodeData } from './types';
import { PracticeView } from './practice/PracticeView';

export function LinkedListVisualizer() {
  const [activeTab, setActiveTab] = useState<'visualize' | 'practice'>('visualize');
  const [listState, setListState] = useState(getInitialDemoState());
  const [steps, setSteps] = useState<StepInfo[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [operation, setOperation] = useState<OperationType>('None');

  // Input states
  const [inputValue, setInputValue] = useState(50);
  const [inputPosition, setInputPosition] = useState(0);

  const timerRef = useRef<number | null>(null);

  // Playback logic
  useEffect(() => {
    if (isPlaying && currentStepIndex < steps.length - 1) {
      timerRef.current = window.setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 800);
    } else if (currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, steps.length]);

  const runOperation = (newSteps: StepInfo[]) => {
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  const handleInsert = () => {
    setOperation('Insert');
    const newSteps = insertNode(listState, inputValue, inputPosition);
    runOperation(newSteps);
  };

  const handleDelete = () => {
    setOperation('Delete');
    const newSteps = deleteNode(listState, inputValue);
    runOperation(newSteps);
  };

  const handleSearch = () => {
    setOperation('Search');
    const newSteps = searchNode(listState, inputValue);
    runOperation(newSteps);
  };

  const handleTraverse = () => {
    setOperation('Traverse');
    const newSteps = traverseList(listState);
    runOperation(newSteps);
  };

  const handleReverse = () => {
    setOperation('Reverse');
    const newSteps = reverseList(listState);
    runOperation(newSteps);
  };

  const handleReset = () => {
    setListState(getInitialDemoState());
    setSteps([]);
    setCurrentStepIndex(-1);
    setOperation('None');
    setIsPlaying(false);
  };

  // Commit changes to list state when steps finish, so next operations build on it.
  useEffect(() => {
    if (steps.length > 0 && currentStepIndex === steps.length - 1 && !isPlaying) {
      const lastStep = steps[steps.length - 1];
      setListState({ nodes: lastStep.nodes, headId: lastStep.headId });
    }
  }, [currentStepIndex, steps, isPlaying]);

  const currentStep = currentStepIndex >= 0 && currentStepIndex < steps.length ? steps[currentStepIndex] : null;

  // Use currentStep state if available (animating), otherwise use base state
  const displayNodes = currentStep ? currentStep.nodes : listState.nodes;
  const displayHeadId = currentStep ? currentStep.headId : listState.headId;

  // Reorder nodes array visually starting from head
  const orderedVisualNodes: NodeData[] = [];
  const renderSet = new Set<string>();
  
  let currId = displayHeadId;
  while (currId !== null) {
    const node = displayNodes.find((n) => n.id === currId);
    if (!node) break;
    orderedVisualNodes.push(node);
    renderSet.add(node.id);
    currId = node.next;
  }

  // Include any nodes not reachable from head (e.g., deleted node or newly created node before linking)
  displayNodes.forEach(node => {
    if (!renderSet.has(node.id)) {
      orderedVisualNodes.push(node);
    }
  });

  return (
    <div className="ll-container">
      {/* Studio Top Navigation */}
      <header className="ll-nav-header">
        <div className="ll-brand">
          <span className="ll-brand-icon">⚡</span>
          <span className="ll-brand-title">Singly Linked List</span>
          <span className="ll-brand-subtitle">Interactive Studio</span>
        </div>
        <div className="ll-tab-group">
          <button
            type="button"
            className={`ll-tab-btn ${activeTab === 'visualize' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('visualize')}
          >
            📊 Visualize
          </button>
          <button
            type="button"
            className={`ll-tab-btn ${activeTab === 'practice' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('practice')}
          >
            💻 Practice
          </button>
        </div>
      </header>

      {/* Mode View: Visualize */}
      {activeTab === 'visualize' && (
        <>
          <div className="ll-top-panel">
            <div className="ll-card">
              <h2>Controls</h2>
              
              <div className="ll-controls">
                <select 
                  className="ll-input" 
                  value={operation} 
                  onChange={(e) => setOperation(e.target.value as OperationType)}
                  style={{ width: '120px' }}
                >
                  <option value="None">Select...</option>
                  <option value="Insert">Insert</option>
                  <option value="Delete">Delete</option>
                  <option value="Search">Search</option>
                  <option value="Traverse">Traverse</option>
                  <option value="Reverse">Reverse</option>
                </select>
                
                <button className="ll-btn" onClick={handleReset}>Reset Data</button>
              </div>

              <div className="ll-controls">
                {(operation === 'Insert' || operation === 'Search' || operation === 'Delete') && (
                  <input 
                    type="number" 
                    className="ll-input" 
                    placeholder="Value" 
                    value={inputValue}
                    onChange={(e) => setInputValue(Number(e.target.value))}
                  />
                )}
                
                {operation === 'Insert' && (
                  <input 
                    type="number" 
                    className="ll-input" 
                    placeholder="Position (0 = start)" 
                    value={inputPosition}
                    onChange={(e) => setInputPosition(Number(e.target.value))}
                  />
                )}

                {operation === 'Insert' && <button className="ll-btn ll-btn-primary" onClick={handleInsert}>Insert</button>}
                {operation === 'Delete' && <button className="ll-btn ll-btn-primary" onClick={handleDelete}>Delete</button>}
                {operation === 'Search' && <button className="ll-btn ll-btn-primary" onClick={handleSearch}>Search</button>}
                {operation === 'Traverse' && <button className="ll-btn ll-btn-primary" onClick={handleTraverse}>Start Traversal</button>}
                {operation === 'Reverse' && <button className="ll-btn ll-btn-primary" onClick={handleReverse}>Start Reversal</button>}
              </div>
            </div>

            <div className="ll-card">
              <h2>Current Step</h2>
              {currentStep ? (
                <>
                  <div className="ll-status-text">{currentStep.currentOperation} in progress...</div>
                  <div className="ll-explanation">{currentStep.stepDescription}</div>
                </>
              ) : (
                <div className="ll-explanation" style={{ color: '#64748b' }}>Waiting for action...</div>
              )}
              
              <div className="ll-playback">
                <button 
                  className="ll-btn" 
                  disabled={currentStepIndex <= 0}
                  onClick={() => { setIsPlaying(false); setCurrentStepIndex(p => p - 1); }}
                >
                  Prev
                </button>
                <button 
                  className="ll-btn ll-btn-primary" 
                  disabled={steps.length === 0 || currentStepIndex >= steps.length - 1}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button 
                  className="ll-btn" 
                  disabled={currentStepIndex >= steps.length - 1}
                  onClick={() => { setIsPlaying(false); setCurrentStepIndex(p => p + 1); }}
                >
                  Next
                </button>
                <div className="ll-step-indicator">
                  {steps.length > 0 ? `Step ${currentStepIndex + 1} / ${steps.length}` : 'Step 0 / 0'}
                </div>
              </div>
            </div>

            <div className="ll-card" style={{ flex: '0 0 250px' }}>
              <h2>Complexity</h2>
              <div className="ll-complexity-grid">
                <div className="ll-complexity-category">Insert</div>
                <div className="ll-complexity-item"><span>Beginning</span> <span className="ll-complexity-value">O(1)</span></div>
                <div className="ll-complexity-item"><span>End / Pos</span> <span className="ll-complexity-value">O(n)</span></div>
                
                <div className="ll-complexity-category">Search / Delete</div>
                <div className="ll-complexity-item"><span>Search</span> <span className="ll-complexity-value">O(n)</span></div>
                <div className="ll-complexity-item"><span>Delete Val</span> <span className="ll-complexity-value">O(n)</span></div>
                
                <div className="ll-complexity-category">Other</div>
                <div className="ll-complexity-item"><span>Reverse</span> <span className="ll-complexity-value">O(n)</span></div>
              </div>
            </div>
          </div>

          <div className="ll-card">
            <h2>Visualization</h2>
            <div className="ll-visualization-area">
              <div className="ll-list-container">
                {orderedVisualNodes.length === 0 && <div className="ll-null">NULL (Empty List)</div>}
                
                {orderedVisualNodes.map((node) => {
                  const isHead = node.id === displayHeadId;
                  let isCurrent = false;
                  let isTarget = false;
                  let isNew = false;
                  let isDeleted = false;
                  let isVisited = false;
                  let pointerModified = false;

                  if (currentStep) {
                    isCurrent = currentStep.currentNodeId === node.id;
                    isTarget = currentStep.targetNodeId === node.id;
                    isNew = currentStep.newNodeId === node.id;
                    isDeleted = currentStep.deletedNodeId === node.id;
                    isVisited = currentStep.visitedNodeIds?.includes(node.id) || false;
                    
                    pointerModified = currentStep.pointersModified?.some(p => p.fromId === node.id) || false;
                  }

                  let classNames = 'll-node';
                  if (isCurrent) classNames += ' is-current';
                  if (isTarget) classNames += ' is-target';
                  if (isNew) classNames += ' is-new';
                  if (isDeleted) classNames += ' is-deleted';
                  if (isVisited && !isCurrent && !isTarget && !isNew) classNames += ' is-visited';

                  return (
                    <div key={node.id} className="ll-node-wrapper">
                      <div className={classNames}>
                        {isHead && <div className="ll-head-label">HEAD</div>}
                        <div className="ll-node-value">{node.value}</div>
                        <div className="ll-node-next">•</div>
                      </div>
                      
                      {/* Render pointer if this node points to something */}
                      <div className="ll-pointer-container">
                        <div className={`ll-pointer ${pointerModified ? 'is-modified' : ''}`}></div>
                      </div>
                      
                      {/* If this node's next is null, render NULL explicitly if it's visually at the end of a chain */}
                      {node.next === null && (
                         <div className="ll-null">NULL</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mode View: Practice */}
      {activeTab === 'practice' && <PracticeView />}
    </div>
  );
}

export default LinkedListVisualizer;
