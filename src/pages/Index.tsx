
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedLogo from '@/components/AnimatedLogo';
import AppGrid from '@/components/icloud/AppGrid';
import ICloudLayout from '@/components/icloud/ICloudLayout';
import { AtlasChatBot } from '@/components/atlas/index';
import { Button } from '@/components/ui/button';
import { Settings, MessageSquare, Workflow, Shield, Grid } from 'lucide-react';
import { GridPattern } from '@/components/ui/grid-pattern';

export default function Index() {
  const [showChat, setShowChat] = useState(false);
  const [showAppGrid, setShowAppGrid] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <ICloudLayout>
      <div className="p-4 relative rounded-xl border border-[#2a2a2a] bg-[#1a1a1a]/60 backdrop-blur-lg shadow-xl overflow-hidden">
        <GridPattern 
          width={16} 
          height={16} 
          className="fill-white/[0.01] stroke-white/[0.05] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
          strokeDasharray="1 2"
        />
        
        <header className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center">
            <AnimatedLogo />
            <h1 className="text-2xl font-bold ml-2 text-white">Atlas Assistant</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex gap-2 items-center text-gray-300 hover:text-white hover:bg-white/10"
              onClick={() => setShowAppGrid(!showAppGrid)}
            >
              <Grid size={16} />
              Apps
            </Button>
            <Link to="/atlas-link">
              <Button variant="ghost" size="sm" className="flex gap-2 items-center text-gray-300 hover:text-white hover:bg-white/10">
                <Shield size={16} />
                Atlas Link
              </Button>
            </Link>
            <Link to="/workflows">
              <Button variant="ghost" size="sm" className="flex gap-2 items-center text-gray-300 hover:text-white hover:bg-white/10">
                <Workflow size={16} />
                Workflows
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Settings size={16} />
              </Button>
            </Link>
          </div>
        </header>

        {showAppGrid && (
          <AppGrid 
            isDarkMode={isDarkMode} 
            onClose={() => setShowAppGrid(false)} 
          />
        )}

        <div className="fixed bottom-4 right-4 z-40">
          <Button 
            className="rounded-full flex items-center justify-center w-12 h-12 p-0 shadow-lg bg-[#0071e3] hover:bg-[#0077ED]"
            onClick={() => setShowChat(!showChat)}
          >
            <MessageSquare className="text-white" />
          </Button>
        </div>

        {showChat && (
          <div className="fixed bottom-20 right-4 z-40 w-80 md:w-96 h-96 shadow-xl rounded-xl border border-[#2a2a2a] overflow-hidden bg-[#1a1a1a]/90 backdrop-blur-xl">
            <AtlasChatBot />
          </div>
        )}
      </div>
    </ICloudLayout>
  );
}
