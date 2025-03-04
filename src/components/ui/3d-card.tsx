
"use client";

import React, {
  createContext,
  useState,
  useRef,
  useContext,
  useEffect,
} from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

interface CardContextProps {
  mouseX: React.MutableRefObject<number | null>;
  mouseY: React.MutableRefObject<number | null>;
}

const CardContext = createContext<CardContextProps | null>(null);

export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className,
  containerClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef<number | null>(null);
  const mouseY = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.current = e.clientX - left;
    mouseY.current = e.clientY - top;
  };

  const resetMousePosition = () => {
    mouseX.current = null;
    mouseY.current = null;
  };

  return (
    <CardContext.Provider value={{ mouseX, mouseY }}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetMousePosition}
          className={cn("relative", className)}
        >
          {children}
        </div>
      </div>
    </CardContext.Provider>
  );
};

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className,
}) => {
  const context = useContext(CardContext);
  
  if (!context) {
    throw new Error("CardBody must be used within a CardContainer");
  }
  
  const { mouseX, mouseY } = context;
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springConfig = { stiffness: 100, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  useEffect(() => {
    const handleMouseMove = () => {
      if (mouseX.current === null || mouseY.current === null) {
        rotateX.set(0);
        rotateY.set(0);
        return;
      }

      const element = document.querySelector(".card-body") as HTMLElement;
      if (!element) return;

      const elementRect = element.getBoundingClientRect();
      const elementCenterX = elementRect.width / 2;
      const elementCenterY = elementRect.height / 2;

      const rotateYValue = ((mouseX.current - elementCenterX) / elementCenterX) * 10;
      const rotateXValue = ((mouseY.current - elementCenterY) / elementCenterY) * -10;

      rotateY.set(rotateYValue);
      rotateX.set(rotateXValue);
    };

    const interval = setInterval(handleMouseMove, 10);
    return () => clearInterval(interval);
  }, [mouseX, mouseY, rotateX, rotateY]);

  return (
    <motion.div
      className={cn("card-body", className)}
      style={{
        transformStyle: "preserve-3d",
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
      }}
    >
      {children}
    </motion.div>
  );
};

interface CardItemProps {
  children: React.ReactNode;
  className?: string;
  translateX?: number;
  translateY?: number;
  translateZ?: number | string;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  as?: React.ElementType;
}

export const CardItem: React.FC<CardItemProps> = ({
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  as: Component = "div",
}) => {
  const transformValue = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;

  return (
    <Component
      className={cn("", className)}
      style={{
        transform: transformValue,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </Component>
  );
};
