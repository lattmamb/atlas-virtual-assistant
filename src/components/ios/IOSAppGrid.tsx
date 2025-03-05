
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Cloud, 
  Calendar, 
  Settings, 
  Image, 
  Music, 
  Workflow, 
  Map, 
  FileText, 
  Phone,
  Mail,
  Car,
  ShoppingCart
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <div 
        className="ios-app-icon w-14 h-14 flex items-center justify-center mb-1"
        style={{ background: color }}
      >
        {icon}
      </div>
      <span className="ios-app-label text-xs">{name}</span>
    </motion.div>
  );
  
  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  
  return content;
};

const IOSAppGrid: React.FC = () => {
  const apps = [
    { name: 'Messages', icon: <MessageSquare className="h-7 w-7 text-white" />, color: 'rgb(0, 122, 255)', to: '/chatroom' },
    { name: 'Cloud', icon: <Cloud className="h-7 w-7 text-white" />, color: 'rgb(52, 199, 89)', to: '/atlas' },
    { name: 'Calendar', icon: <Calendar className="h-7 w-7 text-white" />, color: 'rgb(255, 59, 48)' },
    { name: 'Photos', icon: <Image className="h-7 w-7 text-white" />, color: 'rgb(175, 82, 222)' },
    { name: 'Settings', icon: <Settings className="h-7 w-7 text-white" />, color: 'rgb(88, 86, 214)', to: '/settings' },
    { name: 'Music', icon: <Music className="h-7 w-7 text-white" />, color: 'rgb(255, 45, 85)' },
    { name: 'Notes', icon: <FileText className="h-7 w-7 text-white" />, color: 'rgb(255, 204, 0)' },
    { name: 'Workflows', icon: <Workflow className="h-7 w-7 text-white" />, color: 'rgb(90, 200, 250)', to: '/workflows' },
    { name: 'Maps', icon: <Map className="h-7 w-7 text-white" />, color: 'rgb(255, 149, 0)' },
    { name: 'Phone', icon: <Phone className="h-7 w-7 text-white" />, color: 'rgb(0, 122, 255)' },
    { name: 'Mail', icon: <Mail className="h-7 w-7 text-white" />, color: 'rgb(52, 199, 89)' },
    { name: 'Trinity', icon: <Car className="h-7 w-7 text-white" />, color: 'rgb(255, 59, 48)', to: '/trinity' },
    { name: 'Store', icon: <ShoppingCart className="h-7 w-7 text-white" />, color: 'rgb(175, 82, 222)' },
    { name: 'Atlas Link', icon: <Cloud className="h-7 w-7 text-white" />, color: 'rgb(0, 122, 255)', to: '/atlaslink' },
    { name: 'Universe', icon: <Cloud className="h-7 w-7 text-white" />, color: 'rgb(175, 82, 222)', to: '/universe' },
    { name: 'Vision Pro', icon: <Cloud className="h-7 w-7 text-white" />, color: 'rgb(52, 199, 89)', to: '/applevisionpro' }
  ];
  
  return (
    <div className="ios-app-grid p-4 grid grid-cols-4 gap-4">
      {apps.map((app, index) => (
        <AppIcon 
          key={index} 
          name={app.name} 
          icon={app.icon} 
          color={app.color}
          to={app.to}
        />
      ))}
    </div>
  );
};

export default IOSAppGrid;
