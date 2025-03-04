
import React from 'react';
import { MainTabs } from '@/components/MainTabs';
import { ThemeProvider } from '@/context/ThemeContext';

const Index = () => {
  return (
    <ThemeProvider>
      <MainTabs />
    </ThemeProvider>
  );
};

export default Index;
