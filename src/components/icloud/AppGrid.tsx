import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  MessageSquare, Image, Calendar, FileText, 
  Settings, Mail, MusicIcon, Video, Workflow,
  X
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
    { name: "Chat", icon: <MessageSquare />, path: "/" },
    { name: "Photos", icon: <Image />, path: "/" },
    { name: "Calendar", icon: <Calendar />, path: "/" },
    { name: "Notes", icon: <FileText />, path: "/" },
    { name: "Mail", icon: <Mail />, path: "/" },
    { name: "Settings", icon: <Settings />, path: "/settings" },
    { name: "Music", icon: <MusicIcon />, path: "/" },
    { name: "Videos", icon: <Video />, path: "/" },
    { name: "Workflows", icon: <Workflow />, path: "/workflows" },
  ];
  
  const renderWidgetWithDrawer = (widget: React.ReactNode, title: string, description?: string, drawerContent?: React.ReactNode) => {
    return (
      <div className="relative">
        {widget}
        <WidgetDrawer 
          title={title}
          description={description}
        >
          {drawerContent || (
            <div className="min-h-[200px] flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                Extended {title} content will appear here.
              </p>
            </div>
          )}
        </WidgetDrawer>
      </div>
    );
  };

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
        "absolute top-12 left-0 p-4 rounded-lg shadow-xl w-[320px] z-30 backdrop-blur-lg animate-fade-in",
        isDarkMode ? "bg-slate-800/90 border border-slate-700" : "bg-white/90 border border-gray-200"
      )}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className={cn("font-medium", isDarkMode ? "text-white" : "text-gray-900")}>
          Applications
        </h3>
        <button 
          onClick={onClose}
          className={cn("p-1 rounded-full", 
            isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-200"
          )}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {apps.map((app, index) => (
          <button
            key={index}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-lg transition-all",
              isDarkMode 
                ? "hover:bg-slate-700 text-white" 
                : "hover:bg-gray-100 text-gray-800"
            )}
            onClick={() => handleAppClick(app.path)}
          >
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center mb-2",
              isDarkMode ? "bg-slate-700" : "bg-blue-50"
            )}>
              {React.cloneElement(app.icon as React.ReactElement, { 
                className: cn("h-6 w-6", isDarkMode ? "text-blue-400" : "text-blue-500") 
              })}
            </div>
            <span className="text-xs">{app.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppGrid;
