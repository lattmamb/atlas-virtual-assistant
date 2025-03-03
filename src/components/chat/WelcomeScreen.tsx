
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, MessageSquare, Clock, Wand } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  sendMessage: (content: string) => void;
  aiMode?: 'atlas' | 'grok';
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  sendMessage,
  aiMode = 'atlas'
}) => {
  const { isDarkMode } = useTheme();
  
  const isAtlas = aiMode === 'atlas';
  
  // Define example prompts based on AI mode
  const examplePrompts = isAtlas 
    ? [
        "Tell me about the 2025 Dodge Ram",
        "What financing options are available?",
        "Show me Trinity Dodge inventory",
        "Schedule a test drive"
      ]
    : [
        "What's happening in the world today?",
        "Write a poem about AI",
        "Explain quantum computing like I'm five",
        "Debate the pros and cons of electric cars"
      ];
  
  // Define features based on AI mode
  const features = isAtlas
    ? [
        { icon: <MessageSquare className="h-5 w-5" />, title: "Trinity Dodge Assistant", description: "Get information about vehicles, financing, and services" },
        { icon: <Clock className="h-5 w-5" />, title: "Quick Responses", description: "Fast, accurate answers about our dealership" },
        { icon: <Wand className="h-5 w-5" />, title: "Personalized Help", description: "Tailored assistance for your car buying journey" }
      ]
    : [
        { icon: <Zap className="h-5 w-5" />, title: "Real-time Information", description: "Access to current news and events" },
        { icon: <Clock className="h-5 w-5" />, title: "Witty Responses", description: "More personality, humor, and creative outputs" },
        { icon: <Wand className="h-5 w-5" />, title: "Unfiltered Insights", description: "Direct answers with less corporate restraint" }
      ];

  return (
    <div className="h-full flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <motion.div 
        className="flex flex-col items-center mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div 
          className={cn(
            "p-3 rounded-full mb-4",
            isAtlas 
              ? (isDarkMode ? "bg-blue-600/20" : "bg-blue-100") 
              : (isDarkMode ? "bg-purple-600/20" : "bg-purple-100")
          )}
        >
          {isAtlas 
            ? <Sparkles className={cn("h-6 w-6", isDarkMode ? "text-blue-400" : "text-blue-600")} /> 
            : <Zap className={cn("h-6 w-6", isDarkMode ? "text-purple-400" : "text-purple-600")} />
          }
        </div>
        <h1 className="text-2xl font-bold mb-2">
          {isAtlas ? "Atlas AI Assistant" : "Grok AI"}
        </h1>
        <p className="text-muted-foreground max-w-md">
          {isAtlas 
            ? "Your Trinity Dodge personal assistant, ready to help with all your automotive needs." 
            : "A more opinionated and real-time AI ready to tackle any question with a bit more personality."}
        </p>
      </motion.div>
      
      {/* Example prompts */}
      <motion.div 
        className="grid grid-cols-2 gap-2 mb-8 w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {examplePrompts.map((prompt, i) => (
          <Button
            key={i}
            variant="outline"
            className={cn(
              "justify-start h-auto py-3 px-4 whitespace-normal text-left",
              isAtlas 
                ? (isDarkMode ? "hover:bg-blue-800/20" : "hover:bg-blue-50") 
                : (isDarkMode ? "hover:bg-purple-800/20" : "hover:bg-purple-50")
            )}
            onClick={() => sendMessage(prompt)}
          >
            "{prompt}"
          </Button>
        ))}
      </motion.div>
      
      {/* Features */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {features.map((feature, i) => (
          <div 
            key={i} 
            className={cn(
              "rounded-xl p-4",
              isDarkMode 
                ? "bg-gray-800/50 border border-gray-700" 
                : "bg-gray-100/80 border border-gray-200"
            )}
          >
            <div 
              className={cn(
                "p-2 rounded-full w-fit mb-3",
                isAtlas 
                  ? (isDarkMode ? "bg-blue-900/50 text-blue-400" : "bg-blue-100 text-blue-600") 
                  : (isDarkMode ? "bg-purple-900/50 text-purple-400" : "bg-purple-100 text-purple-600")
              )}
            >
              {feature.icon}
            </div>
            <h3 className="font-medium mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
