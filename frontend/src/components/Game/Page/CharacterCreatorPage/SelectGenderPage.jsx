import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';

export default function SelectGenderPage() {
    const [selectedGender, setSelectedGender] = useState('');
    const navigate = useNavigate();

    const handleGenderSelection = (gender) => {
        setSelectedGender(gender);
    };

    const handleNext = () => {
        // Przechowaj wybraną płeć w sessionStorage
        sessionStorage.setItem('characterGender', selectedGender);
        // Przejdź do kolejnego etapu, np. ekranu podsumowania lub wyboru imienia
        navigate('selectname');
    };

    return (
        <div className="flex flex-col">
            {/* Pasek postępu */}
            <div className="w-full p-4">
                <ProgressBar currentStep={4} /> {/* Ustawia obecny krok na 3 (Wybór Płci) */}
            </div>

            <div className="flex flex-col items-center w-full p-4">
                <h2 className="text-xl font-bold mb-4">Wybierz płeć swojej postaci</h2>
                <div className="flex flex-row space-x-4">
                    <button 
                        onClick={() => handleGenderSelection('Male')}
                        className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${selectedGender === 'Male' ? 'bg-blue-800' : ''}`}
                    >
                        Mężczyzna
                    </button>
                    <button 
                        onClick={() => handleGenderSelection('Female')}
                        className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${selectedGender === 'Female' ? 'bg-blue-800' : ''}`}
                    >
                        Kobieta
                    </button>
                    <button 
                        onClick={() => handleGenderSelection('Zjeb')}
                        className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${selectedGender === 'Zjeb' ? 'bg-blue-800' : ''}`}
                    >
                        Zjeb
                    </button>
                    {/* Dodaj więcej opcji, jeśli to potrzebne */}
                </div>
                <button 
                    onClick={handleNext} 
                    disabled={!selectedGender} 
                    className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400`}
                >
                    Dalej
                </button>
            </div>
        </div>
    );
}
