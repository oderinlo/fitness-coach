'use client';

import { LevelName } from '@/types/gamification';
import { LEVELS, LEVEL_ORDER } from '@/lib/gamification';

interface ThemeSelectorProps {
  activeTheme: LevelName;
  unlockedThemes: LevelName[];
  onSelectTheme: (theme: LevelName) => void;
}

export function ThemeSelector({ activeTheme, unlockedThemes, onSelectTheme }: ThemeSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-ivory-400 text-sm font-medium">Accent Theme</p>

      <div className="grid grid-cols-5 gap-2">
        {LEVEL_ORDER.map((levelName) => {
          const level = LEVELS[levelName];
          const isUnlocked = unlockedThemes.includes(levelName);
          const isActive = activeTheme === levelName;

          return (
            <button
              key={levelName}
              onClick={() => isUnlocked && onSelectTheme(levelName)}
              disabled={!isUnlocked}
              className={`
                relative aspect-square rounded-lg transition-all duration-200
                ${isUnlocked ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-40'}
              `}
              style={{
                backgroundColor: level.themeColor,
                boxShadow: isActive
                  ? `0 0 0 2px #141414, 0 0 0 4px ${level.themeColor}`
                  : undefined,
              }}
              title={isUnlocked ? level.themeName : `Unlock at ${level.displayName}`}
              aria-label={`${level.themeName} theme${!isUnlocked ? ' (locked)' : ''}${isActive ? ' (active)' : ''}`}
            >
              {/* Lock icon for locked themes */}
              {!isUnlocked && (
                <svg
                  className="absolute inset-0 m-auto w-4 h-4 text-obsidian-950"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              )}

              {/* Checkmark for active theme */}
              {isActive && isUnlocked && (
                <svg
                  className="absolute inset-0 m-auto w-4 h-4 text-obsidian-950"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* Current theme name */}
      <p className="text-xs text-center text-ivory-500">
        {LEVELS[activeTheme].themeName}
      </p>
    </div>
  );
}
