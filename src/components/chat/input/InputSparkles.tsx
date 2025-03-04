
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputSparklesProps {
  isFocused: boolean;
  aiMode: 'atlas' | 'grok';
}

const InputSparkles = ({ isFocused, aiMode }: InputSparklesProps) => {
  if (!isFocused) return null;

  return (
    <motion.div 
      className="absolute -inset-1 rounded-lg opacity-20 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <div className={cn(
        "absolute inset-0",
        aiMode === "atlas" 
          ? "bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20"
          : "bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-amber-400/20"
      )} />
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            "absolute h-1 w-1 rounded-full",
            aiMode === "atlas" ? "bg-blue-400" : "bg-purple-400"
          )}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0.7,
            scale: 0.5
          }}
          animate={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: [0.4, 0.8, 0.4],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
};

export default InputSparkles;
