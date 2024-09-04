import React, { useState } from 'react';
import worldMap from './world.jpg'; // Ścieżka do pliku w tym samym folderze

const TravelPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const zoomFactor = 2; // Wartość powiększenia

  const handleMouseMove = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; // X pos relative to image
    const y = event.clientY - rect.top; // Y pos relative to image

    setMousePosition({ x, y });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div
        className="overflow-hidden relative"
        onMouseMove={handleMouseMove}
      >
        <img
          src={worldMap}
          alt="Mapa"
          className="transition-transform duration-300 ease-in-out"
        />
        
        {/* Szklane powiększenie */}
        <div
          className="absolute border-2 border-black rounded-full"
          style={{
            width: '150px', // Szerokość szkła powiększającego
            height: '150px', // Wysokość szkła powiększającego
            left: `${mousePosition.x - 75}px`, // Ustawienie pozycji
            top: `${mousePosition.y - 75}px`,
            overflow: 'hidden',
            pointerEvents: 'none', // Aby nie blokować interakcji z obrazem
          }}
        >
          <img
            src={worldMap}
            alt="Mapa powiększona"
            style={{
              position: 'absolute',
              transform: `scale(${zoomFactor})`,
              transformOrigin: 'top left',
              left: `-${mousePosition.x * (zoomFactor - 1)}px`, // Przesunięcie w lewo
              top: `-${mousePosition.y * (zoomFactor - 1)}px`, // Przesunięcie w górę
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TravelPage;
