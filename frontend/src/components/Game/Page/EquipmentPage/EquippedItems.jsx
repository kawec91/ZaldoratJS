import React from 'react';

const EquippedItems = ({ equippedItems, handleDeleteClick }) => {
  const slots = [
    { label: 'Helmet', type: 'helmet' },
    { label: 'Chest', type: 'chest' },
    { label: 'Legs', type: 'legs' },
    { label: 'Boots', type: 'boots' },
    { label: 'Gloves', type: 'gloves' },
    { label: 'Cape', type: 'cape' },
    { label: 'Weapon', type: 'weapon' },
    { label: 'Shield', type: 'shield' },
    { label: 'Backslot', type: 'backslot' },
    { label: 'Ring', type: 'ring' },
    { label: 'Ring 2', type: 'ring2' },
    { label: 'Tool', type: 'tool' },
    { label: 'Companion', type: 'companion' },
  ];

  return (
    <div className="bg-gray-800 rounded-md p-4 w-1/2 mx-2 h-full flex flex-col">
      <h3 className="text-center text-white text-2xl py-2">Equipped Items</h3>
      <hr className="border-white mb-4" />
      <div className="relative flex justify-center items-center mb-6 flex-grow">
        <div className="w-40 h-56 bg-gray-600 flex items-center justify-center rounded-md">
          <img src="/path/to/human-model.png" alt="Human Model" className="w-36 h-52" />
        </div>
        <div className="absolute" style={{ width: '550px', height: '550px' }}>
          {slots.map((slot, index) => {
            const item = equippedItems.find((item) => item.type === slot.type);
            const angle = index * 27.69;
            return (
              <div
                key={index}
                className="absolute flex flex-col items-center justify-center border border-white rounded-md"
                style={{
                  width: '80px',
                  height: '80px',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translate(210px)`,
                  top: '50%',
                  left: '50%',
                }}
              >
                <span className="text-white text-xs">{slot.label}</span>
                {item ? (
                  <div className="text-center">
                    <img src={`/images/${item.image}`} alt={item.name} className="w-10 h-10" />
                    <button className="text-red-500 text-xs" onClick={() => handleDeleteClick(item)}>
                      Unequip
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500">Empty</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EquippedItems;
