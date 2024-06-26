import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react';
import toast from 'react-hot-toast';
import { Link, Outlet } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

export default function GameHeader() {
    const queryClient = useQueryClient();
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
            //Invalidate query - refetch authUser
            queryClient.invalidateQueries({
                queryKey: ["authUser"]
            })
            toast.success("Logout successful.");
        },
        onError: ()=>{
            toast.error("Logout faild.")
        }
    });

    //GetData
    const {data: authUser} = useQuery({queryKey:["authUser"]});
  return (
    <>
        <div className='grid grid-cols-3 gap-2 px-4 py-2 border-b-[1px] border-black'>
            <div className='flex justify-start items-center gap-2'>
                {authUser?.userAvatar === "" ? <FaUserCircle className='h-8 w-8'/> : <>IMG</>}
                
                <div>Witaj, <Link to={'/game/'}><span className='text-blue-600 cursor-pointer'>{authUser?.username}</span></Link></div>
            </div>
            <div className='flex items-center justify-center'>24.06.2024 13:07</div>
            <div className='flex items-center justify-end'>
                <ul className='flex items-center gap-2'>
                    <Link >
                        <li>Powiadomienia</li>
                    </Link>
                
                    <Link to={'/game/account'}>
                        <li>Ustawienia</li>
                    </Link>
                
                    
                    <li className='cursor-pointer' onClick={(e)=>{
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
