import React, { useState, useEffect } from 'react';
import industries from '../data/industry';

const IndustryStep = ({ formData, updateFormData, addPoints, goToNextStep, goToPreviousStep }) => {
  const ageRanges = [
    { id: 'under_18', label: 'Under 18' },
    { id: '18_24', label: '18-24' },
    { id: '25_34', label: '25-34' },
    { id: '35_44', label: '35-44' },
    { id: '45_54', label: '45-54' },
    { id: '55_64', label: '55-64' },
    { id: '65_plus', label: '65+' }
  ];
  
  const [localData, setLocalData] = useState({
    industry: formData.industry || '',
    targetAudience: {
      ageRanges: formData.targetAudience?.ageRanges || [],
      locations: formData.targetAudience?.locations || [],
      interests: formData.targetAudience?.interests || [],
      behaviors: formData.targetAudience?.behaviors || []
    }
  });
  
  const [newLocation, setNewLocation] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [newBehavior, setNewBehavior] = useState('');
  
  const [errors, setErrors] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  
  // Check for completeness
  useEffect(() => {
    const { industry, targetAudience } = localData;
    const complete = industry !== '' && 
                    targetAudience.ageRanges.length > 0;
    setIsComplete(complete);
  }, [localData]);
  
  // Handle industry selection
  const handleIndustryChange = (e) => {
    const { value } = e.target;
    setLocalData(prev => ({
      ...prev,
      industry: value
    }));
    
    if (errors.industry) {
      setErrors(prev => ({
        ...prev,
        industry: null
      }));
    }
  };
  
  // Handle age range selection
  const handleAgeRangeChange = (ageRangeId) => {
    setLocalData(prev => {
      const currentAges = prev.targetAudience.ageRanges;
      const updatedAges = currentAges.includes(ageRangeId)
        ? currentAges.filter(id => id !== ageRangeId)
        : [...currentAges, ageRangeId];
        
      return {
        ...prev,
        targetAudience: {
          ...prev.targetAudience,
          ageRanges: updatedAges
        }
      };
    });
    
    if (errors.ageRanges) {
      setErrors(prev => ({
        ...prev,
        ageRanges: null
      }));
    }
  };
  
  // Handle adding a location
  const handleAddLocation = () => {
    if (newLocation.trim() !== '') {
      setLocalData(prev => ({
        ...prev,
        targetAudience: {
          ...prev.targetAudience,
          locations: [...prev.targetAudience.locations, newLocation.trim()]
        }
      }));
      setNewLocation('');
    }
  };
  
  // Handle removing a location
  const handleRemoveLocation = (location) => {
    setLocalData(prev => ({
      ...prev,
      targetAudience: {
        ...prev.targetAudience,
        locations: prev.targetAudience.locations.filter(loc => loc !== location)
      }
    }));
  };
  
  // Handle adding an interest
  const handleAddInterest = () => {
    if (newInterest.trim() !== '') {
      setLocalData(prev => ({
        ...prev,
        targetAudience: {
          ...prev.targetAudience,
          interests: [...prev.targetAudience.interests, newInterest.trim()]
        }
      }));
      setNewInterest('');
    }
  };
  
  // Handle removing an interest
  const handleRemoveInterest = (interest) => {
    setLocalData(prev => ({
      ...prev,
      targetAudience: {
        ...prev.targetAudience,
        interests: prev.targetAudience.interests.filter(int => int !== interest)
      }
    }));
  };
  
  // Handle adding a behavior
  const handleAddBehavior = () => {
    if (newBehavior.trim() !== '') {
      setLocalData(prev => ({
        ...prev,
        targetAudience: {
          ...prev.targetAudience,
          behaviors: [...prev.targetAudience.behaviors, newBehavior.trim()]
        }
      }));
      setNewBehavior('');
    }
  };
  
  // Handle removing a behavior
  const handleRemoveBehavior = (behavior) => {
    setLocalData(prev => ({
      ...prev,
      targetAudience: {
        ...prev.targetAudience,
        behaviors: prev.targetAudience.behaviors.filter(beh => beh !== behavior)
      }
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate fields
    const newErrors = {};
    if (!localData.industry) newErrors.industry = 'Please select an industry';
    if (localData.targetAudience.ageRanges.length === 0) newErrors.ageRanges = 'Select at least one age range';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Update form data
    updateFormData(localData);
    
    // Award achievements
    addPoints(15, 'industry'); // For Industry Expert
    addPoints(25, 'audience'); // For Audience Definer
    
    // Go to next step
    goToNextStep();
  };
  
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Industry & Target Audience</h3>
        <p className="text-gray-600">
          Let us know your industry and who your target audience is. This helps us create a website that speaks directly to your ideal customers.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
            Your Industry <span className="text-red-500">*</span>
          </label>
          <select
            id="industry"
            name="industry"
            value={localData.industry}
            onChange={handleIndustryChange}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
              errors.industry ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select your industry</option>
            {industries.map(industry => (
              <option key={industry.id} value={industry.id}>
                {industry.name}
              </option>
            ))}
          </select>
          {errors.industry && (
            <p className="mt-1 text-sm text-red-500">{errors.industry}</p>
          )}
        </div>
        
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-800 mb-3">Target Audience</h4>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Ranges <span className="text-red-500">*</span>
              <span className="block text-xs font-normal text-gray-500 mt-1">Select all that apply</span>
            </label>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ageRanges.map(range => (
                <div
                  key={range.id}
                  className="flex items-start"
                >
                  <input
                    type="checkbox"
                    id={`age-${range.id}`}
                    checked={localData.targetAudience.ageRanges.includes(range.id)}
                    onChange={() => handleAgeRangeChange(range.id)}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label 
                    htmlFor={`age-${range.id}`}
                    className="ml-2 block text-gray-700 cursor-pointer"
                  >
                    {range.label}
                  </label>
                </div>
              ))}
            </div>
            
            {errors.ageRanges && (
              <p className="mt-1 text-sm text-red-500">{errors.ageRanges}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Locations
              <span className="block text-xs font-normal text-gray-500 mt-1">Add cities, regions, or countries</span>
            </label>
            
            <div className="flex">
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Add a location"
                className="flex-1 p-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddLocation}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            
            {localData.targetAudience.locations.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {localData.targetAudience.locations.map((location, index) => (
                  <div 
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{location}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLocation(location)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interests
              <span className="block text-xs font-normal text-gray-500 mt-1">What is your audience interested in?</span>
            </label>
            
            <div className="flex">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add an interest"
                className="flex-1 p-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            
            {localData.targetAudience.interests.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {localData.targetAudience.interests.map((interest, index) => (
                  <div 
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{interest}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(interest)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Behaviors
              <span className="block text-xs font-normal text-gray-500 mt-1">How does your audience typically behave online?</span>
            </label>
            
            <div className="flex">
              <input
                type="text"
                value={newBehavior}
                onChange={(e) => setNewBehavior(e.target.value)}
                placeholder="Add a behavior"
                className="flex-1 p-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddBehavior}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            
            {localData.targetAudience.behaviors.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {localData.targetAudience.behaviors.map((behavior, index) => (
                  <div 
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{behavior}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBehavior(behavior)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
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
          <div className="text-2xl mr-3">🎯</div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Achievement Opportunity!</h4>
            <p className="text-sm text-blue-700">
              Complete this section to earn the "Industry Expert" and "Audience Definer" achievements for a total of 40 points!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryStep;
