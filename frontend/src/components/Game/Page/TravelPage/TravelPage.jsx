import React, { useState, useEffect } from 'react';
import Magnifier from 'react-magnifier';
import worldMap from './world.jpg'; // Ścieżka do pliku z obrazem
import arrow from './arrow.png'; // Ścieżka do pliku z obrazem strzałki

const TravelPage = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [locations] = useState([{ name: 'Start Village', x: 278, y: 263 }]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true); // Ustawiamy na true, aby otworzyć modal od razu
  const [characterCoordinates, setCharacterCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const characterId = sessionStorage.getItem('selectedCharacterId');
    if (characterId) {
      // Pobierz współrzędne postaci z serwera
      fetch(`/api/characters/${characterId}/coords`) // Zaktualizowany endpoint
        .then(response => response.json())
        .then(data => {
          console.log('Otrzymane dane z serwera:', data); // Debugowanie otrzymanych danych
          if (data && data.coords) {
            setCharacterCoordinates({
              x: data.coords.x, // Użycie pola coords
              y: data.coords.y,
            });
            console.log('Ustawione współrzędne postaci:', { x: data.coords.x, y: data.coords.y }); // Debugowanie ustawionych współrzędnych
          } else {
            console.warn('Brak współrzędnych w danych:', data); // Warn, jeśli nie ma coords
          }
        })
        .catch(error => {
          console.error('Błąd przy pobieraniu danych postaci:', error);
        });
    } else {
      console.warn('Brak ID postaci w sessionStorage'); // Warn, jeśli nie ma characterId
    }
  }, []);

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    setCursorPosition({ x, y });
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const closeMapModal = () => {
    setIsModalOpen(false);
  };

  // Zablokowanie zoomu systemowego
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-[calc(100vh_-_80px)] bg-gray-100 w-full">
      {/* Modal z mapą */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="bg-white p-8 rounded max-w-4xl w-[140%]">
            <h2 className="text-lg font-bold mb-2">Mapa świata</h2>
            <div className="flex">
              {/* Tabela z lokalizacjami w modalu */}
              <div className="p-5 w-1/1">
                <h2 className="text-lg font-bold mb-2">Znane lokalizacje:</h2>
                <table className="border-collapse border border-gray-300 w-full">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2">Nazwa</th>
                      <th className="border border-gray-300 p-2">X</th>
                      <th className="border border-gray-300 p-2">Y</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations.map((location, index) => (
                      <tr
                        key={index}
                        onClick={() => handleLocationClick(location)}
                        className="cursor-pointer hover:bg-gray-200"
                      >
                        <td className="border border-gray-300 p-2">{location.name}</td>
                        <td className="border border-gray-300 p-2">{location.x}</td>
                        <td className="border border-gray-300 p-2">{location.y}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="relative flex-grow">
                <Magnifier
                  src={worldMap}
                  mgShape="circle"
                  mgShowOverflow={false}
                  mgWidth={130} // Zwiększone o 10%
                  mgHeight={130} // Zwiększone o 10%
                  zoomFactor={2}
                  alt="Mapa świata"
                  className="max-w-full"
                  onMouseMove={handleMouseMove}
                />
                {selectedLocation && (
                  <div
                    className="absolute bg-red-500 rounded-full"
                    style={{
                      width: '10px',
                      height: '10px',
                      top: `${selectedLocation.y - 5}px`,
                      left: `${selectedLocation.x - 5}px`,
                    }}
                  />
                )}
                {/* Wyświetlanie postaci na mapie */}
                <div
                  className="absolute"
                  style={{
                    top: `${characterCoordinates.y - 20}px`, // Ustawienie Y dla strzałki
                    left: `${characterCoordinates.x - 10}px`, // Ustawienie X dla strzałki
                  }}
                >
                  <img src={arrow} alt="You are here" className="w-10 h-10" /> {/* Strzałka */}
                  <div className="absolute text-red-500 text-sm" style={{ top: '15px', left: '15px', display: 'inline' }}>
  You are here
</div>
                </div>
              </div>
            </div>

            {/* Wyświetlanie współrzędnych myszki */}
            <div className="mt-2 text-gray-600">
              Współrzędne myszki: X: {cursorPosition.x}, Y: {cursorPosition.y}
            </div>

            <button
              onClick={closeMapModal}
              className="mt-2 p-2 bg-red-500 text-white rounded"
            >
              Zamknij
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelPage;
