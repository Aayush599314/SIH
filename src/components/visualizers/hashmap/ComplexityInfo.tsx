import React from 'react';

export const ComplexityInfo: React.FC = () => {
  return (
    <div className="hm-complexity">
      <h3 className="hm-complexity__title">Time Complexity</h3>
      <table className="hm-complexity__table">
        <thead>
          <tr>
            <th>Operation</th>
            <th>Average</th>
            <th>Worst</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Insert</td>
            <td className="hm-complexity__good">O(1)</td>
            <td className="hm-complexity__bad">O(n)</td>
          </tr>
          <tr>
            <td>Search</td>
            <td className="hm-complexity__good">O(1)</td>
            <td className="hm-complexity__bad">O(n)</td>
          </tr>
          <tr>
            <td>Delete</td>
            <td className="hm-complexity__good">O(1)</td>
            <td className="hm-complexity__bad">O(n)</td>
          </tr>
        </tbody>
      </table>
      <p className="hm-complexity__note">
        Worst case occurs when all keys hash to the same bucket (long chain).
      </p>
    </div>
  );
};
