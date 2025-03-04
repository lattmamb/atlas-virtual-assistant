
import React from 'react';
import { User } from 'lucide-react';
import { SidebarCollapseToggle } from '@/components/ui/sidebar';

const UserProfile: React.FC = () => {
  return (
    <div className="flex justify-between items-center px-2 py-2">
      <div className="flex items-center gap-2 px-2">
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 text-white flex items-center justify-center">
          <User className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Trinity Dodge</span>
          <span className="text-xs text-muted-foreground">Taylorville, IL</span>
        </div>
      </div>
      
      <SidebarCollapseToggle className="text-muted-foreground" />
    </div>
  );
};

export default UserProfile;
