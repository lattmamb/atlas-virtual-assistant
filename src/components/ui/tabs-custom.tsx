
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  title: string;
  value: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  defaultValue?: string;
}

export function Tabs({
  tabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
  defaultValue,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const activeTabContent = tabs.find((tab) => tab.value === activeTab)?.content;

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative px-4 md:px-8 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg",
          containerClassName
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            onMouseEnter={() => setHoveredTab(tab.value)}
            onMouseLeave={() => setHoveredTab(null)}
            className={cn(
              "relative px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors duration-200 flex items-center gap-2",
              tab.value === activeTab
                ? cn("text-white", activeTabClassName)
                : cn("text-white/60 hover:text-white/80", tabClassName)
            )}
          >
            {tab.value === activeTab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"
                transition={{ type: "spring", duration: 0.6 }}
                style={{ zIndex: -1 }}
              />
            )}
            {hoveredTab === tab.value && tab.value !== activeTab && (
              <motion.div
                layoutId="hoverTab"
                className="absolute inset-0 bg-white/10 rounded-full"
                transition={{ type: "spring", duration: 0.4 }}
                style={{ zIndex: -1 }}
              />
            )}
            {tab.icon && <span className="text-lg">{tab.icon}</span>}
            {tab.title}
          </button>
        ))}
      </div>
      <div className={cn("mt-8 w-full h-full", contentClassName)}>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, rotateX: -10, transformPerspective: 1000 }}
          animate={{ opacity: 1, rotateX: 0, transformPerspective: 1000 }}
          exit={{ opacity: 0, rotateX: 10, transformPerspective: 1000 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          {activeTabContent}
        </motion.div>
      </div>
    </>
  );
}
