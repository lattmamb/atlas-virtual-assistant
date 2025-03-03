
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  Cloud, Shield, MessageSquare, Workflow, 
  Clock, Car, Mail, Image, FileText, Plus,
  X, Grid3X3, Settings, CirclePlus
} from 'lucide-react';
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import ICloudLayout from '@/components/icloud/ICloudLayout';
import UserProfileCard from '@/components/dashboard/UserProfileCard';
import NotesWidget from '@/components/dashboard/NotesWidget';
import RemindersWidget from '@/components/dashboard/RemindersWidget';
import AppSelector from '@/components/dashboard/AppSelector';
import AppGrid from '@/components/dashboard/AppGrid';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { currentTheme, isDarkMode } = useTheme();
  const [showAppGrid, setShowAppGrid] = useState(false);
  const [showTileSelector, setShowTileSelector] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState<string[]>([
    'notes', 'reminders'
  ]);
  
  useEffect(() => {
    // Welcome toast
    setTimeout(() => {
      toast.success("Welcome to Atlas Assistant", {
        description: "Your Trinity Dodge AI platform is ready to assist you.",
        icon: <Cloud className="h-5 w-5 text-blue-400" />,
        duration: 5000,
      });
    }, 1500);
  }, []);
  
  const apps = [
    { id: 'mail', name: 'Mail', icon: <Mail className="h-6 w-6" />, path: '/mail', badgeCount: 1 },
    { id: 'photos', name: 'Photos', icon: <Image className="h-6 w-6" />, path: '/photos' },
    { id: 'drive', name: 'Drive', icon: <Cloud className="h-6 w-6" />, path: '/drive' },
    { id: 'notes', name: 'Notes', icon: <FileText className="h-6 w-6" />, path: '/notes' },
    { id: 'reminders', name: 'Reminders', icon: <Clock className="h-6 w-6" />, path: '/reminders' },
    { id: 'invites', name: 'Invites', icon: <Workflow className="h-6 w-6" />, path: '/invites' },
    { id: 'finder', name: 'Find My', icon: <Shield className="h-6 w-6" />, path: '/find-my' },
  ];
  
  const toggleTileSelector = () => {
    setShowTileSelector(!showTileSelector);
  };
  
  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Blue gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 z-0"></div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top navigation bar */}
        <header className="flex justify-between items-center px-4 py-2">
          <div className="flex items-center">
            <Cloud className="h-5 w-5 text-white mr-2" />
            <span className="text-white font-semibold">Atlas</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTileSelector}
              className="bg-transparent hover:bg-white/10 rounded-full p-1.5 transition-colors"
            >
              <CirclePlus className="h-5 w-5 text-white" />
            </button>
            
            <button 
              onClick={() => setShowAppGrid(!showAppGrid)}
              className="bg-transparent hover:bg-white/10 rounded-full p-1.5 transition-colors"
            >
              <Grid3X3 className="h-5 w-5 text-white" />
            </button>
            
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white overflow-hidden border-2 border-white/20">
              <img src="/public/lovable-uploads/c6c1523c-711f-42eb-bcd9-e7525e0e4ce3.png" alt="User" className="h-full w-full object-cover" />
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto px-4 py-8 space-y-4">
          {/* User profile card */}
          <UserProfileCard 
            name="Matthew"
            email="panapanthers27@gmail.com"
            subscription="iCloud+"
            avatarUrl="/public/lovable-uploads/c6c1523c-711f-42eb-bcd9-e7525e0e4ce3.png"
          />
          
          {/* Content widgets */}
          <div className="space-y-4">
            {activeWidgets.includes('notes') && (
              <NotesWidget 
                title="Notes"
                subtitle="All iCloud"
                notes={[
                  { id: '1', title: 'atlas Intelligence and UAV Operations', date: '2/2/25', description: 'No additional text' },
                  { id: '2', title: 'Unity Fleet Hub Locations', date: '12/30/24', description: 'Lease or Sale Price Bloomingto...' },
                  { id: '3', title: 'PDF', date: '1/17/25', description: 'No additional text' }
                ]}
              />
            )}
            
            {activeWidgets.includes('reminders') && (
              <RemindersWidget 
                title="Reminders"
                subtitle="All iCloud • 5 Reminders"
                reminders={[
                  { id: '1', title: 'Fill out Shelby County probation form', date: '12/30/24', category: 'Reminders', completed: false },
                  { id: '2', title: 'My calendar event', date: '1/17/25', category: 'Reminders', completed: false },
                  { id: '3', title: 'Go to interview at JB Rider', date: '1/30/25, 2:30 PM', category: 'Reminders', completed: false }
                ]}
              />
            )}
          </div>
          
          {/* Customize button */}
          <div className="flex justify-center mt-6">
            <button className="bg-gray-600/50 text-white px-6 py-2 rounded-full flex items-center justify-center space-x-2 backdrop-blur-sm border border-white/10 hover:bg-gray-500/50 transition-colors">
              <Settings className="h-4 w-4" />
              <span>Customize</span>
            </button>
          </div>
        </main>
        
        {/* App grid at bottom */}
        <div className="px-4 py-2 mt-auto">
          <div className="grid grid-cols-4 gap-4 bg-black/30 backdrop-blur-md p-4 rounded-xl">
            {apps.slice(0, 8).map(app => (
              <AppGrid 
                key={app.id}
                icon={app.icon}
                name={app.name}
                badgeCount={app.badgeCount}
                path={app.path}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* App selector modal */}
      {showAppGrid && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex flex-col">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-white text-xl">Apps</h2>
            <button 
              onClick={() => setShowAppGrid(false)}
              className="text-white hover:bg-white/10 p-1 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 p-4">
            <div className="grid grid-cols-4 gap-y-8">
              {apps.map(app => (
                <AppSelector
                  key={app.id}
                  icon={app.icon}
                  name={app.name}
                  badgeCount={app.badgeCount}
                  path={app.path}
                  onClick={() => setShowAppGrid(false)}
                />
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-white text-lg mb-4">iCloud+ Features</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 border-b border-white/10">
                  <Mail className="h-5 w-5 text-blue-400 mr-3" />
                  <span className="text-white">Hide My Email</span>
                </div>
                <div className="flex items-center p-3 border-b border-white/10">
                  <Mail className="h-5 w-5 text-blue-400 mr-3" />
                  <span className="text-white">Custom Email Domain</span>
                </div>
                <div className="flex items-center p-3 border-b border-white/10">
                  <Shield className="h-5 w-5 text-blue-400 mr-3" />
                  <span className="text-white">Private Relay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Tile selector modal */}
      {showTileSelector && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex flex-col">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-white text-xl">Which tile do you want to add?</h2>
            <button 
              onClick={() => setShowTileSelector(false)}
              className="text-white hover:bg-white/10 p-1 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 p-4">
            <div className="grid grid-cols-4 gap-y-8">
              {apps.map(app => (
                <AppSelector
                  key={app.id}
                  icon={app.icon}
                  name={app.name}
                  badgeCount={app.badgeCount}
                  path={app.path}
                  onClick={() => {
                    if (!activeWidgets.includes(app.id)) {
                      setActiveWidgets([...activeWidgets, app.id]);
                    }
                    setShowTileSelector(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
