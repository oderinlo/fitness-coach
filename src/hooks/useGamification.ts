'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  GamificationData,
  LevelInfo,
  LevelName,
  UseGamificationReturn,
  XPInfo,
  StreakInfo
} from '@/types/gamification';
import {
  LEVELS,
  getLevelFromXP,
  getXPInCurrentLevel,
  getXPToNextLevel,
  getProgressToNextLevel,
  getUnlockedThemes,
} from '@/lib/gamification';
import {
  loadGamificationData,
  saveGamificationData,
  getDefaultGamificationData,
  updateLastActiveDate
} from '@/lib/storage';

export function useGamification(): UseGamificationReturn {
  const [data, setData] = useState<GamificationData>(getDefaultGamificationData);
  const [showLevelUpCelebration, setShowLevelUpCelebration] = useState(false);
  const [newLevelInfo, setNewLevelInfo] = useState<LevelInfo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = loadGamificationData();
    if (stored) {
      const updated = updateLastActiveDate(stored);
      setData(updated);
      if (updated !== stored) {
        saveGamificationData(updated);
      }
    } else {
      const initial = getDefaultGamificationData();
      const withDate = updateLastActiveDate(initial);
      setData(withDate);
      saveGamificationData(withDate);
    }
    setIsLoaded(true);
  }, []);

  const level = LEVELS[data.currentLevel];

  const xp: XPInfo = {
    current: getXPInCurrentLevel(data.totalXP),
    total: data.totalXP,
    toNextLevel: getXPToNextLevel(data.totalXP),
    progress: getProgressToNextLevel(data.totalXP),
  };

  const streak: StreakInfo = {
    current: data.currentStreak,
    longest: data.longestStreak,
    isActive: data.currentStreak > 0,
  };

  const addXP = useCallback((amount: number = 1): { leveledUp: boolean; newLevel?: LevelInfo } => {
    let leveledUp = false;
    let newLevel: LevelInfo | undefined;

    setData(prev => {
      const newTotalXP = prev.totalXP + amount;
      const prevLevel = getLevelFromXP(prev.totalXP);
      const nextLevel = getLevelFromXP(newTotalXP);

      if (nextLevel.name !== prevLevel.name) {
        leveledUp = true;
        newLevel = nextLevel;
        setNewLevelInfo(nextLevel);
        setShowLevelUpCelebration(true);
      }

      const newUnlockedThemes = getUnlockedThemes(newTotalXP);
      const newCurrentLevelXP = getXPInCurrentLevel(newTotalXP);

      const updated: GamificationData = {
        ...prev,
        totalXP: newTotalXP,
        currentLevel: nextLevel.name,
        currentLevelXP: newCurrentLevelXP,
        unlockedThemes: newUnlockedThemes,
        updatedAt: Date.now(),
      };

      saveGamificationData(updated);
      return updated;
    });

    return { leveledUp, newLevel };
  }, []);

  const setActiveTheme = useCallback((theme: LevelName) => {
    setData(prev => {
      if (!prev.unlockedThemes.includes(theme)) {
        return prev;
      }

      const updated: GamificationData = {
        ...prev,
        activeTheme: theme,
        updatedAt: Date.now(),
      };

      saveGamificationData(updated);
      return updated;
    });
  }, []);

  const dismissLevelUp = useCallback(() => {
    setShowLevelUpCelebration(false);
    setNewLevelInfo(null);
  }, []);

  return {
    level,
    xp,
    streak,
    unlockedThemes: data.unlockedThemes,
    activeTheme: data.activeTheme,
    addXP,
    setActiveTheme,
    showLevelUpCelebration,
    newLevelInfo,
    dismissLevelUp,
    isLoaded,
  };
}
