import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CharacterChooseCard from '../../CharacterChooseCard/CharacterChooseCard';
import { Link } from 'react-router-dom';

export default function AccountPage() {
  const [myCharacterList, setMyCharacterList] = useState([]);

  // Get authUser Data
  const { data: authUser } = useQuery({ queryKey: ['authUser'] });

  // Pobieranie listy postaci
  const { isLoading: isLoadingCharakterList } = useQuery({
    queryKey: ['charakterList', authUser?._id],
    queryFn: async () => {
      if (!authUser) return []; // Jeśli authUser nie jest dostępny, zwróć pustą tablicę
      const res = await fetch(`/api/characters/owner/${authUser._id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch characters');
      }
      const myData = await res.json();
      setMyCharacterList(myData);
      return myData;
    },
    enabled: !!authUser, // Zapytanie jest wykonywane tylko wtedy, gdy authUser jest dostępny
    retry: false,
  });

  // Pobieranie ostatnich wieści
  const { data: lastNews, isLoading: isLoadingNews, isError, error } = useQuery({
    queryKey: ['lastNews'],
    queryFn: async () => {
      const response = await fetch('/api/start/get');
      if (!response.ok) {
        throw new Error('Failed to fetch last news');
      }
      return response.json();
    },
    retry: false,
  });

  return (
    <div className='h-[calc(100vh_-_50px)]'>
      <div className='w-full border-b-[1px] border-black'>
        <div className='py-2 px-4 grid grid-cols-3'>
          <p>Tip: Pamiętaj. Możesz posiadać maksymalnie 5 postaci.</p>
          <p className='text-center'>Postaci: {myCharacterList.length} / 5</p>
          <div className='text-right'>
            <Link to={'/game/new-character'}>Utwórz postać</Link>
          </div>
        </div>
      </div>
      <div className='flex'>
        <div className='h-[calc(100vh_-_90px)] w-1/4 p-2 flex flex-col gap-2'>
          {isLoadingCharakterList ? (
            <div>Ładowanie postaci...</div>
          ) : (
            myCharacterList.map((item) => (
              <CharacterChooseCard
                key={item._id}
                avatar={'3'}
                name={item.character_name}
                lvl={item.level}
                lastOnline={item.lastSeen}
                characterId={item._id}
              />
            ))
          )}
        </div>
        <div className='w-2/4 p-2'>
          <div className='bg-black/80 flex flex-col items-center rounded-md h-[calc(100vh_-_106px)]'>
            <h3 className='text-center text-white text-2xl py-2'>Wieści</h3>
            <hr className='border-white w-3/4 mb-4' />
            <div className='w-full h-full py-2 px-4 text-white overflow-y-scroll'>
              {isLoadingNews ? (
                <div>Ładowanie ostatnich wieści...</div>
              ) : isError ? (
                <div>Wystąpił błąd: {error.message}</div>
              ) : (
                lastNews.map((newsItem) => (
                  <div key={newsItem._id} className='mb-4'>
                    <h4 className='text-xl font-bold'>
                      {newsItem.subject} - dodano dnia {new Date(newsItem.date).toLocaleDateString()} przez {newsItem.author}
                    </h4>
                    <p className='text-white mt-2'>{newsItem.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className='w-1/4'></div>
      </div>
    </div>
  );
}
