import React from 'react';

const Backpack = ({ items, slots, handleDeleteClick }) => {
  const emptySlots = slots - items.length;

  return (
    <div className="bg-gray-800 rounded-md p-4 w-1/4 mx-2 h-full flex flex-col">
      <h3 className="text-center text-white text-2xl py-2">Backpack</h3>
      <hr className="border-white mb-4" />
      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-wrap justify-center w-full">
          {items.map((item) => (
            <div key={item._id} className="border border-white p-1 bg-gray-700 flex flex-col items-center justify-center m-1 relative" style={{ width: '50px', height: '50px' }}>
              <img src={`/images/${item.image}`} alt={item.name} className="w-full h-full" />
              <button className="text-red-500 text-xs" onClick={() => handleDeleteClick(item)}>
                Drop
              </button>
            </div>
          ))}
          {Array.from({ length: emptySlots }).map((_, index) => (
            <div key={index} className="border border-gray-600 bg-gray-700 flex items-center justify-center m-1" style={{ width: '50px', height: '50px' }} />
          ))}
        </div>
      </div>
      <p className="text-center text-white text-1xl py-2">Available Slots: {emptySlots}/{slots}</p>
    </div>
  );
};

export default Backpack;
