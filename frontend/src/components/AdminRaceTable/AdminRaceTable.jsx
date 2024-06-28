import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

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
            emptyList.push(<tr key={element.name}><td>{element.name}</td><td>{element.description}</td><td>{element.attributes.strength}</td><td>{element.attributes.agility}</td><td>{element.attributes.vitality}</td><td>{element.attributes.intelligence}</td><td>Buttons</td></tr>)
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
                <th>Description</th>
                <th>Strength</th>
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
