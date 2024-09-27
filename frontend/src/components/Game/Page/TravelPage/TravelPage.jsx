import React, { useState, useEffect, useRef } from 'react';
import worldMap from './world.jpg'; // Path to your image file
import arrow from './arrow.png'; // Path to your arrow image

const TravelPage = () => {
  const [gridCoordinates, setGridCoordinates] = useState(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const [squareSize, setSquareSize] = useState(60);
  const [characterCoordinates, setCharacterCoordinates] = useState({ x: 0, y: 0 });
  const [locations] = useState([{ name: 'Start Village', x: 19, y: 18, description: 'A peaceful village where your journey begins.' }]);

  const [hoveredLocation, setHoveredLocation] = useState(null); // Tooltip hover state
  const [selectedLocation, setSelectedLocation] = useState(null); // For highlighting the clicked square
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 }); // Position of the tooltip
  const mapRef = useRef(null); // Reference to the map container for scrolling

  useEffect(() => {
    const img = new Image();
    img.src = worldMap;
    img.onload = () => {
      setMapDimensions({ width: img.width, height: img.height });
      setSquareSize(Math.min(img.width / 50, img.height / 50)); // Adjust grid size based on image dimensions
    };

    // Fetch character coordinates from server
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

    // Calculate grid coordinates
    const gridX = Math.floor(x / squareSize);
    const gridY = Math.floor(y / squareSize);
    setGridCoordinates({ x: gridX, y: gridY });

    // Check if mouse is hovering over a known location for tooltip
    const hovered = locations.find(
      location => Math.abs(location.x - gridX) < 2 && Math.abs(location.y - gridY) < 2
    );
    setHoveredLocation(hovered || null);

    // Update tooltip position
    setTooltipPosition({ x: e.pageX, y: e.pageY });
  };

  const handleLocationClick = (location) => {
    // Check if the clicked location is already selected
    if (selectedLocation && selectedLocation.x === location.x && selectedLocation.y === location.y) {
      // Unselect if the same location is clicked
      setSelectedLocation(null);
    } else {
      // Set new selected location
      setSelectedLocation(location);

      // Scroll to center the selected location
      const scrollX = (location.x * squareSize) - (mapRef.current.clientWidth / 2) + (squareSize / 2);
      const scrollY = (location.y * squareSize) - (mapRef.current.clientHeight / 2) + (squareSize / 2);

      mapRef.current.scrollTo({
        top: scrollY,
        left: scrollX,
        behavior: 'smooth', // Smooth scrolling effect
      });
    }
  };

  const isSelectedSquare = (x, y) => {
    return selectedLocation && selectedLocation.x === x && selectedLocation.y === y; // Check if it's the selected location
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh_-_80px)] bg-gray-100 w-full">
      <div className="flex w-full h-full">
        {/* Sidebar */}
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
                <tr
                  key={index}
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => handleLocationClick(location)} // Handle click to focus on location
                >
                  <td className="border border-gray-300 p-2">{location.name}</td>
                  <td className="border border-gray-300 p-2">{location.x}</td>
                  <td className="border border-gray-300 p-2">{location.y}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Map Section */}
        <div className="relative flex-grow h-full overflow-scroll" ref={mapRef}>
          {/* Map container */}
          <div
            style={{
              width: `${mapDimensions.width}px`,
              height: `${mapDimensions.height}px`,
              position: 'relative',
              overflow: 'visible', // Ensure no limit on content visibility
            }}
            onMouseMove={handleMouseMove}
          >
            {/* World map image */}
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

            {/* Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: Math.ceil(mapDimensions.height / squareSize) }).map((_, rowIndex) =>
                Array.from({ length: Math.ceil(mapDimensions.width / squareSize) }).map((_, colIndex) => {
                  // Check if the current square is within the 3x3 area around the selected location
                  const isInSelectedArea = selectedLocation &&
                    colIndex >= selectedLocation.x - 1 && colIndex <= selectedLocation.x + 1 &&
                    rowIndex >= selectedLocation.y - 1 && rowIndex <= selectedLocation.y + 1;

                  // Determine if the square is on the outer edge of the 3x3 area
                  const isTopEdge = isInSelectedArea && rowIndex === selectedLocation.y - 1;
                  const isBottomEdge = isInSelectedArea && rowIndex === selectedLocation.y + 1;
                  const isLeftEdge = isInSelectedArea && colIndex === selectedLocation.x - 1;
                  const isRightEdge = isInSelectedArea && colIndex === selectedLocation.x + 1;

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="absolute"
                      style={{
                        width: `${squareSize}px`,
                        height: `${squareSize}px`,
                        left: `${colIndex * squareSize}px`,
                        top: `${rowIndex * squareSize}px`,
                        borderTop: isTopEdge ? '3px solid rgba(0, 255, 0, 0.8)' : '0px',
                        borderBottom: isBottomEdge ? '3px solid rgba(0, 255, 0, 0.8)' : '0px',
                        borderLeft: isLeftEdge ? '3px solid rgba(0, 255, 0, 0.8)' : '0px',
                        borderRight: isRightEdge ? '3px solid rgba(0, 255, 0, 0.8)' : '0px',
                        backgroundColor: gridCoordinates?.x === colIndex && gridCoordinates?.y === rowIndex
                          ? 'rgba(255, 0, 0, 0.3)' // Highlight the hovered square
                          : 'transparent',
                      }}
                      title={`Coordinates: (${colIndex}, ${rowIndex})`}
                    />
                  );
                })
              )}
            </div>

            {/* Display character on the map */}
            <div
              className="absolute"
              style={{
                top: `${characterCoordinates.y * squareSize}px`, // Adjust for grid size
                left: `${characterCoordinates.x * squareSize}px`, // Adjust for grid size
              }}
            >
              <img src={arrow} alt="You are here" className="w-10 h-10" />
              <div className="absolute text-red-500 text-sm" style={{ top: '15px', left: '15px', display: 'inline' }}>
                You are here
              </div>
            </div>

            {/* Tooltip for hovering over location */}
            {hoveredLocation && (
              <div
                className="fixed bg-gray-900 text-white p-2 rounded shadow-lg"
                style={{
                  top: `${tooltipPosition.y + 10}px`, // Offset from cursor position
                  left: `${tooltipPosition.x + 10}px`,
                  zIndex: 10,
                }}
              >
                <strong>{hoveredLocation.name}</strong>
                <p>{hoveredLocation.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Display current grid coordinates */}
      {gridCoordinates && (
        <div className="fixed bottom-2 left-2 text-gray-600 bg-white p-2 rounded shadow">
          Współrzędne siatki: X: {gridCoordinates.x}, Y: {gridCoordinates.y}
        </div>
      )}
    </div>
  );
};

export default TravelPage;
