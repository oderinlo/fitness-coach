'use client';

import { UseGamificationReturn } from '@/types/gamification';
import { LEVELS } from '@/lib/gamification';
import { LevelBadge, AllLevelBadges } from './LevelBadge';
import { XPProgressBar } from './XPProgressBar';
import { StreakCounter } from './StreakCounter';
import { ThemeSelector } from './ThemeSelector';

interface GamificationSidebarProps {
  gamification: UseGamificationReturn;
  onClose?: () => void;
}

export function GamificationSidebar({ gamification, onClose }: GamificationSidebarProps) {
  const {
    level,
    xp,
    streak,
    unlockedThemes,
    activeTheme,
    setActiveTheme,
    isLoaded,
  } = gamification;

  const themeColor = LEVELS[activeTheme].themeColor;

  if (!isLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-lg font-semibold uppercase tracking-wider text-ivory-100">
          Your Progress
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 -mr-2 text-ivory-500 hover:text-ivory-300 transition-colors"
            aria-label="Close panel"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Level badge - large */}
      <div className="flex flex-col items-center mb-8">
        <LevelBadge level={level} size="lg" themeColor={themeColor} />

        {/* Level progression indicators */}
        <div className="mt-4">
          <AllLevelBadges currentLevel={level.name} themeColor={themeColor} />
        </div>
      </div>

      {/* XP Progress */}
      <div className="mb-6">
        <XPProgressBar xp={xp} level={level} themeColor={themeColor} />
      </div>

      {/* Total messages stat */}
      <div className="flex items-center justify-between p-4 bg-obsidian-800 rounded-xl border border-obsidian-700 mb-4">
        <span className="text-ivory-400 text-sm">Total Messages</span>
        <span className="font-display text-xl font-semibold" style={{ color: themeColor }}>
          {xp.total}
        </span>
      </div>

      {/* Streak Counter */}
      <div className="mb-6">
        <StreakCounter streak={streak} themeColor={themeColor} />
      </div>

      {/* Divider */}
      <div className="h-px bg-obsidian-700 my-4" />

      {/* Theme Selector */}
      <div className="mt-auto">
        <ThemeSelector
          activeTheme={activeTheme}
          unlockedThemes={unlockedThemes}
          onSelectTheme={setActiveTheme}
        />
      </div>

      {/* Motivational message */}
      <div className="mt-6 p-4 rounded-xl bg-obsidian-800/50 border border-obsidian-700">
        <p className="text-xs text-ivory-500 text-center leading-relaxed">
          Send messages to earn XP and unlock new themes. Level up every 10 messages!
        </p>
      </div>
    </div>
  );
}
