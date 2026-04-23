import { useContext } from 'react';
import { PersonalizationContext } from '../contexts/PersonalizationContextObject';

export const usePersona = () => {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersona must be used within a PersonalizationProvider');
  }
  return context;
};
