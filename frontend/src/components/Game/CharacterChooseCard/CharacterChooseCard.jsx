import React from 'react'
import avatar1 from '../../../assets/images/avatar1.jpg'
import avatar2 from '../../../assets/images/avatar2.jpg'
import avatar3 from '../../../assets/images/avatar3.jpg'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export default function CharacterChooseCard({avatar,name,lvl, lastOnline}) {
  const nav = useNavigate();
  const handleClick = ()=> {
   nav('/game/play');
  }
  return (
   
      <div className='w-full bg-black rounded-md h-1/5 flex hover:shadow-md hover:shadow-black hover:duration-300 cursor-pointer' onClick={handleClick}>
          <img src={avatar === "1" ? avatar1 : avatar === "2" ? avatar2 : avatar3} alt='userAvatar' className='h-full w-1/3 rounded-md object-cover'/>
          <div className='w-2/3 text-white hover:text-orange-500 px-2 py-2'>
              <div className='flex items-center justify-between'>
              <h3 className='text-xl'>{name}</h3>
              <p>Poziom: {lvl}</p>
              </div>
              <hr className='border-white'/>
              <p className='h-14 flex items-center justify-center'>Last online: {lastOnline}</p>
              <div className='flex justify-between items-center gap-4'>
                  <button className='uppercase text-red-600 font-bold'>Usuń</button>
                  <button className='uppercase text-green-600 font-bold'>Graj</button>
              </div>
          </div>
      </div>
  )
}
