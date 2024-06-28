import React, { useState } from 'react';
import { defaultInput } from '../../Styles/style.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function RegisterPage() {
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        nickname: '',
        password: '',
        password2: '',
    });

    const queryClient = useQueryClient();

    const {mutate, isError, isPending, error} = useMutation({
        mutationFn: async({ username,email,nickname,password,password2 }) => {
            try {
                const res = await fetch("/api/auth/signup",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({username,email,nickname,password,password2})
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
        onSuccess: () => {
            toast.success("Account successfully created");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        }
    });

    const handleChanges = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        })
        console.log(newUser);
    }

    const sendData = (e) => {
        e.preventDefault();
        console.log('Send');
        mutate(newUser);
    }
  return (
    <div className='h-screen w-full flex items-center justify-center'>
        <div className='border-[1px] border-black p-6 w-1/4'>
            <form className='flex flex-col items-center justify-center gap-4' onSubmit={(e) => {sendData(e)}}>
                <input placeholder='Login' type='text' name='username' onChange={(e) => handleChanges(e)} className={defaultInput}/>
                <input placeholder='Email' type='email' name='email' onChange={(e) => handleChanges(e)} className={defaultInput}/>
                <input placeholder='Nick' type='text' name='nickname' onChange={(e) => handleChanges(e)} className={defaultInput}/>
                <input placeholder='Hasło' type='password' name='password' onChange={(e) => handleChanges(e)} className={defaultInput}/>
                <input placeholder='Potwierdz hasło' type='password' name='password2' onChange={(e) => handleChanges(e)} className={defaultInput}/>
                <button type='submit'>
                    {isPending ? "Loading..." : "Rejestracja"}
                </button>
                {isError && <p className='text-red-600'>{error.message}</p>}
            </form>
        </div>
    </div>
  )
}
