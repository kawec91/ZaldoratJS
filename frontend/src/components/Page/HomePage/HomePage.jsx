import React from 'react'
import ZaldoratLogo from '../../../assets/images/zaldoratLogo.png'
import SectionTitle from '../../SectionTitle/SectionTitle'
import KingdomsList from '../../KingdomsList/KingdomsList'
import Footer from '../../Footer/Footer'

export default function HomePage() {
  return (
    <>
    <div className='min-h-screen text-secondary flex justify-start items-center flex-col bg-gradient-to-br from-red-900 via-zinc-900 to-red-900'>
      <img src={ZaldoratLogo} alt='game logo' className='h-1/2 w-1/2 my-20'/>
      <section className='h-full border-t-[1px] border-white'>
        <SectionTitle title={'Królestwa'} />
        <KingdomsList />
      </section>
      <Footer />
    </div>
    
    </>
  )
}
