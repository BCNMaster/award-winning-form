# Award Winning Form

An engaging, gamified client onboarding form for website projects with achievements and rewards. This project creates an interactive form experience that makes collecting detailed client information fun and engaging.

## Features

- Multi-step form with progress tracking
- Gamification elements (points, levels, achievements)
- Comprehensive client information collection
- Visual rewards and animations
- Detailed summaries of collected information

## Technology Stack

- React
- TailwindCSS

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/BCNMaster/award-winning-form.git
cd award-winning-form
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

- `src/components/AwardWinningForm.jsx` - The main form component
- `src/components/FormSteps/` - Individual form step components
- `src/components/UI/` - Reusable UI components
- `src/components/data/` - Data files for form options
- `src/App.js` - Root component that renders the form

## Usage

The form guides users through a series of steps to collect comprehensive information for website projects:

1. **Personal Information**: Contact details
2. **Business Information**: Company details and goals
3. **Industry & Audience**: Industry selection and target audience
4. **Current Website**: Information about existing website (if any)
5. **Website Type**: The type of website needed
6. **Features**: Specific features for the selected website type
7. **Website Strategy**: SEO and content strategy details
8. **Design Preferences**: Colors and design styles
9. **Project Details**: Budget, timeline, and team information
10. **Marketing & Growth**: Marketing services and future plans

As users complete each step, they earn points, unlock achievements and receive bonuses, creating an engaging experience.

## Gamification Elements

The form includes several gamification elements to enhance user engagement:

### Points

Users earn points as they complete each section of the form. Some activities award more points than others, encouraging thorough completion.

### Levels

As users accumulate points, they progress through different levels. Each level unlocks new bonuses and rewards.

### Achievements

Special milestones award achievements with unique icons and point bonuses. For example:
- Journey Starter (10 points)
- Business Explorer (20 points)
- Design Visionary (30 points)
- Website Architect (50 points)

### Bonuses

Reaching certain levels unlocks special bonuses that provide actual value for the client's website project:
- Free SEO Audit
- 10% Discount
- Premium Support
- Free Logo Design
- And more!

## Customization

The form can be customized by modifying the data files in the `src/components/data/` directory:

- `achievements.js` - Define achievements, bonuses, and level thresholds
- `features.js` - Define website features
- `industry.js` - Define industry options
- `siteTypes.js` - Define website type options

## Form Components

### UI Components

- **ProgressBar.jsx**: Displays progress through the form and progress toward the next level
- **AchievementDisplay.jsx**: Popup notification for unlocked achievements and bonuses
- **RewardsPanel.jsx**: Side panel showing achievements and rewards

### Form Steps

- **PersonalInfoStep.jsx**: Contact information collection
- **BusinessInfoStep.jsx**: Business details and goals
- **IndustryStep.jsx**: Industry and target audience information
- **CurrentWebsiteStep.jsx**: Current website analysis
- **WebsiteTypeStep.jsx**: Selection of website type
- **FeaturesStep.jsx**: Feature selection based on website type
- **StrategyStep.jsx**: SEO and content strategy options
- **DesignStep.jsx**: Design preferences and style selection
- **ProjectDetailsStep.jsx**: Budget, timeline, and decision factors
- **MarketingStep.jsx**: Marketing services and growth plans
- **SummaryStep.jsx**: Final summary of all collected information

## Extending the Form

To add new steps to the form:

1. Create a new component in the `src/components/FormSteps/` directory
2. Add the component to the `steps` array in `AwardWinningForm.jsx`
3. Update the form state in `AwardWinningForm.jsx` to include the new data fields
4. If needed, add new achievements in `achievements.js`

## Deployment

This project can be deployed to any static hosting service:

```bash
npm run build
```

This creates a `build` directory with optimized files for production.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the gamification principles of progress tracking, achievements, and rewards
- Built with React and TailwindCSS for a modern, responsive user experience
