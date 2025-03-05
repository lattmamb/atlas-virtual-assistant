
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

interface FleetCommandProps {
  language: string;
}

interface Vehicle {
  id: string;
  name: string;
  lat: number;
  lon: number;
  status: string;
  updated_at: string;
  aiSuggestion?: string;
}

const FleetCommand: React.FC<FleetCommandProps> = ({ language }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  
  if (recognition) {
    recognition.lang = language === 'en' ? 'en-US' : 'es-ES';
  }

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data } = await supabase.from('fleet').select('*');
      
      if (data) {
        setVehicles(
          data.map((v) => ({
            ...v,
            aiSuggestion:
              v.status === 'Idle'
                ? `Dispatch to (${(Math.random() * 100).toFixed(
                    2
                  )}, ${(Math.random() * 100).toFixed(2)})`
                : 'Optimal',
          }))
        );
      }
    };
    
    fetchVehicles();

    const channel = supabase
      .channel('fleet')
      .on(
        'postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'fleet' }, 
        () => fetchVehicles()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const dispatchVehicle = async (vehicleId: string, suggestion: string) => {
    const coords = suggestion.match(/[\d.]+/g);
    if (coords && coords.length >= 2) {
      const [lat, lon] = coords;
      await supabase
        .from('fleet')
        .update({ lat: parseFloat(lat), lon: parseFloat(lon), status: 'Active' })
        .eq('id', vehicleId);
    }
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
        if (transcript.toLowerCase().startsWith('status')) {
          const vehicleName = transcript.slice(7).trim();
          console.log(`Checking status for ${vehicleName}`);
        }
        setIsListening(false);
      };
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <h1 className="p-4 text-2xl">
        {language === 'en' ? 'Fleet Command' : 'Comando de Flota'}
      </h1>
      <button
        onClick={toggleListening}
        className={`m-4 p-2 rounded ${
          isListening ? 'bg-red-500' : 'bg-cyan-400'
        } text-black`}
      >
        {isListening ? '🎙️ Stop' : '🎙️ Status'}
      </button>
      {vehicles.map((vehicle) => (
        <motion.div key={vehicle.id} className="p-4 border-b border-gray-700">
          <p>
            {language === 'en' ? 'Vehicle' : 'Vehículo'}: {vehicle.name}
          </p>
          <p>
            {language === 'en' ? 'Location' : 'Ubicación'}: {vehicle.lat},{' '}
            {vehicle.lon}
          </p>
          <p>
            {language === 'en' ? 'Status' : 'Estado'}: {vehicle.status}
          </p>
          <p className="text-pink-500">
            {language === 'en' ? 'AI Suggestion' : 'Sugerencia de IA'}:{' '}
            {vehicle.aiSuggestion}
          </p>
          {vehicle.status === 'Idle' && vehicle.aiSuggestion && (
            <button
              onClick={() => dispatchVehicle(vehicle.id, vehicle.aiSuggestion)}
              className="ml-2 p-1 bg-cyan-400 text-black rounded"
            >
              {language === 'en' ? 'Dispatch' : 'Despachar'}
            </button>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FleetCommand;
