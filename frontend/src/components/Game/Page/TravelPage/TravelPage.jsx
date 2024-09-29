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
  const [confirmWalk, setConfirmWalk] = useState(false); // Confirmation state
  const [targetLocation, setTargetLocation] = useState(null); // Hold the selected location
  const [autoWalkComplete, setAutoWalkComplete] = useState(false); // Auto-walk completion state
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

  // A* Pathfinding Algorithm
  const aStarPathfinding = (start, target, gridWidth, gridHeight) => {
    const openList = [start];
    const closedList = [];
    const gScore = {};
    const fScore = {};
    const cameFrom = {};

    const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // Manhattan distance

    gScore[`${start.x},${start.y}`] = 0;
    fScore[`${start.x},${start.y}`] = heuristic(start, target);

    while (openList.length > 0) {
      // Get the node with the lowest fScore
      let current = openList.reduce((lowest, node) => {
        const nodeKey = `${node.x},${node.y}`;
        const lowestKey = `${lowest.x},${lowest.y}`;
        return fScore[nodeKey] < fScore[lowestKey] ? node : lowest;
      });

      if (current.x === target.x && current.y === target.y) {
        // Reconstruct path
        const path = [];
        while (current) {
          path.unshift(current);
          current = cameFrom[`${current.x},${current.y}`];
        }
        return path;
      }

      openList.splice(openList.indexOf(current), 1);
      closedList.push(current);

        // Check neighbors
        const neighbors = [
          { x: current.x + 1, y: current.y },
          { x: current.x - 1, y: current.y },
          { x: current.x, y: current.y + 1 },
          { x: current.x, y: current.y - 1 },
          { x: current.x + 1, y: current.y + 1 }, // Diagonal movement
          { x: current.x - 1, y: current.y - 1 }, // Diagonal movement
          { x: current.x + 1, y: current.y - 1 }, // Diagonal movement
          { x: current.x - 1, y: current.y + 1 }  // Diagonal movement
        ];
  
        neighbors.forEach(neighbor => {
          if (neighbor.x < 0 || neighbor.x >= gridWidth || neighbor.y < 0 || neighbor.y >= gridHeight || closedList.find(n => n.x === neighbor.x && n.y === neighbor.y)) {
            return; // Skip out of bounds or closed nodes
          }
  
          const tentativeGScore = gScore[`${current.x},${current.y}`] + 1;
  
          const neighborKey = `${neighbor.x},${neighbor.y}`;
          if (!openList.find(n => n.x === neighbor.x && n.y === neighbor.y)) {
            openList.push(neighbor);
          } else if (tentativeGScore >= gScore[neighborKey]) {
            return; // Not a better path
          }
  
          cameFrom[neighborKey] = current;
          gScore[neighborKey] = tentativeGScore;
          fScore[neighborKey] = tentativeGScore + heuristic(neighbor, target);
        });
      }
  
      return []; // No path found
    };

  // Move Character with 5 Second Delay (for both manual and auto)
  const moveCharacterWithDelay = (newX, newY) => {
    setLoading(true);
    setLoadingProgress(0);

    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + 20; // Increase progress by 20% every second
        if (newProgress >= 100) {
          clearInterval(loadingInterval); // Stop loading when progress reaches 100%
          setCharacterCoordinates({ x: newX, y: newY }); // Move character to new position
          setLoading(false);
        }
        return newProgress;
      });
    }, 1000); // Progress updates every 1 second for 5 seconds
  };

  // Auto-walk: Move Character One Tile at a Time with 5 Second Delay
  const moveCharacterAlongPath = (path, index = 0) => {
    if (index >= path.length) {
      setAutoWalkComplete(true); // Auto-walk complete
      setLoading(false); // Ensure loading is cleared
      return;
    }

    const nextStep = path[index];

    // Move the character one tile, then recursively call for the next tile after 5 seconds
    moveCharacterWithDelay(nextStep.x, nextStep.y);

    // After the 5-second delay, move to the next step in the path
    setTimeout(() => {
      moveCharacterAlongPath(path, index + 1); // Move to next step after delay
    }, 5000); // 5-second delay for each step
  };

  // Start Auto Walk with Confirmation
  const autoMoveCharacter = (targetX, targetY) => {
    const path = aStarPathfinding(characterCoordinates, { x: targetX, y: targetY }, Math.floor(mapDimensions.width / squareSize), Math.floor(mapDimensions.height / squareSize));

    if (path.length > 0) {
      moveCharacterAlongPath(path); // Start moving along the path
    } else {
      console.error('No valid path found to the target location.');
    }
  };

  // Confirmation Modal Handler
  const confirmAutoWalk = (location) => {
    setConfirmWalk(true); // Open confirmation modal
    setTargetLocation(location); // Store the selected location
  };

  const cancelAutoWalk = () => {
    setConfirmWalk(false);
    setTargetLocation(null);
  };

  const startAutoWalk = () => {
    if (targetLocation) {
      autoMoveCharacter(targetLocation.x, targetLocation.y);
    }
    setConfirmWalk(false);
  };

  // Stop Auto-Walk on Manual Move
  const stopAutoWalk = () => {
    setLoading(false); // Stop loading if auto-walk is interrupted
    setAutoWalkComplete(false); // Reset auto-walk completion state
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
                <tr key={index} className="cursor-pointer hover:bg-gray-200" onClick={() => confirmAutoWalk(location)}>
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
              <button onClick={() => { stopAutoWalk(); moveCharacterWithDelay(characterCoordinates.x - 1, characterCoordinates.y - 1); }} className="bg-green-500 p-2 rounded">↖</button>
              <button onClick={() => { stopAutoWalk(); moveCharacterWithDelay(characterCoordinates.x, characterCoordinates.y - 1); }} className="bg-green-500 p-2 rounded">↑</button>
              <button onClick={() => { stopAutoWalk(); moveCharacterWithDelay(characterCoordinates.x + 1, characterCoordinates.y - 1); }} className="bg-green-500 p-2 rounded">↗</button>
            </div>

            <div className="flex space-x-2">
              <button onClick={() => { stopAutoWalk(); moveCharacterWithDelay(characterCoordinates.x - 1, characterCoordinates.y); }} className="bg-green-500 p-2 rounded">←</button>
              <button onClick={() => { stopAutoWalk(); moveCharacterWithDelay(characterCoordinates.x + 1, characterCoordinates.y); }} className="bg-green-500 p-2 rounded">→</button>
            </div>

            <div className="flex space-x-2">
              <button onClick={() => { stopAutoWalk(); moveCharacterWithDelay(characterCoordinates.x - 1, characterCoordinates.y + 1); }} className="bg-green-500 p-2 rounded">↙</button>
              <button onClick={() => { stopAutoWalk(); moveCharacterWithDelay(characterCoordinates.x, characterCoordinates.y + 1); }} className="bg-green-500 p-2 rounded">↓</button>
              <button onClick={() => { stopAutoWalk(); moveCharacterWithDelay(characterCoordinates.x + 1, characterCoordinates.y + 1); }} className="bg-green-500 p-2 rounded">↘</button>
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

        {/* Completion modal after auto-walk */}
        {autoWalkComplete && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">You traveled to {targetLocation?.name}</h2>
              <div className="mt-4">
                <button onClick={() => setAutoWalkComplete(false)} className="bg-green-500 text-white p-2 rounded">OK</button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation modal */}
        {confirmWalk && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Start Auto-Walk?</h2>
              <p>Do you want to auto-move to {targetLocation?.name}?</p>
              <div className="mt-4 flex space-x-4">
                <button onClick={startAutoWalk} className="bg-green-500 text-white p-2 rounded">Yes</button>
                <button onClick={cancelAutoWalk} className="bg-red-500 text-white p-2 rounded">No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelPage;
