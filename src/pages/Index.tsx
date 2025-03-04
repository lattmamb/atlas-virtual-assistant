
import React from 'react';
import HeaderSection from '@/components/HeaderSection';
import { ThreeDCardDemo } from '@/components/ThreeDCardDemo';
import { MenuBarDemo } from '@/components/ui/glow-menu-demo';
import { AnimatedPinDemo } from '@/components/AnimatedPinDemo';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeaderSection />
      
      <div className="grid grid-cols-1 gap-8 mt-10">
        <section className="p-6 rounded-xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Interactive Component Demos</h2>
          
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4">3D Card Component</h3>
            <ThreeDCardDemo />
          </div>
          
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4">Glowing Menu Navigation</h3>
            <div className="flex justify-center">
              <MenuBarDemo />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">3D Pinned Card Demo</h3>
            <AnimatedPinDemo />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
