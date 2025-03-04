import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Home, 
  MessageSquare, 
  Workflow, 
  Settings,
  Phone,
  Music,
  Mail,
  Calendar,
  Cloud,
  Clock,
  MapPin,
  FileText,
  Video,
  Camera,
  ShoppingBag,
  Glasses,
  Link2
} from 'lucide-react';

interface AppGridProps {
  isDarkMode: boolean;
  onClose: () => void;
}

const AppGrid: React.FC<AppGridProps> = ({ isDarkMode, onClose }) => {
  const apps = [
    { name: 'Home', icon: <Home size={24} />, path: '/', color: 'bg-blue-500' },
    { name: 'Chat', icon: <MessageSquare size={24} />, path: '/chat', color: 'bg-green-500' },
    { name: 'Workflows', icon: <Workflow size={24} />, path: '/workflows', color: 'bg-purple-500' },
    { name: 'Atlas', icon: <Cloud size={24} />, path: '/atlas', color: 'bg-blue-600' },
    { name: 'Atlas Link', icon: <Link2 size={24} />, path: '/atlas-link', color: 'bg-indigo-600' },
    { name: 'Vision Pro', icon: <Glasses size={24} />, path: '/applevisionpro', color: 'bg-gradient-to-r from-blue-600 to-purple-600', isNew: true },
    { name: 'Mail', icon: <Mail size={24} />, path: '#', color: 'bg-blue-400' },
    { name: 'Calendar', icon: <Calendar size={24} />, path: '#', color: 'bg-red-500' },
    { name: 'Photos', icon: <Camera size={24} />, path: '#', color: 'bg-pink-500' },
    { name: 'Maps', icon: <MapPin size={24} />, path: '#', color: 'bg-green-600' },
    { name: 'Notes', icon: <FileText size={24} />, path: '#', color: 'bg-yellow-500' },
    { name: 'Phone', icon: <Phone size={24} />, path: '#', color: 'bg-green-400' },
    { name: 'Music', icon: <Music size={24} />, path: '#', color: 'bg-red-600' },
    { name: 'Videos', icon: <Video size={24} />, path: '#', color: 'bg-purple-400' },
    { name: 'Clock', icon: <Clock size={24} />, path: '#', color: 'bg-blue-800' },
    { name: 'Store', icon: <ShoppingBag size={24} />, path: '#', color: 'bg-blue-500' },
    { name: 'Settings', icon: <Settings size={24} />, path: '/settings', color: 'bg-gray-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className={cn(
        "fixed inset-0 z-50 p-4 flex flex-col",
        isDarkMode 
          ? "bg-black/80 backdrop-blur-xl"
          : "bg-white/80 backdrop-blur-xl"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="flex-1 flex items-center justify-center">
        <motion.div 
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onClick={(e) => e.stopPropagation()}
        >
          {apps.map((app, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link 
                to={app.path} 
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-lg",
                  isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
                )}
                onClick={onClose}
              >
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-1",
                  app.color
                )}>
                  <div className="text-white">
                    {app.icon}
                  </div>
                </div>
                <span className={cn(
                  "text-xs font-medium text-center",
                  isDarkMode ? "text-white" : "text-gray-800"
                )}>
                  {app.name}
                </span>
              </Link>
              
              {app.isNew && (
                <span className="absolute top-0 right-5 w-3 h-3 bg-red-500 rounded-full">
                  <span className="absolute inset-0 animate-ping w-full h-full rounded-full bg-red-500 opacity-75"></span>
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AppGrid;
