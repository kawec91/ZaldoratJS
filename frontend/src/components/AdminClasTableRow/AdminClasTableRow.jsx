import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';
import { defaultInput } from '../Styles/style';

export default function AdminClasTableRow({element}) {
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
            <div className='w-32 pl-2'>
                <input value={element.name} disabled className={defaultInput}/>
            </div>
        </td>
        <td>
            <div className='w-full'>
                <input value={element.description} disabled className={defaultInput}/>
            </div>
        </td>
        <td>
            <div className='w-24'>
                <input value={element.attributes.strength} disabled className={defaultInput}/>
            </div>
        </td>
        <td>
            <div className='w-24'>
                <input value={element.attributes.agility} disabled className={defaultInput}/>
            </div>
        </td>
        <td>
            <div className='w-24'>
                <input value={element.attributes.vitality} disabled className={defaultInput}/>
            </div>
        </td>
        <td>
            <div className='w-24'>
                <input value={element.attributes.intelligence} disabled className={defaultInput}/>
            </div>
        </td>
        <td className='flex items-center gap-2 pl-2'>
            <button onClick={() => {openInputFields(element._id)}} className='py-2 px-4 bg-green-700 rounded-md text-white'>Edit</button>
            <button onClick={()=>{deleteRace(element._id)}} className='py-2 px-4 bg-red-700 rounded-md text-white'>Delete</button>
        </td>
    </tr>
  )
}
