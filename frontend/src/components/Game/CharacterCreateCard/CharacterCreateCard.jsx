import React from 'react'
import { Link } from 'react-router-dom'

export default function CharacterCreateCard() {
  return (
    <Link to={'/game/new-character'} className='w-full bg-black/85 rounded-md h-1/5 flex items-center justify-center uppercase text-xl text-white cursor-pointer hover:text-orange-500'>
        <p>Utwórz postać</p>
    </Link>
  )
}
