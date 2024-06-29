import React, { useState } from 'react'
import AdminNavbar from '../../../AdminNavbar/AdminNavbar'
import { defaultInput } from '../../../Styles/style'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AdminFaithTable from '../../../AdminFaithTable/AdminFaithTable';

export default function AdminFaithPage() {
    const [formData, setFormData] = useState({ name: '', description: '' });

    const handleChanges = (e) => {
        
        setFormData({
             ...formData,
            [e.target.name]: e.target.value,
        });
        
        console.log(formData)
    }
    const queryClient = useQueryClient();
    const {mutate: addRaceMutation, isPending, isError, error} = useMutation({
        mutationFn: async ({ name,description}) =>{
            try {
                const res = await fetch('/api/deities/create', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name,description})
                })
                const data = await res.json();
                if(!res.ok) throw new Error(data.error || "Faild to create a clas");
                console.log(data);
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess:() => {
            //Invalidate query - refetch raceList
            queryClient.invalidateQueries({queryKey: ["faithList"]})
            toast.success('Faith successfully created.')
        },
        onError: () => {
            toast.error("Something went wrong.")
        },
    });

    const sendData = (e) => {
        e.preventDefault();
        addRaceMutation(formData);

        //Set Object to initial values
        setFormData({ name: '', description: ''});
        //Clear inputs
        let con = document.getElementsByTagName('input');
        for(let i of con) {
            i.value = "";
        }
        
    }
  return (
    <div className='w-full h-full flex'>
        <AdminNavbar />
        <div className='w-full h-full'>
            <form onSubmit={(e)=>{sendData(e)}}>
                <div className='flex items-center p-2 gap-2'>
                    <div className='w-40'>Faith name:</div>
                    <input type='text' placeholder='Wiara' className={defaultInput} name='name' onChange={(e)=>{handleChanges(e)}}/>
                </div>
                <div className='flex flex-col border-b-[1px] border-black p-2 gap-2'>
                    <div className='flex items-center gap-2'>
                        <p className='w-40'>Faith Description:</p>
                        <input type='text' placeholder='Opis' className={defaultInput} name='description' onChange={(e)=>{handleChanges(e)}}/>
                    </div>
                    <div className='flex items-center gap-4 justify-center'>
                        <button type='submit'>Create Faith</button>
                    </div>
                    
                </div>
            </form>
            <AdminFaithTable />
        </div>
    </div>
  )
}
