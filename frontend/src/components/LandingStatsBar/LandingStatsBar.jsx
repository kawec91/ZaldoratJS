import React from 'react'
import guildsHerb from "../../assets/icons/guilds.png"
import userIcon from "../../assets/icons/user.png"
import achivIcon from "../../assets/icons/star-half.png"

const LandingStatsBar = () => {
  return (
    <div className='flex w-full items-center justify-center gap-4 text-myGoldenYellow font-serif font-bold py-8'>
        <div className='flex items-center justify-center gap-4'>
            <img src={userIcon} alt='Herb Gildii' className='h-14 w-14'/>
            <p className='text-xl'>254 Postacie</p>
        </div>
        <div className='flex items-center justify-center gap-4'>
            <img src={guildsHerb} alt='Herb Gildii' className='h-12 w-12'/>
            <p className='text-xl'>34 Gildie</p>
        </div>
        <div className='flex items-center justify-center gap-4'>
            <img src={achivIcon} alt='Herb Gildii' className='h-12 w-12'/>
            <p className='text-xl'>100 Osiągnięć</p>
        </div>
    </div>
  )
}

export default LandingStatsBar