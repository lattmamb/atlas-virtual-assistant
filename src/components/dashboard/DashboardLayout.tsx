import React, { useState, useEffect } from 'react';
import AppleNavBar from '@/components/icloud/AppleNavBar';
import AppGrid from '@/components/dashboard/AppGrid';
import UserProfileCard from '@/components/dashboard/UserProfileCard';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import {
  Mail,
  Calendar,
  FileVideo,
  FileMusic,
  Image,
  Settings,
  MessageSquare,
  Compass,
  Glasses, // Add Glasses icon for AppleVision Pro
} from 'lucide-react';

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

  const appGridItems = [
    {
      icon: <Mail />,
      name: "Mail",
      path: "/mail",
      badgeCount: 3,
    },
    {
      icon: <Calendar />,
      name: "Calendar",
      path: "/calendar",
      badgeCount: 0,
    },
    {
      icon: <FileVideo />,
      name: "Videos",
      path: "/videos",
      badgeCount: 0,
    },
    {
      icon: <FileMusic />,
      name: "Music",
      path: "/music",
      badgeCount: 0,
    },
    {
      icon: <Image />,
      name: "Photos",
      path: "/photos",
      badgeCount: 12,
    },
    {
      icon: <Settings />,
      name: "Settings",
      path: "/settings",
      badgeCount: 0,
    },
    {
      icon: <MessageSquare />,
      name: "Chat",
      path: "/chat",
      badgeCount: 8,
    },
    {
      icon: <Compass />,
      name: "Maps",
      path: "/maps",
      badgeCount: 0,
    },
    {
      icon: <Glasses />,
      name: "Vision Pro",
      path: "/applevisionpro",
      badgeCount: 0,
    },
  ];

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

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* App Grid Sidebar */}
        <motion.aside
          className={cn(
            "fixed top-0 left-0 h-screen w-full bg-black/50 backdrop-blur-lg z-50 p-4",
            "flex flex-col items-center justify-center space-y-4",
            "transition-transform duration-300",
            isAppGridOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="grid grid-cols-3 gap-4">
            {appGridItems.map((app, index) => (
              <AppGrid
                key={index}
                icon={app.icon}
                name={app.name}
                path={app.path}
                badgeCount={app.badgeCount}
              />
            ))}
          </div>
          <Button onClick={toggleAppGrid}>Close</Button>
        </motion.aside>

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
