
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Home, 
  Settings, 
  Calendar, 
  Mail, 
  Image, 
  Music, 
  FileText, 
  Clock, 
  Search, 
  Camera, 
  Shield, 
  Map, 
  BarChart, 
  Phone, 
  Workflow 
} from 'lucide-react';

interface AppIconProps {
  icon: React.ElementType;
  label: string;
  path: string;
  color: string;
}

const AppIcon: React.FC<AppIconProps> = ({ icon: Icon, label, path, color }) => (
  <Link to={path}>
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="flex flex-col items-center"
    >
      <div 
        className="ios-app-icon w-16 h-16" 
        style={{ 
          background: `linear-gradient(145deg, ${color}, ${adjustColor(color, -20)})`,
          boxShadow: `0 2px 8px ${adjustColor(color, -40)}40` 
        }}
      >
        <Icon className="h-8 w-8 text-white" />
      </div>
      <span className="ios-app-label">{label}</span>
    </motion.div>
  </Link>
);

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  return color; // Simplified for this example, would normally adjust the hex color
}

const IOSAppGrid: React.FC = () => {
  const apps = [
    { icon: MessageSquare, label: 'Messages', path: '/chat', color: '#30D158' },
    { icon: Phone, label: 'Phone', path: '/', color: '#40C8E0' },
    { icon: Mail, label: 'Mail', path: '/', color: '#1E88E5' },
    { icon: Calendar, label: 'Calendar', path: '/', color: '#FF3B30' },
    { icon: Image, label: 'Photos', path: '/', color: '#FFCC00' },
    { icon: Camera, label: 'Camera', path: '/', color: '#9C27B0' },
    { icon: Clock, label: 'Clock', path: '/', color: '#FF9500' },
    { icon: Map, label: 'Maps', path: '/', color: '#64D2FF' },
    { icon: Home, label: 'Home', path: '/', color: '#5E5CE6' },
    { icon: Workflow, label: 'Workflows', path: '/workflows', color: '#FF2D55' },
    { icon: FileText, label: 'Notes', path: '/', color: '#FFD60A' },
    { icon: Shield, label: 'Atlas Link', path: '/atlas-link', color: '#007AFF' },
    { icon: Music, label: 'Music', path: '/', color: '#FF2D55' },
    { icon: BarChart, label: 'Stocks', path: '/', color: '#32D74B' },
    { icon: Search, label: 'Search', path: '/', color: '#5E5CE6' },
    { icon: Settings, label: 'Settings', path: '/settings', color: '#8E8E93' }
  ];
  
  return (
    <div className="ios-home-screen" style={{ backgroundImage: 'linear-gradient(to bottom, #000B1E, #001E3C)' }}>
      <div className="ios-app-grid">
        {apps.map((app, index) => (
          <AppIcon key={index} {...app} />
        ))}
      </div>
      
      <div className="ios-page-indicator">
        <div className="ios-page-dot active"></div>
        <div className="ios-page-dot"></div>
        <div className="ios-page-dot"></div>
      </div>
    </div>
  );
};

export default IOSAppGrid;
