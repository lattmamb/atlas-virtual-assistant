
import React from 'react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Button } from '@/components/ui/button';
import { Shield, MessageCircle, Settings, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

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
      className="row-span-1"
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex-1">
          {/* Status card */}
          <motion.div 
            className={cn(
              "p-3 rounded-xl mb-4",
              isDarkMode ? "bg-black/40 border border-gray-800" : "bg-gray-50 border border-gray-200"
            )}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium">Secure Portal</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Personal Atlas Link workspace connected with integrated AI features
            </p>
            
            {/* Status indicators */}
            <div className={cn(
              "rounded-lg mb-2 text-xs space-y-2",
              isDarkMode ? "bg-gray-900/50 p-2" : "bg-white p-2 border border-gray-100"
            )}>
              <div className="flex items-center justify-between">
                <span className="text-xs">AI Models</span>
                <span className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
                  <span className="text-green-500 text-xs">Active</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Automations</span>
                <span className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-1.5"></div>
                  <span className="text-amber-500 text-xs">3 Running</span>
                </span>
              </div>
            </div>
          </motion.div>
          
          {/* Quick actions buttons */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "text-xs flex items-center justify-center gap-1.5 h-9",
                isDarkMode ? "bg-gray-900/70 border-gray-800 hover:bg-gray-800" : "bg-white hover:bg-gray-50"
              )}
              onClick={() => toast.info("Chat feature opening", { duration: 1500 })}
            >
              <MessageCircle className="h-3 w-3" />
              Chat
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "text-xs flex items-center justify-center gap-1.5 h-9",
                isDarkMode ? "bg-gray-900/70 border-gray-800 hover:bg-gray-800" : "bg-white hover:bg-gray-50"
              )}
              onClick={() => toast.info("Settings opening", { duration: 1500 })}
            >
              <Settings className="h-3 w-3" />
              Settings
            </Button>
          </div>
        </div>
        
        {/* Link to Atlas */}
        <Button 
          className={cn(
            "w-full mt-2 flex items-center justify-center gap-1",
            isDarkMode ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-600"
          )}
          onClick={handleNavigateToAtlasLink}
        >
          Open Atlas Link
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </AppleWidget>
  );
};

export default AtlasLinkWidget;
