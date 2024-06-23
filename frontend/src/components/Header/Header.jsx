import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Header() {
  return (
  <>
        <div className='fixed left-1/2 -translate-x-1/2 top-4 rounded-full bg-black/75 px-4 py-2'>
            <ul className='flex items-center justify-center gap-4 text-white'>
                <Link to={'/'}>
                    <li>Strona Główna</li>
                </Link>
                <Link to={'/register'}>
                    <li>Rejestracja</li>
                </Link>
                <Link to={'/login'}>
                    <li>Login</li>
                </Link>
                <Link to={'/faq'}>
                    <li>FAQ</li>
                </Link>
            </ul>
        </div>
        <Outlet />
    </>
  )
}
