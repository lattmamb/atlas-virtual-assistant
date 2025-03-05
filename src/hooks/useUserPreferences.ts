
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UserPreferences {
  theme: string;
  panelOrder: string[];
  accentColor?: string;
  fontScale?: number;
  enableAnimations?: boolean;
}

const defaultPreferences: UserPreferences = {
  theme: 'ios18',
  panelOrder: ['home', 'vision', 'universe', 'link'],
  accentColor: '#0A84FF',
  fontScale: 1,
  enableAnimations: true
};

export const useUserPreferences = (userId?: string) => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPreferences = async () => {
      if (!userId) {
        // If no user ID, use local storage
        const storedPrefs = localStorage.getItem('atlasUserPreferences');
        if (storedPrefs) {
          try {
            setPreferences(JSON.parse(storedPrefs));
          } catch (e) {
            console.error('Failed to parse stored preferences:', e);
            // Fall back to defaults if parse fails
            setPreferences(defaultPreferences);
          }
        }
        setIsLoading(false);
        return;
      }

      // If user ID exists, try loading from Supabase
      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (error) throw error;

        if (data) {
          setPreferences(data.preferences as UserPreferences);
        } else {
          // User doesn't have preferences yet, use defaults
          setPreferences(defaultPreferences);
        }
      } catch (e) {
        console.error('Error loading preferences:', e);
        setError(e as Error);
        
        // Fall back to defaults
        setPreferences(defaultPreferences);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, [userId]);

  const updatePreferences = async (newPreferences: Partial<UserPreferences>) => {
    const updatedPreferences = { ...preferences, ...newPreferences };
    setPreferences(updatedPreferences);

    // Save to localStorage for all users
    localStorage.setItem('atlasUserPreferences', JSON.stringify(updatedPreferences));

    // If user is logged in, also save to Supabase
    if (userId) {
      try {
        const { error } = await supabase
          .from('user_preferences')
          .upsert({
            user_id: userId,
            preferences: updatedPreferences,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id'
          });

        if (error) throw error;
      } catch (e) {
        console.error('Error saving preferences:', e);
        setError(e as Error);
      }
    }
  };

  return {
    preferences,
    isLoading,
    error,
    updatePreferences
  };
};
