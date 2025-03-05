
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

interface SpacesProps {
  language: string;
}

interface Space {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

interface EventMessage {
  id?: string;
  space_id: string;
  text: string;
  created_at: string;
}

const Spaces: React.FC<SpacesProps> = ({ language }) => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [eventMessages, setEventMessages] = useState<EventMessage[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  
  if (recognition) {
    recognition.lang = language === 'en' ? 'en-US' : 'es-ES';
  }

  useEffect(() => {
    const fetchSpaces = async () => {
      const { data } = await supabase.from('spaces').select('*');
      if (data) {
        setSpaces(data);
      }
    };
    
    fetchSpaces();

    const channel = supabase
      .channel('spaces')
      .on(
        'postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'spaces' }, 
        (payload) => setSpaces((prev) => [...prev, payload.new as Space])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const startEvent = async (spaceId: string) => {
    setSelectedSpace(spaceId);
    
    const { data } = await supabase
      .from('event_messages')
      .select('*')
      .eq('space_id', spaceId);
    
    if (data) {
      setEventMessages(data);
    }
    
    supabase
      .channel(`space-${spaceId}`)
      .on(
        'postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'event_messages' }, 
        (payload) => setEventMessages((prev) => [...prev, payload.new as EventMessage])
      )
      .subscribe();
  };

  const sendEventMessage = async (text = input) => {
    if (!text || !selectedSpace) return;
    
    await supabase.from('event_messages').insert({
      space_id: selectedSpace,
      text,
      created_at: new Date().toISOString(),
    });
    
    setInput('');
    
    const recap = eventMessages.map((m) => m.text).join(' | ');
    console.log(`Recap for Space ${selectedSpace}: ${recap}`);
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
        sendEventMessage(transcript);
        setIsListening(false);
      };
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <h1 className="p-4 text-2xl">
        {language === 'en' ? 'Spaces' : 'Espacios'}
      </h1>
      {!selectedSpace ? (
        spaces.map((space) => (
          <motion.div key={space.id} className="p-4 border-b border-gray-700">
            <p>{space.name}</p>
            <button
              onClick={() => startEvent(space.id)}
              className="ml-2 p-1 bg-cyan-400 text-black rounded"
            >
              {language === 'en' ? 'Start Event' : 'Iniciar Evento'}
            </button>
          </motion.div>
        ))
      ) : (
        <div>
          <button
            onClick={() => setSelectedSpace(null)}
            className="m-4 p-2 bg-gray-700 rounded"
          >
            {language === 'en' ? 'Back' : 'Volver'}
          </button>
          <button
            onClick={toggleListening}
            className={`m-4 p-2 rounded ${
              isListening ? 'bg-red-500' : 'bg-cyan-400'
            } text-black`}
          >
            {isListening ? '🎙️ Stop' : '🎙️ Chat'}
          </button>
          <motion.div className="flex-1 overflow-y-auto p-4">
            {eventMessages.map((msg, i) => (
              <p key={i}>{msg.text}</p>
            ))}
          </motion.div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendEventMessage()}
            className="w-full p-2 bg-gray-900 border-cyan-400 border rounded"
            placeholder={
              language === 'en'
                ? 'Chat in event...'
                : 'Chatea en el evento...'
            }
          />
        </div>
      )}
    </div>
  );
};

export default Spaces;
