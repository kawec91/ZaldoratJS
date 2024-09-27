import React, { useState, useEffect, useRef } from 'react';
import worldMap from './world.jpg'; // Path to your image file
import arrow from './arrow.png'; // Path to your arrow image

const TravelPage = () => {
  const [gridCoordinates, setGridCoordinates] = useState(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const [squareSize, setSquareSize] = useState(60);
  const [characterCoordinates, setCharacterCoordinates] = useState({ x: 0, y: 0 });
  const [locations] = useState([{ name: 'Start Village', x: 19, y: 18, description: 'A peaceful village where your journey begins.' }]);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const mapRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = worldMap;
    img.onload = () => {
      setMapDimensions({ width: img.width, height: img.height });
      setSquareSize(Math.min(img.width / 50, img.height / 50));
    };

    const characterId = sessionStorage.getItem('selectedCharacterId');
    if (characterId) {
      fetch(`/api/characters/${characterId}/coords`)
        .then(response => response.json())
        .then(data => {
          if (data && data.coords) {
            setCharacterCoordinates(data.coords);
          } else {
            console.warn('No coordinates found:', data);
          }
        })
        .catch(error => {
          console.error('Error fetching character data:', error);
        });
    }
  }, []);

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;

    const gridX = Math.floor(x / squareSize);
    const gridY = Math.floor(y / squareSize);
    setGridCoordinates({ x: gridX, y: gridY });

    const hovered = locations.find(location =>
      Math.abs(location.x - gridX) < 2 && Math.abs(location.y - gridY) < 2
    );
    setHoveredLocation(hovered || null);
    setTooltipPosition({ x: e.pageX, y: e.pageY });
  };

  const moveCharacter = (targetX, targetY) => {
    setLoading(true);
    setLoadingProgress(0);

    // Function to increment loading progress
    const updateProgress = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(updateProgress);
          return prev;
        }
        return prev + 20;
      });
    }, 1000); // Update every second

    const totalSquares = Math.max(Math.abs(targetX - characterCoordinates.x), Math.abs(targetY - characterCoordinates.y));
    const interval = setInterval(() => {
      if (characterCoordinates.x === targetX && characterCoordinates.y === targetY) {
        clearInterval(interval);
        clearInterval(updateProgress);
        setLoading(false);
        return;
      }

      const dx = Math.sign(targetX - characterCoordinates.x);
      const dy = Math.sign(targetY - characterCoordinates.y);
      const newX = Math.max(0, Math.min(characterCoordinates.x + dx, Math.floor(mapDimensions.width / squareSize) - 1));
      const newY = Math.max(0, Math.min(characterCoordinates.y + dy, Math.floor(mapDimensions.height / squareSize) - 1));

      setCharacterCoordinates({ x: newX, y: newY });

      const scrollX = newX * squareSize - (mapRef.current.clientWidth / 2) + (squareSize / 2);
      const scrollY = newY * squareSize - (mapRef.current.clientHeight / 2) + (squareSize / 2);

      mapRef.current.scrollTo({
        top: scrollY,
        left: scrollX,
        behavior: 'smooth',
      });

      const characterId = sessionStorage.getItem('selectedCharacterId');
      fetch(`/api/characters/${characterId}/coords`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coords: { x: newX, y: newY } }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Character location updated:', data);
        })
        .catch(error => {
          console.error('Error updating character coordinates:', error);
        });
    }, 5000 / totalSquares); // Adjust the interval based on the total squares to travel

    setTimeout(() => {
      clearInterval(interval);
      clearInterval(updateProgress);
      setLoading(false);
    }, 5000); // Ensure loading is displayed for 5 seconds
  };

  const autoMoveCharacter = (targetX, targetY) => {
    moveCharacter(targetX, targetY);
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh_-_80px)] bg-gray-100 w-full">
      <div className="flex w-full h-full">
        <div className="p-5 w-1/9 max-h-screen overflow-y-auto bg-white border-r">
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
                <tr key={index} className="cursor-pointer hover:bg-gray-200" onClick={() => autoMoveCharacter(location.x, location.y)}>
                  <td className="border border-gray-300 p-2">{location.name}</td>
                  <td className="border border-gray-300 p-2">{location.x}</td>
                  <td className="border border-gray-300 p-2">{location.y}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="relative flex-grow h-full overflow-scroll" ref={mapRef}>
          <div
            style={{
              width: `${mapDimensions.width}px`,
              height: `${mapDimensions.height}px`,
              position: 'relative',
              overflow: 'visible',
            }}
            onMouseMove={handleMouseMove}
          >
            <img
              src={worldMap}
              alt="World Map"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                position: 'absolute',
                top: '0',
                left: '0',
              }}
            />

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
                      backgroundColor: gridCoordinates?.x === colIndex && gridCoordinates?.y === rowIndex
                        ? 'rgba(255, 0, 0, 0.3)' // Highlight the hovered square
                        : 'transparent',
                    }}
                    title={`Coordinates: (${colIndex}, ${rowIndex})`}
                  />
                ))
              )}
            </div>

            <div
              className="absolute"
              style={{
                top: `${characterCoordinates.y * squareSize}px`,
                left: `${characterCoordinates.x * squareSize}px`,
              }}
            >
              <img src={arrow} alt="You are here" className="w-10 h-10" />
              <div className="absolute text-red-500 text-sm" style={{ top: '15px', left: '15px', display: 'inline' }}>
                You are here
              </div>
            </div>

            {hoveredLocation && (
              <div
                className="fixed bg-gray-900 text-white p-2 rounded shadow-lg"
                style={{
                  left: tooltipPosition.x,
                  top: tooltipPosition.y,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <h3 className="font-bold">{hoveredLocation.name}</h3>
                <p>{hoveredLocation.description}</p>
              </div>
            )}
          </div>

          {/* Navigation arrows */}
          <div className="absolute bottom-5 left-5 flex flex-col space-y-2">
            <div className="flex space-x-2">
              <button onClick={() => moveCharacter(characterCoordinates.x - 1, characterCoordinates.y - 1)} className="bg-green-500 p-2 rounded">↖</button>
              <button onClick={() => moveCharacter(characterCoordinates.x, characterCoordinates.y - 1)} className="bg-green-500 p-2 rounded">↑</button>
              <button onClick={() => moveCharacter(characterCoordinates.x + 1, characterCoordinates.y - 1)} className="bg-green-500 p-2 rounded">↗</button>
            </div>

            <div className="flex space-x-2">
              <button onClick={() => moveCharacter(characterCoordinates.x - 1, characterCoordinates.y)} className="bg-green-500 p-2 rounded">←</button>
              <button onClick={() => moveCharacter(characterCoordinates.x + 1, characterCoordinates.y)} className="bg-green-500 p-2 rounded">→</button>
            </div>

            <div className="flex space-x-2">
              <button onClick={() => moveCharacter(characterCoordinates.x - 1, characterCoordinates.y + 1)} className="bg-green-500 p-2 rounded">↙</button>
              <button onClick={() => moveCharacter(characterCoordinates.x, characterCoordinates.y + 1)} className="bg-green-500 p-2 rounded">↓</button>
              <button onClick={() => moveCharacter(characterCoordinates.x + 1, characterCoordinates.y + 1)} className="bg-green-500 p-2 rounded">↘</button>
            </div>
          </div>
        </div>

        {/* Loading modal */}
        {loading && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 shadow-lg rounded">
            <h2 className="text-lg">Traveling...</h2>
            <div className="h-2 bg-gray-300 rounded">
              <div className="bg-green-500 h-full" style={{ width: `${loadingProgress}%` }} />
            </div>
            <p className="text-center">{Math.ceil((5000 - loadingProgress * 50) / 1000)} seconds left</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelPage;
