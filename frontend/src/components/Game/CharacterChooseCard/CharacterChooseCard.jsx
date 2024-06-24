import React from 'react'

export default function CharacterChooseCard({avatar,name,lvl, lastOnline}) {
  return (
    <div className='border-[1px] border-black p-6 rounded-md flex justify-center gap-4 w-1/3'>
        <div className='w-52 bg-gray-700 rounded-md'></div>
        <div className='w-full'>
            <div className='flex items-center justify-between'>
            <h3 className='text-2xl'>{name}</h3>
            <p>Poziom: {lvl}</p>
            </div>
            <hr className='border-black'/>
            <p>HP: 100%</p>
            <p>Mana: 100%</p>
            <p>Gold: 10 000</p>
            <p>Bank: 100 000</p>
            <p>Last online: {lastOnline}</p>
            <div className='flex py-2 items-center gap-4'>
                <button className='px-4 py-2 text-white uppercase bg-red-600 rounded-md'>Usuń</button>
                <button className='px-4 py-2 text-white uppercase bg-green-600 rounded-md'>Graj</button>
            </div>
        </div>
    </div>
  )
}
