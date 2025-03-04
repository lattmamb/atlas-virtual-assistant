
import React from 'react';
import UserProfileCard from '@/components/dashboard/UserProfileCard';

const MainContent: React.FC = () => {
  return (
    <div className="flex flex-1 overflow-hidden">
      <main className="flex-1 p-4 overflow-y-auto">
        <UserProfileCard
          name="Trinity Dodge"
          email="trinity@lovable.engineer"
          subscription="Pro Plan"
          avatarUrl="https://avatars.githubusercontent.com/u/1249980?v=4"
        />
      </main>
    </div>
  );
};

export default MainContent;
