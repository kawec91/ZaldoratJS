import React, { useState, useEffect } from 'react';

export default function EquipmentPage() {
  const [backpack, setBackpack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className='h-[calc(100vh_-_50px)] flex flex-col items-center'>
      <div className='bg-black/80 flex flex-col items-center rounded-md h-[calc(100vh_-_106px)] w-3/4 p-4'>
        <h3 className='text-center text-white text-2xl py-2'>Plecak</h3>
        <hr className='border-white w-3/4 mb-4' />
        <div className='w-full h-full py-2 px-4 text-white overflow-y-scroll'>
          {backpack.items && backpack.items.length > 0 ? (
            <table className='table-auto w-full text-left'>
              <thead>
                <tr>
                  <th className='px-4 py-2'>Nazwa Przedmiotu</th>
                  <th className='px-4 py-2'>Ilość</th>
                  <th className='px-4 py-2'>Waga</th>
                </tr>
              </thead>
              <tbody>
                {backpack.items.map((item) => (
                  <tr key={item._id}>
                    <td className='border px-4 py-2'>{item.name}</td>
                    <td className='border px-4 py-2'>{item.quantity}</td>
                    <td className='border px-4 py-2'>{item.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-white">Plecak jest pusty.</div>
          )}
        </div>
      </div>
    </div>
  );
}
