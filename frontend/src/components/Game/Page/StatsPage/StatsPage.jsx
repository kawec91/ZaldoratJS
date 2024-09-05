import React, { useEffect, useState } from 'react';

export default function CharacterStatsPage() {
  const [characterData, setCharacterData] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);

  useEffect(() => {
    const characterId = sessionStorage.getItem('selectedCharacterId');

    if (characterId) {
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

  const { stats, crafting_abilities, fighting_abilities, multipliers, character_name } = characterData;

  // Function to render stats with their corresponding multipliers
  const renderStats = (statsObject, multiplierObject) => {
    return Object.entries(statsObject)
      .filter(([key]) => key !== '_id')
      .map(([key, value]) => (
        <li key={key} className='mb-2 flex items-center relative'>
          <span className='font-bold text-blue-600'>{key}: </span>
          <span className='ml-2 text-gray-800'>{value}</span>
          {hoveredStat === key && (
            <span className='absolute left-40 bg-gray-200 p-1 rounded'>
              Multiplier: {multiplierObject[key] || 'undefined'}
            </span>
          )}
          <span
            onMouseEnter={() => setHoveredStat(key)}
            onMouseLeave={() => setHoveredStat(null)}
            className='ml-2 text-gray-500 cursor-pointer'
          >
            (?)
          </span>
        </li>
      ));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-purple-800 mb-4">{character_name}'s Stats</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-300 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-blue-600">Statistics</h2>
          <ul>{renderStats(stats, multipliers)}</ul>
        </div>
        <div className="bg-green-50 border border-green-300 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-green-600">Crafting Abilities</h2>
          <ul>{renderStats(crafting_abilities, multipliers)}</ul>
        </div>
        <div className="bg-red-50 border border-red-300 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-red-600">Fighting Abilities</h2>
          <ul>{renderStats(fighting_abilities, multipliers)}</ul>
        </div>
      </div>
    </div>
  );
}
