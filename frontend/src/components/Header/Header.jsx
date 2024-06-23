import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Header() {
  return (
  <>
        <div className=''>
            <ul className='flex items-center justify-center gap-2'>
                <Link to={'/'}>
                    <li>Strona Główna</li>
                </Link>
                <Link to={'/register'}>
                    <li>Rejestracja</li>
                </Link>
                <Link to={'login'}>
                    <li>Login</li>
                </Link>
                <Link to={'faq'}>
                    <li>FAQ</li>
                </Link>
            </ul>
        </div>
        <Outlet />
    </>
  )
}
