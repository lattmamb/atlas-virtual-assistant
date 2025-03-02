
import React from 'react';
import { FileText } from 'lucide-react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Button } from '@/components/ui/button';

const NotesWidget: React.FC = () => {
  return (
    <AppleWidget 
      title="Notes"
      icon={<FileText className="h-5 w-5 text-blue-400" />}
      className="row-span-1"
    >
      <div className="p-4">
        <div className="bg-[#1a1a1a]/50 p-3 rounded-lg border border-white/10 h-[120px]">
          <textarea 
            className="w-full h-full bg-transparent text-sm resize-none outline-none placeholder:text-gray-500"
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
