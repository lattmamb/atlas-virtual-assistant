
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

interface IntelCoreProps {
  language: string;
}

interface Alert {
  id?: string;
  message: string;
  created_at: string;
  aiReason?: string;
  action?: string | null;
}

const IntelCore: React.FC<IntelCoreProps> = ({ language }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [systemStatus, setSystemStatus] = useState('Normal');
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  
  if (recognition) {
    recognition.lang = language === 'en' ? 'en-US' : 'es-ES';
  }

  useEffect(() => {
    const fetchAlerts = async () => {
      const { data } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) {
        const enhancedAlerts = data.map((a) => ({
          ...a,
          aiReason: a.message.includes('Anomaly')
            ? 'Potential threat detected'
            : 'System stable',
          action: a.message.includes('Anomaly') ? 'Lockdown' : null,
        }));
        
        setAlerts(enhancedAlerts);
        
        if (enhancedAlerts.some((a) => a.action === 'Lockdown'))
          setSystemStatus('Locked');
      }
    };
    
    fetchAlerts();

    const channel = supabase
      .channel('intel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'alerts' },
        () => fetchAlerts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleAction = (action: string) => {
    setSystemStatus(action === 'Lockdown' ? 'Locked' : 'Normal');
    supabase.from('alerts').insert({
      message: `${action} executed`,
      created_at: new Date().toISOString(),
    });
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
        if (transcript.toLowerCase().includes('scan')) {
          supabase.from('alerts').insert({
            message: 'Manual scan initiated',
            created_at: new Date().toISOString(),
          });
        }
        setIsListening(false);
      };
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <h1 className="p-4 text-2xl">
        {language === 'en' ? 'Intel Core' : 'Núcleo de Inteligencia'}
      </h1>
      <button
        onClick={toggleListening}
        className={`m-4 p-2 rounded ${
          isListening ? 'bg-red-500' : 'bg-cyan-400'
        } text-black`}
      >
        {isListening ? '🎙️ Stop' : '🎙️ Scan'}
      </button>
      <p className="p-4 text-amber-400">
        {language === 'en' ? 'System Status' : 'Estado del Sistema'}:{' '}
        {systemStatus}
      </p>
      {alerts.map((alert, i) => (
        <motion.div
          key={i}
          className="p-4 border-b border-gray-700 text-pink-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>{alert.message}</p>
          <p>
            {language === 'en' ? 'AI Reasoning' : 'Razonamiento de IA'}:{' '}
            {alert.aiReason}
          </p>
          {alert.action && (
            <button
              onClick={() => handleAction(alert.action as string)}
              className="ml-2 p-1 bg-red-500 text-white rounded"
            >
              {alert.action}
            </button>
          )}
          {systemStatus === 'Locked' && (
            <button
              onClick={() => handleAction('Recover')}
              className="ml-2 p-1 bg-cyan-400 text-black rounded"
            >
              {language === 'en' ? 'Recover' : 'Recuperar'}
            </button>
          )}
          <span className="text-sm text-gray-400">
            {new Date(alert.created_at).toLocaleString()}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default IntelCore;
