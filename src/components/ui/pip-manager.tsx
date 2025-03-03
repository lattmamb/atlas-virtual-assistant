
import React, { useState, useCallback } from "react";
import { PipWidget } from "./pip-widget";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "@/context/ThemeContext";

export type PipPageConfig = {
  id: string;
  title: string;
  url: string;
  size?: "small" | "medium" | "large";
};

export type PipManagerProps = {
  availablePages: PipPageConfig[];
  className?: string;
};

export function PipManager({ availablePages, className }: PipManagerProps) {
  const [activeWidgets, setActiveWidgets] = useState<PipPageConfig[]>([]);
  const [showPageSelector, setShowPageSelector] = useState(false);
  const { isDarkMode } = useTheme();
  
  const addWidget = useCallback((page: PipPageConfig) => {
    // Don't add if already active
    if (activeWidgets.some(w => w.id === page.id)) {
      return;
    }
    
    setActiveWidgets(prev => [...prev, page]);
    setShowPageSelector(false);
  }, [activeWidgets]);
  
  const removeWidget = useCallback((pageId: string) => {
    setActiveWidgets(prev => prev.filter(w => w.id !== pageId));
  }, []);
  
  return (
    <div className={className}>
      {/* Active widgets */}
      <div className="fixed bottom-20 right-4 flex flex-col-reverse gap-4 z-30">
        <AnimatePresence>
          {activeWidgets.map((widget) => (
            <motion.div
              key={widget.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <PipWidget
                title={widget.title}
                pageUrl={widget.url}
                initialSize={widget.size || "small"}
                onClose={() => removeWidget(widget.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Add new widget button */}
      <div className="fixed bottom-4 right-4 z-30">
        <Button
          onClick={() => setShowPageSelector(!showPageSelector)}
          size="icon" 
          className={isDarkMode ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-400"}
        >
          <Plus className="h-4 w-4" />
        </Button>
        
        {/* Page selector dropdown */}
        <AnimatePresence>
          {showPageSelector && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`absolute bottom-full right-0 mb-2 p-2 rounded-lg shadow-lg min-w-48 ${
                isDarkMode 
                  ? "bg-gray-900/90 backdrop-blur-lg border border-gray-800" 
                  : "bg-white/90 backdrop-blur-lg border border-gray-200"
              }`}
            >
              <div className={`text-sm font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Add Page Widget
              </div>
              <div className="space-y-1 max-h-[30vh] overflow-auto pr-1">
                {availablePages.map((page) => (
                  <Button
                    key={page.id}
                    size="sm"
                    variant={isDarkMode ? "ghost" : "outline"}
                    className={`w-full justify-start text-left ${
                      activeWidgets.some(w => w.id === page.id) 
                        ? "opacity-50 cursor-not-allowed" 
                        : ""
                    }`}
                    onClick={() => addWidget(page)}
                    disabled={activeWidgets.some(w => w.id === page.id)}
                  >
                    {page.title}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
