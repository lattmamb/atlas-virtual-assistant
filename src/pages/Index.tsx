
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedLogo from '@/components/AnimatedLogo';
import AppGrid from '@/components/icloud/AppGrid';
import ICloudLayout from '@/components/icloud/ICloudLayout';
import { AtlasChatBot } from '@/components/atlas/index';
import { Button } from '@/components/ui/button';
import { Settings, MessageSquare, Workflow, Shield } from 'lucide-react';

export default function Index() {
  const [showChat, setShowChat] = useState(false);
  const [showAppGrid, setShowAppGrid] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <ICloudLayout>
      <div className="p-4 relative">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <AnimatedLogo />
            <h1 className="text-2xl font-bold ml-2">Atlas Assistant</h1>
          </div>
          <div className="flex gap-2">
            <Link to="/atlas-link">
              <Button variant="ghost" size="sm" className="flex gap-2 items-center">
                <Shield size={16} />
                Atlas Link
              </Button>
            </Link>
            <Link to="/workflows">
              <Button variant="ghost" size="sm" className="flex gap-2 items-center">
                <Workflow size={16} />
                Workflows
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="sm">
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
            className="rounded-full flex items-center justify-center w-12 h-12 p-0 shadow-lg"
            onClick={() => setShowChat(!showChat)}
          >
            <MessageSquare />
          </Button>
        </div>

        {showChat && (
          <div className="fixed bottom-20 right-4 z-40 w-80 md:w-96 h-96 shadow-xl rounded-xl border overflow-hidden bg-background">
            <AtlasChatBot />
          </div>
        )}
      </div>
    </ICloudLayout>
  );
}
