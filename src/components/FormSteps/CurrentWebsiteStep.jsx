import React, { useState, useEffect } from 'react';

const CurrentWebsiteStep = ({ formData, updateFormData, addPoints, goToNextStep, goToPreviousStep }) => {
  const commonWebsiteIssues = [
    { id: 'not_mobile_friendly', label: 'Not mobile-friendly' },
    { id: 'slow_loading', label: 'Slow loading speed' },
    { id: 'outdated_design', label: 'Outdated design' },
    { id: 'difficult_navigation', label: 'Difficult to navigate' },
    { id: 'poor_seo', label: 'Poor search engine ranking' },
    { id: 'not_secure', label: 'Not secure (no HTTPS)' },
    { id: 'broken_features', label: 'Broken features or links' },
    { id: 'not_converting', label: 'Not converting visitors to customers' },
    { id: 'hard_to_update', label: 'Hard to update content' },
    { id: 'not_accessible', label: 'Not accessible to all users' }
  ];

  const [localData, setLocalData] = useState({
    hasWebsite: formData.hasWebsite !== null ? formData.hasWebsite : null,
    currentWebsite: {
      url: formData.currentWebsite?.url || '',
      issues: formData.currentWebsite?.issues || [],
      likes: formData.currentWebsite?.likes || '',
      dislikes: formData.currentWebsite?.dislikes || ''
    }
  });
  
  const [errors, setErrors] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  
  // Check for completeness
  useEffect(() => {
    // Required field is just the hasWebsite selection
    const complete = localData.hasWebsite !== null;
    
    // If they have a website, URL is required
    if (localData.hasWebsite === true && !localData.currentWebsite.url.trim()) {
      setIsComplete(false);
      return;
    }
    
    setIsComplete(complete);
  }, [localData]);
  
  // Handle whether they have a website
  const handleHasWebsiteChange = (value) => {
    setLocalData(prev => ({
      ...prev,
      hasWebsite: value
    }));
    
    if (errors.hasWebsite) {
      setErrors(prev => ({
        ...prev,
        hasWebsite: null
      }));
    }
  };
  
  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setLocalData(prev => ({
      ...prev,
      currentWebsite: {
        ...prev.currentWebsite,
        [name]: value
      }
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Handle issue checkbox changes
  const handleIssueChange = (issueId) => {
    setLocalData(prev => {
      const currentIssues = prev.currentWebsite.issues;
      const updatedIssues = currentIssues.includes(issueId)
        ? currentIssues.filter(id => id !== issueId)
        : [...currentIssues, issueId];
        
      return {
        ...prev,
        currentWebsite: {
          ...prev.currentWebsite,
          issues: updatedIssues
        }
      };
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate fields
    const newErrors = {};
    if (localData.hasWebsite === null) {
      newErrors.hasWebsite = 'Please select an option';
    }
    
    if (localData.hasWebsite === true && !localData.currentWebsite.url.trim()) {
      newErrors.url = 'Website URL is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Update form data
    updateFormData(localData);
    
    // Add points (no specific achievement for this step)
    addPoints(10);
    
    // Go to next step
    goToNextStep();
  };
  
  // Validate URL format
  const isValidUrl = (url) => {
    try {
      // Add https if missing to make the URL constructor work
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Current Website</h3>
        <p className="text-gray-600">
          Tell us about your current website, if you have one. This helps us understand what's working and what needs improvement.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Do you currently have a website? <span className="text-red-500">*</span>
          </label>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => handleHasWebsiteChange(true)}
              className={`px-5 py-3 rounded-lg border ${
                localData.hasWebsite === true
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            >
              Yes, I have a website
            </button>
            
            <button
              type="button"
              onClick={() => handleHasWebsiteChange(false)}
              className={`px-5 py-3 rounded-lg border ${
                localData.hasWebsite === false
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            >
              No, I don't have a website yet
            </button>
          </div>
          
          {errors.hasWebsite && (
            <p className="mt-2 text-sm text-red-500">{errors.hasWebsite}</p>
          )}
        </div>
        
        {/* Show website details only if they have a website */}
        {localData.hasWebsite === true && (
          <>
            <div className="mb-6">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                Current Website URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="url"
                name="url"
                value={localData.currentWebsite.url}
                onChange={handleChange}
                placeholder="www.example.com"
                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.url ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.url ? (
                <p className="mt-1 text-sm text-red-500">{errors.url}</p>
              ) : (
                localData.currentWebsite.url && !isValidUrl(localData.currentWebsite.url) && (
                  <p className="mt-1 text-sm text-yellow-600">Please enter a valid URL</p>
                )
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What issues are you experiencing with your current website?
                <span className="block text-xs font-normal text-gray-500 mt-1">Select all that apply</span>
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {commonWebsiteIssues.map(issue => (
                  <div
                    key={issue.id}
                    className="flex items-start"
                  >
                    <input
                      type="checkbox"
                      id={`issue-${issue.id}`}
                      checked={localData.currentWebsite.issues.includes(issue.id)}
                      onChange={() => handleIssueChange(issue.id)}
                      className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label 
                      htmlFor={`issue-${issue.id}`}
                      className="ml-2 block text-gray-700 cursor-pointer"
                    >
                      {issue.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="likes" className="block text-sm font-medium text-gray-700 mb-1">
                What do you like about your current website?
              </label>
              <textarea
                id="likes"
                name="likes"
                value={localData.currentWebsite.likes}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Aspects of your current website that work well"
              ></textarea>
            </div>
            
            <div className="mb-8">
              <label htmlFor="dislikes" className="block text-sm font-medium text-gray-700 mb-1">
                What do you dislike about your current website?
              </label>
              <textarea
                id="dislikes"
                name="dislikes"
                value={localData.currentWebsite.dislikes}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Aspects of your current website that need improvement"
              ></textarea>
            </div>
          </>
        )}
        
        {/* Message if they don't have a website */}
        {localData.hasWebsite === false && (
          <div className="mb-8 bg-green-50 p-4 rounded border border-green-100">
            <div className="flex items-start">
              <div className="text-2xl mr-3">✨</div>
              <div>
                <h4 className="font-medium text-green-800 mb-1">Great opportunity!</h4>
                <p className="text-green-700">
                  Starting from scratch gives us the freedom to create exactly what you need without any legacy constraints. Let's build something amazing together!
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
          <div className="text-2xl mr-3">💡</div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Pro Tip</h4>
            <p className="text-sm text-blue-700">
              If you have a current website, being specific about what works and what doesn't helps us create a better solution tailored to your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWebsiteStep;
