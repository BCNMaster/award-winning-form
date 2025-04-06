import React, { useEffect, useState } from 'react';

const AchievementDisplay = ({ achievement, bonus, onClose }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Animate in
    setTimeout(() => setVisible(true), 50);
    
    // Auto close after time
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500); // Allow animation to complete
    }, 4500);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  // Determine if showing achievement or bonus
  const isAchievement = !!achievement;
  const title = isAchievement ? achievement.title : bonus.title;
  const description = isAchievement ? achievement.description : bonus.description;
  const icon = isAchievement ? achievement.icon : '🎁';
  const points = isAchievement ? achievement.points : null;
  
  return (
    <div 
      className={`fixed top-20 right-0 max-w-sm transform transition-transform duration-500 ease-in-out z-50 ${
        visible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className={`m-4 p-5 rounded-lg shadow-lg ${isAchievement ? 'bg-blue-600' : 'bg-purple-600'} text-white`}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="text-xl font-bold">
              {isAchievement ? 'Achievement Unlocked!' : 'Bonus Unlocked!'}
            </h3>
            <h4 className="text-lg font-semibold">{title}</h4>
          </div>
          <div className="text-4xl">{icon}</div>
        </div>
        <p className="mb-3 opacity-90">{description}</p>
        
        {isAchievement && (
          <div className="bg-white/20 rounded px-3 py-2 inline-block">
            +{points} points
          </div>
        )}
        
        <button 
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 500);
          }}
          className="absolute top-2 right-2 text-white/70 hover:text-white"
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AchievementDisplay;
