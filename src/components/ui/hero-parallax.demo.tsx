"use client";
import React from "react";
import { HeroParallax } from "./hero-parallax";
import { useNavigate } from "react-router-dom";

export function HeroParallaxDemo() {
  const navigate = useNavigate();
  
  // Create an array of app pages to showcase
  const appPages = [
    {
      title: "Vision Pro",
      link: "/applevisionpro",
      thumbnail: "/lovable-uploads/c9ad08ff-68c3-4635-af88-f133d638efc9.png",
      description: "Experience the future of augmented reality"
    },
    {
      title: "Atlas AI",
      link: "/atlas",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
      description: "Your personal AI assistant"
    },
    {
      title: "Atlas Link",
      link: "/atlaslink",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/editrix.png",
      description: "Seamlessly connect to AI services"
    },
    {
      title: "Chat Room",
      link: "/chatroom",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
      description: "Engage in meaningful conversations"
    },
    {
      title: "Workflows",
      link: "/workflows",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
      description: "Create and manage automation workflows"
    },
    {
      title: "Settings",
      link: "/settings",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
      description: "Configure your application"
    },
    {
      title: "Trinity Dodge",
      link: "/universe",
      thumbnail: "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
      description: "Explore vehicles at Trinity Dodge"
    },
  ];

  // Transform the data structure to match what HeroParallax expects
  const products = appPages.map(page => ({
    title: page.title,
    link: page.link,
    thumbnail: page.thumbnail,
    // Add the onClick handler to navigate to the page instead of opening a new tab
    onClick: () => navigate(page.link),
    description: page.description
  }));

  return (
    <div className="min-h-screen w-full">
      <HeroParallax products={products} />
    </div>
  );
}

export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com", 
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];
