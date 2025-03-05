
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Camera, Mail, Safari, Music, 
  AppWindow, MessageSquare, Settings,
  Cloud, Map, Image, Calendar, Clock,
  Workflow, Webhook, FolderCog, BrainCircuit,
  Shield
} from 'lucide-react';

interface AppIconProps {
  name: string;
  icon: React.ReactNode;
  color: string;
  to?: string;
  onClick?: () => void;
}

const AppIcon: React.FC<AppIconProps> = ({ name, icon, color, to, onClick }) => {
  const content = (
    <motion.div
      className="flex flex-col items-center"
      whileTap={{ scale: 0.9 }}
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
  
  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  
  return <div onClick={onClick}>{content}</div>;
};

const IOSAppGrid: React.FC = () => {
  return (
    <div className="ios-app-grid grid grid-cols-4 gap-4 px-4">
      <AppIcon 
        name="Messages" 
        icon={<MessageSquare className="h-7 w-7 text-white" />} 
        color="#44bd54"
        to="/chatroom"
      />
      <AppIcon 
        name="Safari" 
        icon={<Safari className="h-7 w-7 text-white" />} 
        color="#1d7fff"
      />
      <AppIcon 
        name="Mail" 
        icon={<Mail className="h-7 w-7 text-white" />} 
        color="#3993ef"
      />
      <AppIcon 
        name="Photos" 
        icon={<Image className="h-7 w-7 text-white" />} 
        color="#e74c3c"
      />
      <AppIcon 
        name="Camera" 
        icon={<Camera className="h-7 w-7 text-white" />} 
        color="#333333"
      />
      <AppIcon 
        name="Maps" 
        icon={<Map className="h-7 w-7 text-white" />} 
        color="#5e66d5"
      />
      <AppIcon 
        name="Clock" 
        icon={<Clock className="h-7 w-7 text-white" />} 
        color="#1a1a1a"
      />
      <AppIcon 
        name="Calendar" 
        icon={<Calendar className="h-7 w-7 text-white" />} 
        color="#ef4d3d"
      />
      <AppIcon 
        name="Music" 
        icon={<Music className="h-7 w-7 text-white" />} 
        color="#fc3158"
      />
      <AppIcon 
        name="Cloud" 
        icon={<Cloud className="h-7 w-7 text-white" />} 
        color="#3693ef"
        to="/atlas"
      />
      <AppIcon 
        name="Universe" 
        icon={<BrainCircuit className="h-7 w-7 text-white" />} 
        color="#9b87f5"
        to="/universe"
      />
      <AppIcon 
        name="Settings" 
        icon={<Settings className="h-7 w-7 text-white" />} 
        color="#8e8e8e"
        to="/settings"
      />
      <AppIcon 
        name="Workflows" 
        icon={<Workflow className="h-7 w-7 text-white" />} 
        color="#7e69ab"
        to="/workflows"
      />
      <AppIcon 
        name="Vision Pro" 
        icon={<AppWindow className="h-7 w-7 text-white" />} 
        color="#000000"
        to="/applevisionpro"
      />
      <AppIcon 
        name="Atlas Link" 
        icon={<Webhook className="h-7 w-7 text-white" />} 
        color="#6e59a5"
        to="/atlaslink"
      />
      <AppIcon 
        name="Atlas Universe" 
        icon={<Shield className="h-7 w-7 text-white" />} 
        color="#0A84FF"
        to="/atlasuniverse"
      />
    </div>
  );
};

export default IOSAppGrid;
