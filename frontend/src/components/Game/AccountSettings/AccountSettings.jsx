import React from 'react'
import { FaUserCircle } from "react-icons/fa";

export default function AccountSettings() {
  return (
    <div className='flex flex-col items-center py-4'>
      <div>
        <FaUserCircle className='h-72 w-72'/>
        <div className='text-center'>
          <label>Avatar: </label>
          <input type='file' hidden/>
          <a className='underline'>Zmień</a>
        </div>
      </div>
      <div>
        <label>E-mail: </label>
        <a className='underline'>Zmień</a>
      </div>
      <div>
        <label>Hasło: </label>
        <a className='underline'>Zmień</a>
      </div>
    </div>
  )
}
