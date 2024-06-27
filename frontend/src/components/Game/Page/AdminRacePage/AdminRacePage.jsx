import React, { useState } from 'react'
import AdminNavbar from '../../../AdminNavbar/AdminNavbar'
import { defaultInput } from '../../../Styles/style'
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function AdminRacePage() {
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

    const {mutate: addRaceMutation, isPending, isError, error} = useMutation({
        mutationFn: async ({ name,description, attributes }) =>{
            try {
                const res = fetch('/api/races/create', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name,description, attributes })
                })
                const data = await res.json();
                if(!res.ok) throw new Error(data.error || "Faild to login");
                console.log(data);
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess:(data) => {
            console.log('os:',data);
            toast.success('Race successfully created.')
        },
        onError: (data) => {
            console.log('oe:',data);
            toast.error("Something went wrong.")
        },
    });

    const sendData = (e) => {
        e.preventDefault();
        addRaceMutation(formData)
    }
  return (
    <div className='w-full h-full flex'>
        <AdminNavbar />
        <div className='w-full h-full'>
            <form onSubmit={(e)=>{sendData(e)}}>
                <div className='flex items-center p-2 gap-2'>
                    <div className='w-40'>Race name:</div>
                    <input type='text' placeholder='Rasa' className={defaultInput} name='name' onChange={(e)=>{handleChanges(e)}}/>
                </div>
                <div className='flex flex-col border-b-[1px] border-black p-2 gap-2'>
                    <div className='flex items-center gap-2'>
                        <p className='w-40'>Race Description:</p>
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
                        <button type='submit'>Create Race</button>
                    </div>
                    
                </div>
            </form>
            <table>
                <thead>
                    <th>Race name</th>
                    <th>Description</th>
                    <th>Strength</th>
                    <th>Agility</th>
                    <th>Vitality</th>
                    <th>Intelligence</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Test</td>
                        <td>Desc</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td className='flex items-center gap-2'>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}
