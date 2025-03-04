
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MovingBorderDemo } from "./moving-border-demo";
import { StarBorder } from "./starBorder";

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

export function TailwindcssButtons() {
  return (
    <div className="py-10">
      <StarBorder highlighted>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Tailwind CSS Buttons</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of beautiful button components with different styles and animations.
          </p>
        </div>
      </StarBorder>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div className="col-span-1 md:col-span-2">
          <MovingBorderDemo />
        </div>
      </div>
    </div>
  );
}
