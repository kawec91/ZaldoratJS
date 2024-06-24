import React from 'react'
import CharacterChooseCard from '../../CharacterChooseCard/CharacterChooseCard'

export default function AccountPage() {
    const data = [
        {
        characterName: 'Alakhei',
        characterLvl: 33,
        characterAvatar: '',
        lastOnline: '20h ago'
    },
        {
        characterName: 'Araxagus',
        characterLvl: 47,
        characterAvatar: '',
        lastOnline: '3h ago'
    },
        {
        characterName: 'Ni',
        characterLvl: 58,
        characterAvatar: '',
        lastOnline: '12h ago'
    },
]

  return (
    <div>
        <div className='w-full border-b-[1px] border-black'>
            <div className='py-2 px-4 grid grid-cols-3'>
                <p>Tip: Pamiętaj. Możesz posiadać makasymalnie 5 postaci.</p>
                <p className='text-center'>Postaci: 3 / 5</p>
                <div className='text-right'>
                    <p>Utwórz pstać</p>
                </div>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-4 py-4'>
           <CharacterChooseCard name={data[0].characterName} lvl={data[0].characterLvl} lastOnline={data[0].lastOnline}/>
           <CharacterChooseCard name={data[1].characterName} lvl={data[1].characterLvl} lastOnline={data[1].lastOnline}/>
           <CharacterChooseCard name={data[2].characterName} lvl={data[2].characterLvl} lastOnline={data[2].lastOnline}/>
        </div>
    </div>
  )
}
