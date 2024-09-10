import React from 'react';
import Magnifier from 'react-magnifier';
import worldMap from './world.jpg'; // Ścieżka do pliku z obrazem

const TravelPage = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh_-_80px)] bg-gray-100 w-full">
      <div className="overflow-auto relative h-full w-full">
        <Magnifier
          src={worldMap}
          mgShape="circle"
          mgShowOverflow={false}
          mgWidth={150}
          mgHeight={150}
          zoomFactor={2}
          alt="Mapa świata"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default TravelPage;
