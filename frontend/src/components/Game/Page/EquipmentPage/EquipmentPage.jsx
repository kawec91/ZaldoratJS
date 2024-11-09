import React, { useState, useEffect } from 'react';
import Backpack from './Backpack';
import EquippedItems from './EquippedItems';
import BattleStats from './BattleStats';
import ConfirmDeleteModal from './ConfirmDeleteModal';

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
      if (!response.ok) throw new Error('Failed to fetch backpack');
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
      if (!response.ok) return setEquippedItems([]);
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
      if (!response.ok) throw new Error('Failed to create a small backpack');
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
        const url = `http://localhost:8000/api/backpack/${backpack._id}/items/${itemToDelete._id}`;
        console.log("Request URL:", url);

        const response = await fetch(url, { method: 'DELETE' });
        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("Error response:", errorResponse);
          throw new Error(errorResponse.error || 'Failed to delete item');
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

  return (
    <div className="bg-black/90 flex justify-center rounded-md h-[calc(100vh_-_106px)] w-3/4 p-4">
      <EquippedItems equippedItems={equippedItems} handleDeleteClick={handleDeleteClick} />
      <Backpack items={backpack.items} slots={backpack.slots} handleDeleteClick={handleDeleteClick} />
      <BattleStats />
      {showConfirmModal && (
        <ConfirmDeleteModal item={itemToDelete} onConfirm={handleConfirmDelete} onCancel={() => setShowConfirmModal(false)} />
      )}
    </div>
  );
}
