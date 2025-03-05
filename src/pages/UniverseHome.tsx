
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import ExploreHeroParallax from '@/components/explore/ExploreHeroParallax';
import CardGrid from '@/components/explore/CardGrid';
import Footer from '@/components/explore/Footer';

const UniverseHome: React.FC = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setTimeout(() => {
      toast.success("Welcome to Atlas Explore", {
        description: "Discover all the integrated Atlas applications",
        icon: <Sparkles className="h-5 w-5" />,
        duration: 5000,
      });
    }, 1500);
  }, []);

  // Define the cards for our application
  const cards = [
    {
      title: "Vision",
      description: "Your intelligent assistant for mobility and beyond.",
      icon: "Eye",
      link: "/applevisionpro", // Using existing route
      background: "glassmorphism with cyan glow"
    },
    {
      title: "Universe",
      description: "Manage your entire Atlas ecosystem.",
      icon: "Globe",
      link: "/universe",
      background: "glassmorphism with magenta glow"
    },
    {
      title: "Link",
      description: "Control and sync your Atlas Link Bracelet.",
      icon: "Link2",
      link: "/atlaslink", // Using existing route
      background: "glassmorphism with orange glow"
    },
    {
      title: "Trinity Dodge",
      description: "Explore premium vehicle offerings in Taylorville.",
      icon: "Car",
      link: "/trinity", // This would need to be created
      background: "glassmorphism with red glow"
    }
  ];

  // Define footer links
  const footerLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" }
  ];

  return (
    <div 
      className={cn(
        "min-h-screen w-full overflow-x-hidden",
        isDarkMode ? "text-white" : "text-gray-900"
      )}
    >
      <main>
        {/* Hero Section with Parallax */}
        <ExploreHeroParallax
          title="Welcome to Atlas Explore"
          subtitle="Seamlessly navigate through Vision, Universe, Link, and Trinity Dodge."
          background="dynamic gradient with glowing particles"
          parallaxStrength={30}
        />
        
        {/* Card Grid Section */}
        <section className="py-20">
          <CardGrid
            columns={2}
            gap="6"
            padding="8"
            cards={cards}
          />
        </section>
        
        {/* Footer */}
        <Footer
          text="Atlas Intelligence LLC © 2025"
          background="transparent with soft blur"
          links={footerLinks}
        />
      </main>
    </div>
  );
};

export default UniverseHome;
