import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      {/* <Outlet /> */}
      <div className='w-full bottom-0 left 0 flex items-center justify-between p-4'>
        <div className='text-myLightCream'>&copy; 2024 Team Zaldorat</div>
        <div className='flex items-center justify-center gap-2'>
          <Link to={'https://discord.gg/GGKGQtn5Sb'} target='_blank'><p>Discord</p></Link>
          <p>Facebook</p>
          <p>X</p>
        </div>
      </div>
    </>
    
  )
}
