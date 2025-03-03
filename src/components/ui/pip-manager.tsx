
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Maximize2, Minimize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface PageOption {
  id: string;
  title: string;
  url: string;
}

interface PipManagerProps {
  availablePages: PageOption[];
}

export function PipManager({ availablePages }: PipManagerProps) {
  const [isPipActive, setIsPipActive] = useState(false);
  const [activePipPage, setActivePipPage] = useState<PageOption | null>(null);
  const [pipPosition, setPipPosition] = useState({ x: window.innerWidth - 420, y: window.innerHeight - 350 });
  const [pipSize, setPipSize] = useState({ width: 380, height: 300 });
  const [isMinimized, setIsMinimized] = useState(false);
  
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handlePipOpen = (page: PageOption) => {
    setActivePipPage(page);
    setIsPipActive(true);
  };

  const handlePipClose = () => {
    setIsPipActive(false);
    setActivePipPage(null);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleDrag = (e: any, info: any) => {
    setPipPosition({
      x: info.point.x - pipSize.width / 2,
      y: info.point.y - 20,
    });
  };

  return (
    <>
      {/* PIP Window */}
      <AnimatePresence>
        {isPipActive && activePipPage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              height: isMinimized ? 40 : pipSize.height,
              width: isMinimized ? 200 : pipSize.width,
              x: pipPosition.x,
              y: pipPosition.y,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            drag
            dragMomentum={false}
            onDragEnd={handleDrag}
            className={cn(
              "fixed rounded-lg overflow-hidden shadow-lg z-50",
              isDarkMode ? 'bg-black/90 border border-gray-700' : 'bg-white/90 border border-gray-300'
            )}
            style={{ touchAction: 'none' }}
          >
            {/* PIP Header */}
            <div 
              className={cn(
                "flex items-center justify-between p-2 cursor-move",
                isDarkMode ? 'bg-gray-800/80' : 'bg-gray-100/80'
              )}
            >
              <span className="text-xs font-medium truncate w-full">
                {activePipPage.title}
              </span>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={toggleMinimize}
                  className="p-1 rounded-full hover:bg-gray-500/20"
                >
                  {isMinimized ? (
                    <Maximize2 className="h-3 w-3" />
                  ) : (
                    <Minimize2 className="h-3 w-3" />
                  )}
                </button>
                <button
                  onClick={handlePipClose}
                  className="p-1 rounded-full hover:bg-gray-500/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
            
            {/* PIP Content */}
            {!isMinimized && (
              <div className="p-2 overflow-hidden h-full">
                <iframe
                  src={activePipPage.url}
                  className="w-full h-full rounded border-0"
                  title={`PIP - ${activePipPage.title}`}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* PIP Trigger Button - can be enabled if needed */}
      {/* Uncomment below if you want a floating button to activate PIP
      <div className="fixed bottom-4 right-4 z-40">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <WindowIcon className="h-4 w-4 mr-1" />
              Open PIP
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {availablePages.map((page) => (
              <DropdownMenuItem 
                key={page.id}
                onClick={() => handlePipOpen(page)}
              >
                {page.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      */}
    </>
  );
}
