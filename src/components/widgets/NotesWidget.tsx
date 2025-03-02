
import React from 'react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

const NotesWidget: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <AppleWidget 
      title="Notes"
      icon={<FileText className="h-5 w-5 text-blue-400" />}
      className="row-span-1 neomorphic"
    >
      <div className="p-4">
        <div className={cn(
          "p-3 rounded-lg border h-[120px]",
          isDarkMode ? "bg-[#1a1a1a]/50 border-white/10" : "bg-white/50 border-black/10"
        )}>
          <textarea 
            className={cn(
              "w-full h-full resize-none outline-none placeholder:text-gray-500 text-sm",
              isDarkMode ? "bg-transparent" : "bg-transparent"
            )}
            placeholder="Type a note here..."
          ></textarea>
        </div>
        <div className="flex justify-between mt-4">
          <Button size="sm" variant="ghost" className="text-xs text-blue-400 hover:text-blue-300">
            Open Notes
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            Save Note
          </Button>
        </div>
      </div>
    </AppleWidget>
  );
};

export default NotesWidget;
