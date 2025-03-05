
import React from 'react';
import { motion } from 'framer-motion';
import { MessageListProps } from '../types/pulse-types';

const MessageList: React.FC<MessageListProps> = ({ messages, toTask, language }) => {
  return (
    <motion.div
      className="flex-1 overflow-y-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          className={`mb-2 p-2 ${
            msg.sender === 'user' ? 'text-right' : 'text-left'
          }`}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, { offset }) =>
            offset.x < -100 &&
            console.log('Message deleted:', msg.text)
          }
          role="listitem"
          aria-label={msg.text}
        >
          <span className="bg-pink-500 p-2 rounded">{msg.text}</span>
          {msg.sender === 'user' && (
            <button
              onClick={() => toTask(msg.text)}
              className="ml-2 p-1 bg-cyan-400 text-black rounded"
              aria-label="Convert to Task"
            >
              ➡️ Task
            </button>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MessageList;
