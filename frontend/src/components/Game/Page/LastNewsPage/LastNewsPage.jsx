import React from 'react';
import { useQuery } from '@tanstack/react-query';

export default function LastNewsPage() {
  // Pobieranie ostatnich wieści
  const { data: lastNews, isLoading, isError } = useQuery({
    queryKey: ['lastNews'],
    queryFn: async () => {
      const response = await fetch('/api/start/get'); // Endpoint do pobierania wieści
      if (!response.ok) {
        throw new Error('Failed to fetch last news');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Ładowanie ostatnich wieści...</div>;
  }

  if (isError) {
    return <div>Wystąpił błąd: {error.message}</div>;
  }

  return (
    <div className='bg-black/80 flex flex-col items-center rounded-md p-4'>
      <h3 className='text-center text-white text-2xl py-2'>Ostatnie Wieści</h3>
      <hr className='border-white w-3/4 mb-4' />
      <div className='w-full h-full py-2 px-4 text-white overflow-y-scroll'>
        {lastNews.map((newsItem) => (
          <div key={newsItem._id} className='mb-2'>
            <h4 className='font-bold'>{newsItem.title}</h4>
            <p>{newsItem.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
