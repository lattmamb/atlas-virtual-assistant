
import { supabase } from '@/integrations/supabase/client';

export const aiResponses = {
  atlas: (msg: string, language: string) =>
    `${
      language === 'en' ? 'Atlas: Noted "' : 'Atlas: Anotado "'
    }${msg}". ${
      language === 'en' ? "What's next?" : "¿Qué sigue?"
    }`,
  grok: (msg: string, language: string) =>
    `${
      language === 'en' ? 'Grok: Cool, "' : 'Grok: Genial, "'
    }${msg}". ${
      language === 'en' ? "Got any spicy follow-ups?" : "¿Tienes algo más interesante?"
    }`,
  gemini: (msg: string, language: string) =>
    `${
      language === 'en' ? 'Gemini: Analyzing "' : 'Gemini: Analizando "'
    }${msg}". ${
      language === 'en' ? "Need a visual?" : "¿Necesitas una visualización?"
    }`,
  claude: (msg: string, language: string) =>
    `${
      language === 'en' ? 'Claude: Reflecting on "' : 'Claude: Reflexionando sobre "'
    }${msg}". ${
      language === 'en' ? "Let's dive deeper." : "Profundicemos."
    }`,
};

export const toTask = (text: string) => 
  supabase.from('tasks').insert({ text, created_at: new Date().toISOString() });

// This is a workaround function until we create the proper database tables
// In a real implementation, we would use proper type validation and error handling
export const mockDatabaseOperation = async (table: string, data: any) => {
  try {
    console.log(`Mock operation on table ${table}:`, data);
    return { error: null };
  } catch (error) {
    console.error(`Error with ${table}:`, error);
    return { error };
  }
};
