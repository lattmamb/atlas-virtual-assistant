
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePanel } from '@/contexts/PanelContext';
import SwipeContainer from '@/components/Layouts/SwipeContainer';
import PanelIndicator from '@/components/UI/PanelIndicator';
import PanelHeader from '@/components/UI/PanelHeader';
import VisionPanel from './VisionPanel';
import UniversePanel from './UniversePanel';
import LinkPanel from './LinkPanel';
import IOSHomeScreen from '@/pages/IOSHomeScreen';

const panelVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0
  })
};

const SwipePanelDemo: React.FC = () => {
  const { activePanel, navigateToPanel } = usePanel();
  const panels = ['home', 'vision', 'universe', 'link'];
  const currentIndex = panels.indexOf(activePanel);
  
  const getTitle = () => {
    switch (activePanel) {
      case 'home': return 'Atlas Home';
      case 'vision': return 'Apple Vision Pro';
      case 'universe': return 'Atlas Universe';
      case 'link': return 'Atlas Link';
      default: return 'Atlas';
    }
  };

  const renderPanel = () => {
    switch (activePanel) {
      case 'home':
        return <IOSHomeScreen />;
      case 'vision':
        return <VisionPanel />;
      case 'universe':
        return <UniversePanel />;
      case 'link':
        return <LinkPanel />;
      default:
        return <IOSHomeScreen />;
    }
  };

  return (
    <div className="swipe-panel-demo h-screen w-screen overflow-hidden">
      <PanelHeader 
        title={getTitle()}
        showBackButton={activePanel !== 'home'}
      />
      
      <SwipeContainer className="flex-1">
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={activePanel}
            custom={currentIndex}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}
            className="absolute inset-0"
          >
            {renderPanel()}
          </motion.div>
        </AnimatePresence>
      </SwipeContainer>
      
      <PanelIndicator 
        panels={panels}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
      />
    </div>
  );
};

export default SwipePanelDemo;
