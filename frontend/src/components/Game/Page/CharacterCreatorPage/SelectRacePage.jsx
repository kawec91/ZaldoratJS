import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SelectRacePage() {
    const [selectedRace, setSelectedRace] = useState('');
    const navigate = useNavigate();

    const handleRaceSelection = (race) => {
        setSelectedRace(race);
    };

    const handleNext = () => {
        // Przechowaj wybraną rasę w sessionStorage
        sessionStorage.setItem('characterRace', selectedRace);
        // Przejdź do wyboru klasy
        navigate('selectclass');
    };

    return (
        <div>
            <h1>Wybierz swoją rasę</h1>
            <div>
                <button onClick={() => handleRaceSelection('Human')}>Human</button>
                <button onClick={() => handleRaceSelection('Elf')}>Elf</button>
                <button onClick={() => handleRaceSelection('Dwarf')}>Dwarf</button>
                {/* Dodaj więcej ras */}
            </div>
            <button onClick={handleNext} disabled={!selectedRace}>
                Dalej
            </button>
        </div>
    );
}
