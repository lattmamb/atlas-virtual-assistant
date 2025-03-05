
import React from "react";
import { useLocation } from "react-router-dom";
import { SparklesCore } from "@/components/ui/sparkles";

const pageTitles: Record<string, string> = {
  "/": "Atlas",
  "/atlas": "Atlas Universe",
  "/chatroom": "Chat",
  "/workflows": "Workflows",
  "/settings": "Settings",
  "/applevisionpro": "Vision Pro",
  "/atlaslink": "Atlas Link",
  // Add more routes as needed
};

export function SparklesLoader() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Atlas";

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center overflow-hidden relative bg-black">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        {title}
      </h1>
      <div className="w-[40rem] h-40 relative">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
