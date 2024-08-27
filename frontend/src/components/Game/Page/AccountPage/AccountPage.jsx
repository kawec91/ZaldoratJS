import React from 'react'
import CharacterChooseCard from '../../CharacterChooseCard/CharacterChooseCard'
import CharacterCreateCard from '../../CharacterCreateCard/CharacterCreateCard'


export default function AccountPage() {
    const data = [
        {
        characterName: 'Alakhei',
        characterLvl: 33,
        characterAvatar: '3',
        lastOnline: '20h ago'
    },
        {
        characterName: 'Araxagus',
        characterLvl: 47,
        characterAvatar: '1',
        lastOnline: '3h ago'
    },
        {
        characterName: 'Ni',
        characterLvl: 58,
        characterAvatar: '2',
        lastOnline: '12h ago'
    },
]

  return (
    <div className='h-[calc(100vh_-_50px)]'>
        <div className='w-full border-b-[1px] border-black'>
            <div className='py-2 px-4 grid grid-cols-3'>
                <p>Tip: Pamiętaj. Możesz posiadać makasymalnie 5 postaci.</p>
                <p className='text-center'>Postaci: 3 / 5</p>
                <div className='text-right'>
                    <p>Utwórz postać</p>
                </div>
            </div>
        </div>
        <div className='flex'>
           <div className=' h-[calc(100vh_-_90px)] w-1/4 p-2 flex flex-col gap-2'>
           {data.map((item)=><CharacterChooseCard avatar={item.characterAvatar} name={item.characterName} lvl={item.characterLvl} lastOnline={item.lastOnline}/>)}          </div>
           <div className='w-2/4 p-2'>
            <div className='bg-black/80 flex flex-col items-center rounded-md h-[calc(100vh_-106px)] '>
                <h3 className='text-center text-white text-2xl py-2'>Wieści</h3>
                <hr className='border-white w-3/4 mb-4'/>
                <div className='w-full h-full py-2 px-4 text-white overflow-y-scroll'>
                What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Where can I get some?
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                </div>
            </div>
           </div>
           <div className='w-1/4'></div>
        </div>
    </div>
  )
}
