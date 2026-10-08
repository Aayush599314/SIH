import React from 'react';
import type { Bucket, HashEntry } from './types';

interface BucketViewProps {
  bucket: Bucket;
  isHighlighted: boolean;
  highlightEntryId: string | null;
}

export const BucketView: React.FC<BucketViewProps> = ({
  bucket,
  isHighlighted,
  highlightEntryId,
}) => {
  return (
    <div
      className={`hm-bucket ${isHighlighted ? 'hm-bucket--active' : ''}`}
    >
      <div className="hm-bucket__index">{bucket.index}</div>

      <div className="hm-bucket__chain">
        {bucket.entries.length === 0 ? (
          <span className="hm-bucket__empty">empty</span>
        ) : (
          bucket.entries.map((entry: HashEntry, i: number) => (
            <React.Fragment key={entry.id}>
              {i > 0 && <span className="hm-bucket__arrow">→</span>}
              <div
                className={`hm-entry ${
                  highlightEntryId === entry.id ? 'hm-entry--active' : ''
                }`}
              >
                <span className="hm-entry__key">{entry.key}</span>
                <span className="hm-entry__sep">:</span>
                <span className="hm-entry__value">"{entry.value}"</span>
              </div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};
