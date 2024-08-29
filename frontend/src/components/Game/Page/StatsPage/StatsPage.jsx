import React, { useEffect, useState } from 'react';

export default function CharacterStatsPage() {
  const [characterData, setCharacterData] = useState(null);

  useEffect(() => {
    // Pobranie ID postaci z sessionStorage
    const characterId = sessionStorage.getItem('selectedCharacterId');

    if (characterId) {
      // Pobranie danych postaci z API na podstawie characterId
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

  const { stats, crafting_abilities, fighting_abilities, character_name } = characterData;

  return (
    <div className='h-[calc(100vh_-_50px)] p-4'>
      <h3 className='text-center text-2xl font-bold mb-4'>{`Statystyki Postaci: ${character_name}`}</h3>

      <div className='grid grid-cols-3 gap-4'>
        <div className='bg-gray-800 p-4 rounded-lg text-white'>
          <h4 className='text-lg font-semibold mb-2'>Ogólne Statystyki:</h4>
          <ul>
            {Object.entries(stats)
              .filter(([key]) => key !== '_id')  // Wyklucz klucz '_id'
              .map(([key, value]) => (
                <li key={key} className='mb-1'>
                  <span className='font-bold'>{key}: </span>{value}
                </li>
              ))}
          </ul>
        </div>

        <div className='bg-gray-800 p-4 rounded-lg text-white'>
          <h4 className='text-lg font-semibold mb-2'>Umiejętności Rzemieślnicze:</h4>
          <ul>
            {Object.entries(crafting_abilities)
              .filter(([key]) => key !== '_id')  // Wyklucz klucz '_id'
              .map(([key, value]) => (
                <li key={key} className='mb-1'>
                  <span className='font-bold'>{key}: </span>{value}
                </li>
              ))}
          </ul>
        </div>

        <div className='bg-gray-800 p-4 rounded-lg text-white'>
          <h4 className='text-lg font-semibold mb-2'>Umiejętności Bojowe:</h4>
          <ul>
            {Object.entries(fighting_abilities)
              .filter(([key]) => key !== '_id')  // Wyklucz klucz '_id'
              .map(([key, value]) => (
                <li key={key} className='mb-1'>
                  <span className='font-bold'>{key}: </span>{value}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
