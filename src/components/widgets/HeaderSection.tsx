
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedLogo from '@/components/AnimatedLogo';
import { Button } from '@/components/ui/button';
import { Grid, Shield, Workflow, MessageSquare, Settings } from 'lucide-react';
import AppGrid from '@/components/icloud/AppGrid';

interface HeaderSectionProps {
  showAppGrid: boolean;
  setShowAppGrid: (show: boolean) => void;
  isDarkMode: boolean;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ 
  showAppGrid, 
  setShowAppGrid,
  isDarkMode
}) => {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <AnimatedLogo />
        <div className="ml-3">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Atlas Assistant
          </h1>
          <p className="text-sm text-gray-400">
            Welcome to Trinity Dodge's AI platform
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="group flex gap-2 items-center text-gray-300 hover:text-white hover:bg-white/10 transition-all"
          onClick={() => setShowAppGrid(!showAppGrid)}
        >
          <Grid size={16} className="group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Apps</span>
        </Button>
        
        <Link to="/atlas-link">
          <Button variant="ghost" size="sm" className="group flex gap-2 items-center text-gray-300 hover:text-white hover:bg-white/10 transition-all">
            <Shield size={16} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Atlas Link</span>
          </Button>
        </Link>
        
        <Link to="/workflows">
          <Button variant="ghost" size="sm" className="group flex gap-2 items-center text-gray-300 hover:text-white hover:bg-white/10 transition-all">
            <Workflow size={16} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Workflows</span>
          </Button>
        </Link>
        
        <Link to="/chat">
          <Button variant="ghost" size="sm" className="group flex gap-2 items-center text-gray-300 hover:text-white hover:bg-white/10 transition-all">
            <MessageSquare size={16} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Chat</span>
          </Button>
        </Link>
        
        <Link to="/settings">
          <Button variant="ghost" size="sm" className="group flex gap-2 items-center text-gray-300 hover:text-white hover:bg-white/10 transition-all">
            <Settings size={16} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </Link>
      </div>
      
      {showAppGrid && (
        <AppGrid 
          isDarkMode={isDarkMode} 
          onClose={() => setShowAppGrid(false)} 
        />
      )}
    </header>
  );
};

export default HeaderSection;
