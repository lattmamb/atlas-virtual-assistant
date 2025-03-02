
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  sendMessage: (content: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ sendMessage }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 text-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium">Welcome to Atlas Assistant</h3>
        <p className="text-sm text-muted-foreground max-w-sm mt-2">
          Ask me about Trinity Dodge in Taylorville, Illinois, or chat about anything you'd like to know.
        </p>
      </motion.div>
      
      <motion.div 
        className="mt-6 flex flex-wrap gap-2 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {[
          "Tell me about the 2025 Dodge Ram",
          "What deals do you have?",
          "Schedule a test drive",
          "Show me your inventory"
        ].map((suggestion, i) => (
          <Button 
            key={i} 
            variant="outline" 
            size="sm" 
            className="text-sm"
            onClick={() => sendMessage(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
