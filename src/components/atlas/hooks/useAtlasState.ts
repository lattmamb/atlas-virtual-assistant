
import { useState } from "react";

export function useAtlasState() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return {
    isMinimized,
    isExpanded,
    activeTab,
    activeTool,
    setActiveTab,
    setActiveTool,
    toggleMinimize,
    toggleExpand
  };
}
