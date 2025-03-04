
import React from "react";
import { Home } from "@/icons/Home";
import { Settings as SettingsIcon } from "@/icons/Settings";
import { Tabs } from "@/components/ui/tabs-custom";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "@/context/ThemeContext";
import { NavbarDemo } from "@/components/ui/navbar-demo";
import { TabsDemo } from "@/components/ui/tabs-demo";
import { TailwindcssButtons } from "@/components/ui/TailwindcssButtons";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Features from "@/pages/Features";
import AppleVisionPro from "@/pages/AppleVisionPro";
import AtlasLink from "@/pages/AtlasLink";
import ChatRoom from "@/pages/ChatRoom";
import SettingsPage from "@/pages/Settings";
import Workflows from "@/pages/Workflows";

export function MainTabs() {
  const { isDarkMode } = useTheme();
  
  const tabs = [
    {
      title: "Features",
      value: "features",
      icon: <Home className="h-4 w-4" />,
      content: (
        <div className="w-full h-full">
          <Features />
        </div>
      ),
    },
    {
      title: "Vision Pro",
      value: "visionpro",
      content: (
        <div className="w-full h-full">
          <AppleVisionPro />
        </div>
      ),
    },
    {
      title: "Atlas Link",
      value: "atlaslink",
      content: (
        <div className="w-full h-full">
          <AtlasLink />
        </div>
      ),
    },
    {
      title: "Chat Room",
      value: "chatroom",
      content: (
        <div className="w-full h-full">
          <ChatRoom />
        </div>
      ),
    },
    {
      title: "Workflows",
      value: "workflows",
      content: (
        <div className="w-full h-full">
          <Workflows />
        </div>
      ),
    },
    {
      title: "Components",
      value: "components",
      content: (
        <div className="w-full h-full overflow-y-auto">
          <div className="animate-fade-in p-4">
            <div className="relative z-10 mt-4 mb-8 pt-4">
              <div className="text-center">
                <motion.h1 
                  className="text-4xl font-bold mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  UI Component Library
                </motion.h1>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                className="flex-1 overflow-y-auto"
              >
                <div className="animate-fade-in p-4">
                  <NavbarDemo />
                  <Separator className="my-8" />
                  <TabsDemo />
                  <Separator className="my-8" />
                  <TailwindcssButtons />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Settings",
      value: "settings",
      icon: <SettingsIcon className="h-4 w-4" />,
      content: (
        <div className="w-full h-full">
          <SettingsPage />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full">
      {isDarkMode && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-50">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={20}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>
      )}
      
      <div className="container mx-auto pt-8 px-4">
        <Tabs 
          tabs={tabs} 
          containerClassName="mx-auto max-w-4xl"
          contentClassName="mt-4"
        />
      </div>
    </div>
  );
}
