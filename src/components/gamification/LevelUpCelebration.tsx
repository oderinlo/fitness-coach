'use client';

import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { LevelInfo } from '@/types/gamification';
import { LevelBadge } from './LevelBadge';

interface LevelUpCelebrationProps {
  newLevel: LevelInfo;
  onDismiss: () => void;
}

export function LevelUpCelebration({ newLevel, onDismiss }: LevelUpCelebrationProps) {
  const triggerConfetti = useCallback(() => {
    const colors = [newLevel.themeColor, '#ffffff', '#0a0a0a'];

    // First burst
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6, x: 0.5 },
      colors,
      scalar: 0.9,
      gravity: 1.1,
    });

    // Delayed side bursts
    setTimeout(() => {
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 55,
        origin: { x: 0.2, y: 0.65 },
        colors,
        scalar: 0.8,
      });
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 55,
        origin: { x: 0.8, y: 0.65 },
        colors,
        scalar: 0.8,
      });
    }, 150);
  }, [newLevel.themeColor]);

  useEffect(() => {
    triggerConfetti();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        onDismiss();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [triggerConfetti, onDismiss]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="level-up-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-obsidian-950/90 backdrop-blur-sm animate-fade-in"
        onClick={onDismiss}
      />

      {/* Modal content */}
      <div className="relative bg-obsidian-900 border border-obsidian-700 rounded-2xl p-8 max-w-sm w-full animate-slide-up shadow-2xl">
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-30 blur-xl"
          style={{ backgroundColor: newLevel.themeColor }}
        />

        <div className="relative">
          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-ivory-500 text-sm uppercase tracking-widest mb-2">
              Level Up!
            </p>
            <h2
              id="level-up-title"
              className="font-display text-3xl font-bold uppercase tracking-wider"
              style={{ color: newLevel.themeColor }}
            >
              {newLevel.displayName}
            </h2>
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-6 level-up-pulse">
            <LevelBadge level={newLevel} size="lg" showName={false} />
          </div>

          {/* Unlocked theme message */}
          <div className="text-center mb-8">
            <p className="text-ivory-300 text-sm mb-1">New theme unlocked!</p>
            <p className="text-lg font-medium" style={{ color: newLevel.themeColor }}>
              {newLevel.themeName}
            </p>
          </div>

          {/* Dismiss button */}
          <button
            onClick={onDismiss}
            className="w-full py-3 px-4 rounded-xl font-display font-semibold uppercase tracking-wider text-obsidian-950 transition-all duration-200 hover:brightness-110"
            style={{ backgroundColor: newLevel.themeColor }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
