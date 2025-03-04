
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Workflow, ArrowRight, Layers, ChevronRight, Plus } from 'lucide-react';

const WorkflowPanel: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div 
      className="w-full max-w-6xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center text-center mb-8">
        <motion.div
          className="mb-4 inline-block p-3 rounded-full bg-purple-500/20 text-purple-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <Workflow className="h-8 w-8" />
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Workflow Automation
        </h1>
        <p className="text-lg max-w-3xl opacity-80 mb-8">
          Create powerful automated workflows to streamline your tasks and enhance productivity.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Layers className="h-5 w-5 mr-2 text-purple-400" />
            Active Workflows
          </h2>
          
          {workflows.map((workflow, index) => (
            <motion.div
              key={workflow.name}
              className={cn(
                "p-4 rounded-xl cursor-pointer",
                "border backdrop-blur-lg",
                isDarkMode
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white/60 border-gray-200/50 hover:bg-white/80",
                "transition-all duration-200"
              )}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{workflow.name}</div>
                  <div className="text-sm opacity-70 mt-1">{workflow.description}</div>
                </div>
                <div className={cn(
                  "w-12 h-6 rounded-full relative cursor-pointer",
                  workflow.active 
                    ? "bg-green-500" 
                    : isDarkMode ? "bg-gray-700" : "bg-gray-300"
                )}>
                  <div className={cn(
                    "absolute w-5 h-5 rounded-full bg-white top-0.5 transition-all duration-300",
                    workflow.active ? "left-6" : "left-0.5"
                  )} />
                </div>
              </div>
              
              <div className="flex mt-3 gap-2">
                {workflow.tags.map(tag => (
                  <div key={tag} className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    "bg-purple-500/20 text-purple-400"
                  )}>
                    {tag}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className={cn(
          "rounded-xl overflow-hidden",
          "border backdrop-blur-lg",
          isDarkMode
            ? "bg-white/5 border-white/10"
            : "bg-white/60 border-gray-200/50"
        )}>
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-semibold">Workflow Editor</h3>
            <button className={cn(
              "px-3 py-1 rounded-md text-xs font-medium",
              "flex items-center gap-1",
              "bg-purple-500/20 text-purple-400"
            )}>
              <Plus className="h-3 w-3" />
              New
            </button>
          </div>
          
          <div className="p-6 flex flex-col items-center justify-center min-h-[300px]">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-16 h-16 rounded-xl mb-4 flex items-center justify-center",
                "bg-purple-500/20"
              )}>
                <Workflow className="h-8 w-8 text-purple-400" />
              </div>
              <p className="text-center text-sm opacity-70 max-w-xs">
                Build powerful automated workflows by connecting triggers, actions, and conditions in our visual editor.
              </p>
              
              <button className={cn(
                "mt-6 px-4 py-2 rounded-lg",
                "bg-purple-500 text-white",
                "flex items-center gap-2"
              )}>
                Create Workflow
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const workflows = [
  {
    name: "Morning Briefing",
    description: "Sends daily weather, news, and schedule at 7AM",
    active: true,
    tags: ["Daily", "Notification"]
  },
  {
    name: "Social Media Auto-Post",
    description: "Creates and posts content across platforms",
    active: true,
    tags: ["Social", "Content"]
  },
  {
    name: "Customer Support AI",
    description: "Handles initial customer inquiries via email",
    active: false,
    tags: ["Business", "AI"]
  },
  {
    name: "Fleet Status Monitor",
    description: "Tracks vehicle location and maintenance needs",
    active: true,
    tags: ["Mobility", "Monitoring"]
  }
];

export default WorkflowPanel;
