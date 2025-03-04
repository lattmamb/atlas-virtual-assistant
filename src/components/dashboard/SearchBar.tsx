
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface SearchBarProps {
  isOpen: boolean;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isOpen,
  searchTerm,
  onSearchChange,
  onSearchSubmit
}) => {
  const { isDarkMode } = useTheme();
  
  if (!isOpen) return null;
  
  return (
    <div 
      className={cn(
        "fixed top-12 left-0 right-0 z-40 p-2",
        isDarkMode ? "bg-black/70 backdrop-blur-md" : "bg-white/70 backdrop-blur-md"
      )}
    >
      <form onSubmit={onSearchSubmit} className="max-w-lg mx-auto">
        <input
          type="search"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search..."
          className={cn(
            "w-full px-4 py-2 rounded-full",
            "focus:outline-none focus:ring-2",
            isDarkMode 
              ? "bg-gray-800/50 text-white border-gray-700 focus:ring-blue-500" 
              : "bg-gray-100 text-gray-900 border-gray-200 focus:ring-blue-400"
          )}
        />
      </form>
    </div>
  );
};

export default SearchBar;
