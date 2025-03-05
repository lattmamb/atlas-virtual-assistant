
import React, { createContext, useContext, useState, useEffect } from 'react';

type PanelType = 'vision' | 'universe' | 'link' | 'home' | string;

interface PanelContextType {
  activePanel: PanelType;
  setActivePanel: (panel: PanelType) => void;
  previousPanel: PanelType | null;
  navigateToPanel: (panel: PanelType) => void;
  goBack: () => void;
}

const PanelContext = createContext<PanelContextType>({
  activePanel: 'home',
  setActivePanel: () => {},
  previousPanel: null,
  navigateToPanel: () => {},
  goBack: () => {}
});

export const usePanel = () => useContext(PanelContext);

interface PanelProviderProps {
  defaultPanel?: PanelType;
  children: React.ReactNode;
}

export const PanelProvider: React.FC<PanelProviderProps> = ({ 
  defaultPanel = 'home',
  children 
}) => {
  const [activePanel, setActivePanel] = useState<PanelType>(defaultPanel);
  const [panelHistory, setPanelHistory] = useState<PanelType[]>([defaultPanel]);

  // Navigate to a new panel
  const navigateToPanel = (panel: PanelType) => {
    if (panel !== activePanel) {
      setPanelHistory(prev => [...prev, panel]);
      setActivePanel(panel);
    }
  };

  // Go back to previous panel
  const goBack = () => {
    if (panelHistory.length > 1) {
      const newHistory = [...panelHistory];
      newHistory.pop(); // Remove current panel
      const previousPanel = newHistory[newHistory.length - 1];
      setActivePanel(previousPanel);
      setPanelHistory(newHistory);
    }
  };

  const previousPanel = panelHistory.length > 1 
    ? panelHistory[panelHistory.length - 2] 
    : null;

  return (
    <PanelContext.Provider value={{ 
      activePanel, 
      setActivePanel, 
      previousPanel,
      navigateToPanel,
      goBack
    }}>
      {children}
    </PanelContext.Provider>
  );
};
