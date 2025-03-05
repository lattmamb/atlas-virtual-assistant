
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
      try {
        // First, try to load from local storage regardless of user status
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

        // If user is logged in, we could fetch additional prefs from an existing table
        // like custom_instructions, but for now we'll just use local storage
        // This code can be expanded later when we create proper user_preferences table
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

    // Note: In the future, when we create a user_preferences table in Supabase,
    // we can add code here to sync with the database for logged-in users
  };

  return {
    preferences,
    isLoading,
    error,
    updatePreferences
  };
};
