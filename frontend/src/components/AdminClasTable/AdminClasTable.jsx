import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import AdminClasTableRow from '../AdminClasTableRow/AdminClasTableRow';

export default function AdminClasTable() {
    const [cList, setClasList] = useState([]);
    const { data: clasList, isLoading } = useQuery({
        queryKey: ['classesList'],
        queryFn: async() => {
          try {
            const res = await fetch('/api/classes/getall');
            const data = await res.json();
            if(data.error) return null;
            if(!res.ok) {
              throw new Error(data.error || "Something went wrong.");
          }
          console.log('ClassesList:', data);
          const emptyList = [];
          console.log('----',data)
          data.forEach((element) => {
            emptyList.push();
          });
          setClasList(emptyList);
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
                <th>Clas name</th>
                <th className='w-2/3'>Description</th>
                <th >Strength</th>
                <th>Agility</th>
                <th>Vitality</th>
                <th>Intelligence</th>
                <th>Action</th>
            </tr>
            {cList}
        </tbody>
    </table>
  )
}
