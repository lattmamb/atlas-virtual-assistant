
import React from 'react';
import { Outlet } from 'react-router-dom';
import IOSMainLayout from './IOSMainLayout';
import TransparentNavBar from '@/components/navigation/TransparentNavBar';
import { LampContainer } from '@/components/ui/lamp';

const IOSLayout: React.FC = () => {
  return (
    <>
      <TransparentNavBar />
      <LampContainer className="min-h-screen rounded-none">
        <IOSMainLayout>
          <Outlet />
        </IOSMainLayout>
      </LampContainer>
    </>
  );
};

export default IOSLayout;
