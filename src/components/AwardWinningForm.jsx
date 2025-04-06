import React, { useState, useEffect } from 'react';

// Import form steps
import PersonalInfoStep from './FormSteps/PersonalInfoStep';
import BusinessInfoStep from './FormSteps/BusinessInfoStep';
import IndustryStep from './FormSteps/IndustryStep';
import CurrentWebsiteStep from './FormSteps/CurrentWebsiteStep';
import WebsiteTypeStep from './FormSteps/WebsiteTypeStep';
import FeaturesStep from './FormSteps/FeaturesStep';
import StrategyStep from './FormSteps/StrategyStep';
import DesignStep from './FormSteps/DesignStep';
import ProjectDetailsStep from './FormSteps/ProjectDetailsStep';
import MarketingStep from './FormSteps/MarketingStep';
import SummaryStep from './FormSteps/SummaryStep';

// Import achievements and level data
import achievements, { bonuses, levelThresholds } from './data/achievements';

// Import UI components
import ProgressBar from './UI/ProgressBar';
import AchievementDisplay from './UI/AchievementDisplay';
import RewardsPanel from './UI/RewardsPanel';

const AwardWinningForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Business Info
    businessName: '',
    businessDescription: '',
    businessGoals: [],
    yearsInBusiness: '',
    
    // Industry & Audience
    industry: '',
    targetAudience: {
      ageRanges: [],
      locations: [],
      interests: [],
      behaviors: []
    },
    
    // Current Website
    hasWebsite: null,
    currentWebsite: {
      url: '',
      issues: [],
      likes: '',
      dislikes: ''
    },
    
    // Website Type
    websiteType: '',
    
    // Features
    features: [],
    customFeatures: '',
    
    // Strategy
    strategy: {
      seo: [],
      content: [],
      goals: []
    },
    
    // Design Preferences
    design: {
      colors: [],
      styles: [],
      references: []
    },
    
    // Project Details
    project: {
      budget: '',
      timeline: '',
      decision: []
    },
    
    // Marketing
    marketing: {
      services: [],
      socialMedia: [],
      futureGoals: ''
    }
  });

  // Game state
  const [currentStep, setCurrentStep] = useState(0);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [unlockedBonuses, setUnlockedBonuses] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);
  const [showBonus, setShowBonus] = useState(null);

  // Track the level based on points
  useEffect(() => {
    for (let i = levelThresholds.length - 1; i >= 0; i--) {
      if (points >= levelThresholds[i]) {
        if (level !== i + 1) {
          setLevel(i + 1);
          // Check for new bonuses
          const newBonuses = bonuses.filter(bonus => 
            bonus.level === i + 1 && !unlockedBonuses.includes(bonus.title)
          );
          
          if (newBonuses.length > 0) {
            setUnlockedBonuses(prev => [...prev, ...newBonuses.map(b => b.title)]);
            setShowBonus(newBonuses[0]);
          }
        }
        break;
      }
    }
  }, [points, level, unlockedBonuses]);

  // Handle adding points and unlocking achievements
  const addPoints = (pointsToAdd, achievementId = null) => {
    setPoints(prev => prev + pointsToAdd);
    
    if (achievementId) {
      const achievement = achievements.find(a => a.id === achievementId);
      if (achievement && !unlockedAchievements.includes(achievementId)) {
        setUnlockedAchievements(prev => [...prev, achievementId]);
        setShowAchievement(achievement);
      }
    }
  };

  // Handle form data updates
  const updateFormData = (stepData, step) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }));
  };

  // Handle step navigation
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Clear achievement/bonus notifications
  useEffect(() => {
    if (showAchievement || showBonus) {
      const timer = setTimeout(() => {
        setShowAchievement(null);
        setShowBonus(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showAchievement, showBonus]);

  // Define all form steps
  const steps = [
    {
      id: 'personal',
      title: 'Personal Information',
      component: <PersonalInfoStep 
                  formData={formData} 
                  updateFormData={updateFormData} 
                  addPoints={addPoints} 
                  goToNextStep={goToNextStep} />
    },
    {
      id: 'business',
      title: 'Business Information',
      component: <BusinessInfoStep 
                  formData={formData} 
                  updateFormData={updateFormData} 
                  addPoints={addPoints} 
                  goToNextStep={goToNextStep}
                  goToPreviousStep={goToPreviousStep} />
    },
    {
      id: 'industry',
      title: 'Industry & Audience',
      component: <IndustryStep 
                  formData={formData} 
                  updateFormData={updateFormData} 
                  addPoints={addPoints} 
                  goToNextStep={goToNextStep}
                  goToPreviousStep={goToPreviousStep} />
    },
    {
      id: 'current-website',
      title: 'Current Website',
      component: <CurrentWebsiteStep 
                  formData={formData} 
                  updateFormData={updateFormData} 
                  addPoints={addPoints} 
                  goToNextStep={goToNextStep}
                  goToPreviousStep={goToPreviousStep} />
    },
    {
      id: 'website-type',
      title: 'Website Type',
      component: <WebsiteTypeStep 
                  formData={formData} 
                  updateFormData={updateFormData} 
                  addPoints={addPoints} 
                  goToNextStep={goToNextStep}
                  goToPreviousStep={goToPreviousStep} />
    },
    {
      id: 'features',
      title: 'Website Features',
      component: <FeaturesStep 
                  formData={formData} 
                  updateFormData={updateFormData} 
                  addPoints={addPoints} 
                  goToNextStep={goToNextStep}
                  goToPreviousStep={goToPreviousStep} />
    },
    {
      id: 'strategy',
      title: 'Website Strategy',
      component: <StrategyStep 
                  formData={formData} 
                  updateFormData={updateFormData} 
                  addPoints={addPoints} 
                  goToNextStep={goToNextStep}
                  goToPreviousStep={goToPreviousStep} />
    },
    {
      id: 'design',
      title: 'Design Preferences',
      component: <DesignStep 
                  formData={formData} 
                  updateFormData={updateFormData} 
                  addPoints={addPoints} 
                  goToNextStep={goToNextStep}
                  goToPreviousStep={goToPreviousStep} />
    },
    {
      id: 'project',
      title: 'Project Details',
      component: <ProjectDetailsStep 
                  formData={formData} 
                  updateFormData={updateFormData} 
                  addPoints={addPoints} 
                  goToNextStep={goToNextStep}
                  goToPreviousStep={goToPreviousStep} />
    },
    {
      id: 'marketing',
      title: 'Marketing & Growth',
      component: <MarketingStep 
                  formData={formData} 
                  updateFormData={updateFormData} 
                  addPoints={addPoints} 
                  goToNextStep={goToNextStep}
                  goToPreviousStep={goToPreviousStep} />
    },
    {
      id: 'summary',
      title: 'Project Summary',
      component: <SummaryStep 
                  formData={formData} 
                  points={points}
                  level={level}
                  unlockedAchievements={unlockedAchievements}
                  unlockedBonuses={unlockedBonuses}
                  goToPreviousStep={goToPreviousStep} />
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Progress bar and game status */}
      <div className="p-4 bg-blue-50 border-b border-blue-100">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-blue-800">
            Step {currentStep + 1}: {steps[currentStep].title}
          </h2>
          <div className="text-blue-700 font-bold">
            Level {level} • {points} Points
          </div>
        </div>
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={steps.length} 
          currentPoints={points}
          nextLevelPoints={levelThresholds[level] || levelThresholds[levelThresholds.length-1]}
        />
      </div>
      
      {/* Main form area */}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-6">
          {steps[currentStep].component}
        </div>
        
        {/* Side panel for achievements and rewards */}
        <div className="md:w-1/4 bg-gray-50 p-4 border-l border-gray-200">
          <RewardsPanel 
            level={level}
            points={points}
            unlockedAchievements={unlockedAchievements}
            unlockedBonuses={unlockedBonuses}
          />
        </div>
      </div>
      
      {/* Achievement/Bonus popups */}
      {showAchievement && (
        <AchievementDisplay 
          achievement={showAchievement} 
          onClose={() => setShowAchievement(null)}
        />
      )}
      
      {showBonus && (
        <AchievementDisplay 
          bonus={showBonus} 
          onClose={() => setShowBonus(null)}
        />
      )}
    </div>
  );
};

export default AwardWinningForm;
