import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SelectDeityPage() {
    const [selectedDeity, setSelectedDeity] = useState('');
    const navigate = useNavigate();

    const handleDeitySelection = (deity) => {
        setSelectedDeity(deity);
    };

    const handleNext = () => {
        // Przechowaj wybrane wyznanie w sessionStorage
        sessionStorage.setItem('characterDeity', selectedDeity);
        // Przejdź do kolejnego etapu, np. ekranu podsumowania lub wyboru ekwipunku
        navigate('selectgender');
    };

    return (
        <div>
            <h1>Wybierz swoje wyznanie</h1>
            <div>
                <button onClick={() => handleDeitySelection('Zeus')}>Zeus</button>
                <button onClick={() => handleDeitySelection('Athena')}>Athena</button>
                <button onClick={() => handleDeitySelection('Hades')}>Hades</button>
                {/* Dodaj więcej wyznań */}
            </div>
            <button onClick={handleNext} disabled={!selectedDeity}>
                Dalej
            </button>
        </div>
    );
}
