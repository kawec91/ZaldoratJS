import React, { useState, useEffect } from 'react';
import worldMap from './world.jpg'; // Ścieżka do pliku z obrazem

const TravelPage = () => {
  const squareSize = 60; // Szerokość kwadratu siatki
  const [gridCoordinates, setGridCoordinates] = useState(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = worldMap;
    img.onload = () => {
      setMapDimensions({ width: img.width, height: img.height });
    };
  }, []);

  const handleMouseMove = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; // X pos relative to image
    const y = event.clientY - rect.top; // Y pos relative to image

    // Obliczanie współrzędnych siatki
    const gridX = Math.floor(x / squareSize);
    const gridY = Math.floor(y / squareSize);
    setGridCoordinates({ x: gridX, y: gridY });
  };

  // Zablokowanie systemowego zoomowania
  const preventZoom = (event) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
    }
  };

  return (
    <div
      className="flex justify-center items-center h-[calc(100vh_-_80px)] bg-gray-100 w-full overflow-auto"
      onWheel={preventZoom} // Zablokowanie zoomu podczas scrollowania
    >
      <div
        className="relative"
        onMouseMove={handleMouseMove}
        style={{
          width: `${mapDimensions.width}px`,
          height: `${mapDimensions.height}px`,
          overflow: 'auto', // Umożliwia przewijanie
        }}
      >
        {/* Mapa */}
        <img
          src={worldMap}
          alt="Mapa świata"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block', // Zapewnia, że obraz zajmuje swoje miejsce
          }}
        />

        {/* Siatka */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: Math.ceil(mapDimensions.height / squareSize) }).map((_, rowIndex) =>
            Array.from({ length: Math.ceil(mapDimensions.width / squareSize) }).map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="absolute"
                style={{
                  width: `${squareSize}px`,
                  height: `${squareSize}px`,
                  left: `${colIndex * squareSize}px`,
                  top: `${rowIndex * squareSize}px`,
                  border: '1px solid rgba(0, 0, 0, 0.2)', // Ledwie widoczne obramowanie
                  backgroundColor: gridCoordinates?.x === colIndex && gridCoordinates?.y === rowIndex ? 'rgba(255, 0, 0, 0.3)' : 'transparent', // Podświetlanie aktualnego kwadratu
                }}
                title={`Współrzędne: (${colIndex}, ${rowIndex})`} // Pokazuje współrzędne po najechaniu
              />
            ))
          )}
        </div>

        {/* Wyświetlanie aktualnych współrzędnych */}
        {gridCoordinates && (
          <div
            className="absolute bg-white p-2 rounded"
            style={{
              left: `${gridCoordinates.x * squareSize + 5}px`, // Dostosowanie pozycji
              top: `${gridCoordinates.y * squareSize + 5}px`,
              pointerEvents: 'none',
            }}
          >
            {`Współrzędne: (${gridCoordinates.x}, ${gridCoordinates.y})`}
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelPage;
