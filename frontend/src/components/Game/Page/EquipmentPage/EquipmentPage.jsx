import React, { useState, useEffect } from 'react';

export default function EquipmentPage() {
  const [backpack, setBackpack] = useState(null);
  const [equippedItems, setEquippedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const characterId = sessionStorage.getItem('selectedCharacterId');

  useEffect(() => {
    if (characterId) {
      fetchBackpack(characterId);
      fetchEquippedItems(characterId);
    } else {
      setError('Character ID not found in session.');
      setLoading(false);
    }
  }, [characterId]);

  const fetchBackpack = async (id) => {
    try {
      const response = await fetch(`/api/backpack/owner/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch backpack');
      }
      const data = await response.json();
      setBackpack(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEquippedItems = async (id) => {
    try {
      const response = await fetch(`/api/equipment/owner/${id}`);
      if (!response.ok) {
        setEquippedItems([]);
        return;
      }
      const data = await response.json();
      setEquippedItems(data || []);
    } catch (error) {
      setError(error.message);
      setEquippedItems([]);
    }
  };

  const handleGetSmallBackpack = async () => {
    try {
      const response = await fetch(`/api/backpack/create/${characterId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ size: 'small' }),
      });
      if (!response.ok) {
        throw new Error('Failed to create a small backpack');
      }
      const newBackpack = await response.json();
      setBackpack(newBackpack);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    console.log('Deleting item with ID:', itemToDelete?._id);
    console.log('From backpack with ID:', backpack?._id);
    if (backpack?._id && itemToDelete?._id) {
      try {
        const response = await fetch(`/api/backpack/${backpack._id}/remove-item/${itemToDelete._id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        const updatedBackpack = await response.json();
        setBackpack(updatedBackpack);
      } catch (error) {
        console.error('Error deleting item:', error);
        setError(error.message);
      } finally {
        setShowConfirmModal(false);
        setItemToDelete(null); // Clear item after deletion
      }
    }
  };

  if (loading) return <div>Loading backpack...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!backpack) {
    return (
      <div className="bg-black/80 flex flex-col items-center rounded-md h-[calc(100vh_-_106px)] w-3/4 p-4">
        <h3 className="text-white text-2xl py-2">You don't have a backpack yet!</h3>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleGetSmallBackpack}>
          Get your first small backpack here!
        </button>
      </div>
    );
  }

  const slots = backpack.slots;
  const items = backpack.items || [];
  const emptySlots = slots - items.length;
  const occupiedSlots = items.length;
  const totalWeight = items.reduce((total, item) => total + item.weight, 0);
  const maxWeight = backpack.owner?.weight || 50;

  return (
    <div className="bg-black/90 flex justify-center rounded-md h-[calc(100vh_-_106px)] w-3/4 p-4">
      {/* Equipped Items Card */}
      <div className="bg-gray-800 rounded-md p-4 w-1/2 mx-2 h-full flex flex-col">
        <h3 className="text-center text-white text-2xl py-2">Equipped Items</h3>
        <hr className="border-white mb-4" />
        <div className="relative flex justify-center items-center mb-6 flex-grow">
          <div className="w-40 h-56 bg-gray-600 flex items-center justify-center rounded-md">
            <img src="/path/to/human-model.png" alt="Human Model" className="w-36 h-52" />
          </div>
          <div className="absolute" style={{ width: '550px', height: '550px' }}>
            {[
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
            ].map((slot, index) => {
              const item = equippedItems.find((item) => item.type === slot.type);
              const angle = index * 27.69; // Adjust angle as needed
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
                      <img
                        src={`/images/${item.image}`} // Ensure correct image path
                        alt={item.name}
                        className="w-10 h-10" // Square size
                      />
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
        {/* Available Slots and Total Carry Weight */}
        <div className="text-center text-white">
          <p>Total Carry Weight: {totalWeight}/{maxWeight} kg</p>
        </div>
      </div>

      {/* New Card for Backpack (Scrollable) */}
      <div className="bg-gray-800 rounded-md p-4 w-1/4 mx-2 h-full flex flex-col">
        <h3 className="text-center text-white text-2xl py-2">Backpack</h3>
        <hr className="border-white mb-4" />
        <div className="flex-grow overflow-y-auto"> {/* Keep this for scrollable items */}
          <div className="flex flex-wrap justify-center w-full">
            {items.map((item) => (
              <div key={item._id} className="border border-white p-1 bg-gray-700 flex flex-col items-center justify-center m-1 relative" style={{ width: '50px', height: '50px' }}>
                <img
                  src={`/images/${item.image}`} // Adjust the path as needed
                  alt={item.name}
                  className="w-full h-full" // Ensure image fits the square
                  onMouseOver={(e) => {
                    const tooltip = document.createElement('div');
                    tooltip.innerText = `Name: ${item.name}\nWeight: ${item.weight} kg\nQuantity: ${item.quantity}`;
                    tooltip.style.position = 'absolute';
                    tooltip.style.backgroundColor = '#333';
                    tooltip.style.color = '#fff';
                    tooltip.style.padding = '5px';
                    tooltip.style.borderRadius = '5px';
                    tooltip.style.whiteSpace = 'nowrap';
                    tooltip.style.zIndex = '1000';
                    tooltip.style.transform = 'translate(-50%, -100%)';
                    tooltip.style.left = `${e.clientX}px`;
                    tooltip.style.top = `${e.clientY}px`;
                    document.body.appendChild(tooltip);
                    e.target.tooltip = tooltip; // Store tooltip in target element for removal later
                  }}
                  onMouseOut={(e) => {
                    if (e.target.tooltip) {
                      document.body.removeChild(e.target.tooltip);
                      e.target.tooltip = null; // Clear tooltip reference
                    }
                  }}
                />
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
        {/* Available Slots Information (Now at the bottom) */}
        <p className="text-center text-white text-1xl py-2">Available Slots: {emptySlots}/{slots}</p>
      </div>

      {/* New Card for Battle Stats (Moved) */}
      <div className="bg-gray-800 rounded-md p-4 w-1/4 mx-2 h-full flex flex-col">
        <h3 className="text-center text-white text-2xl py-2">Battle Stats</h3>
        <hr className="border-white mb-4" />
        <p className="text-white">Stats go here...</p>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black/90 p-4 rounded-md">
            <h4 className="text-white text-lg">Confirm Delete</h4>
            <p className="text-white">Are you sure you want to remove {itemToDelete.name} from your backpack?</p>
            <div className="flex justify-between mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleConfirmDelete}>
                Yes, Delete
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setShowConfirmModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
