import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';

export default function SelectRacePage() {
    const [races, setRaces] = useState([]); // Lista ras
    const [selectedRace, setSelectedRace] = useState(null); // Wybrana rasa
    const navigate = useNavigate();

    useEffect(() => {
        // Funkcja do pobierania ras z API
        const fetchRaces = async () => {
            try {
                const response = await fetch('/api/races/getall'); // Zmodyfikuj zgodnie z Twoim API
                const data = await response.json();
                setRaces(data); // Ustaw pobrane rasy
            } catch (error) {
                console.error('Błąd podczas pobierania ras:', error);
            }
        };

        fetchRaces(); // Wywołaj funkcję
    }, []);

    const handleRaceSelection = (race) => {
        setSelectedRace(race); // Ustaw wybraną rasę
    };

    const handleNext = () => {
        // Zapisz wybraną rasę w sessionStorage
        sessionStorage.setItem('characterRace', selectedRace.name);
        sessionStorage.setItem('characterRaceId', selectedRace._id);
        // Przejdź do wyboru klasy
        navigate('selectancestry');
    };

    const renderMultipliers = (multipliers) => {
        return Object.entries(multipliers)
            .filter(([key, value]) => value !== 0) // Filtruj mnożniki różne od 0
            .map(([key, value]) => (
                <li key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: <span className="font-medium">{value}</span>
                </li>
            ));
    };

    return (
        <div className="flex flex-col">
            {/* Opis kroku */}
            <div className="w-full p-4">
                <ProgressBar currentStep={0} /> {/* Ustawia obecny krok na 0 (Wybór Rasy) */}
            </div>

            <div className="flex flex-row w-full">
                {/* Lista ras */}
                <div className="w-1/3 p-4 border-r border-gray-300">
                    <h2 className="text-xl font-bold mb-4">Wybierz swoją rasę</h2>
                    <ul className="flex flex-col">
                        {races.map((race) => (
                            <li 
                                key={race._id} 
                                onClick={() => handleRaceSelection(race)} 
                                className={`cursor-pointer p-2 rounded hover:bg-gray-200 ${selectedRace && selectedRace._id === race._id ? 'bg-gray-300' : ''}`}
                            >
                                {race.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Opis wybranej rasy */}
                <div className="w-2/3 p-4">
                    {selectedRace ? (
                        <>
                            <h2 className="text-xl font-bold">{selectedRace.name}</h2>
                            <p className="mt-2">{selectedRace.description}</p>
                            <h3 className="mt-4 text-lg font-semibold">Mnożniki:</h3>
                            <ul className="mt-2">
                                {renderMultipliers(selectedRace.xpMultipliers)} {/* Wyświetl tylko mnożniki różne od 0 */}
                            </ul>
                            <button 
                                onClick={handleNext} 
                                disabled={!selectedRace} 
                                className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400`}
                            >
                                Dalej
                            </button>
                        </>
                    ) : (
                        <p className="mt-4">Wybierz rasę, aby zobaczyć szczegóły.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
