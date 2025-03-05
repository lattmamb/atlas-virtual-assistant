
import React from 'react';
import { useAtlasLink } from './AtlasLinkContext';

const CelestialEffect: React.FC = () => {
  const { celestialMode } = useAtlasLink();
  
  // Return null regardless of mode - backgrounds removed
  return null;
};

export default CelestialEffect;
