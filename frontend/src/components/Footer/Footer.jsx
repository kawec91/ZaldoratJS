import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <Outlet />
      <div className='w-full fixed bottom-0 left 0 flex items-center justify-between p-4 border-t-[1px] border-black'>
        <div>&copy; 2024 Team Zaldorant</div>
        <div className='flex items-center justify-center gap-2'>
          <p>Discord</p>
          <p>Facebook</p>
          <p>X</p>
        </div>
      </div>
    </>
    
  )
}
