import React, { useState } from 'react';
import Magnifier from 'react-magnifier';
import worldMap from './world.jpg'; // Ścieżka do pliku z obrazem

const TravelPage = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [locations] = useState([{ name: 'Start Village', x: 745, y: 685 }]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    setCursorPosition({ x, y });
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

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
          onMouseMove={handleMouseMove}
        />
        <div className="fixed top-0 left-0 p-2 bg-white">
          Cursor Position: {`X: ${cursorPosition.x}, Y: ${cursorPosition.y}`}
        </div>
        <div className="fixed top-0 right-0 p-2 bg-white">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>X</th>
                <th>Y</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location, index) => (
                <tr
                  key={index}
                  onClick={() => handleLocationClick(location)}
                  className="cursor-pointer hover:bg-gray-200"
                >
                  <td>{location.name}</td>
                  <td>{location.x}</td>
                  <td>{location.y}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
  );
};

export default TravelPage;
