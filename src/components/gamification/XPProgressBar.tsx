'use client';

import { XPInfo, LevelInfo } from '@/types/gamification';
import { getNextLevel, XP_PER_LEVEL } from '@/lib/gamification';

interface XPProgressBarProps {
  xp: XPInfo;
  level: LevelInfo;
  themeColor: string;
}

export function XPProgressBar({ xp, level, themeColor }: XPProgressBarProps) {
  const nextLevel = getNextLevel(level.name);
  const isMaxLevel = !nextLevel;

  return (
    <div className="space-y-2">
      {/* Label */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-ivory-400 font-medium">
          {isMaxLevel ? 'Max Level Reached' : 'Progress'}
        </span>
        <span className="text-ivory-300 font-semibold">
          {isMaxLevel ? (
            <span style={{ color: themeColor }}>Elite</span>
          ) : (
            <>
              <span style={{ color: themeColor }}>{xp.current}</span>
              <span className="text-ivory-500"> / {XP_PER_LEVEL} XP</span>
            </>
          )}
        </span>
      </div>

      {/* Progress bar container */}
      <div className="relative h-2 bg-obsidian-800 rounded-full overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 10%,
              ${themeColor}20 10%,
              ${themeColor}20 20%
            )`,
          }}
        />

        {/* Progress fill */}
        <div
          className="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
          style={{
            width: `${isMaxLevel ? 100 : xp.progress}%`,
            background: `linear-gradient(90deg, ${themeColor}80 0%, ${themeColor} 100%)`,
          }}
        >
          {/* Shine effect */}
          <div
            className="absolute inset-0 shimmer"
            style={{
              background: `linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)`,
              backgroundSize: '200% 100%',
            }}
          />
        </div>
      </div>

      {/* Next level indicator */}
      {!isMaxLevel && nextLevel && (
        <p className="text-xs text-ivory-500 text-center">
          {xp.toNextLevel} XP to <span style={{ color: nextLevel.themeColor }}>{nextLevel.displayName}</span>
        </p>
      )}
    </div>
  );
}
