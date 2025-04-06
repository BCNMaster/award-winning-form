import React from 'react';

const ProgressBar = ({ currentStep, totalSteps, currentPoints, nextLevelPoints }) => {
  const stepProgress = ((currentStep + 1) / totalSteps) * 100;
  const levelProgress = (currentPoints / nextLevelPoints) * 100;

  return (
    <div className="space-y-3">
      {/* Step progress */}
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-600 w-36">Form Progress:</span>
        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${stepProgress}%` }}
          ></div>
        </div>
        <span className="ml-2 text-sm font-medium text-gray-600">{Math.round(stepProgress)}%</span>
      </div>
      
      {/* Level progress */}
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-600 w-36">Next Level:</span>
        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${levelProgress > 100 ? 100 : levelProgress}%` }}
          ></div>
        </div>
        <span className="ml-2 text-sm font-medium text-gray-600">
          {currentPoints}/{nextLevelPoints}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
