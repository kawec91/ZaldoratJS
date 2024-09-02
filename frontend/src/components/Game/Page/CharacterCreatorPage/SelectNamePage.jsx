import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';

export default function SelectNamePage() {
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Zapisz imię postaci w sessionStorage
        sessionStorage.setItem('nickname', nickname);
        // Przejdź do następnej strony
        navigate('summary'); // Przykład, zmień na odpowiednią ścieżkę
    };

    return (
        <div className="flex flex-col items-center">
            {/* Pasek postępu */}
            <div className="w-full p-4">
                <ProgressBar currentStep={4} /> {/* Ustawia obecny krok na 4 (Nadanie Imienia) */}
            </div>

            <div className="flex flex-col items-center w-full p-4">
                <h2 className="text-xl font-bold mb-4">Nadanie imienia postaci</h2>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <label className="mb-2">
                        Imię:
                        <input 
                            type="text" 
                            value={nickname} 
                            onChange={(e) => setNickname(e.target.value)} 
                            required 
                            className="border border-gray-300 p-2 rounded mt-1"
                        />
                    </label>
                    <button 
                        type="submit" 
                        className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400`}
                    >
                        Zatwierdź
                    </button>
                </form>
            </div>
        </div>
    );
}
