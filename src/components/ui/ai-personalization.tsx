
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Lightbulb, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function AIPersonalization() {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Simulate AI analysis based on user behavior
    const generateSuggestion = () => {
      const suggestions = [
        "Try voice commands by clicking the mic button",
        "Switch to dark mode for a sleek, Apple-inspired look",
        "Customize your dashboard with the widget selector",
        "Set up API keys in settings for enhanced AI responses"
      ];
      setSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
      setVisible(true);
      
      // Auto-hide after 8 seconds
      setTimeout(() => {
        setVisible(false);
      }, 8000);
    };
    
    // Show a suggestion after 15 seconds
    const timer = setTimeout(generateSuggestion, 15000);
    return () => clearTimeout(timer);
  }, []);

  const dismissSuggestion = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {suggestion && visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className={cn(
            "fixed bottom-24 left-1/2 -translate-x-1/2 w-[85%] max-w-md p-4 z-40 rounded-2xl",
            isDarkMode 
              ? "bg-gray-800/90 backdrop-blur-xl border border-white/10 text-white" 
              : "bg-white/90 backdrop-blur-xl border border-black/10 text-gray-900",
            "flex items-center gap-3 text-sm shadow-lg"
          )}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Lightbulb className="flex-shrink-0 w-5 h-5 text-blue-500" />
          <span>{suggestion}</span>
          <button
            onClick={dismissSuggestion}
            className={cn(
              "ml-auto p-1.5 rounded-full flex-shrink-0",
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            )}
            aria-label="Dismiss suggestion"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
