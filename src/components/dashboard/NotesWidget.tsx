
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FileText, MoreHorizontal, PenSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Note {
  id: string;
  title: string;
  date: string;
  description: string;
}

interface NotesWidgetProps {
  title: string;
  subtitle: string;
  notes: Note[];
}

const NotesWidget: React.FC<NotesWidgetProps> = ({
  title,
  subtitle,
  notes
}) => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-gray-800/50 border-b border-white/10">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center bg-yellow-500 rounded-xl mr-3">
            <FileText className="h-5 w-5 text-black" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{title}</h3>
            <p className="text-yellow-300 text-xs">{subtitle}</p>
          </div>
        </div>
        
        <button
          onClick={() => navigate('/notes')}
          className="text-yellow-400 hover:bg-white/10 p-1.5 rounded-full transition-colors"
        >
          <PenSquare className="h-5 w-5" />
        </button>
      </div>
      
      {/* Notes list */}
      <div className="divide-y divide-white/10">
        {notes.map((note) => (
          <div 
            key={note.id}
            className="p-4 hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => navigate(`/notes/${note.id}`)}
          >
            <h4 className="text-white font-medium">{note.title}</h4>
            <div className="flex items-center justify-between mt-1">
              <span className="text-gray-400 text-xs">{note.date}</span>
              <span className="text-gray-500 text-xs">{note.description}</span>
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

export default NotesWidget;
