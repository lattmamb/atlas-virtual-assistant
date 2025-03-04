
import React, { useState } from 'react';
import AppleNavBar from '@/components/icloud/AppleNavBar';
import { appGridItems } from '@/components/dashboard/constants/appGridItems';
import AppGridSidebar from '@/components/dashboard/AppGridSidebar';
import SearchBar from '@/components/dashboard/SearchBar';
import DashboardBackground from '@/components/dashboard/DashboardBackground';
import MainContent from '@/components/dashboard/MainContent';

const DashboardLayout: React.FC = () => {
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
      <DashboardBackground />

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
      <MainContent />
    </div>
  );
};

export default DashboardLayout;
