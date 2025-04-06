import React, { useState, useEffect } from 'react';

const ProjectDetailsStep = ({ formData, updateFormData, addPoints, goToNextStep, goToPreviousStep }) => {
  const budgetRanges = [
    { id: 'under_5k', label: 'Under $5,000', info: 'Basic website with minimal features' },
    { id: '5k_10k', label: '$5,000 - $10,000', info: 'Professional website with standard features' },
    { id: '10k_20k', label: '$10,000 - $20,000', info: 'Feature-rich website with custom elements' },
    { id: '20k_50k', label: '$20,000 - $50,000', info: 'Advanced website with extensive functionality' },
    { id: 'over_50k', label: 'Over $50,000', info: 'Enterprise-level website with complex systems' },
    { id: 'undecided', label: 'Undecided / Need guidance', info: 'We can provide recommendations based on your needs' }
  ];
  
  const timelineOptions = [
    { id: 'urgent', label: 'Urgent (ASAP)', info: 'Rush delivery with expedited development' },
    { id: '1_month', label: 'Within 1 month', info: 'Fast-tracked development process' },
    { id: '1_3_months', label: '1-3 months', info: 'Standard development timeline' },
    { id: '3_6_months', label: '3-6 months', info: 'Comprehensive development with multiple revisions' },
    { id: 'flexible', label: 'Flexible / No rush', info: 'We can work at a comfortable pace' }
  ];
  
  const decisionFactors = [
    { id: 'portfolio', label: 'Portfolio and past work' },
    { id: 'price', label: 'Price and value' },
    { id: 'timeline', label: 'Timeline and availability' },
    { id: 'expertise', label: 'Industry expertise' },
    { id: 'communication', label: 'Communication and responsiveness' },
    { id: 'process', label: 'Development process' },
    { id: 'technologies', label: 'Technologies used' },
    { id: 'ongoing_support', label: 'Ongoing support options' },
    { id: 'testimonials', label: 'Client testimonials' }
  ];

  const [localData, setLocalData] = useState({
    project: {
      budget: formData.project?.budget || '',
      timeline: formData.project?.timeline || '',
      decision: formData.project?.decision || []
    }
  });
  
  const [errors, setErrors] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  
  // Check for completeness
  useEffect(() => {
    const { budget, timeline, decision } = localData.project;
    const complete = budget !== '' && timeline !== '' && decision.length > 0;
    setIsComplete(complete);
  }, [localData]);
  
  // Handle budget selection
  const handleBudgetChange = (budgetId) => {
    setLocalData(prev => ({
      ...prev,
      project: {
        ...prev.project,
        budget: budgetId
      }
    }));
    
    if (errors.budget) {
      setErrors(prev => ({
        ...prev,
        budget: null
      }));
    }
  };
  
  // Handle timeline selection
  const handleTimelineChange = (timelineId) => {
    setLocalData(prev => ({
      ...prev,
      project: {
        ...prev.project,
        timeline: timelineId
      }
    }));
    
    if (errors.timeline) {
      setErrors(prev => ({
        ...prev,
        timeline: null
      }));
    }
  };
  
  // Handle decision factor selection
  const handleDecisionChange = (factorId) => {
    setLocalData(prev => {
      const currentFactors = prev.project.decision;
      const updatedFactors = currentFactors.includes(factorId)
        ? currentFactors.filter(id => id !== factorId)
        : [...currentFactors, factorId];
        
      return {
        ...prev,
        project: {
          ...prev.project,
          decision: updatedFactors
        }
      };
    });
    
    if (errors.decision) {
      setErrors(prev => ({
        ...prev,
        decision: null
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate fields
    const newErrors = {};
    if (!localData.project.budget) newErrors.budget = 'Please select a budget range';
    if (!localData.project.timeline) newErrors.timeline = 'Please select a timeline';
    if (localData.project.decision.length === 0) newErrors.decision = 'Please select at least one decision factor';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Update form data
    updateFormData(localData);
    
    // Award "Project Planner" achievement
    addPoints(25, 'planning');
    
    // Move to next step
    goToNextStep();
  };
  
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Project Details</h3>
        <p className="text-gray-600">
          Help us understand your project parameters, including budget, timeline, and what matters most to you.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Budget Range <span className="text-red-500">*</span>
            <span className="block text-xs font-normal text-gray-500 mt-1">Select an approximate budget range for your website project</span>
          </label>
          
          <div className="grid grid-cols-1 gap-3">
            {budgetRanges.map(range => (
              <div
                key={range.id}
                onClick={() => handleBudgetChange(range.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  localData.project.budget === range.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{range.label}</h4>
                  {localData.project.budget === range.id && (
                    <span className="text-blue-600 text-sm">✓</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{range.info}</p>
              </div>
            ))}
          </div>
          
          {errors.budget && (
            <p className="text-sm text-red-500 mt-2">{errors.budget}</p>
          )}
        </div>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Project Timeline <span className="text-red-500">*</span>
            <span className="block text-xs font-normal text-gray-500 mt-1">When would you like your website to be completed?</span>
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {timelineOptions.map(option => (
              <div
                key={option.id}
                onClick={() => handleTimelineChange(option.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  localData.project.timeline === option.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{option.label}</h4>
                  {localData.project.timeline === option.id && (
                    <span className="text-blue-600 text-sm">✓</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{option.info}</p>
              </div>
            ))}
          </div>
          
          {errors.timeline && (
            <p className="text-sm text-red-500 mt-2">{errors.timeline}</p>
          )}
        </div>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Important Decision Factors <span className="text-red-500">*</span>
            <span className="block text-xs font-normal text-gray-500 mt-1">What factors are most important in your decision process?</span>
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {decisionFactors.map(factor => (
              <div
                key={factor.id}
                className="flex items-start"
              >
                <input
                  type="checkbox"
                  id={`factor-${factor.id}`}
                  checked={localData.project.decision.includes(factor.id)}
                  onChange={() => handleDecisionChange(factor.id)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label 
                  htmlFor={`factor-${factor.id}`}
                  className="ml-2 block text-gray-700 cursor-pointer"
                >
                  {factor.label}
                </label>
              </div>
            ))}
          </div>
          
          {errors.decision && (
            <p className="text-sm text-red-500 mt-2">{errors.decision}</p>
          )}
        </div>
        
        <div className="mb-8 bg-blue-50 p-4 rounded border border-blue-100">
          <div className="flex items-start">
            <div className="text-2xl mr-3">📋</div>
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Project Planning</h4>
              <p className="text-blue-700">
                Providing clear project parameters helps us create a proposal that matches your needs and expectations.
              </p>
              <p className="text-blue-700 mt-1 text-sm">
                All budget information is treated as an estimate and can be discussed in detail during our consultation.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={goToPreviousStep}
            className="px-6 py-2 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          
          <button
            type="submit"
            className={`px-6 py-2 rounded font-medium ${
              isComplete
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors`}
            disabled={!isComplete}
          >
            Continue
          </button>
        </div>
      </form>
      
      <div className="mt-8 bg-blue-50 rounded p-4 border border-blue-100">
        <div className="flex items-start">
          <div className="text-2xl mr-3">📅</div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Achievement Opportunity!</h4>
            <p className="text-sm text-blue-700">
              Complete this section to earn the "Project Planner" achievement and 25 points!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsStep;
