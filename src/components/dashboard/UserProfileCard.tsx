
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface UserProfileCardProps {
  name: string;
  email: string;
  subscription: string;
  avatarUrl: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  email,
  subscription,
  avatarUrl
}) => {
  return (
    <motion.div 
      className={cn(
        "backdrop-blur-2xl rounded-3xl p-8",
        "bg-white/10 border border-white/20",
        "shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="relative h-24 w-24 mx-auto mb-6"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl animate-pulse" />
        <img 
          src={avatarUrl} 
          alt={name} 
          className="h-full w-full rounded-full object-cover border-2 border-white/20 relative z-10"
        />
      </motion.div>
      
      <div className="text-center">
        <motion.h2 
          className="text-3xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {name}
        </motion.h2>
        
        <motion.p 
          className="text-white/60 text-sm mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {email}
        </motion.p>
        
        <motion.div 
          className="mt-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white/90 text-sm inline-block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          {subscription}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserProfileCard;
