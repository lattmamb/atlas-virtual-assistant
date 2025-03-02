
import React from 'react';
import { Music } from 'lucide-react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Button } from '@/components/ui/button';

const MusicWidget: React.FC = () => {
  return (
    <AppleWidget 
      title="Music"
      icon={<Music className="h-5 w-5 text-blue-400" />}
      className="row-span-1"
    >
      <div className="p-4 flex flex-col h-full">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-md bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <Music className="h-8 w-8 text-white" />
          </div>
          <div className="font-medium text-sm">Not Playing</div>
          <div className="text-xs text-gray-400">Select a track to play</div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Button size="icon" variant="ghost" className="rounded-full w-8 h-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
          </Button>
          <Button size="icon" variant="outline" className="rounded-full w-10 h-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 15 12 5 21 5 3"></polygon></svg>
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full w-8 h-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
          </Button>
        </div>
      </div>
    </AppleWidget>
  );
};

export default MusicWidget;
