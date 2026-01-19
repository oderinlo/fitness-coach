'use client';

import { useState, useCallback } from 'react';
import { GamificationSidebar } from '../gamification/GamificationSidebar';
import { MobileDrawer } from './MobileDrawer';
import { UseGamificationReturn } from '@/types/gamification';

interface AppLayoutProps {
  children: React.ReactNode;
  gamification: UseGamificationReturn;
}

export function AppLayout({ children, gamification }: AppLayoutProps) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setIsMobileDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsMobileDrawerOpen(false), []);

  return (
    <div className="flex h-screen bg-obsidian-950">
      {/* Main chat area */}
      <main className="flex-1 min-w-0 relative">
        {children}

        {/* Mobile toggle button */}
        <button
          onClick={openDrawer}
          className="lg:hidden fixed top-4 right-4 z-40 p-3 bg-obsidian-800 border border-obsidian-700 rounded-lg hover:bg-obsidian-700 hover:border-gold/30 transition-all duration-200 group"
          aria-label="Open progress panel"
        >
          <svg
            className="w-5 h-5 text-ivory-400 group-hover:text-gold transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
      </main>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-80 flex-shrink-0 border-l border-obsidian-700 bg-obsidian-900">
        <GamificationSidebar gamification={gamification} />
      </aside>

      {/* Mobile drawer */}
      <MobileDrawer isOpen={isMobileDrawerOpen} onClose={closeDrawer}>
        <GamificationSidebar gamification={gamification} onClose={closeDrawer} />
      </MobileDrawer>
    </div>
  );
}
