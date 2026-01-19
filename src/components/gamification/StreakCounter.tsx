'use client';

import { StreakInfo } from '@/types/gamification';

interface StreakCounterProps {
  streak: StreakInfo;
  themeColor: string;
}

export function StreakCounter({ streak, themeColor }: StreakCounterProps) {
  const hasStreak = streak.current > 0;

  return (
    <div className="flex items-center justify-between p-4 bg-obsidian-800 rounded-xl border border-obsidian-700">
      <div className="flex items-center gap-3">
        {/* Fire icon */}
        <div
          className={`relative ${hasStreak ? 'animate-streak-flame' : ''}`}
          style={{ filter: hasStreak ? `drop-shadow(0 0 8px ${themeColor}60)` : 'none' }}
        >
          <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2C12 2 7 7 7 12C7 14.5 8.5 17.5 12 18C15.5 17.5 17 14.5 17 12C17 7 12 2 12 2Z"
              fill={hasStreak ? `${themeColor}30` : '#3d3d3d30'}
              stroke={hasStreak ? themeColor : '#3d3d3d'}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 18C12 18 10 16 10 14C10 12 12 10 12 10C12 10 14 12 14 14C14 16 12 18 12 18Z"
              fill={hasStreak ? themeColor : '#3d3d3d'}
              opacity={0.6}
            />
          </svg>
        </div>

        {/* Text */}
        <div>
          <p className="text-ivory-400 text-sm">Daily Streak</p>
          <p className="text-ivory-100 font-display text-lg font-semibold">
            <span style={{ color: hasStreak ? themeColor : '#8a8885' }}>
              {streak.current}
            </span>
            <span className="text-ivory-500 text-sm font-body ml-1">
              {streak.current === 1 ? 'day' : 'days'}
            </span>
          </p>
        </div>
      </div>

      {/* Best streak */}
      {streak.longest > 0 && (
        <div className="text-right">
          <p className="text-ivory-500 text-xs">Best</p>
          <p className="text-ivory-400 text-sm font-medium">{streak.longest}</p>
        </div>
      )}
    </div>
  );
}
