
import React from 'react';
import { User, MapPin, Car } from 'lucide-react';
import { SidebarCollapseToggle } from '@/components/ui/sidebar';
import { motion } from 'framer-motion';

interface UserProfileProps {
  isCollapsed?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ isCollapsed }) => {
  return (
    <div className="flex justify-between items-center px-2 py-2">
      <div className="flex items-center gap-2 px-2">
        <motion.div 
          className="relative h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-md"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Car className="h-4 w-4" />
        </motion.div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-medium">Trinity Dodge</span>
            <span className="text-xs text-muted-foreground flex items-center">
              <MapPin className="h-3 w-3 mr-1 inline" />
              Taylorville, IL
            </span>
          </div>
        )}
      </div>
      
      <SidebarCollapseToggle className="text-muted-foreground" />
    </div>
  );
};

export default UserProfile;
