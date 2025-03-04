
import React from 'react';
import { cn } from '@/lib/utils';
import { User, Settings } from 'lucide-react';

interface UserProfileProps {
  isCollapsed: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ isCollapsed }) => {
  return (
    <div className="border-t border-sidebar-border p-3">
      <div className={cn(
        "flex items-center p-2 rounded-md hover:bg-sidebar-accent/10 cursor-pointer",
        "transition-colors duration-200"
      )}>
        <div className="h-8 w-8 rounded-full bg-sidebar-accent/20 flex items-center justify-center text-sidebar-foreground">
          <User className="h-4 w-4" />
        </div>
        
        {!isCollapsed && (
          <>
            <div className="ml-3 flex-grow">
              <p className="text-sm font-medium text-sidebar-foreground">User</p>
              <p className="text-xs text-sidebar-muted-foreground">user@example.com</p>
            </div>
            
            <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-sidebar-accent/20 text-sidebar-muted-foreground">
              <Settings className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
