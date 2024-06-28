import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import AdminRaceTableRow from '../AdminRaceTableRow/AdminRaceTableRow';

export default function AdminRaceTable() {
    const [rList, setRaceList] = useState([]);
    const { data: racesList, isLoading } = useQuery({
        queryKey: ['racesList'],
        queryFn: async() => {
          try {
            const res = await fetch('/api/races/getall');
            const data = await res.json();
            if(data.error) return null;
            if(!res.ok) {
              throw new Error(data.error || "Something went wrong.");
          }
          console.log('RacesList:', data);
          const emptyList = [];
          data.forEach((element) => {
            emptyList.push(<AdminRaceTableRow element={element} />);
          });
          setRaceList(emptyList);
          return data;
          } catch (error) {
            throw new Error(error);
          }
        },
        retry: false,
      });

      
  return (
    <table>
        <tbody>
            <tr>
                <th>Race name</th>
                <th className='w-2/3'>Description</th>
                <th >Strength</th>
                <th>Agility</th>
                <th>Vitality</th>
                <th>Intelligence</th>
                <th>Action</th>
            </tr>
            {rList}
        </tbody>
    </table>
  )
}
