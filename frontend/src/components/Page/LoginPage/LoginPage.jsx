import React, { useState } from 'react';
import { defaultInput } from '../../Styles/style.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import Footer from '../../Footer/Footer.jsx';

export default function LoginPage() {
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    const handleChanges = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
        console.log(user);
    }

    const queryClient = useQueryClient();

    const {
        mutate:loginMutation,isPending, isError, error} = useMutation({
        mutationFn: async ({username, password}) => {
            try {
                const res = await fetch('/api/auth/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({username,password})
                });

                const data = await res.json();
                if(!res.ok) throw new Error(data.error || "Faild to login");
                console.log(data);
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: (data) => {
            //Invalidate query - refetch authUser
            queryClient.invalidateQueries({
                queryKey: ["authUser"]
            })
            toast.success("Login succesful.")
        }
    });

    const sendData = (e) => {
        e.preventDefault();
        loginMutation(user);
    }

  return (
    <div className='bg-gradient-to-br from-red-900 via-zinc-900 to-red-900'>
        <div className='flex items-center justify-center h-screen w-full '>
            <div className='border-[1px] border-myLightCream p-6 w-1/4'>
                <form className='flex flex-col items-center justify-center gap-4' onSubmit={(e) => {sendData(e)}}>
                    <input placeholder='Login' type='text' name='username' onChange={(e) => handleChanges(e)} className={defaultInput}/>
                    <input placeholder='Hasło' type='password' name='password' onChange={(e) => handleChanges(e)} className={defaultInput}/>
                    <button type='submit' className='bg-myGoldenYellow px-4 py-2 rounded-full uppercase font-bold hover:text-myLightCream'>
                        {isPending ? "Loading..." : "Login"}
                    </button>
                    {!isError ? <></> : <p className='text-red-600'>{error.message}</p>}
                </form>
            </div>
            
        </div>
    </div>
  )
}
