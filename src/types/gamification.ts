export type LevelName = 'beginner' | 'rookie' | 'athlete' | 'pro' | 'elite';

export interface LevelInfo {
  name: LevelName;
  displayName: string;
  xpRequired: number;
  themeColor: string;
  themeName: string;
  icon: 'shield' | 'star' | 'diamond' | 'crown' | 'trophy';
}

export interface GamificationData {
  currentLevel: LevelName;
  totalXP: number;
  currentLevelXP: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  unlockedThemes: LevelName[];
  activeTheme: LevelName;
  createdAt: number;
  updatedAt: number;
}

export interface XPInfo {
  current: number;
  total: number;
  toNextLevel: number;
  progress: number;
}

export interface StreakInfo {
  current: number;
  longest: number;
  isActive: boolean;
}

export interface UseGamificationReturn {
  level: LevelInfo;
  xp: XPInfo;
  streak: StreakInfo;
  unlockedThemes: LevelName[];
  activeTheme: LevelName;
  addXP: (amount?: number) => { leveledUp: boolean; newLevel?: LevelInfo };
  setActiveTheme: (theme: LevelName) => void;
  showLevelUpCelebration: boolean;
  newLevelInfo: LevelInfo | null;
  dismissLevelUp: () => void;
  isLoaded: boolean;
}
