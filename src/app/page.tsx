'use client';

import Chat from '@/components/Chat';
import { AppLayout } from '@/components/layout/AppLayout';
import { LevelUpCelebration } from '@/components/gamification/LevelUpCelebration';
import { useGamification } from '@/hooks/useGamification';

export default function Home() {
  const gamification = useGamification();

  const handleMessageSent = () => {
    gamification.addXP(1);
  };

  return (
    <>
      <AppLayout gamification={gamification}>
        <Chat
          onMessageSent={handleMessageSent}
          activeTheme={gamification.activeTheme}
        />
      </AppLayout>

      {/* Level up celebration modal */}
      {gamification.showLevelUpCelebration && gamification.newLevelInfo && (
        <LevelUpCelebration
          newLevel={gamification.newLevelInfo}
          onDismiss={gamification.dismissLevelUp}
        />
      )}

      {/* Noise texture overlay */}
      <div className="noise-overlay" />
    </>
  );
}
