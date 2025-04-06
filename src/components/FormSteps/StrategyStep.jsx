import React, { useState, useEffect } from 'react';

const StrategyStep = ({ formData, updateFormData, addPoints, goToNextStep, goToPreviousStep }) => {
  const seoStrategies = [
    { id: 'local_seo', label: 'Local SEO (optimize for local searches)' },
    { id: 'organic_seo', label: 'Organic SEO (rank for industry keywords)' },
    { id: 'technical_seo', label: 'Technical SEO (performance optimization)' },
    { id: 'content_seo', label: 'Content SEO (optimization through blog posts)' },
    { id: 'ecommerce_seo', label: 'E-commerce SEO (product page optimization)' },
    { id: 'international_seo', label: 'International SEO (target different regions)' }
  ];
  
  const contentStrategies = [
    { id: 'blog', label: 'Blog posts' },
    { id: 'case_studies', label: 'Case studies' },
    { id: 'whitepapers', label: 'White papers' },
    { id: 'videos', label: 'Video content' },
    { id: 'podcasts', label: 'Podcasts' },
    { id: 'infographics', label: 'Infographics' },
    { id: 'newsletters', label: 'Email newsletters' },
    { id: 'user_generated', label: 'User-generated content' },
    { id: 'testimonials', label: 'Testimonials and reviews' }
  ];

  const [localData, setLocalData] = useState({
    strategy: {
      seo: formData.strategy?.seo || [],
      content: formData.strategy?.content || [],
      goals: formData.strategy?.goals || []
    }
  });
  
  const [newGoal, setNewGoal] = useState('');
  const [errors, setErrors] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  
  // Check for completeness
  useEffect(() => {
    const { seo, content } = localData.strategy;
    const complete = seo.length > 0 || content.length > 0;
    setIsComplete(complete);
  }, [localData]);
  
  // Handle SEO strategy selection
  const handleSeoChange = (strategyId) => {
    setLocalData(prev => {
      const currentSeo = prev.strategy.seo;
      const updatedSeo = currentSeo.includes(strategyId)
        ? currentSeo.filter(id => id !== strategyId)
        : [...currentSeo, strategyId];
        
      return {
        ...prev,
        strategy: {
          ...prev.strategy,
          seo: updatedSeo
        }
      };
    });
  };
  
  // Handle content strategy selection
  const handleContentChange = (strategyId) => {
    setLocalData(prev => {
      const currentContent = prev.strategy.content;
      const updatedContent = currentContent.includes(strategyId)
        ? currentContent.filter(id => id !== strategyId)
        : [...currentContent, strategyId];
        
      return {
        ...prev,
        strategy: {
          ...prev.strategy,
          content: updatedContent
        }
      };
    });
  };
  
  // Handle adding a goal
  const handleAddGoal = () => {
    if (newGoal.trim() !== '') {
      setLocalData(prev => ({
        ...prev,
        strategy: {
          ...prev.strategy,
          goals: [...prev.strategy.goals, newGoal.trim()]
        }
      }));
      setNewGoal('');
    }
  };
  
  // Handle removing a goal
  const handleRemoveGoal = (goal) => {
    setLocalData(prev => ({
      ...prev,
      strategy: {
        ...prev.strategy,
        goals: prev.strategy.goals.filter(g => g !== goal)
      }
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // No strict validation needed here as both SEO and content are optional
    
    // Update form data
    updateFormData(localData);
    
    // Award points based on strategy choices
    const totalStrategies = localData.strategy.seo.length + localData.strategy.content.length;
    const strategyPoints = Math.min(Math.max(totalStrategies * 5, 5), 30); // Min 5, max 30 points
    
    addPoints(strategyPoints);
    
    // Move to next step
    goToNextStep();
  };
  
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Website Strategy</h3>
        <p className="text-gray-600">
          Define the SEO and content strategies for your website. This helps us optimize your site for better results.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            SEO Strategy
            <span className="block text-xs font-normal text-gray-500 mt-1">Select the SEO approaches that match your goals</span>
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {seoStrategies.map(strategy => (
              <div
                key={strategy.id}
                className="flex items-start"
              >
                <input
                  type="checkbox"
                  id={`seo-${strategy.id}`}
                  checked={localData.strategy.seo.includes(strategy.id)}
                  onChange={() => handleSeoChange(strategy.id)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label 
                  htmlFor={`seo-${strategy.id}`}
                  className="ml-2 block text-gray-700 cursor-pointer"
                >
                  {strategy.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Content Strategy
            <span className="block text-xs font-normal text-gray-500 mt-1">Select types of content you want to create</span>
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {contentStrategies.map(strategy => (
              <div
                key={strategy.id}
                className="flex items-start"
              >
                <input
                  type="checkbox"
                  id={`content-${strategy.id}`}
                  checked={localData.strategy.content.includes(strategy.id)}
                  onChange={() => handleContentChange(strategy.id)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label 
                  htmlFor={`content-${strategy.id}`}
                  className="ml-2 block text-gray-700 cursor-pointer"
                >
                  {strategy.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website Goals
            <span className="block text-xs font-normal text-gray-500 mt-1">What key goals do you have for your website?</span>
          </label>
          
          <div className="flex mb-2">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Add a website goal"
              className="flex-1 p-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              type="button"
              onClick={handleAddGoal}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          
          {localData.strategy.goals.length > 0 && (
            <ul className="space-y-2">
              {localData.strategy.goals.map((goal, index) => (
                <li 
                  key={index}
                  className="bg-blue-50 p-3 rounded flex justify-between items-center"
                >
                  <span className="text-blue-800">{index + 1}. {goal}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveGoal(goal)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          )}
          
          {localData.strategy.goals.length === 0 && (
            <p className="text-sm text-gray-500 italic">Examples: Increase leads by 20%, Grow email subscribers, Improve customer support</p>
          )}
        </div>
        
        <div className="mb-8 bg-blue-50 p-4 rounded border border-blue-100">
          <div className="flex items-start">
            <div className="text-2xl mr-3">📊</div>
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Strategy Selected</h4>
              <p className="text-blue-700">
                You've selected {localData.strategy.seo.length} SEO strategies and {localData.strategy.content.length} content types.
              </p>
              <p className="text-blue-700 mt-1 text-sm">
                A well-defined strategy helps us ensure your website achieves your business goals.
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
          <div className="text-2xl mr-3">💡</div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Pro Tip</h4>
            <p className="text-sm text-blue-700">
              The most successful websites have a clear content and SEO strategy from the beginning.
              Each strategy you select earns you additional points!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyStep;
