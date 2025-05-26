import React from 'react';

interface ProgressBarProps {
  percentage: number;
  color: string;
}

function ProgressBar({ percentage, color }: ProgressBarProps) {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track">
        <div 
          className="progress-bar-fill"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
      <span className="progress-percentage">
        {percentage}%
      </span>
    </div>
  );
}

export default ProgressBar;