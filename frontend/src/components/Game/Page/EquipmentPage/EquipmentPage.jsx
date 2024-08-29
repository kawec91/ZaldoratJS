import React, { useState, useEffect } from 'react';

export default function EquipmentPage() {
  const [backpack, setBackpack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null); // Przedmiot do usunięcia
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Stan modala

  // Pobieranie plecaka postaci z sesji
  const characterId = sessionStorage.getItem('selectedCharacterId');

  useEffect(() => {
    if (characterId) {
      fetch(`/api/backpack/owner/${characterId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch backpack');
          }
          return res.json();
        })
        .then((data) => {
          setBackpack(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setError('Brak ID postaci w sesji.');
      setLoading(false);
    }
  }, [characterId]);

  if (loading) {
    return <div>Ładowanie plecaka...</div>;
  }

  if (error) {
    return <div>Wystąpił błąd: {error}</div>;
  }

  const slots = backpack.slots; // Użyj slots z plecaka
  const items = backpack.items || [];
  const emptySlots = slots - items.length; // Obliczanie pustych slotów
  const occupiedSlots = items.length; // Zajęte sloty

  // Obliczanie całkowitej wagi przedmiotów w plecaku
  const totalWeight = items.reduce((total, item) => total + item.weight, 0); // Suma wag przedmiotów

  // Użycie weight z obiektu character jako maksymalnej wagi
  const maxWeight = backpack.owner?.weight || 50;

  // Funkcja otwierająca modal potwierdzenia
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowConfirmModal(true);
  };

  // Funkcja do usuwania przedmiotu
  const handleConfirmDelete = () => {
    // Sprawdź, czy mamy ID plecaka i przedmiotu
    if (backpack?._id && itemToDelete?._id) {
      fetch(`/api/backpack/${backpack._id}/remove-item/${itemToDelete._id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to delete item');
          }
          return res.json();
        })
        .then((updatedBackpack) => {
          setBackpack(updatedBackpack);
          setShowConfirmModal(false);
        })
        .catch((error) => {
          setError(error.message);
          setShowConfirmModal(false);
        });
    }
  };

  return (
    <div className='bg-black/80 flex flex-col items-center rounded-md h-[calc(100vh_-_106px)] w-3/4 p-4'>
      <h3 className='text-center text-white text-2xl py-2'>
        Plecak ({occupiedSlots}/{slots})
      </h3>
      <hr className='border-white w-3/4 mb-4' />
      <div className='w-full h-full py-2 px-4 text-white overflow-y-scroll grid grid-cols-4 gap-4'>
        {/* Wyświetlanie przedmiotów w kafelkach */}
        {items.map((item) => (
          <div key={item._id} className='border border-white p-2 rounded-md bg-gray-800 flex flex-col items-center justify-center' style={{ width: '100px', height: '100px' }}>
            <h4 className='text-lg'>{item.name}</h4>
            <p>Ilość: {item.quantity}</p>
            <p>Waga: {item.weight}</p>
            <button className='text-red-500 text-sm mt-2' onClick={() => handleDeleteClick(item)}>
              Wyrzuć
            </button>
          </div>
        ))}
        {/* Puste kafelki */}
        {emptySlots > 0 && Array.from({ length: emptySlots }).map((_, index) => (
          <div key={index} className='border border-gray-500 p-2 rounded-md bg-gray-600 flex flex-col items-center justify-center' style={{ width: '100px', height: '100px' }}>
            <p className='text-center'>Pusty slot</p>
          </div>
        ))}
      </div>
      {/* Wyświetlanie wagi na środku */}
      <div className='text-white text-lg mt-4'>
        Waga: {totalWeight}/{maxWeight}
      </div>

      {/* Modal potwierdzenia usunięcia */}
      {showConfirmModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-4 rounded-md'>
            <p>Czy na pewno chcesz wyrzucić ten przedmiot?</p>
            <div className='flex justify-around mt-4'>
              <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={handleConfirmDelete}>
                Tak
              </button>
              <button className='bg-gray-500 text-white px-4 py-2 rounded-md' onClick={() => setShowConfirmModal(false)}>
                Nie
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
