import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CharacterChooseCard from '../../CharacterChooseCard/CharacterChooseCard';

export default function AccountPage() {
  const [myCharacterList, setMyCharacterList] = useState([]);

  // Get authUser Data
  const { data: authUser } = useQuery({ queryKey: ['authUser'] });

  // Pobieranie listy postaci
  const { data: charakterList, isLoading: isLoadingCharakterList } = useQuery({
    queryKey: ['charakterList'],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/characters/owner/${authUser._id}`);
        const myData = await res.json();

        if (!res.ok) {
          throw new Error('Failed to fetch characters');
        }

        setMyCharacterList(myData);
        return myData;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
  });

  // Pobieranie ostatnich wieści
  const { data: lastNews, isLoading: isLoadingNews, isError, error } = useQuery({
    queryKey: ['lastNews'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/start/get');
        if (!response.ok) {
          throw new Error('Failed to fetch last news');
        }
        return response.json();
      } catch (error) {
        throw new Error(error.message);
      }
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
            <p>Utwórz postać</p>
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
                  <div key={newsItem._id} className='mb-2'>
                    <h4 className='font-bold'>{newsItem.title}</h4>
                    <p>{newsItem.description}</p>
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
