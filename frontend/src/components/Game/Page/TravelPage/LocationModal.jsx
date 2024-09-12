import React from 'react';

const LocationModal = ({ locations, onLocationClick, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
      <div className="bg-white p-5 rounded max-w-md w-[90%]">
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
                onClick={() => onLocationClick(location)}
                className="cursor-pointer hover:bg-gray-200"
              >
                <td className="border border-gray-300 p-2">{location.name}</td>
                <td className="border border-gray-300 p-2">{location.x}</td>
                <td className="border border-gray-300 p-2">{location.y}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose} className="mt-2 p-2 bg-red-500 text-white rounded">
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default LocationModal;
