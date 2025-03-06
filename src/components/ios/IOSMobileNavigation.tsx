
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Settings, Sparkles, Search, Shield, Car, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { AnimatedTabs, Tab } from '@/components/ui/tabs-animated';
import { toast } from 'sonner';

const IOSMobileNavigation: React.FC = () => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  
  if (!isMobile) return null;
  
  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: MessageSquare, path: '/chatroom', label: 'Chat', badge: 2 },
    { icon: Search, path: '/search', label: 'Search' },
    { icon: Sparkles, path: '/atlas', label: 'Atlas' },
    { icon: Settings, path: '/settings', label: 'Settings' },
  ];
  
  // Define tabs for use with AnimatedTabs
  const navigationTabs: Tab[] = [
    {
      title: "Home",
      value: "home",
      content: <TabContent icon={<Home className="h-6 w-6" />} label="Home" path="/" />,
    },
    {
      title: "Chat",
      value: "chat",
      content: <TabContent icon={<MessageSquare className="h-6 w-6" />} label="Chat" path="/chatroom" badge="2" />,
    },
    {
      title: "Atlas",
      value: "atlas",
      content: <TabContent icon={<Shield className="h-6 w-6" />} label="Atlas" path="/atlas" />,
    },
    {
      title: "Cars",
      value: "cars",
      content: <TabContent icon={<Car className="h-6 w-6" />} label="Cars" path="/cars" />,
    },
    {
      title: "Workflows",
      value: "workflows",
      content: <TabContent icon={<Workflow className="h-6 w-6" />} label="Workflows" path="/workflows" />,
    }
  ];
  
  // Choose navigation style: either tabs or dock
  const useTabsNav = false; // Set to true to use the animated tabs instead of dock
  
  if (useTabsNav) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-4 px-2">
        <AnimatedTabs 
          tabs={navigationTabs}
          containerClassName="bg-black/30 backdrop-blur-xl p-2 rounded-xl border border-white/10"
          activeTabClassName="bg-blue-500/30 backdrop-blur-lg"
          tabClassName="text-sm font-medium text-white/80"
          contentClassName="mt-2"
        />
      </div>
    );
  }
  
  // Default iOS dock style navigation
  return (
    <div className="ios-dock">
      {navItems.map((item) => (
        <Link key={item.path} to={item.path}>
          <motion.div 
            className={cn(
              "ios-app-icon relative",
              pathname === item.path ? "opacity-100" : "opacity-70"
            )}
            whileTap={{ scale: 0.9 }}
          >
            <div className={cn(
              "ios-app-icon-inner",
              pathname === item.path 
                ? "bg-gradient-to-br from-blue-500 to-blue-600" 
                : "bg-gradient-to-br from-gray-700 to-gray-800"
            )}>
              <item.icon className="h-6 w-6" />
            </div>
            
            {item.badge && (
              <div className="ios-notification-badge">
                {item.badge}
              </div>
            )}
            
            <div className="absolute -bottom-5 left-0 right-0 text-center text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
              {item.label}
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

// Helper component for tab content
const TabContent: React.FC<{
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: string;
}> = ({ icon, label, path, badge }) => {
  const handleNavigation = () => {
    // We would use react router here, but for demo we'll just show a toast
    toast.info(`Navigating to ${label}`);
    window.location.href = path;
  };
  
  return (
    <div 
      className="flex flex-col items-center justify-center py-2 cursor-pointer"
      onClick={handleNavigation}
    >
      <div className="relative">
        {icon}
        {badge && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {badge}
          </div>
        )}
      </div>
      <span className="text-sm text-white mt-1">{label}</span>
    </div>
  );
};

export default IOSMobileNavigation;
