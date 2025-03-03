
import React from 'react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Button } from '@/components/ui/button';
import { Shield, MessageCircle, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AtlasLinkWidget: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  const handleNavigateToAtlasLink = () => {
    navigate('/atlas-link');
  };

  return (
    <AppleWidget 
      title="Atlas Link"
      icon={<Shield className="h-5 w-5 text-blue-400" />}
      className="row-span-1 neomorphic"
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex-1">
          <div className={cn(
            "p-3 rounded-lg mb-3",
            isDarkMode ? "bg-white/5" : "bg-black/5"
          )}>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium">Atlas Link Portal</span>
            </div>
            <p className="text-xs text-gray-400 mb-2">
              Access your secure Atlas Link workspace with automation tools and AI features.
            </p>
            <div className={cn(
              "p-2 rounded-md mb-2 text-xs",
              isDarkMode ? "bg-black/20" : "bg-white/50"
            )}>
              <div className="flex items-center justify-between">
                <span>AI Models:</span>
                <span className="text-green-400">Connected</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span>Automations:</span>
                <span className="text-yellow-400">3 Active</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs flex items-center gap-1 h-9"
              onClick={() => toast.info("Opening chat", { duration: 1500 })}
            >
              <MessageCircle className="h-3 w-3" />
              Chat
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs flex items-center gap-1 h-9"
              onClick={() => toast.info("Opening settings", { duration: 1500 })}
            >
              <Settings className="h-3 w-3" />
              Settings
            </Button>
          </div>
        </div>
        
        <Button 
          className="w-full mt-2" 
          onClick={handleNavigateToAtlasLink}
        >
          Open Atlas Link
        </Button>
      </div>
    </AppleWidget>
  );
};

export default AtlasLinkWidget;
