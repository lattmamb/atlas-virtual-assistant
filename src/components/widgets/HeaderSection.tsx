
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedLogo from '@/components/AnimatedLogo';
import { Button } from '@/components/ui/button';
import { Grid, Shield, Workflow, MessageSquare, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderSectionProps {
  isDarkMode: boolean;
  setShowAppGrid: (show: boolean) => void;
  showAppGrid: boolean;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ isDarkMode, setShowAppGrid, showAppGrid }) => {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <AnimatedLogo />
        <div className="ml-3">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Atlas Assistant
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Welcome to Trinity Dodge's AI platform
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "group flex gap-2 items-center transition-all",
            isDarkMode ? "text-gray-300 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-black hover:bg-black/10"
          )}
          onClick={() => setShowAppGrid(!showAppGrid)}
        >
          <Grid size={16} className="group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Apps</span>
        </Button>
        
        <Link to="/atlas-link">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "group flex gap-2 items-center transition-all",
              isDarkMode ? "text-gray-300 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-black hover:bg-black/10"
            )}
          >
            <Shield size={16} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Atlas Link</span>
          </Button>
        </Link>
        
        <Link to="/workflows">
          <Button 
            variant="ghost" 
            size="sm"
            className={cn(
              "group flex gap-2 items-center transition-all",
              isDarkMode ? "text-gray-300 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-black hover:bg-black/10"
            )}
          >
            <Workflow size={16} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Workflows</span>
          </Button>
        </Link>
        
        <Link to="/chat">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "group flex gap-2 items-center transition-all",
              isDarkMode ? "text-gray-300 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-black hover:bg-black/10"
            )}
          >
            <MessageSquare size={16} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Chat</span>
          </Button>
        </Link>
        
        <Link to="/settings">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "group flex gap-2 items-center transition-all",
              isDarkMode ? "text-gray-300 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-black hover:bg-black/10"
            )}
          >
            <Settings size={16} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default HeaderSection;
