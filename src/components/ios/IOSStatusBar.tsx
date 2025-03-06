
import React from 'react';
import IOSStatusBarContent from './IOSStatusBarContent';
import { useTheme } from '@/context/ThemeContext';

const IOSStatusBar: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="ios-status-bar">
      <IOSStatusBarContent isDarkMode={isDarkMode} />
    </div>
  );
};

export default IOSStatusBar;
