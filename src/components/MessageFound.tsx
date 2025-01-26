import React from 'react';
import { Character } from '../models/interfaces';

interface MessageFoundProps {
  foundCharacter: Character | null | undefined;
}

const MessageFound: React.FC<MessageFoundProps> = ({ foundCharacter }) => {
  return (
    <div className="flex justify-center">
      {foundCharacter && (
        <h2 className="text-2xl text-center font-semibold color-terciary">
          ¡El personaje que coincide con tus preferencias es {foundCharacter.name}!
        </h2>
      )}
      {foundCharacter === null && <h2 className="text-2xl text-center text-gray-500">Busca tu personaje.</h2>}
      {foundCharacter === undefined && (
        <h2 className="text-2xl text-center text-red-500 font-semibold">No se encontró ningún personaje con esos parámetros.</h2>
      )}
    </div>
  );
};

export default MessageFound;
