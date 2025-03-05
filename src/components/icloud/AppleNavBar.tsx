import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import StandardNavBar from './navbar/StandardNavBar';
import { AppleNavBarProps } from './navbar/types';

const AppleNavBar: React.FC<AppleNavBarProps> = (props) => {
  const { currentTheme } = useTheme();
  const isIOS18Theme = currentTheme === 'ios18';

  // If using iOS 18 theme, use the iOS18NavBar, otherwise use the StandardNavBar
  if (isIOS18Theme) {
    return <StandardNavBar className={props.className} onSearch={props.onSearch} />;
  }

  // For all other themes, use the original navigation
  return <StandardNavBar {...props} />;
};

export default AppleNavBar;
