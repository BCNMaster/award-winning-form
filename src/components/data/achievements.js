// Achievement definitions
const achievements = [
  { id: 'started', title: 'Journey Starter', description: 'Begin your website adventure', points: 10, icon: '🚀' },
  { id: 'personal', title: 'Personal Connection', description: 'Share your contact details', points: 15, icon: '📱' },
  { id: 'business', title: 'Business Explorer', description: 'Tell us about your business', points: 20, icon: '🏢' },
  { id: 'industry', title: 'Industry Expert', description: 'Define your business category', points: 15, icon: '🏆' },
  { id: 'audience', title: 'Audience Definer', description: 'Identify your target market', points: 25, icon: '🎯' },
  { id: 'website', title: 'Website Visionary', description: 'Choose your website type', points: 20, icon: '🖥️' },
  { id: 'features', title: 'Feature Collector', description: 'Add powerful website features', points: 25, icon: '⚙️' },
  { id: 'design', title: 'Design Visionary', description: 'Define your visual identity', points: 30, icon: '🎨' },
  { id: 'planning', title: 'Project Planner', description: 'Set your budget and timeline', points: 25, icon: '📅' },
  { id: 'marketing', title: 'Marketing Strategist', description: 'Plan your digital marketing', points: 30, icon: '📈' },
  { id: 'completion', title: 'Website Architect', description: 'Complete your website blueprint', points: 50, icon: '🏛️' }
];

export default achievements;

// Bonuses that unlock at certain levels
export const bonuses = [
  { level: 2, title: 'Free SEO Audit', description: 'Complimentary SEO analysis of your current site' },
  { level: 3, title: '10% Discount', description: 'Receive 10% off your total project cost' },
  { level: 4, title: 'Premium Support', description: '3 months of premium support after launch' },
  { level: 5, title: 'Free Logo Design', description: 'Professional logo design included with your website' },
  { level: 6, title: 'Content Strategy', description: 'Customized content strategy for your new site' },
  { level: 7, title: 'Speed Optimization', description: 'Advanced speed optimization package' },
  { level: 8, title: 'Social Media Setup', description: 'Setup of business profiles on key social platforms' }
];

// Level thresholds
export const levelThresholds = [0, 50, 125, 225, 350, 500, 675, 875, 1100];