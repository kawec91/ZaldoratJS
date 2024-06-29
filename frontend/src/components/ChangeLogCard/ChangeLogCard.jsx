import React from 'react';
import { TbAlertOctagon } from "react-icons/tb";
import { LuAlertCircle } from "react-icons/lu";
import { MdDoneOutline } from "react-icons/md";



export default function ChangeLogCard() {
  return (
    <div className='border-[1px] border-black rounded-md w-full '>
        <div className='flex items-center justify-between border-b-[1px] border-black p-2'>
            <div className='flex items-center gap-1'>
                <div><TbAlertOctagon className='text-red-600 text-2xl'/></div>
                <div>Bogactwa</div>
            </div>
            <div className='text-sm'>29.06.2024 17:58</div>
        </div>
        <div className='flex items-center'>
            <div className='w-full border-r-[1px] border-black p-2'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>
            <div className='p-2 w-28 flex flex-col items-center gap-2'>
                <div className='text-4xl text-center'>20</div>
                <div className='text-sm text-green-600 text-center cursor-pointer'>Oddaj głos</div>
            </div>
        </div>
        <div className='p-2 border-t-[1px] border-black flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <div className='flex text-sm gap-1 items-center'>
                    <MdDoneOutline className='text-xl text-green-600'/>
                    <p>Backend:</p>
                    <p>Done</p>
                </div>
                <div className='flex text-sm gap-1 items-center'>
                    <LuAlertCircle className='text-xl text-yellow-600'/>
                    <p>Frontend:</p>
                    <p>In progress</p>
                </div>
            </div>
            <div className='text-sm'>Author: Alakhei</div>
        </div>
    </div>
  )
}
