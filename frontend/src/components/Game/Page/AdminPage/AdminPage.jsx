import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import AdminNavbar from '../../../AdminNavbar/AdminNavbar'

export default function AdminPage() {
  return (
    <div className='w-full h-full'>
      <AdminNavbar />
      <Outlet />
    </div>
  )
}
