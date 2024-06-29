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
          if(data.lenght !== 0) {
            data.forEach((element) => {
              emptyList.push(<AdminClasTableRow element={element}/>);
            });
            setClasList(emptyList);
          }
          
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
                <th className='w-full'>Description</th>
                <th>Action</th>
            </tr>
            {cList}
        </tbody>
    </table>
  )
}
