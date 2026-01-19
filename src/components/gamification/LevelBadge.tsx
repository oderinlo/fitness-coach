'use client';

import { LevelInfo } from '@/types/gamification';
import { LEVELS } from '@/lib/gamification';

interface LevelBadgeProps {
  level: LevelInfo;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  themeColor?: string;
}

const iconPaths: Record<string, React.ReactNode> = {
  shield: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  ),
  star: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  ),
  diamond: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 2L2 9l10 13 10-13-10-7zM2 9h20"
    />
  ),
  crown: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 17l3-12 6 6 6-6 3 12H3z"
    />
  ),
  trophy: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5 3h14M5 3v4a7 7 0 007 7m-7-11H2v3a3 3 0 003 3h.5M19 3v4a7 7 0 01-7 7m7-11h3v3a3 3 0 01-3 3h-.5M12 14v4m-3 3h6m-3-3a3 3 0 003-3v-1m-6 1v3"
    />
  ),
};

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
};

const iconSizes = {
  sm: 'w-5 h-5',
  md: 'w-7 h-7',
  lg: 'w-10 h-10',
};

export function LevelBadge({ level, size = 'md', showName = true, themeColor }: LevelBadgeProps) {
  const color = themeColor || level.themeColor;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${sizeClasses[size]} rounded-xl flex items-center justify-center relative overflow-hidden`}
        style={{
          background: `linear-gradient(135deg, ${color}15 0%, ${color}30 100%)`,
          border: `1px solid ${color}40`,
        }}
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 shimmer" />

        {/* Icon */}
        <svg
          className={`${iconSizes[size]} relative z-10`}
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          {iconPaths[level.icon]}
        </svg>
      </div>

      {showName && (
        <div className="text-center">
          <p
            className="font-display text-sm font-semibold uppercase tracking-wider"
            style={{ color }}
          >
            {level.displayName}
          </p>
        </div>
      )}
    </div>
  );
}

export function AllLevelBadges({ currentLevel, themeColor }: { currentLevel: string; themeColor: string }) {
  const levels = Object.values(LEVELS);

  return (
    <div className="flex justify-center gap-2">
      {levels.map((level) => {
        const isUnlocked = levels.findIndex(l => l.name === level.name) <=
                          levels.findIndex(l => l.name === currentLevel);
        const isCurrent = level.name === currentLevel;

        return (
          <div
            key={level.name}
            className={`relative ${!isUnlocked ? 'opacity-30' : ''}`}
          >
            <LevelBadge
              level={level}
              size="sm"
              showName={false}
              themeColor={isCurrent ? themeColor : isUnlocked ? level.themeColor : '#3d3d3d'}
            />
            {isCurrent && (
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: themeColor }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
