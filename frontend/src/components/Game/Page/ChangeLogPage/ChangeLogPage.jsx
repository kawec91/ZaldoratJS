import React from 'react'
import ChangeLogCard from '../../../ChangeLogCard/ChangeLogCard'

export default function ChangeLogPage() {
  return (
    <div className='w-full h-full flex justify-center '>
      <div className='w-1/2 h-full'>
        <h3 className='text-center text-2xl'>Change Log (game version: 0.0.1)</h3>
        <div className='p-4 flex flex-col items-center gap-2 h-[calc(100%_-_35px)] overflow-y-scroll'>
          <ChangeLogCard />
          <ChangeLogCard />
          <ChangeLogCard />
        </div>
      </div>
      
    </div>
  )
}
