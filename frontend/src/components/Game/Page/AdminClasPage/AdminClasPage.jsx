import React, { useState } from 'react'
import AdminNavbar from '../../../AdminNavbar/AdminNavbar'
import { defaultInput } from '../../../Styles/style'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AdminClasTable from '../../../AdminClasTable/AdminClasTable';

export default function AdminClasPage() {
    const [formData, setFormData] = useState({ name: '', description: '', attributes: {strength: 0, agility: 0, vitality: 0, intelligence: 0} });

    const handleChanges = (e) => {
        switch(e.target.name){
            case 'strength':
                    formData.attributes.strength = Number(e.target.value);
                break;
            case 'agility':
                    formData.attributes.agility = Number(e.target.value);
                break;
            case 'vitality':
                    formData.attributes.vitality = Number(e.target.value);
                break;
            case 'intelligence':
                    formData.attributes.intelligence = Number(e.target.value);
                break;
            default:
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                });
                break;
        }
        
        console.log(formData)
    }
    const queryClient = useQueryClient();
    const {mutate: addRaceMutation, isPending, isError, error} = useMutation({
        mutationFn: async ({ name,description, attributes }) =>{
            try {
                const res = await fetch('/api/classes/create', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name,description, attributes })
                })
                const data = await res.json();
                if(!res.ok) throw new Error(data.error || "Faild to create a race");
                console.log(data);
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess:() => {
            //Invalidate query - refetch raceList
            queryClient.invalidateQueries({queryKey: ["classesList"]})
            toast.success('Race successfully created.')
        },
        onError: () => {
            toast.error("Something went wrong.")
        },
    });

    const sendData = (e) => {
        e.preventDefault();
        addRaceMutation(formData);

        //Set Object to initial values
        setFormData({ name: '', description: '', attributes: {strength: 0, agility: 0, vitality: 0, intelligence: 0} });
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
                    <div className='w-40'>Clas name:</div>
                    <input type='text' placeholder='Klasa' className={defaultInput} name='name' onChange={(e)=>{handleChanges(e)}}/>
                </div>
                <div className='flex flex-col border-b-[1px] border-black p-2 gap-2'>
                    <div className='flex items-center gap-2'>
                        <p className='w-40'>Clas Description:</p>
                        <input type='text' placeholder='Opis' className={defaultInput} name='description' onChange={(e)=>{handleChanges(e)}}/>
                    </div>
                    <div className='flex items-center gap-4 justify-center'>
                        <label >Strength:</label>
                        <div className='w-16'>
                            <input className={defaultInput} type='number' name='strength' onChange={(e)=>{handleChanges(e)}}/>
                        </div>
                        <label>Agility:</label>
                        <div className='w-16'>
                            <input className={defaultInput} type='number' name='agility' onChange={(e)=>{handleChanges(e)}}/>
                        </div>
                        <label>Vitality:</label>
                        <div className='w-16'>
                            <input className={defaultInput} type='number' name='vitality' onChange={(e)=>{handleChanges(e)}}/>
                        </div>
                        <label>Intelligence:</label>
                        <div className='w-16'>
                            <input className={defaultInput} type='number' name='intelligence' onChange={(e)=>{handleChanges(e)}}/>
                        </div>
                        <button type='submit'>Create Class</button>
                    </div>
                    
                </div>
            </form>
            <AdminClasTable />
        </div>
    </div>
  )
}
