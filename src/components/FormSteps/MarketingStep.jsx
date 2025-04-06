import React, { useState, useEffect } from 'react';

const MarketingStep = ({ formData, updateFormData, addPoints, goToNextStep, goToPreviousStep }) => {
  const marketingServices = [
    { id: 'seo', label: 'Search Engine Optimization (SEO)', description: 'Improve organic search rankings' },
    { id: 'ppc', label: 'Pay-Per-Click Advertising (PPC)', description: 'Targeted ads on Google, Bing, etc.' },
    { id: 'content', label: 'Content Marketing', description: 'Blog posts, articles, and resources' },
    { id: 'email', label: 'Email Marketing', description: 'Newsletters and campaigns' },
    { id: 'social_media', label: 'Social Media Marketing', description: 'Content and engagement strategies' },
    { id: 'analytics', label: 'Analytics & Reporting', description: 'Traffic and conversion tracking' },
    { id: 'conversion', label: 'Conversion Rate Optimization', description: 'Improve website performance' },
    { id: 'local_seo', label: 'Local SEO', description: 'Target customers in your area' }
  ];
  
  const socialPlatforms = [
    { id: 'facebook', label: 'Facebook' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'twitter', label: 'Twitter/X' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'tiktok', label: 'TikTok' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'pinterest', label: 'Pinterest' },
    { id: 'reddit', label: 'Reddit' }
  ];

  const [localData, setLocalData] = useState({
    marketing: {
      services: formData.marketing?.services || [],
      socialMedia: formData.marketing?.socialMedia || [],
      futureGoals: formData.marketing?.futureGoals || ''
    }
  });
  
  const [errors, setErrors] = useState({});
  const [isComplete, setIsComplete] = useState(true); // All fields optional
  
  // Handle marketing service selection
  const handleServiceChange = (serviceId) => {
    setLocalData(prev => {
      const currentServices = prev.marketing.services;
      const updatedServices = currentServices.includes(serviceId)
        ? currentServices.filter(id => id !== serviceId)
        : [...currentServices, serviceId];
        
      return {
        ...prev,
        marketing: {
          ...prev.marketing,
          services: updatedServices
        }
      };
    });
  };
  
  // Handle social media platform selection
  const handleSocialChange = (platformId) => {
    setLocalData(prev => {
      const currentPlatforms = prev.marketing.socialMedia;
      const updatedPlatforms = currentPlatforms.includes(platformId)
        ? currentPlatforms.filter(id => id !== platformId)
        : [...currentPlatforms, platformId];
        
      return {
        ...prev,
        marketing: {
          ...prev.marketing,
          socialMedia: updatedPlatforms
        }
      };
    });
  };
  
  // Handle future goals input
  const handleGoalsChange = (e) => {
    setLocalData(prev => ({
      ...prev,
      marketing: {
        ...prev.marketing,
        futureGoals: e.target.value
      }
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update form data
    updateFormData(localData);
    
    // Award "Marketing Strategist" achievement
    addPoints(30, 'marketing');
    
    // Award more points based on selections
    const marketingServicesPoints = localData.marketing.services.length * 5;
    addPoints(marketingServicesPoints);
    
    // Award completion achievement
    addPoints(50, 'completion');
    
    // Move to next step (summary)
    goToNextStep();
  };
  
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Marketing & Growth</h3>
        <p className="text-gray-600">
          Tell us about your marketing needs and future growth plans. This helps us integrate the right tools and strategies.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Marketing Services
            <span className="block text-xs font-normal text-gray-500 mt-1">
              Which marketing services are you interested in? (Optional)
            </span>
          </label>
          
          <div className="grid grid-cols-1 gap-3">
            {marketingServices.map(service => (
              <div
                key={service.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  localData.marketing.services.includes(service.id) 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleServiceChange(service.id)}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{service.label}</h4>
                  {localData.marketing.services.includes(service.id) && (
                    <span className="text-blue-600 text-sm">✓</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Social Media Platforms
            <span className="block text-xs font-normal text-gray-500 mt-1">
              Which social platforms do you want to focus on? (Optional)
            </span>
          </label>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {socialPlatforms.map(platform => (
              <div
                key={platform.id}
                onClick={() => handleSocialChange(platform.id)}
                className={`p-3 rounded-lg border cursor-pointer text-center transition-all ${
                  localData.marketing.socialMedia.includes(platform.id) 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {platform.label}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <label htmlFor="futureGoals" className="block text-sm font-medium text-gray-700 mb-1">
            Future Growth Goals
            <span className="block text-xs font-normal text-gray-500 mt-1">
              What are your long-term goals for your website and business? (Optional)
            </span>
          </label>
          <textarea
            id="futureGoals"
            name="futureGoals"
            value={localData.marketing.futureGoals}
            onChange={handleGoalsChange}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Describe your future plans and goals..."
          ></textarea>
        </div>
        
        <div className="mb-8 bg-blue-50 p-4 rounded border border-blue-100">
          <div className="flex items-start">
            <div className="text-2xl mr-3">📈</div>
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Digital Marketing Integration</h4>
              <p className="text-blue-700">
                We can integrate your website with various marketing tools and platforms to help grow your business.
              </p>
              <p className="text-blue-700 mt-1 text-sm">
                Each marketing service you select earns you additional points and enhances your website's capabilities.
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
            className="px-6 py-2 rounded font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Complete
          </button>
        </div>
      </form>
      
      <div className="mt-8 bg-green-50 rounded p-4 border border-green-100">
        <div className="flex items-start">
          <div className="text-2xl mr-3">🏁</div>
          <div>
            <h4 className="font-medium text-green-800 mb-1">Almost Done!</h4>
            <p className="text-sm text-green-700">
              You're on the final step! Complete this section to earn the "Marketing Strategist" achievement (30 points) 
              and the "Website Architect" achievement for completing the entire form (50 points)!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingStep;
