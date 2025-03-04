import React from 'react';

interface AtlasPanelProps {
  className?: string;
}

const AtlasPanel: React.FC<AtlasPanelProps> = ({ className }) => {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">Atlas Panel</h2>
      {/* Atlas panel content goes here */}
    </div>
  );
};

export default AtlasPanel;
