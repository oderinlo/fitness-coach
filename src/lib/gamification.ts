import { LevelInfo, LevelName } from '@/types/gamification';

export const XP_PER_LEVEL = 10;

export const LEVELS: Record<LevelName, LevelInfo> = {
  beginner: {
    name: 'beginner',
    displayName: 'Beginner',
    xpRequired: 0,
    themeColor: '#d4a574',
    themeName: 'Gold',
    icon: 'shield',
  },
  rookie: {
    name: 'rookie',
    displayName: 'Rookie',
    xpRequired: 10,
    themeColor: '#94a3b8',
    themeName: 'Silver',
    icon: 'star',
  },
  athlete: {
    name: 'athlete',
    displayName: 'Athlete',
    xpRequired: 20,
    themeColor: '#a78bfa',
    themeName: 'Amethyst',
    icon: 'diamond',
  },
  pro: {
    name: 'pro',
    displayName: 'Pro',
    xpRequired: 30,
    themeColor: '#fb923c',
    themeName: 'Bronze Fire',
    icon: 'crown',
  },
  elite: {
    name: 'elite',
    displayName: 'Elite',
    xpRequired: 40,
    themeColor: '#22d3ee',
    themeName: 'Platinum',
    icon: 'trophy',
  },
};

export const LEVEL_ORDER: LevelName[] = ['beginner', 'rookie', 'athlete', 'pro', 'elite'];

export function getLevelFromXP(totalXP: number): LevelInfo {
  for (let i = LEVEL_ORDER.length - 1; i >= 0; i--) {
    const levelName = LEVEL_ORDER[i];
    if (totalXP >= LEVELS[levelName].xpRequired) {
      return LEVELS[levelName];
    }
  }
  return LEVELS.beginner;
}

export function getNextLevel(currentLevel: LevelName): LevelInfo | null {
  const currentIndex = LEVEL_ORDER.indexOf(currentLevel);
  if (currentIndex === LEVEL_ORDER.length - 1) {
    return null;
  }
  return LEVELS[LEVEL_ORDER[currentIndex + 1]];
}

export function getXPInCurrentLevel(totalXP: number): number {
  const level = getLevelFromXP(totalXP);
  return totalXP - level.xpRequired;
}

export function getXPToNextLevel(totalXP: number): number {
  const currentLevel = getLevelFromXP(totalXP);
  const nextLevel = getNextLevel(currentLevel.name);
  if (!nextLevel) {
    return 0;
  }
  return nextLevel.xpRequired - totalXP;
}

export function getProgressToNextLevel(totalXP: number): number {
  const currentLevel = getLevelFromXP(totalXP);
  const nextLevel = getNextLevel(currentLevel.name);
  if (!nextLevel) {
    return 100;
  }
  const xpInLevel = totalXP - currentLevel.xpRequired;
  const xpNeeded = nextLevel.xpRequired - currentLevel.xpRequired;
  return Math.round((xpInLevel / xpNeeded) * 100);
}

export function getUnlockedThemes(totalXP: number): LevelName[] {
  const unlocked: LevelName[] = [];
  for (const levelName of LEVEL_ORDER) {
    if (totalXP >= LEVELS[levelName].xpRequired) {
      unlocked.push(levelName);
    }
  }
  return unlocked;
}

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export function calculateStreak(lastActiveDate: string, currentStreak: number): { streak: number; isActive: boolean } {
  const today = getTodayDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (lastActiveDate === today) {
    return { streak: currentStreak, isActive: true };
  }

  if (lastActiveDate === yesterdayStr) {
    return { streak: currentStreak + 1, isActive: true };
  }

  return { streak: 1, isActive: true };
}
