
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Camera, Mail, Globe, Music, 
  AppWindow, MessageSquare, Settings,
  Cloud, Map, Image, Calendar, Clock,
  Workflow, Webhook, FolderCog, BrainCircuit,
  Shield, Store
} from 'lucide-react';

interface AppIconProps {
  name: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

const AppIcon: React.FC<AppIconProps> = ({ name, icon, color, onClick }) => {
  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer"
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <motion.div 
        className="ios-app-icon h-14 w-14 flex items-center justify-center" 
        style={{ backgroundColor: color }}
      >
        {icon}
      </motion.div>
      <span className="ios-app-label mt-1">{name}</span>
    </motion.div>
  );
};

interface IOSAppGridProps {
  onAppClick?: (appName: string) => void;
}

const IOSAppGrid: React.FC<IOSAppGridProps> = ({ onAppClick = () => {} }) => {
  return (
    <div className="ios-app-grid grid grid-cols-4 gap-4 px-4">
      <AppIcon 
        name="Messages" 
        icon={<MessageSquare className="h-7 w-7 text-white" />} 
        color="#44bd54"
        onClick={() => onAppClick("Messages")}
      />
      <AppIcon 
        name="Safari" 
        icon={<Globe className="h-7 w-7 text-white" />} 
        color="#1d7fff"
        onClick={() => onAppClick("Safari")}
      />
      <AppIcon 
        name="Mail" 
        icon={<Mail className="h-7 w-7 text-white" />} 
        color="#3993ef"
        onClick={() => onAppClick("Mail")}
      />
      <AppIcon 
        name="Photos" 
        icon={<Image className="h-7 w-7 text-white" />} 
        color="#e74c3c"
        onClick={() => onAppClick("Photos")}
      />
      <AppIcon 
        name="Camera" 
        icon={<Camera className="h-7 w-7 text-white" />} 
        color="#333333"
        onClick={() => onAppClick("Camera")}
      />
      <AppIcon 
        name="Maps" 
        icon={<Map className="h-7 w-7 text-white" />} 
        color="#5e66d5"
        onClick={() => onAppClick("Maps")}
      />
      <AppIcon 
        name="Clock" 
        icon={<Clock className="h-7 w-7 text-white" />} 
        color="#1a1a1a"
        onClick={() => onAppClick("Clock")}
      />
      <AppIcon 
        name="Calendar" 
        icon={<Calendar className="h-7 w-7 text-white" />} 
        color="#ef4d3d"
        onClick={() => onAppClick("Calendar")}
      />
      <AppIcon 
        name="Music" 
        icon={<Music className="h-7 w-7 text-white" />} 
        color="#fc3158"
        onClick={() => onAppClick("Music")}
      />
      <AppIcon 
        name="Cloud" 
        icon={<Cloud className="h-7 w-7 text-white" />} 
        color="#3693ef"
        onClick={() => onAppClick("Cloud")}
      />
      <AppIcon 
        name="Universe" 
        icon={<BrainCircuit className="h-7 w-7 text-white" />} 
        color="#9b87f5"
        onClick={() => onAppClick("Universe")}
      />
      <AppIcon 
        name="Settings" 
        icon={<Settings className="h-7 w-7 text-white" />} 
        color="#8e8e8e"
        onClick={() => onAppClick("Settings")}
      />
      <AppIcon 
        name="Workflows" 
        icon={<Workflow className="h-7 w-7 text-white" />} 
        color="#7e69ab"
        onClick={() => onAppClick("Workflows")}
      />
      <AppIcon 
        name="Vision Pro" 
        icon={<AppWindow className="h-7 w-7 text-white" />} 
        color="#000000"
        onClick={() => onAppClick("Vision Pro")}
      />
      <AppIcon 
        name="Atlas Link" 
        icon={<Webhook className="h-7 w-7 text-white" />} 
        color="#6e59a5"
        onClick={() => onAppClick("Atlas Link")}
      />
      <AppIcon 
        name="Atlas Universe" 
        icon={<Shield className="h-7 w-7 text-white" />} 
        color="#0A84FF"
        onClick={() => onAppClick("Atlas Universe")}
      />
      <AppIcon 
        name="Trinity" 
        icon={<Store className="h-7 w-7 text-white" />} 
        color="#E947FF"
        onClick={() => onAppClick("Trinity")}
      />
    </div>
  );
};

export default IOSAppGrid;
