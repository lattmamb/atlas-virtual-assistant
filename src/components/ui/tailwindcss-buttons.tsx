
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonsCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ButtonsCard = ({
  children,
  onClick,
  className,
}: ButtonsCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "flex items-center justify-center p-10 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/40 shadow-md hover:shadow-xl transition-all duration-300",
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
