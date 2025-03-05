
import React from 'react';
import { ChatInputProps } from '../types/pulse-types';

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  sendMessage,
  isListening,
  toggleListening,
  language
}) => {
  return (
    <div className="p-4 flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
        className="flex-1 p-2 bg-gray-900 border-cyan-400 border rounded"
        placeholder={
          language === 'en' ? 'Talk to your AI...' : 'Habla con tu IA...'
        }
        aria-label="Chat Input"
      />
      <button
        onClick={toggleListening}
        className={`p-2 rounded ${
          isListening ? 'bg-red-500' : 'bg-cyan-400'
        } text-black`}
      >
        {isListening ? '🎙️ Stop' : '🎙️ Speak'}
      </button>
    </div>
  );
};

export default ChatInput;
