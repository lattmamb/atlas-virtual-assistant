
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Clock, MoreHorizontal, Plus, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Reminder {
  id: string;
  title: string;
  date: string;
  category: string;
  completed: boolean;
}

interface RemindersWidgetProps {
  title: string;
  subtitle: string;
  reminders: Reminder[];
}

const RemindersWidget: React.FC<RemindersWidgetProps> = ({
  title,
  subtitle,
  reminders
}) => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-gray-800/50 border-b border-white/10">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-xl mr-3 relative overflow-hidden">
            <div className="absolute left-0 top-1/4 w-full h-1 bg-blue-500"></div>
            <div className="absolute left-0 top-2/4 w-full h-1 bg-red-500"></div>
            <div className="absolute left-0 top-3/4 w-full h-1 bg-orange-500"></div>
            <Clock className="h-5 w-5 text-white absolute" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{title}</h3>
            <p className="text-gray-300 text-xs">{subtitle}</p>
          </div>
        </div>
        
        <button
          onClick={() => navigate('/reminders')}
          className="text-blue-400 hover:bg-white/10 p-1.5 rounded-full transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      
      {/* Reminders list */}
      <div className="divide-y divide-white/10">
        {reminders.map((reminder) => (
          <div 
            key={reminder.id}
            className="p-4 hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => navigate(`/reminders/${reminder.id}`)}
          >
            <div className="flex items-start">
              <Circle className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-white font-medium">{reminder.title}</h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-gray-400 text-xs">{reminder.date}</span>
                  <span className="text-gray-500 text-xs">• {reminder.category}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="p-3 flex justify-center border-t border-white/10">
        <button className="text-gray-400 hover:text-gray-300">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default RemindersWidget;
