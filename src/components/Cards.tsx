import React from 'react';
import { Character } from '../services/Service';
import { GlobalContext } from '../context/useGlobalContext';

interface CardsProps {
  data: { results: Character[] };
  loading: boolean;
  error: string | null;
}

const Cards: React.FC<CardsProps> = ({ data, loading, error }) => {
  const { foundCharacter } = React.useContext(GlobalContext)!;

  return (
    <div className="w-[70%] min-h-[300px] background-primary flex flex-wrap gap-2" id="column2">
      {loading && (
        <div className="flex justify-center items-center w-full h-full">
          <div className="spinner-border text-blue-500 animate-spin" style={{ width: '3rem', height: '3rem' }}></div>
        </div>
      )}
      {error && <p>Error: {error}</p>}
      {data && !loading && (
        <div className="flex flex-wrap w-full justify-center p-3" id="fatherMap">
          {data.results.map((character) => (
            <div
              key={character.id}
              className={`flex flex-col items-center justify-between w-full sm:w-1/2 md:w-1/4 lg:w-1/4 p-1 relative box-border ${
                foundCharacter && character.id === foundCharacter.id ? 'border-4 border-[var(--color-terciary)]' : ''
              }`}
            >
              <img src={character.image} alt={character.name} className="w-24 h-24 object-cover rounded mb-2" />
              <p className="text-center">{character.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;
