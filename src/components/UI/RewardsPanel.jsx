import React, { useState } from 'react';
import achievements, { bonuses } from '../data/achievements';

const RewardsPanel = ({ level, points, unlockedAchievements, unlockedBonuses }) => {
  const [activeTab, setActiveTab] = useState('achievements');
  
  return (
    <div className="h-full flex flex-col">
      <div className="text-center mb-4">
        <div className="inline-block bg-blue-700 text-white rounded-full px-4 py-1 text-sm font-bold">
          Level {level}
        </div>
        <div className="text-xl font-bold mt-1">{points} Points</div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex-1 py-2 text-center border-b-2 ${
            activeTab === 'achievements' 
              ? 'border-blue-600 text-blue-600 font-medium' 
              : 'border-transparent'
          }`}
        >
          Achievements
        </button>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex-1 py-2 text-center border-b-2 ${
            activeTab === 'rewards' 
              ? 'border-purple-600 text-purple-600 font-medium' 
              : 'border-transparent'
          }`}
        >
          Rewards
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'achievements' ? (
          <div className="space-y-3">
            {achievements.map(achievement => {
              const isUnlocked = unlockedAchievements.includes(achievement.id);
              
              return (
                <div 
                  key={achievement.id}
                  className={`p-3 rounded ${
                    isUnlocked ? 'bg-blue-100' : 'bg-gray-100 opacity-70'
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="text-lg">{achievement.icon}</div>
                    <div className="text-sm font-medium text-right">
                      {isUnlocked ? (
                        <span className="text-green-600">+{achievement.points}</span>
                      ) : (
                        <span className="text-gray-500">{achievement.points} pts</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="font-medium">
                    {achievement.title}
                    {isUnlocked && (
                      <span className="ml-2 text-green-600 text-sm">✓</span>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {achievement.description}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {bonuses.map((bonus, index) => {
              const isUnlocked = unlockedBonuses.includes(bonus.title);
              const isAvailable = level >= bonus.level;
              
              return (
                <div 
                  key={index}
                  className={`p-3 rounded ${
                    isUnlocked 
                      ? 'bg-purple-100' 
                      : isAvailable 
                        ? 'bg-yellow-50 border border-yellow-200' 
                        : 'bg-gray-100 opacity-70'
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="text-lg">
                      {isUnlocked ? '🎁' : isAvailable ? '🔓' : '🔒'}
                    </div>
                    <div className="text-sm font-medium text-right">
                      Level {bonus.level}
                    </div>
                  </div>
                  
                  <div className="font-medium">
                    {bonus.title}
                    {isUnlocked && (
                      <span className="ml-2 text-purple-600 text-sm">✓</span>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {bonus.description}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardsPanel;
