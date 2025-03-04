
import React, { useState } from 'react';
import AppleNavBar from '@/components/icloud/AppleNavBar';
import UserProfileCard from '@/components/dashboard/UserProfileCard';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import AppGridSidebar from '@/components/dashboard/AppGridSidebar';
import SearchBar from '@/components/dashboard/SearchBar';
import { appGridItems } from '@/components/dashboard/constants/appGridItems';

const DashboardLayout: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isAppGridOpen, setIsAppGridOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleAppGrid = () => {
    setIsAppGridOpen(!isAppGridOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden">
      {/* Background Effects */}
      <div
        className={cn(
          "fixed inset-0 z-0 transition-all duration-700",
          isDarkMode ? "bg-gradient-to-b from-gray-900 to-black" : "bg-gradient-to-b from-gray-100 to-white"
        )}
      />

      {/* Apple Navigation Bar */}
      <AppleNavBar
        onToggleAppGrid={toggleAppGrid}
        onSearch={handleSearchToggle}
      />

      {/* Search Bar */}
      <SearchBar 
        isOpen={isSearchBarOpen}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* App Grid Sidebar */}
      <AppGridSidebar 
        isOpen={isAppGridOpen}
        appGridItems={appGridItems}
        onClose={toggleAppGrid}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto">
          {/* User Profile Card */}
          <UserProfileCard
            name="Trinity Dodge"
            email="trinity@lovable.engineer"
            subscription="Pro Plan"
            avatarUrl="https://avatars.githubusercontent.com/u/1249980?v=4"
          />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
