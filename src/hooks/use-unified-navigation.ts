
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export type SectionId = 
  | 'vision' 
  | 'features' 
  | 'parallax' 
  | 'pricing' 
  | 'chat' 
  | 'atlas' 
  | 'workflow' 
  | 'settings';

const sectionIndices: Record<SectionId, number> = {
  vision: 0,
  features: 1,
  parallax: 2,
  pricing: 3,
  chat: 4,
  atlas: 5,
  workflow: 6,
  settings: 7
};

export const useUnifiedNavigation = () => {
  const navigate = useNavigate();

  const goToSection = useCallback((sectionId: SectionId) => {
    // Store the section index in localStorage
    localStorage.setItem('unifiedCurrentSection', String(sectionIndices[sectionId]));
    
    // Navigate to home if not already there
    navigate('/', { state: { sectionId } });
    
    toast.info(`Navigating to ${sectionId}`);
  }, [navigate]);

  return { goToSection };
};

export default useUnifiedNavigation;
