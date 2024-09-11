import React, { useState, useEffect } from 'react';
import Magnifier from 'react-magnifier';
import worldMap from './world.jpg'; // Ścieżka do pliku z obrazem

const TravelPage = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [locations] = useState([{ name: 'Start Village', x: 278, y: 263 }]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true); // Ustawiamy na true, aby otworzyć modal od razu

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
          <div className="bg-white p-8 rounded max-w-4xl w-[140%]"> {/* Zwiększone o 10% */}
            <h2 className="text-lg font-bold mb-2">Mapa świata</h2>
            <div className="flex">
              {/* Tabela z lokalizacjami w modalu */}
              <div className="p-5 w-1/1">
                <h2 className="text-lg font-bold mb-2">Known Locations:</h2>
                <table className="border-collapse border border-gray-300 w-full">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2">Name</th>
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
