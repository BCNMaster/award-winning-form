import React from 'react';
import achievements, { bonuses } from '../data/achievements';
import siteTypes from '../data/siteTypes';
import industries from '../data/industry';

const SummaryStep = ({ formData, points, level, unlockedAchievements, unlockedBonuses, goToPreviousStep }) => {
  // Helper function to get label from ID
  const getLabel = (array, id, idKey = 'id', labelKey = 'name') => {
    const item = array.find(item => item[idKey] === id);
    return item ? item[labelKey] : '';
  };
  
  // Format section data
  const formatSectionData = (section, formData) => {
    switch (section) {
      case 'personal':
        return (
          <div>
            <p>
              <strong>Name:</strong> {formData.firstName} {formData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            {formData.phone && (
              <p>
                <strong>Phone:</strong> {formData.phone}
              </p>
            )}
          </div>
        );
      
      case 'business':
        return (
          <div>
            <p>
              <strong>Business Name:</strong> {formData.businessName}
            </p>
            <p>
              <strong>Description:</strong> {formData.businessDescription}
            </p>
            {formData.yearsInBusiness && (
              <p>
                <strong>Years in Business:</strong> {formData.yearsInBusiness.replace(/_/g, ' ')}
              </p>
            )}
            {formData.businessGoals.length > 0 && (
              <div>
                <strong>Business Goals:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {formData.businessGoals.map(goal => (
                    <li key={goal}>{goal.replace(/_/g, ' ')}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      
      case 'industry':
        return (
          <div>
            <p>
              <strong>Industry:</strong> {getLabel(industries, formData.industry, 'id', 'name')}
            </p>
            {formData.targetAudience.ageRanges.length > 0 && (
              <div>
                <strong>Target Age Ranges:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {formData.targetAudience.ageRanges.map(age => (
                    <li key={age}>{age.replace(/_/g, ' ')}</li>
                  ))}
                </ul>
              </div>
            )}
            {formData.targetAudience.locations.length > 0 && (
              <div>
                <strong>Target Locations:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {formData.targetAudience.locations.map((location, index) => (
                    <li key={index}>{location}</li>
                  ))}
                </ul>
              </div>
            )}
            {formData.targetAudience.interests.length > 0 && (
              <div>
                <strong>Audience Interests:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {formData.targetAudience.interests.map((interest, index) => (
                    <li key={index}>{interest}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      
      case 'current-website':
        return (
          <div>
            <p>
              <strong>Has Existing Website:</strong> {formData.hasWebsite ? 'Yes' : 'No'}
            </p>
            {formData.hasWebsite && formData.currentWebsite.url && (
              <p>
                <strong>Current URL:</strong> {formData.currentWebsite.url}
              </p>
            )}
            {formData.hasWebsite && formData.currentWebsite.issues.length > 0 && (
              <div>
                <strong>Current Website Issues:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {formData.currentWebsite.issues.map(issue => (
                    <li key={issue}>{issue.replace(/_/g, ' ')}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      
      case 'website-type':
        return (
          <div>
            <p>
              <strong>Website Type:</strong> {getLabel(siteTypes, formData.websiteType, 'id', 'label')}
            </p>
          </div>
        );
      
      case 'features':
        // Import features dynamically as we don't have direct access here
        return (
          <div>
            {formData.features.length > 0 && (
              <div>
                <strong>Selected Features:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {formData.features.map(feature => (
                    <li key={feature}>{feature.replace(/_/g, ' ')}</li>
                  ))}
                </ul>
              </div>
            )}
            {formData.customFeatures && (
              <div className="mt-2">
                <strong>Custom Features:</strong>
                <p className="mt-1">{formData.customFeatures}</p>
              </div>
            )}
          </div>
        );
      
      case 'strategy':
        return (
          <div>
            {formData.strategy.seo.length > 0 && (
              <div>
                <strong>SEO Strategies:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {formData.strategy.seo.map(strategy => (
                    <li key={strategy}>{strategy.replace(/_/g, ' ')}</li>
                  ))}
                </ul>
              </div>
            )}
            {formData.strategy.content.length > 0 && (
              <div className="mt-2">
                <strong>Content Strategies:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {formData.strategy.content.map(strategy => (
                    <li key={strategy}>{strategy.replace(/_/g, ' ')}</li>
                  ))}
                </ul>
              </div>
            )}
            {formData.strategy.goals.length > 0 && (
              <div className="mt-2">
                <strong>Website Goals:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {formData.strategy.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      
      case 'design':
        return (
          <div>
            {formData.design.colors.length > 0 && (
              <p>
                <strong>Color Palette:</strong> {formData.design.colors[0].replace(/_/g, ' ')}
              </p>
            )}
            {formData.design.styles.length > 0 && (
              <div>
                <strong>Design Styles:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {formData.design.styles.map(style => (
                    <li key={style}>{style.replace(/_/g, ' ')}</li>
                  ))}
                </ul>
              </div>
            )}
            {formData.design.references.length > 0 && (
              <div className="mt-2">
                <strong>Website References:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {formData.design.references.map((ref, index) => (
                    <li key={index}>{ref}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      
      case 'project':
        return (
          <div>
            {formData.project.budget && (
              <p>
                <strong>Budget Range:</strong> {formData.project.budget.replace(/_/g, ' ')}
              </p>
            )}
            {formData.project.timeline && (
              <p>
                <strong>Project Timeline:</strong> {formData.project.timeline.replace(/_/g, ' ')}
              </p>
            )}
            {formData.project.decision.length > 0 && (
              <div>
                <strong>Decision Factors:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {formData.project.decision.map(factor => (
                    <li key={factor}>{factor.replace(/_/g, ' ')}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      
      case 'marketing':
        return (
          <div>
            {formData.marketing.services.length > 0 && (
              <div>
                <strong>Marketing Services:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {formData.marketing.services.map(service => (
                    <li key={service}>{service.replace(/_/g, ' ')}</li>
                  ))}
                </ul>
              </div>
            )}
            {formData.marketing.socialMedia.length > 0 && (
              <div className="mt-2">
                <strong>Social Media Platforms:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {formData.marketing.socialMedia.map(platform => (
                    <li key={platform}>{platform}</li>
                  ))}
                </ul>
              </div>
            )}
            {formData.marketing.futureGoals && (
              <div className="mt-2">
                <strong>Future Goals:</strong>
                <p className="mt-1">{formData.marketing.futureGoals}</p>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  // Sections to display in summary
  const sections = [
    { id: 'personal', title: 'Personal Information' },
    { id: 'business', title: 'Business Information' },
    { id: 'industry', title: 'Industry & Audience' },
    { id: 'current-website', title: 'Current Website' },
    { id: 'website-type', title: 'Website Type' },
    { id: 'features', title: 'Website Features' },
    { id: 'strategy', title: 'Website Strategy' },
    { id: 'design', title: 'Design Preferences' },
    { id: 'project', title: 'Project Details' },
    { id: 'marketing', title: 'Marketing & Growth' }
  ];
  
  // Get unlocked achievements with details
  const achievementDetails = unlockedAchievements.map(id => 
    achievements.find(a => a.id === id)
  ).filter(Boolean);
  
  // Get unlocked bonuses with details
  const bonusDetails = unlockedBonuses.map(title => 
    bonuses.find(b => b.title === title)
  ).filter(Boolean);
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-blue-700 mb-2">
          <span className="text-3xl">🎉</span> Congratulations! <span className="text-3xl">🎉</span>
        </h3>
        <p className="text-gray-600">
          You've successfully completed the Website Project Builder! 
          Here's a summary of your project details and achievements.
        </p>
      </div>
      
      {/* Achievement Summary */}
      <div className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
        <div className="text-center mb-4">
          <h4 className="text-xl font-bold text-blue-800">Your Achievements</h4>
          <div className="flex items-center justify-center mt-2 space-x-2">
            <span className="text-2xl font-bold text-blue-600">{points}</span>
            <span className="text-gray-700">Total Points</span>
            <span className="mx-2">•</span>
            <span className="text-2xl font-bold text-blue-600">Level {level}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {achievementDetails.map(achievement => (
            <div 
              key={achievement.id}
              className="bg-white p-3 rounded shadow-sm border border-blue-200 flex items-start"
            >
              <div className="text-2xl mr-3">{achievement.icon}</div>
              <div>
                <h5 className="font-medium text-blue-800">{achievement.title}</h5>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <p className="text-xs text-blue-600 mt-1">+{achievement.points} points</p>
              </div>
            </div>
          ))}
        </div>
        
        {bonusDetails.length > 0 && (
          <div>
            <h4 className="text-lg font-bold text-purple-800 mb-3 text-center">Unlocked Bonuses</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bonusDetails.map((bonus, index) => (
                <div 
                  key={index}
                  className="bg-purple-50 p-3 rounded shadow-sm border border-purple-200 flex items-start"
                >
                  <div className="text-2xl mr-3">🎁</div>
                  <div>
                    <h5 className="font-medium text-purple-800">{bonus.title}</h5>
                    <p className="text-sm text-gray-600">{bonus.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Project Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
        <h4 className="text-xl font-bold text-gray-800 mb-4">Project Summary</h4>
        
        <div className="space-y-6">
          {sections.map(section => (
            <div key={section.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
              <h5 className="font-medium text-gray-700 mb-2">{section.title}</h5>
              {formatSectionData(section.id, formData)}
            </div>
          ))}
        </div>
      </div>
      
      {/* Next Steps */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-100 mb-8">
        <h4 className="text-lg font-bold text-green-800 mb-2">Next Steps</h4>
        <p className="text-green-700 mb-4">
          Thank you for completing our Website Project Builder! Here's what happens next:
        </p>
        
        <ol className="list-decimal pl-5 space-y-2 text-green-700">
          <li>Our team will review your project details</li>
          <li>We'll prepare a customized proposal based on your requirements</li>
          <li>A project consultant will contact you within 1-2 business days</li>
          <li>We'll schedule a consultation to discuss your project in detail</li>
          <li>Once approved, we'll begin bringing your vision to life!</li>
        </ol>
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
          type="button"
          onClick={() => window.print()}
          className="px-6 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Print Summary
        </button>
      </div>
    </div>
  );
};

export default SummaryStep;
