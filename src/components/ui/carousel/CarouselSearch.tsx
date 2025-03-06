
import React from "react";
import { Search, Maximize, Minimize } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselSearchProps {
  isDarkMode: boolean;
  searchText: string;
  setSearchText: (text: string) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const CarouselSearch: React.FC<CarouselSearchProps> = ({
  isDarkMode,
  searchText,
  setSearchText,
  isFullscreen,
  toggleFullscreen
}) => {
  return (
    <div className={cn(
      "flex items-center justify-between p-4",
      isDarkMode ? "bg-black/30 text-white" : "bg-white/30 text-black",
      "backdrop-blur-md border-b",
      isDarkMode ? "border-white/10" : "border-black/10"
    )}>
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-60" />
        <input
          type="text"
          placeholder="Search pages..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={cn(
            "w-full pl-10 pr-4 py-2 rounded-full",
            isDarkMode 
              ? "bg-white/10 text-white border-white/10" 
              : "bg-black/5 text-black border-black/10",
            "border outline-none focus:ring-2",
            "focus:ring-blue-500/50"
          )}
        />
      </div>
      
      <button 
        onClick={toggleFullscreen}
        className={cn(
          "ml-4 p-2 rounded-full",
          isDarkMode ? "bg-white/10 hover:bg-white/20" : "bg-black/10 hover:bg-black/20",
          "transition-colors"
        )}
      >
        {isFullscreen ? (
          <Minimize className="h-5 w-5" />
        ) : (
          <Maximize className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default CarouselSearch;
