
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  MessageSquare, Image, Calendar, FileText, 
  Settings, Mail, Music, Video, Workflow,
  X, Cloud, Shield, Grid, User, Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WidgetDrawer } from "./WidgetDrawer";

interface AppGridProps {
  isDarkMode: boolean;
  onClose: () => void;
}

const AppGrid: React.FC<AppGridProps> = ({ isDarkMode, onClose }) => {
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);
  
  const apps = [
    { name: "Chat", icon: <MessageSquare />, path: "/chat", color: "from-blue-500 to-blue-600" },
    { name: "Photos", icon: <Image />, path: "/", color: "from-pink-500 to-rose-600" },
    { name: "Calendar", icon: <Calendar />, path: "/", color: "from-red-500 to-red-600" },
    { name: "Notes", icon: <FileText />, path: "/", color: "from-amber-400 to-amber-500" },
    { name: "Mail", icon: <Mail />, path: "/", color: "from-blue-400 to-indigo-500" },
    { name: "Atlas Link", icon: <Shield />, path: "/atlas-link", color: "from-purple-500 to-indigo-600" },
    { name: "Music", icon: <Music />, path: "/", color: "from-red-500 to-pink-600" },
    { name: "Videos", icon: <Video />, path: "/", color: "from-violet-500 to-purple-600" },
    { name: "Workflows", icon: <Workflow />, path: "/workflows", color: "from-emerald-500 to-teal-600" },
    { name: "Settings", icon: <Settings />, path: "/settings", color: "from-gray-600 to-gray-700" },
    { name: "Account", icon: <User />, path: "/", color: "from-cyan-500 to-sky-600" },
    { name: "Search", icon: <Search />, path: "/", color: "from-gray-500 to-gray-600" },
  ];
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (gridRef.current && !gridRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  const handleAppClick = (path: string) => {
    navigate(path);
    onClose();
  };
  
  return (
    <div 
      ref={gridRef}
      className={cn(
        "fixed top-12 left-1/2 -translate-x-1/2 p-6 rounded-xl shadow-2xl max-w-2xl w-[calc(100%-2rem)] z-30 backdrop-blur-xl",
        "animate-scale-in border",
        isDarkMode 
          ? "bg-black/80 border-white/10 shadow-[0_20px_70px_-15px_rgba(0,0,0,0.7)]" 
          : "bg-white/90 border-gray-200 shadow-[0_20px_70px_-15px_rgba(0,0,0,0.2)]"
      )}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className={cn("font-medium", isDarkMode ? "text-white" : "text-gray-900")}>
          Atlas Apps
        </h3>
        <button 
          onClick={onClose}
          className={cn(
            "p-1.5 rounded-full transition-colors", 
            isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-200"
          )}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {apps.map((app, index) => (
          <button
            key={index}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200",
              "hover:scale-105 hover:shadow-md",
              isDarkMode 
                ? "hover:bg-white/5 text-white" 
                : "hover:bg-gray-100 text-gray-800"
            )}
            onClick={() => handleAppClick(app.path)}
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-2",
              "bg-gradient-to-br shadow-sm",
              app.color,
              isDarkMode ? "shadow-black/30" : "shadow-gray-200/70"
            )}>
              {React.cloneElement(app.icon as React.ReactElement, { 
                className: "h-6 w-6 text-white" 
              })}
            </div>
            <span className="text-xs font-medium">{app.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppGrid;
