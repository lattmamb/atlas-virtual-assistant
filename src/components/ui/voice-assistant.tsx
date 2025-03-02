
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Mic, X } from "lucide-react";
import { triggerHaptic } from "@/lib/utils-haptic";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const { isDarkMode } = useTheme();
  
  // Simulated speech recognition (since the real API might not be available)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isListening) {
      timer = setTimeout(() => {
        setTranscript("Atlas, open the settings panel");
        handleCommand("Atlas, open the settings panel");
      }, 3000);
    }
    
    return () => clearTimeout(timer);
  }, [isListening]);

  const handleCommand = (command: string) => {
    if (command.toLowerCase().includes("atlas")) {
      // Speak confirmation
      speak(`Processing command: ${command.replace("Atlas", "")}`);
      
      if (command.toLowerCase().includes("open")) {
        if (command.toLowerCase().includes("settings")) {
          toast.info("Opening settings panel", {
            description: "Voice command recognized",
          });
        } else if (command.toLowerCase().includes("chat")) {
          toast.info("Opening chat panel", {
            description: "Voice command recognized",
          });
        }
      } else if (command.toLowerCase().includes("toggle theme")) {
        toast.info("Toggling theme", {
          description: "Voice command recognized",
        });
      } else {
        toast.info(`Command received: ${command.replace("Atlas", "")}`, {
          description: "I'm not sure how to process this yet",
        });
      }
    }
    
    setTranscript("");
    setIsListening(false);
  };

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.log("Speech synthesis not supported", e);
      }
    }
  };

  const startListening = () => {
    triggerHaptic();
    setIsListening(true);
    toast.info("Listening...", {
      description: "Say a command starting with 'Atlas'",
    });
  };

  const stopListening = () => {
    triggerHaptic([50, 30, 50]);
    setIsListening(false);
    setTranscript("");
  };

  return (
    <motion.button
      onClick={isListening ? stopListening : startListening}
      className={cn(
        "fixed bottom-24 right-4 z-50 w-12 h-12 rounded-full text-white shadow-lg transition-all duration-300",
        isListening 
          ? "bg-red-500 hover:bg-red-600" 
          : "bg-blue-500 hover:bg-blue-600",
        isDarkMode 
          ? "shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
          : "shadow-[0_0_15px_rgba(59,130,246,0.3)]"
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isListening ? "Stop listening" : "Start voice command"}
    >
      {isListening ? (
        <X className="w-5 h-5 m-auto" />
      ) : (
        <Mic className="w-5 h-5 m-auto" />
      )}
    </motion.button>
  );
}
