import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import AdminFaithTableRow from '../AdminFaithTableRow/AdminFaithTableRow';

export default function AdminFaithTable() {
    const [fList, setFaithList] = useState([]);
    const { data: faithList, isLoading } = useQuery({
        queryKey: ['faithList'],
        queryFn: async() => {
          try {
            const res = await fetch('/api/deities/getall');
            const data = await res.json();
            if(data.error) return null;
            if(!res.ok) {
              throw new Error(data.error || "Something went wrong.");
          }
          console.log('FaithList:', data);
          const emptyList = [];
          console.log('----',data)
          if(data.lenght !== 0) {
            data.forEach((element) => {
              emptyList.push(<AdminFaithTableRow element={element}/>);
            });
            setFaithList(emptyList);
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
                <th>Faith name</th>
                <th className='w-full'>Description</th>
                <th>Action</th>
            </tr>
            {fList}
        </tbody>
    </table>
  )
}
