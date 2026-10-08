import React from 'react';
import type { ExecutionStep } from './types';

interface StepExplanationProps {
  step: ExecutionStep | null;
}

export const StepExplanation: React.FC<StepExplanationProps> = ({ step }) => {
  if (!step) {
    return (
      <div className="hm-explanation hm-explanation--idle">
        <p className="hm-explanation__text">
          Perform an operation to see the step-by-step explanation.
        </p>
      </div>
    );
  }

  return (
    <div className={`hm-explanation hm-explanation--${step.operation}`}>
      <p className="hm-explanation__text">{step.explanation}</p>
    </div>
  );
};
