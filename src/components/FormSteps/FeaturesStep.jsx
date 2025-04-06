import React, { useState, useEffect } from 'react';
import siteTypes from '../data/siteTypes';
import features from '../data/features';
import featuresMore from '../data/featuresMore';

const FeaturesStep = ({ formData, updateFormData, addPoints, goToNextStep, goToPreviousStep }) => {
  const [localData, setLocalData] = useState({
    features: formData.features || [],
    customFeatures: formData.customFeatures || ''
  });
  
  const [errors, setErrors] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  
  // Get the selected website type
  const selectedType = siteTypes.find(type => type.id === formData.websiteType);
  
  // Filter features for the selected website type
  const relevantFeatures = [...features.filter(feature => 
    feature.forTypes.includes(formData.websiteType) || feature.forTypes.includes('all')
  )];
  
  // Additional features that could be useful
  const additionalFeatures = [...featuresMore.filter(feature => 
    feature.forTypes.includes(formData.websiteType) || feature.forTypes.includes('all')
  )];
  
  // Combine all features
  const allFeatures = [...relevantFeatures, ...additionalFeatures];
  
  // Check for completeness
  useEffect(() => {
    const complete = localData.features.length > 0;
    setIsComplete(complete);
  }, [localData]);
  
  // Handle feature selection
  const handleFeatureChange = (featureId) => {
    setLocalData(prev => {
      const currentFeatures = prev.features;
      const updatedFeatures = currentFeatures.includes(featureId)
        ? currentFeatures.filter(id => id !== featureId)
        : [...currentFeatures, featureId];
        
      return {
        ...prev,
        features: updatedFeatures
      };
    });
    
    if (errors.features) {
      setErrors(prev => ({
        ...prev,
        features: null
      }));
    }
  };
  
  // Handle custom features input
  const handleCustomChange = (e) => {
    setLocalData(prev => ({
      ...prev,
      customFeatures: e.target.value
    }));
  };
  
  // Calculate total points from selected features
  const calculateFeaturePoints = () => {
    return localData.features.reduce((total, featureId) => {
      const feature = allFeatures.find(f => f.id === featureId);
      return total + (feature ? feature.points : 0);
    }, 0);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate fields
    if (localData.features.length === 0) {
      setErrors({ features: 'Select at least one feature for your website' });
      return;
    }
    
    // Update form data
    updateFormData(localData);
    
    // Award "Feature Collector" achievement
    addPoints(25, 'features');
    
    // Add points based on selected features
    const featurePoints = calculateFeaturePoints();
    addPoints(featurePoints);
    
    // Move to next step
    goToNextStep();
  };
  
  // Group features by category
  const groupedFeatures = {};
  allFeatures.forEach(feature => {
    if (!groupedFeatures[feature.category]) {
      groupedFeatures[feature.category] = [];
    }
    groupedFeatures[feature.category].push(feature);
  });
  
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Website Features</h3>
        <p className="text-gray-600">
          Select the features you want to include in your {selectedType ? selectedType.label.toLowerCase() : 'website'}.
          We've suggested features that work well for your website type.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
          <div key={category} className="mb-8">
            <h4 className="text-lg font-medium text-gray-800 mb-3">{category}</h4>
            
            <div className="grid grid-cols-1 gap-3">
              {categoryFeatures.map(feature => {
                const isRecommended = relevantFeatures.some(f => f.id === feature.id);
                
                return (
                  <div
                    key={feature.id}
                    className={`p-4 rounded-lg border transition-all ${
                      localData.features.includes(feature.id) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200'
                    } ${isRecommended ? 'border-l-4 border-l-blue-500' : ''}`}
                  >
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id={`feature-${feature.id}`}
                        checked={localData.features.includes(feature.id)}
                        onChange={() => handleFeatureChange(feature.id)}
                        className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="ml-3 flex-1">
                        <label 
                          htmlFor={`feature-${feature.id}`}
                          className="block text-gray-800 font-medium cursor-pointer"
                        >
                          {feature.name}
                          {isRecommended && (
                            <span className="ml-2 text-xs font-normal text-blue-600 bg-blue-100 rounded px-2 py-0.5">
                              Recommended
                            </span>
                          )}
                          <span className="ml-2 text-xs font-normal text-green-600">
                            +{feature.points} pts
                          </span>
                        </label>
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        {errors.features && (
          <p className="text-sm text-red-500 mb-4">{errors.features}</p>
        )}
        
        <div className="mb-8">
          <label htmlFor="customFeatures" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Features
            <span className="block text-xs font-normal text-gray-500 mt-1">
              Describe any other specific features you need that aren't listed above
            </span>
          </label>
          <textarea
            id="customFeatures"
            name="customFeatures"
            value={localData.customFeatures}
            onChange={handleCustomChange}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Describe any custom features you need..."
          ></textarea>
        </div>
        
        <div className="mb-8 bg-green-50 p-4 rounded border border-green-100">
          <div className="flex items-start">
            <div className="text-2xl mr-3">🎮</div>
            <div>
              <h4 className="font-medium text-green-800 mb-1">Features Selected: {localData.features.length}</h4>
              <p className="text-green-700">
                You've selected features worth <span className="font-bold">{calculateFeaturePoints()} points</span>!
              </p>
              <p className="text-green-700 mt-1 text-sm">
                The more features you select, the more powerful your website will be.
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
          <div className="text-2xl mr-3">⚙️</div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Achievement Opportunity!</h4>
            <p className="text-sm text-blue-700">
              Complete this section to earn the "Feature Collector" achievement and 25 base points, plus bonus points for each feature you select!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesStep;
