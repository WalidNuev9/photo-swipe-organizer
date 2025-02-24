
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill bg-primary"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
