import React, { useState, useEffect } from 'react';
import siteTypes from '../data/siteTypes';

const WebsiteTypeStep = ({ formData, updateFormData, addPoints, goToNextStep, goToPreviousStep }) => {
  const [localData, setLocalData] = useState({
    websiteType: formData.websiteType || ''
  });
  
  const [errors, setErrors] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  
  // Check for completeness
  useEffect(() => {
    const complete = localData.websiteType !== '';
    setIsComplete(complete);
  }, [localData]);
  
  // Handle website type selection
  const handleSelectType = (typeId) => {
    setLocalData({
      websiteType: typeId
    });
    
    if (errors.websiteType) {
      setErrors(prev => ({
        ...prev,
        websiteType: null
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate selection
    if (!localData.websiteType) {
      setErrors({ websiteType: 'Please select a website type' });
      return;
    }
    
    // Get the selected site type to award appropriate points
    const selectedType = siteTypes.find(type => type.id === localData.websiteType);
    
    // Update form data
    updateFormData(localData);
    
    // Award "Website Visionary" achievement and the points for the selected type
    addPoints(20, 'website');
    
    // Add the points specific to the website type
    if (selectedType) {
      addPoints(selectedType.points);
    }
    
    // Move to next step
    goToNextStep();
  };
  
  // Get the selected site type for display
  const selectedType = siteTypes.find(type => type.id === localData.websiteType);
  
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Website Type</h3>
        <p className="text-gray-600">
          Select the type of website that best fits your business needs. Different website types offer different functionalities.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Website Type <span className="text-red-500">*</span>
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {siteTypes.map((siteType) => (
              <div
                key={siteType.id}
                onClick={() => handleSelectType(siteType.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  localData.websiteType === siteType.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-lg mb-1">{siteType.label}</h4>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                    {siteType.points} pts
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{siteType.description}</p>
              </div>
            ))}
          </div>
          
          {errors.websiteType && (
            <p className="text-sm text-red-500 mb-4">{errors.websiteType}</p>
          )}
        </div>
        
        {selectedType && (
          <div className="mb-8 bg-green-50 p-4 rounded border border-green-100">
            <div className="flex items-start">
              <div className="text-2xl mr-3">✅</div>
              <div>
                <h4 className="font-medium text-green-800 mb-1">Great choice!</h4>
                <p className="text-green-700">
                  <span className="font-medium">{selectedType.label}:</span> {selectedType.description}
                </p>
                <p className="text-green-700 mt-1 text-sm">
                  In the next step, we'll help you select the specific features needed for your {selectedType.label.toLowerCase()}.
                </p>
              </div>
            </div>
          </div>
        )}
        
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
          <div className="text-2xl mr-3">🖥️</div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Achievement Opportunity!</h4>
            <p className="text-sm text-blue-700">
              Complete this section to earn the "Website Visionary" achievement and 20 points, plus bonus points based on the website type you select!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteTypeStep;
