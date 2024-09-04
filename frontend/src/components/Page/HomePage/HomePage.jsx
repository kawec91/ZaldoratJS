import React from 'react'
import ZaldoratLogo from '../../../assets/images/zaldoratLogo.png'
import SectionTitle from '../../SectionTitle/SectionTitle'
import KingdomsList from '../../KingdomsList/KingdomsList'
import LandingStatsBar from '../../LandingStatsBar/LandingStatsBar'

export default function HomePage() {
  return (
    <>
    <div className='min-h-screen text-secondary flex justify-start items-center flex-col '>
      <section className='h-1/2 w-full bg-gradient-to-br from-red-900 via-zinc-900 to-red-900 py-20 flex items-center justify-center'>
        <img src={ZaldoratLogo} alt='game logo' className='h-1/2 w-1/2 object-cover'/>
      </section>
      
      <section className='h-full w-full pb-20 bg-gradient-to-bl from-red-900 via-zinc-900 to-red-900 relative'>
        <LandingStatsBar />
        <SectionTitle title={'Królestwa'} />
        <KingdomsList />
      </section>
    </div>
    
    </>
  )
}
