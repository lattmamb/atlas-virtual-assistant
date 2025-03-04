
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 10,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isActive = active === item;

  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        className={cn(
          "cursor-pointer text-black dark:text-white hover:opacity-[0.9] px-4 py-2 text-center",
          isActive && "text-blue-500 dark:text-blue-400"
        )}
      >
        {item}
      </motion.p>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.95 }}
          animate={{ opacity: 1, y: 5, scale: 1 }}
          transition={transition}
          className={cn(
            "absolute top-full left-1/2 transform -translate-x-1/2 pt-4 w-[16rem] lg:w-[25rem]",
            item === "Products" && "w-[40rem]"
          )}
        >
          <div
            className="bg-white dark:bg-gray-950 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl shadow-black/10 dark:shadow-white/5 border border-neutral-200 dark:border-neutral-800"
            ref={ref}
          >
            {children}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full bg-white border border-neutral-200 dark:border-neutral-800 dark:bg-gray-950 backdrop-blur-lg dark:backdrop-blur-md shadow-lg p-2 flex justify-center space-x-4 w-full max-w-fit mx-auto"
    >
      {children}
    </nav>
  );
};

export const HoveredLink = ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => {
  return (
    <Link
      to={href}
      className={cn(
        "text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white py-2 px-3 rounded-lg transition-colors duration-300",
        className
      )}
    >
      {children}
    </Link>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link to={href} className="flex items-start space-x-2 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
      <img
        src={src}
        alt={title}
        width={140}
        height={70}
        className="flex-shrink-0 rounded-md object-cover"
      />
      <div>
        <h4 className="text-sm font-semibold text-black dark:text-white">{title}</h4>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{description}</p>
      </div>
    </Link>
  );
};
