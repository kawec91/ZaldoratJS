import React, { useState } from 'react';
import { defaultInput } from '../../Styles/style.js';

export default function LoginPage() {
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        nick: '',
        name: '',
        password: '',
        password2: '',
    });
    const handleChanges = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        })
        console.log(newUser);
    }

    const sendData = (e) => {
        e.preventDefault();
        console.log('Send');
    }

    const isError = false;
  return (
    <div className='h-screen w-full flex items-center justify-center'>
        <div className='border-[1px] border-black p-6 w-1/4'>
            <form className='flex flex-col items-center justify-center gap-4' onSubmit={(e) => {sendData(e)}}>
                <input placeholder='Login' type='text' name='username' onChange={(e) => handleChanges(e)} className={defaultInput}/>
                <input placeholder='Hasło' type='password' name='password' onChange={(e) => handleChanges(e)} className={defaultInput}/>
                <button type='submit'>Zaloguj</button>
                {!isError ? <></> : <p className='text-red-600'>Something went wrong.</p>}
            </form>
        </div>
    </div>
  )
}
