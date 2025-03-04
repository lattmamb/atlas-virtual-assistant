
"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  borderRadius?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Button = ({
  borderRadius = "1.75rem",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <div
      className="relative group"
      style={{
        borderRadius: borderRadius,
      }}
    >
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"
        style={{
          borderRadius: `calc(${borderRadius} * 1.2)`,
        }}
      />
      <button
        className={cn(
          "relative px-8 py-4 bg-white dark:bg-slate-900 rounded-xl leading-none flex items-center justify-center border border-transparent dark:border-slate-800",
          className
        )}
        style={{
          borderRadius: borderRadius,
        }}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export const MovingBorder = ({
  borderRadius = "1.75rem",
  className,
  children,
  as: Component = "div",
  ...props
}: {
  borderRadius?: string;
  className?: string;
  children: React.ReactNode;
  as?: any;
}) => {
  return (
    <Component className="relative group" {...props}>
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
        animate={{
          background: [
            "linear-gradient(to right, rgb(59, 130, 246), rgb(37, 99, 235))",
            "linear-gradient(to right, rgb(139, 92, 246), rgb(76, 29, 149))",
            "linear-gradient(to right, rgb(236, 72, 153), rgb(157, 23, 77))",
            "linear-gradient(to right, rgb(248, 113, 113), rgb(220, 38, 38))",
            "linear-gradient(to right, rgb(132, 204, 22), rgb(77, 124, 15))",
            "linear-gradient(to right, rgb(59, 130, 246), rgb(37, 99, 235))",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{
          borderRadius: `calc(${borderRadius} * 1.2)`,
        }}
      />
      <div
        className={cn(
          "relative px-8 py-6 bg-white dark:bg-slate-900 rounded-xl border border-transparent dark:border-slate-800",
          className
        )}
        style={{
          borderRadius: borderRadius,
        }}
      >
        {children}
      </div>
    </Component>
  );
};
