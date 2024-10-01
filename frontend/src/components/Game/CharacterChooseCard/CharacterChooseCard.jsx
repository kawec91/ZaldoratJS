import React, { useEffect, useState, useRef } from 'react';
import avatar1 from '../../../assets/images/avatar1.jpg';
import avatar2 from '../../../assets/images/avatar2.jpg';
import avatar3 from '../../../assets/images/avatar2.jpg';
import { useNavigate } from 'react-router-dom';
import loadingVideo from '../../../components/Game/CharacterChooseCard/loading.mp4'; // Import video

export default function CharacterChooseCard({ avatar, name, lvl, lastOnline, characterId }) {
  const [myLastTime, setMyLastTime] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const nav = useNavigate();

  const handleClick = () => {
    sessionStorage.setItem('selectedCharacterId', characterId);
    setIsAnimating(true);

    // Set a timeout for the navigation after the video animation
    setTimeout(() => {
      nav('/game/play');
    }, 3000); // 3000ms = 5 seconds
  };

  const handleDeleteCharacter = async () => {
    const confirmation = window.confirm("Are you sure you want to delete this character?");
    if (confirmation) {
      try {
        const response = await fetch(`/api/characters/${characterId}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Failed to delete character');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const beautyLastTime = (time) => {
    const newTime = new Date(time);
    const days = newTime.getUTCDate() - 1;
    const hours = newTime.getUTCHours();
    const minutes = newTime.getUTCMinutes();
    setMyLastTime(`${days}D ${hours}H ${minutes}M`);
  };

  useEffect(() => {
    beautyLastTime(lastOnline);
  }, [lastOnline]);

  return (
    <div className='relative w-full bg-black rounded-md h-1/5 flex hover:shadow-md hover:shadow-black hover:duration-300 cursor-pointer'>
      <img 
        src={avatar === "1" ? avatar1 : avatar === "2" ? avatar2 : avatar3} 
        alt='userAvatar' 
        className='h-full w-1/3 rounded-md object-cover' 
      />
      <div className='w-2/3 text-white px-2 py-2'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl'>{name}</h3>
          <p>Poziom: {lvl}</p>
        </div>
        <hr className='border-white' />
        <p className='h-14 flex items-center justify-center'>Last online: {myLastTime}</p>
        <div className='flex justify-between items-center gap-4'>
          <button 
            className='uppercase text-red-600 font-bold' 
            onClick={handleDeleteCharacter}
          >
            Usuń Postać
          </button>
          <button 
            className='uppercase text-green-600 font-bold' 
            onClick={handleClick}
          >
            Graj
          </button>
        </div>
      </div>

      {isAnimating && (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black z-50">
    <video 
      src={loadingVideo} // Use the imported video
      autoPlay 
      loop 
      muted 
      className="w-auto h-auto max-w-full max-h-full"
    />
  </div>
)}
      
    </div>
  );
}
