import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        navigate('summary');
    };

    return (
        <div>
            <h1>Wybierz płeć swojej postaci</h1>
            <div>
                <button onClick={() => handleGenderSelection('Male')}>Male</button>
                <button onClick={() => handleGenderSelection('Female')}>Female</button>
                <button onClick={() => handleGenderSelection('Zjeb')}>Zjeb</button>
                {/* Dodaj więcej opcji, jeśli to potrzebne */}
            </div>
            <button onClick={handleNext} disabled={!selectedGender}>
                Dalej
            </button>
        </div>
    );
}
