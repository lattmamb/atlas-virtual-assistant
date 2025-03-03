
import React from 'react';
import { motion } from 'framer-motion';

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
      className="bg-blue-950/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-white/20 mb-4">
        <img 
          src={avatarUrl} 
          alt={name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <h2 className="text-white text-3xl font-semibold mb-1">{name}</h2>
      <p className="text-gray-300 text-sm mb-2">{email}</p>
      <div className="text-blue-300 font-medium">{subscription}</div>
    </motion.div>
  );
};

export default UserProfileCard;
