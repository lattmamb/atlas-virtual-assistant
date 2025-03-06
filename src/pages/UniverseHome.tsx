
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import PageLayout from '@/components/PageLayout';
import { HeroParallaxDemo } from '@/components/ui/hero-parallax.demo';
import { Squares } from '@/components/ui/squares-background';

const UniverseHome: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <PageLayout>
      <div className="min-h-screen w-full overflow-x-hidden relative">
        {/* Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Squares className="-z-10" />
        </div>
        
        {/* Main content */}
        <div className="relative z-10 pt-20">
          <HeroParallaxDemo />
        </div>
      </div>
    </PageLayout>
  );
};

export default UniverseHome;
