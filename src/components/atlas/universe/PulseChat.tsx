
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PulseChatProps, Message } from './types/pulse-types';
import { aiResponses, toTask, mockDatabaseOperation } from './utils/pulse-utils';
import AISelector from './components/AISelector';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';

const PulseChat: React.FC<PulseChatProps> = ({ language, atxBalance, setAtxBalance }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [activeAI, setActiveAI] = useState('atlas');
  const [isListening, setIsListening] = useState(false);

  // Initialize speech recognition if available
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  
  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === 'en' ? 'en-US' : 'es-ES';
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Using mock function until database tables are properly set up
        console.log('Fetching messages...');
        // In real implementation, this would be:
        // const { data } = await supabase.from('messages').select('*').order('created_at');
        // setMessages(data || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    
    fetchMessages();

    const channel = supabase
      .channel('pulse')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
          
          // Auto-convert relevant user messages into tasks
          if (payload.new.sender === 'user') {
            const lowerText = payload.new.text.toLowerCase();
            if (['do', 'task', 'check'].some((kw) => lowerText.includes(kw))) {
              mockDatabaseOperation('tasks', {
                text: payload.new.text,
                created_at: new Date().toISOString(),
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendMessage = async (text: string) => {
    if (!text) return;
    
    const userMessage: Message = {
      text,
      sender: 'user',
      created_at: new Date().toISOString(),
    };
    
    // Add message to UI immediately for better UX
    setMessages(prev => [...prev, userMessage]);
    
    // Using mock function until database tables are properly set up
    await mockDatabaseOperation('messages', userMessage);
    setInput('');

    // Condition-based logic
    const lowerText = text.toLowerCase();
    if (lowerText.startsWith('post ')) {
      // Insert into Agora
      await mockDatabaseOperation('posts', { 
        text: text.slice(5), 
        created_at: new Date().toISOString() 
      });
    } else if (lowerText.startsWith('track ')) {
      // Update Fleet
      await mockDatabaseOperation('fleet', { 
        status: 'Tracking', 
        name: text.slice(6) 
      });
    } else if (lowerText.startsWith('add ')) {
      // Mindstream idea
      await mockDatabaseOperation('ideas', { 
        text: text.slice(4), 
        created_at: new Date().toISOString() 
      });
    }

    // AI response
    const aiResponse: Message = {
      text: aiResponses[activeAI as keyof typeof aiResponses](text, language),
      sender: activeAI,
      created_at: new Date().toISOString(),
    };
    
    // Add AI response to UI immediately for better UX
    setTimeout(() => setMessages(prev => [...prev, aiResponse]), 1000);
    
    // In real implementation, this would be:
    // setTimeout(() => supabase.from('messages').insert(aiResponse), 1000);
  };

  const toggleListening = () => {
    if (!recognition) {
      alert(
        language === 'en'
          ? 'Speech recognition not supported.'
          : 'Reconocimiento de voz no soportado.'
      );
      return;
    }
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        sendMessage(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => setIsListening(false);
    };
  };

  return (
    <div className="h-full flex flex-col">
      <h1 className="p-4 text-2xl">
        {language === 'en' ? 'Pulse' : 'Pulso'}
      </h1>
      
      {/* AI Switch Buttons */}
      <AISelector 
        activeAI={activeAI}
        setActiveAI={setActiveAI}
        language={language}
        atxBalance={atxBalance}
        setAtxBalance={setAtxBalance}
      />
      
      {/* Chat Messages */}
      <MessageList 
        messages={messages}
        toTask={toTask}
        language={language}
      />
      
      {/* Input Area */}
      <ChatInput 
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        isListening={isListening}
        toggleListening={toggleListening}
        language={language}
      />
    </div>
  );
};

export default PulseChat;
