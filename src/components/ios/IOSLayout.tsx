
import React from 'react';
import { Outlet } from 'react-router-dom';
import IOSMainLayout from './IOSMainLayout';
import TransparentNavBar from '@/components/navigation/TransparentNavBar';

const IOSLayout: React.FC = () => {
  return (
    <>
      <TransparentNavBar />
      <IOSMainLayout>
        <Outlet />
      </IOSMainLayout>
    </>
  );
};

export default IOSLayout;
