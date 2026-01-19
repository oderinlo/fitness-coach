import { GamificationData, LevelName } from '@/types/gamification';
import { getTodayDateString } from './gamification';

const STORAGE_KEYS = {
  SESSION: 'fitness-coach-session',
  GAMIFICATION: 'fitness-coach-gamification',
} as const;

export function getDefaultGamificationData(): GamificationData {
  const now = Date.now();
  return {
    currentLevel: 'beginner',
    totalXP: 0,
    currentLevelXP: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    unlockedThemes: ['beginner'],
    activeTheme: 'beginner',
    createdAt: now,
    updatedAt: now,
  };
}

export function loadGamificationData(): GamificationData | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.GAMIFICATION);
    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored) as GamificationData;

    if (!parsed.currentLevel || typeof parsed.totalXP !== 'number') {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function saveGamificationData(data: GamificationData): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const updated = { ...data, updatedAt: Date.now() };
    localStorage.setItem(STORAGE_KEYS.GAMIFICATION, JSON.stringify(updated));
  } catch {
    console.error('Failed to save gamification data');
  }
}

export function updateLastActiveDate(data: GamificationData): GamificationData {
  const today = getTodayDateString();
  if (data.lastActiveDate === today) {
    return data;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let newStreak = data.currentStreak;

  if (data.lastActiveDate === yesterdayStr) {
    newStreak = data.currentStreak + 1;
  } else if (data.lastActiveDate !== today) {
    newStreak = 1;
  }

  return {
    ...data,
    lastActiveDate: today,
    currentStreak: newStreak,
    longestStreak: Math.max(data.longestStreak, newStreak),
  };
}

export function isThemeUnlocked(theme: LevelName, unlockedThemes: LevelName[]): boolean {
  return unlockedThemes.includes(theme);
}
