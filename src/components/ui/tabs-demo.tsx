
import React from "react";
import { Tabs } from "./tabs-custom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { StarBorder } from "./starBorder";

interface DummyContentProps {
  imagePath?: string;
  className?: string;
}

const DummyContent: React.FC<DummyContentProps> = ({ 
  imagePath = "/placeholder.svg", 
  className 
}) => {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <motion.img
        src={imagePath}
        alt="demo content"
        className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </div>
  );
};

export function TabsDemo() {
  const tabs = [
    {
      title: "Product",
      value: "product",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Product Tab</p>
          <DummyContent imagePath="/placeholder.svg" />
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-600 to-indigo-800">
          <p>Services tab</p>
          <DummyContent imagePath="/placeholder.svg" />
        </div>
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-teal-600 to-emerald-800">
          <p>Playground tab</p>
          <DummyContent imagePath="/placeholder.svg" />
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-pink-600 to-rose-800">
          <p>Content tab</p>
          <DummyContent imagePath="/placeholder.svg" />
        </div>
      ),
    },
    {
      title: "Trinity",
      value: "trinity",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-600 to-blue-800">
          <p>Trinity Dodge</p>
          <DummyContent imagePath="/placeholder.svg" />
        </div>
      ),
    },
  ];

  return (
    <StarBorder highlighted>
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-10 md:my-20 p-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-6 text-center w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Interactive Tabs
        </motion.h2>
        <Tabs tabs={tabs} />
      </div>
    </StarBorder>
  );
}
