import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Character } from 'models/Interfaces';

interface GlobalContextType {
  cache: Record<string, any>;
  setCache: (url: string, data: any) => void;
  foundCharacter: Character | null | undefined;
  setFoundCharacter: (character: Character | null | undefined) => void;
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext debe ser usado dentro de un GlobalProvider');
  }
  return context;
};

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [cache, setCache] = useState<Record<string, any>>({});
  const [foundCharacter, setFoundCharacter] = useState<Character | null | undefined>(null);

  const updateCache = (url: string, data: any) => {
    setCache((prevCache) => ({
      ...prevCache,
      [url]: data,
    }));
  };

  return (
    <GlobalContext.Provider
      value={{
        cache,
        setCache: updateCache,
        foundCharacter,
        setFoundCharacter,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider };
