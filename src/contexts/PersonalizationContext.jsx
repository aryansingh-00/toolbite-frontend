import React, { useState } from 'react';
import { PersonalizationContext } from './PersonalizationContextObject';

export const PersonalizationProvider = ({ children }) => {
  const [persona, setPersona] = useState(() => {
    return localStorage.getItem('toolbite_persona') || 'default';
  });

  const updatePersona = (newPersona) => {
    setPersona(newPersona);
    localStorage.setItem('toolbite_persona', newPersona);
  };

  return (
    <PersonalizationContext.Provider value={{ persona, updatePersona }}>
      {children}
    </PersonalizationContext.Provider>
  );
};
