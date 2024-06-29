import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function InGameLayout() {
    
  return (
    <div className='h-screen'>
        <div className='w-full grid grid-cols-3 py-2 border-b-[1px] border-black px-4 h-10'>
            <div><Link to={'/game/play/admin'}>Admin (Not protected yet!)</Link></div>
            <div className='text-center'>Alakhei</div>
            <div className='text-right'>
                <Link to={'/game'}>Zmień postać</Link>
            </div>
        </div>
        <div className='px-4 h-[calc(100vh_-_80px)] flex justify-center items-center'>
            <Outlet />
        </div>
        <div className='px-4 border-t-[1px] border-black flex items-center justify-between h-10'>
            <Link to={'/game/play/stats'}>Statystyki</Link>
            <Link to={'/game/play/equipment'}>Ekwipunek</Link>
            <Link to={'/game/play/goods'}>Bogactwa</Link>
            <Link to={'/game/play'}>Verentris</Link>
            <Link to={'/game/play'}>Arena Walk</Link>
            <Link to={'/game/play'}>Szpital</Link>
            <Link to={'/game/play'}>Mapa</Link>
            <Link to={'/game/play'}>Bank: 100 000</Link>
            <Link to={'/game/play'}>Gold: 10 000</Link>
            
        </div>
    </div>
  )
}
