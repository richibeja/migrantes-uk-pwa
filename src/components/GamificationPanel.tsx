'use client';

import React, { useState, useEffect } from 'react';
import { useAnbelAI } from '@/hooks/useAnbelAI';

interface GamificationPanelProps {
  userId: string;
  language: 'es' | 'en';
}

export default function GamificationPanel({ userId, language }: GamificationPanelProps) {

  const [userLevel, setUserLevel] = useState<any>(null);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { anbelAI } = useAnbelAI();

  useEffect(() => {
    loadGamificationData();
  }, [userId, anbelAI]);

  const loadGamificationData = async () => {
    if (!anbelAI) return;
    
    try {
      setLoading(true);
      
      // Cargar nivel del usuario
      const level = await anbelAI.calculateUserLevel(userId);
      setUserLevel(level);
      
      // Cargar logros
      const newAchievements = [];
      for (let i = 0; i < 3; i++) {
        const achievement = await anbelAI.generateAchievement(userId, 'prediction');
        newAchievements.push(achievement);
      }
      setAchievements(newAchievements);
      
      // Cargar notificaciones
      const newNotifications = [];
      const types = ['prediction', 'achievement', 'reminder', 'alert'] as const;
      for (let i = 0; i < 2; i++) {
        const notification = await anbelAI.generateSmartNotification(userId, types[i]);
        newNotifications.push(notification);
      }
      setNotifications(newNotifications);
      
    } catch (error) {
      console.error('Error cargando datos de gamificación:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'urgent': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg mb-4">
        <div className="animate-pulse">
          <div className="h-4 bg-white/20 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-white/20 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Nivel del Usuario */}
      {userLevel && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg">
          <h3 className="text-white font-bold mb-3 flex items-center">
            🏆 {language === 'es' ? 'Tu Nivel' : 'Your Level'}
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">
                {language === 'es' ? 'Nivel' : 'Level'} {userLevel.level}
              </span>
              <span className="text-white font-bold">{userLevel.title}</span>
            </div>
            
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(userLevel.experience / userLevel.nextLevelExp) * 100}%` }}
              ></div>
            </div>
            
            <div className="text-white/60 text-xs">
              {userLevel.experience} / {userLevel.nextLevelExp} XP
            </div>
            
            <div className="space-y-1">
              <p className="text-white/80 text-sm font-medium">
                {language === 'es' ? 'Beneficios Desbloqueados:' : 'Unlocked Benefits:'}
              </p>
              {userLevel.benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-center text-white/70 text-xs">
                  <span className="mr-2">✅</span>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Logros */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-lg">
        <h3 className="text-white font-bold mb-3 flex items-center">
          🏅 {language === 'es' ? 'Logros Recientes' : 'Recent Achievements'}
        </h3>
        
        <div className="space-y-2">
          {achievements.map((achievement, index) => (
            <div key={achievement.id} className="bg-white/10 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-bold ${getRarityColor(achievement.rarity)}`}>
                    {achievement.title}
                  </h4>
                  <p className="text-white/70 text-sm">{achievement.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-yellow-400 font-bold">+{achievement.points} XP</div>
                  <div className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                    {achievement.rarity.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notificaciones Inteligentes */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-lg">
        <h3 className="text-white font-bold mb-3 flex items-center">
          🔔 {language === 'es' ? 'Notificaciones Inteligentes' : 'Smart Notifications'}
        </h3>
        
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <div key={notification.id} className="bg-white/10 p-3 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h4 className="text-white font-bold text-sm">{notification.title}</h4>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs text-white ${getPriorityColor(notification.priority)}`}>
                      {notification.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm">{notification.message}</p>
                  <button className="mt-2 text-yellow-400 text-xs hover:text-yellow-300">
                    {notification.action} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
