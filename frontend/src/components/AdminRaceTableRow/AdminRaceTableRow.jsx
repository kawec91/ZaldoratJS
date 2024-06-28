import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';

export default function AdminRaceTableRow({element}) {
    const queryClient = useQueryClient();

    const openInputFields = (id) => {
        const trElement = document.getElementById(id)
        const inputs = trElement.getElementsByTagName('input');
        
            for(let i of inputs) {
                if(i.disabled){
                    i.disabled = false;
                } else {
                    i.disabled = true;
                    //TODO: Save in DB
                    
                    //Invalidate query - refetch raceList
                    queryClient.invalidateQueries({queryKey: ["racesList"]})
                }
            }
    }

    const {mutate: deleteRace, isPending, isSuccess, isError, error} = useMutation({
        mutationFn: async(id) => {
            try {
                const res = await fetch(`/api/races/delete/${id}`,{
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id})
                })
                
                
                const data = await res.json();
                if(!res.ok) throw new Error(data.error || "Faild to create account");
                console.log(data);
                return data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        onSuccess: (data) => {
            toast.success(data.message)
            //Invalidate query - refetch raceList
            queryClient.invalidateQueries({queryKey: ["racesList"]})
        },
        onError: (data) => {
            toast.error(data.message);
        }
    });

  return (
    <tr key={element.name} id={element._id}>
        <td>
            <input value={element.name} disabled />
        </td>
        <td>
            <input value={element.description} disabled />
        </td>
        <td>
            <input value={element.attributes.strength} disabled />
        </td>
        <td>
            <input value={element.attributes.agility} disabled />
        </td>
        <td>
            <input value={element.attributes.vitality} disabled />
        </td>
        <td>
            <input value={element.attributes.intelligence} disabled />
        </td>
        <td className='flex items-center gap-2'>
            <button onClick={() => {openInputFields(element._id)}}>Edit</button>
            <button onClick={()=>{deleteRace(element._id)}} className='text-red-600'>Delete</button>
        </td>
    </tr>
  )
}
