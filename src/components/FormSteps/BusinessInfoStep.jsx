import React, { useState, useEffect } from 'react';

const BusinessInfoStep = ({ formData, updateFormData, addPoints, goToNextStep, goToPreviousStep }) => {
  const businessGoalOptions = [
    { id: 'lead_generation', label: 'Generate more leads' },
    { id: 'brand_awareness', label: 'Increase brand awareness' },
    { id: 'online_sales', label: 'Sell products online' },
    { id: 'customer_service', label: 'Improve customer service' },
    { id: 'content_sharing', label: 'Share information and content' },
    { id: 'community_building', label: 'Build a community' },
    { id: 'recruitment', label: 'Attract talent' },
    { id: 'authority', label: 'Establish industry authority' }
  ];

  const [localData, setLocalData] = useState({
    businessName: formData.businessName || '',
    businessDescription: formData.businessDescription || '',
    businessGoals: formData.businessGoals || [],
    yearsInBusiness: formData.yearsInBusiness || ''
  });
  
  const [errors, setErrors] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  
  // Check for completeness
  useEffect(() => {
    const { businessName, businessDescription, businessGoals } = localData;
    const complete = businessName.trim() !== '' && 
                    businessDescription.trim() !== '' && 
                    businessGoals.length > 0;
    setIsComplete(complete);
  }, [localData]);
  
  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Handle checkbox changes for goals
  const handleGoalChange = (goalId) => {
    setLocalData(prev => {
      const currentGoals = prev.businessGoals;
      const updatedGoals = currentGoals.includes(goalId)
        ? currentGoals.filter(id => id !== goalId)
        : [...currentGoals, goalId];
        
      return {
        ...prev,
        businessGoals: updatedGoals
      };
    });
    
    // Clear error when user selects a goal
    if (errors.businessGoals) {
      setErrors(prev => ({
        ...prev,
        businessGoals: null
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate fields
    const newErrors = {};
    if (!localData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!localData.businessDescription.trim()) newErrors.businessDescription = 'Business description is required';
    if (localData.businessGoals.length === 0) newErrors.businessGoals = 'Select at least one business goal';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Update form data
    updateFormData(localData);
    
    // Award "Business Explorer" achievement
    addPoints(20, 'business');
    
    // Move to next step
    goToNextStep();
  };
  
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Tell Us About Your Business</h3>
        <p className="text-gray-600">
          Share information about your business to help us understand your needs and tailor your website accordingly.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={localData.businessName}
            onChange={handleChange}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
              errors.businessName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your business name"
          />
          {errors.businessName && (
            <p className="mt-1 text-sm text-red-500">{errors.businessName}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Business Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="businessDescription"
            name="businessDescription"
            value={localData.businessDescription}
            onChange={handleChange}
            rows="4"
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
              errors.businessDescription ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe your business, products or services"
          ></textarea>
          {errors.businessDescription && (
            <p className="mt-1 text-sm text-red-500">{errors.businessDescription}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="yearsInBusiness" className="block text-sm font-medium text-gray-700 mb-1">
            Years in Business <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <select
            id="yearsInBusiness"
            name="yearsInBusiness"
            value={localData.yearsInBusiness}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          >
            <option value="">Select an option</option>
            <option value="not_yet_started">Not yet started</option>
            <option value="less_than_year">Less than 1 year</option>
            <option value="1_to_3_years">1-3 years</option>
            <option value="4_to_10_years">4-10 years</option>
            <option value="over_10_years">Over 10 years</option>
          </select>
        </div>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Business Goals <span className="text-red-500">*</span>
            <span className="block text-xs font-normal text-gray-500 mt-1">Select all that apply</span>
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {businessGoalOptions.map(goal => (
              <div
                key={goal.id}
                className="flex items-start"
              >
                <input
                  type="checkbox"
                  id={`goal-${goal.id}`}
                  checked={localData.businessGoals.includes(goal.id)}
                  onChange={() => handleGoalChange(goal.id)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label 
                  htmlFor={`goal-${goal.id}`}
                  className="ml-2 block text-gray-700 cursor-pointer"
                >
                  {goal.label}
                </label>
              </div>
            ))}
          </div>
          
          {errors.businessGoals && (
            <p className="mt-1 text-sm text-red-500">{errors.businessGoals}</p>
          )}
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
          <div className="text-2xl mr-3">🏆</div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Achievement Opportunity!</h4>
            <p className="text-sm text-blue-700">
              Complete this section to earn the "Business Explorer" achievement and 20 points!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoStep;
