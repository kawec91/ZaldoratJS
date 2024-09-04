import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function InGameLayout() {
    const [selectedItem, setSelectedItem] = useState(null);

    const bottomMenu = [
        {
            id: 1,
            name: "Statystyki",
            link: "/game/play/stats"
        },
        {
            id: 2,
            name: "Ekwipunek",
            link: "/game/play/equipment"
        },
        {
            id: 3,
            name: "Bogactwa",
            link: "/game/play/goods"
        },
        {
            id: 4,
            name: "Verentris",
            link: "/game/play/"
        },
        {
            id: 5,
            name: "Podróż",
            link: "/game/play/travel"
        },
        {
            id: 6,
            name: "Arena Walk",
            link: "/game/play/stats"
        },
        {
            id: 7,
            name: "Szpital",
            link: "/game/play/"
        },
        {
            id: 8,
            name: "Mapa",
            link: "/game/play/"
        },
        {
            id: 9,
            name: "Bank: 100 000",
            link: "/game/play/"
        },
        {
            id: 10,
            name: "Gold: 10 000",
            link: "/game/play/"
        },
    ];

    const handleCharacterChange = () => {
        sessionStorage.removeItem("selectedCharacterId");
    }

    const handleBottomMenuChoice = (id) => {
        console.log('hbmc', id);
        setSelectedItem(id);
        console.log(selectedItem)
    }
    
  return (
    <div className='h-screen'>
        <div className='w-full grid grid-cols-3 py-2 border-b-[1px] border-black px-4 h-10'>
            <div><Link to={'/game/play/admin'}>Admin (Not protected yet!)</Link></div>
            <div className='text-center'>Alakhei</div>
            <div className='text-right'>
                <Link to={'/game'} onClick={handleCharacterChange}>Zmień postać</Link>
            </div>
        </div>
        <div className='px-4 h-[calc(100vh_-_80px)] flex justify-center items-center'>
            <Outlet />
        </div>
        <div className='px-4 border-t-[1px] border-black flex items-center justify-between h-10'>
            {bottomMenu.map((item) => <p key={`${item.id}-${item.name}`} onClick={() => handleBottomMenuChoice(item.id)} ><Link className={`${selectedItem === item.id ? 'bg-slate-400' : ''}`} key={`${item.name}-${item.link}`} to={item.link}>{item.name}</Link></p>)}
        </div>
    </div>
  )
}
