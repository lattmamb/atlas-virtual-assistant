
import React, { useState, ReactNode, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import { AppleNavBar } from '@/components/apple-nav';
import { SpaceNav } from '@/components/ui/space-nav';
import { SpaceBackground } from '@/components/ui/space-background';
import { CursorGlow } from '@/components/ui/cursor-glow';

interface ICloudLayoutProps {
  children: ReactNode;
  activePage?: string;
}

const ICloudLayout: React.FC<ICloudLayoutProps> = ({ children, activePage }) => {
  const isMobile = useIsMobile();
  const location = useLocation();

  // Determine the active page from URL if not provided
  const getActivePage = () => {
    if (activePage) return activePage;
    
    const path = location.pathname;
    if (path.startsWith('/atlas')) return 'atlas';
    if (path.startsWith('/settings')) return 'settings';
    return 'home';
  };

  return (
    <div className="min-h-screen font-sans transition-all duration-500 relative flex w-full bg-[#0D0015] text-white overflow-hidden">
      {/* Space background effect */}
      <SpaceBackground />
      
      {/* Cursor glow effect */}
      <CursorGlow />
      
      {/* Navigation */}
      <SpaceNav activePage={getActivePage()} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navigation Bar */}
        <AppleNavBar 
          showAppGridButton={true}
          className="bg-black/40 backdrop-blur-xl border-white/5"
        />

        {/* Content Area with Proper Spacing for NavBar */}
        <main className="flex-1 overflow-auto p-2 md:p-6 pt-14">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ICloudLayout;
