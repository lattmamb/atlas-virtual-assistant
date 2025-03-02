
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RainbowButtonProps extends ButtonProps {
  subtle?: boolean;
}

const RainbowButton: React.FC<RainbowButtonProps> = ({
  children,
  className,
  subtle = false,
  ...props
}) => {
  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {!subtle && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-md blur opacity-50 group-hover:opacity-75 transition duration-200 animate-gradient-x" />
      )}
      <Button
        className={cn(
          subtle 
            ? "bg-gradient-to-r from-blue-500/90 via-blue-600/90 to-blue-500/90 hover:from-blue-500 hover:via-blue-600 hover:to-blue-500 text-white border-none"
            : "relative border-none bg-background text-foreground hover:bg-background/90",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default RainbowButton;
