import React from 'react'

export default function KingdomsListCard({number, img, title, text}) {
    let c = number % 2;

    const imgStyle = `h-72 w-72 rounded-xl`
    const titleStyle = `text-2xl px-6`
    const textStyle = `p-6`
  return (
    <div className='flex items-center justify-center w-3/4 border border-[1px]-white rounded-xl'>
        
        {c === 0 ? <img src={img} alt='Herb Krolestwa' className={imgStyle}/> : <div>
            <h3 className={titleStyle}>{title}</h3>
            <p className={textStyle}>{text}</p>
        </div>}
        {c === 0 ? <div>
            <h3 className={titleStyle}>{title}</h3>
            <p className={textStyle}>{text}</p>
        </div> : <img src={img} alt='Herb Krolestwa' className={imgStyle}/>}
        
        
    </div>
  )
}
