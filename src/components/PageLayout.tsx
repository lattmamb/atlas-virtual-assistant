
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import PerspectivePageLayout from './layout/PerspectivePageLayout';

interface PageLayoutProps {
  children: ReactNode;
  showCarousel?: boolean;
  title?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  showCarousel = true,
  title
}) => {
  return (
    <PerspectivePageLayout 
      showCarousel={showCarousel}
      title={title}
      carouselScale={0.6}
    >
      <div className="content-area w-full h-full">
        {children}
      </div>
    </PerspectivePageLayout>
  );
};

export default PageLayout;
