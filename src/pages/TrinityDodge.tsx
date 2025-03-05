
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrinityDodge: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0505] to-[#2a0808] text-white">
      <header className="p-4 flex items-center">
        <Link to="/">
          <motion.div 
            className="flex items-center text-white/70 hover:text-white"
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            <span>Back to Explore</span>
          </motion.div>
        </Link>
      </header>
      
      <main className="container mx-auto px-4 py-16 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Trinity Dodge
        </motion.h1>
        
        <motion.p
          className="text-xl max-w-2xl mx-auto mb-10 text-white/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore premium vehicle offerings in Taylorville, Illinois. Trinity Dodge offers the latest models with exceptional service.
        </motion.p>
        
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-2xl font-semibold mb-4">Coming Soon</p>
          <p className="text-white/60">Our vehicle showcase is under construction.</p>
        </motion.div>
      </main>
    </div>
  );
};

export default TrinityDodge;
