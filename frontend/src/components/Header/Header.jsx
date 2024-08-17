import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Header() {
  return (
  <>
        <div className='fixed left-1/2 -translate-x-1/2 top-4 rounded-full bg-secondary/75 px-4 py-2 '>
            <ul className='flex items-center justify-center gap-4 text-black'>
                <Link to={'/'}>
                    <li className='hover:text-white'>Strona Główna</li>
                </Link>
                <Link to={'/register'}>
                    <li className='hover:text-white'>Rejestracja</li>
                </Link>
                <Link to={'/login'}>
                    <li className='hover:text-white'>Login</li>
                </Link>
                <Link to={'/faq'}>
                    <li className='hover:text-white'>FAQ</li>
                </Link>
            </ul>
        </div>
        <Outlet />
    </>
  )
}
