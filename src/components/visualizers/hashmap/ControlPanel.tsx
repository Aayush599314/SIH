import React, { useState } from 'react';
import type { OperationType } from './types';

// ─── Operation Controls ─────────────────────────────────────────────

interface OperationControlsProps {
  onInsert: (key: number, value: string) => void;
  onSearch: (key: number) => void;
  onDelete: (key: number) => void;
  disabled: boolean; // disable while an animation is playing
}

export const OperationControls: React.FC<OperationControlsProps> = ({
  onInsert,
  onSearch,
  onDelete,
  disabled,
}) => {
  const [insertKey, setInsertKey] = useState('');
  const [insertValue, setInsertValue] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [deleteKey, setDeleteKey] = useState('');

  const handleInsert = () => {
    const k = Number(insertKey);
    if (insertKey === '' || isNaN(k)) return;
    onInsert(k, insertValue || String(k));
    setInsertKey('');
    setInsertValue('');
  };

  const handleSearch = () => {
    const k = Number(searchKey);
    if (searchKey === '' || isNaN(k)) return;
    onSearch(k);
    setSearchKey('');
  };

  const handleDelete = () => {
    const k = Number(deleteKey);
    if (deleteKey === '' || isNaN(k)) return;
    onDelete(k);
    setDeleteKey('');
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') action();
  };

  return (
    <div className="hm-ops">
      <h3 className="hm-ops__title">Operations</h3>

      {/* INSERT */}
      <div className="hm-ops__group">
        <span className="hm-ops__badge hm-ops__badge--insert">Insert</span>
        <input
          className="hm-ops__input"
          type="number"
          placeholder="Key"
          value={insertKey}
          onChange={(e) => setInsertKey(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, handleInsert)}
          disabled={disabled}
        />
        <input
          className="hm-ops__input"
          type="text"
          placeholder="Value"
          value={insertValue}
          onChange={(e) => setInsertValue(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, handleInsert)}
          disabled={disabled}
        />
        <button
          className="hm-ops__btn hm-ops__btn--insert"
          onClick={handleInsert}
          disabled={disabled}
        >
          ↵
        </button>
      </div>

      {/* SEARCH */}
      <div className="hm-ops__group">
        <span className="hm-ops__badge hm-ops__badge--search">Search</span>
        <input
          className="hm-ops__input"
          type="number"
          placeholder="Key"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, handleSearch)}
          disabled={disabled}
        />
        <button
          className="hm-ops__btn hm-ops__btn--search"
          onClick={handleSearch}
          disabled={disabled}
        >
          ⌕
        </button>
      </div>

      {/* DELETE */}
      <div className="hm-ops__group">
        <span className="hm-ops__badge hm-ops__badge--delete">Delete</span>
        <input
          className="hm-ops__input"
          type="number"
          placeholder="Key"
          value={deleteKey}
          onChange={(e) => setDeleteKey(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, handleDelete)}
          disabled={disabled}
        />
        <button
          className="hm-ops__btn hm-ops__btn--delete"
          onClick={handleDelete}
          disabled={disabled}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// ─── Execution Controls ─────────────────────────────────────────────

interface ExecutionControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  onReset: () => void;
  currentOperation: OperationType;
}

export const ExecutionControls: React.FC<ExecutionControlsProps> = ({
  currentStep,
  totalSteps,
  isPlaying,
  onPrev,
  onNext,
  onPlayPause,
  onReset,
  currentOperation,
}) => {
  const hasSteps = totalSteps > 0;

  const operationLabel: Record<OperationType, string> = {
    insert: 'INSERT',
    search: 'SEARCH',
    delete: 'DELETE',
    idle: 'IDLE',
  };

  return (
    <div className="hm-exec">
      <div className="hm-exec__status">
        <span
          className={`hm-exec__op-badge hm-exec__op-badge--${currentOperation}`}
        >
          {operationLabel[currentOperation]}
        </span>
        <span className="hm-exec__step-indicator">
          {hasSteps
            ? `Step ${currentStep + 1} / ${totalSteps}`
            : 'No steps'}
        </span>
      </div>

      <div className="hm-exec__buttons">
        <button
          className="hm-exec__btn"
          onClick={onPrev}
          disabled={!hasSteps || currentStep === 0}
          title="Previous step"
        >
          ⏮
        </button>
        <button
          className="hm-exec__btn hm-exec__btn--play"
          onClick={onPlayPause}
          disabled={!hasSteps}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button
          className="hm-exec__btn"
          onClick={onNext}
          disabled={!hasSteps || currentStep >= totalSteps - 1}
          title="Next step"
        >
          ⏭
        </button>
        <button
          className="hm-exec__btn hm-exec__btn--reset"
          onClick={onReset}
          title="Reset"
        >
          ↺
        </button>
      </div>
    </div>
  );
};
