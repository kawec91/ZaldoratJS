import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function AdminNavbar() {
  return (
        <div className='w-52 h-full border-r border-black p-2 flex flex-col'>
            <Link to={'/game/play/admin/race'} className='uppercase'>Rasy</Link>
            <Link to={'/game/play/admin/clas'} className='uppercase'>Klasy</Link>
        </div>
  )
}
