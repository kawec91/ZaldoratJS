import React, { useEffect, useState } from 'react';
import avatar1 from '../../../assets/images/avatar1.jpg';
import avatar2 from '../../../assets/images/avatar2.jpg';
import avatar3 from '../../../assets/images/avatar3.jpg';
import { useNavigate } from 'react-router-dom';

export default function CharacterChooseCard({ avatar, name, lvl, lastOnline, characterId }) {
  const [myLastTime, setMyLastTime] = useState("");
  const nav = useNavigate();

  const handleClick = () => {
    // Przechowujemy characterId w localStorage lub w stanie aplikacji
    sessionStorage.setItem('selectedCharacterId', characterId);
    
    // Przekierowujemy na stronę gry
    nav('/game/play');
  };

  const beautyLastTime = (time) => {
    const newTime = new Date(time);
    const days = newTime.getDay();
    const hour = newTime.getHours();
    const minutes = newTime.getMinutes();
    setMyLastTime(`${days}D ${hour}H ${minutes}M`);
  }

  useEffect(()=>{
    beautyLastTime(lastOnline);
  },[]);

  return (
    <div className='w-full bg-black rounded-md h-1/5 flex hover:shadow-md hover:shadow-black hover:duration-300 cursor-pointer' onClick={handleClick}>
      <img src={avatar === "1" ? avatar1 : avatar === "2" ? avatar2 : avatar3} alt='userAvatar' className='h-full w-1/3 rounded-md object-cover' />
      <div className='w-2/3 text-white hover:text-orange-500 px-2 py-2'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl'>{name}</h3>
          <p>Poziom: {lvl}</p>
        </div>
        <hr className='border-white' />
        <p className='h-14 flex items-center justify-center'>Last online: {myLastTime}</p>
        <div className='flex justify-between items-center gap-4'>
          <button className='uppercase text-red-600 font-bold'>Usuń</button>
          <button className='uppercase text-green-600 font-bold' onClick={handleClick}>Graj</button>
        </div>
      </div>
    </div>
  );
}
