import React, { useEffect, useState } from 'react';
import ChangeLogCard from '../../../ChangeLogCard/ChangeLogCard';

export default function ChangeLogPage() {
  const [characterData, setCharacterData] = useState(null);

  useEffect(() => {
    const characterId = sessionStorage.getItem('selectedCharacterId');
    
    if (characterId) {
      // Pobierz dane postaci z API na podstawie characterId
      fetch(`/api/characters/${characterId}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setCharacterData(data);
          } else {
            console.error('Character not found');
          }
        })
        .catch(error => {
          console.error('Error fetching character data:', error);
        });
    } else {
      console.error('No character selected');
    }
  }, []);

  if (!characterData) {
    return <div>Loading character data...</div>;
  }

  return (
    <div className='w-full h-full flex justify-center'>
      <div className='w-1/2 h-full'>
        <h3 className='text-center text-2xl'>
          Change Log (game version: 0.0.1) - Logged in as {characterData.character_name}
        </h3>
        <div className='p-4 flex flex-col items-center gap-2 h-[calc(100%_-_35px)] overflow-y-scroll'>
          <ChangeLogCard />
          <ChangeLogCard />
          <ChangeLogCard />
        </div>
      </div>
    </div>
  );
}
