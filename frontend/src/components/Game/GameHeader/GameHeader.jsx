import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast';
import { Link, Outlet } from 'react-router-dom'

export default function GameHeader() {

    const {mutate: logout} = useMutation({
        mutationFn: async() => {
            try {
                const res = await fetch('/api/auth/logout', {
                    method: "POST",
                });
                const data = await res.json();

                if(!res.ok) {
                    throw new Error(data.error || "Something went wrong.");
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast.success("Logout successful.");
        },
        onError: ()=>{
            toast.error("Logout faild.")
        }
    });
  return (
    <>
        <div className='grid grid-cols-3 gap-2 px-4 py-2 border-b-[1px] border-black'>
            <div className='flex justify-start items-center gap-2'>
                <div className='h-8 w-8 bg-gray-400 rounded-full'></div>
                <div>Witaj, <span>Alakhei</span></div>
            </div>
            <div className='flex items-center justify-center'>24.06.2024 13:07</div>
            <div className='flex items-center justify-end'>
                <ul className='flex items-center gap-2'>
                    <Link >
                        <li>Powiadomienia</li>
                    </Link>
                
                    <Link >
                        <li>Ustawienia</li>
                    </Link>
                
                    
                    <li onClick={(e)=>{
                        e.preventDefault();
                        logout();
                    }}>Wyloguj</li>
                    
                </ul>
            </div>
        </div>
        <div className='h-[calc(100vh_-_50px)]'>
            <Outlet />
        </div>
    </>
    
  )
}
