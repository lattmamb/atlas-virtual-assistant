
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import WidgetsGrid from '@/components/widgets/WidgetsGrid';
import AppleVisionPro from '@/pages/AppleVisionPro';
import Atlas from '@/pages/Atlas';
import ChatRoom from '@/pages/ChatRoom';

const MainTabs = () => {
  return (
    <Tabs defaultValue="home" className="w-full mx-auto">
      <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto mb-8">
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="vision">Vision Pro</TabsTrigger>
        <TabsTrigger value="atlas">Atlas</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>

      <TabsContent value="home" className="mt-6">
        <WidgetsGrid />
      </TabsContent>

      <TabsContent value="vision" className="mt-6">
        <div className="max-h-[80vh] overflow-auto">
          <AppleVisionPro />
        </div>
      </TabsContent>

      <TabsContent value="atlas" className="mt-6">
        <div className="max-h-[80vh] overflow-auto">
          <Atlas />
        </div>
      </TabsContent>

      <TabsContent value="chat" className="mt-6">
        <div className="max-h-[80vh] overflow-auto">
          <ChatRoom />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MainTabs;
