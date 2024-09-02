import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SelectClassPage() {
    const [selectedClass, setSelectedClass] = useState('');
    const navigate = useNavigate();

    const handleClassSelection = (characterClass) => {
        setSelectedClass(characterClass);
    };

    const handleNext = () => {
        // Przechowaj wybraną klasę w sessionStorage
        sessionStorage.setItem('characterClass', selectedClass);
        // Przejdź do kolejnego etapu lub ekranu wyboru wyznania
        navigate('selectdeity');
    };

    return (
        <div>
            <h1>Wybierz swoją klasę</h1>
            <div>
                <button onClick={() => handleClassSelection('Warrior')}>Warrior</button>
                <button onClick={() => handleClassSelection('Mage')}>Mage</button>
                <button onClick={() => handleClassSelection('Rogue')}>Rogue</button>
                {/* Dodaj więcej klas */}
            </div>
            <button onClick={handleNext} disabled={!selectedClass}>
                Dalej
            </button>
        </div>
    );
}
