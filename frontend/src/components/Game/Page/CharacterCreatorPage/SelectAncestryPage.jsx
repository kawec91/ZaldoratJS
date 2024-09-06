import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';

export default function SelectAncestryPage() {
    const [ancestries, setAncestries] = useState([]); // Lista pochodzeń
    const [selectedAncestry, setSelectedAncestry] = useState(null); // Wybrane pochodzenie
    const navigate = useNavigate();
    const raceId = sessionStorage.getItem('characterRaceId');

    useEffect(() => {
        const fetchAncestries = async () => {
            try {
                const response = await fetch(`/api/ancestries/race/${raceId}`);
                if (!response.ok) {
                    throw new Error('Błąd sieci: ' + response.statusText);
                }
                const data = await response.json();
                setAncestries(data.ancestries); // Ustaw pobrane pochodzenia
            } catch (error) {
                console.error('Błąd podczas pobierania pochodzeń:', error);
            }
        };

        if (raceId) {
            fetchAncestries(); // Wywołaj funkcję tylko jeśli raceId istnieje
        } else {
            console.error("Brak ID rasy w sessionStorage.");
        }
    }, [raceId]);

    const handleAncestrySelection = (ancestry) => {
        setSelectedAncestry(ancestry); // Ustaw wybrane pochodzenie
    };

    const handleNext = () => {
        // Zapisz wybrane pochodzenie w sessionStorage
        sessionStorage.setItem('characterAncestry', selectedAncestry.name);
        sessionStorage.setItem('characterAncestryId', selectedAncestry._id);
        sessionStorage.setItem('ancestryMultipliers', JSON.stringify(selectedAncestry.xpMultipliers)); // Zapisz mnożniki pochodzenia

        navigate('selectclass'); // Przejdź do wyboru klasy
    };

    const renderMultipliers = (multipliers) => {
        if (!multipliers || Object.keys(multipliers).length === 0) {
            return <li>Brak mnożników do wyświetlenia</li>;
        }
        
        return Object.entries(multipliers)
            .filter(([key, value]) => value !== 0) // Filtruj mnożniki różne od 0
            .map(([key, value]) => (
                <li key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: <span className="font-medium">{value}</span>
                </li>
            ));
    };

    return (
        <div>
            <ProgressBar currentStep={1} /> {/* Ustawia obecny krok na 1 (Wybór Pochodzenia) */}
            <h1>Wybierz pochodzenie</h1>
            <div className="flex">
                {/* Left side: Ancestry List */}
                <div className="w-1/3 p-4 border-r border-gray-300">
                    <h2 className="text-xl font-bold mb-4">Wybierz swoje pochodzenie</h2>
                    <ul>
                        {ancestries.length > 0 ? (
                            ancestries.map((ancestry) => (
                                <li
                                    key={ancestry._id}
                                    onClick={() => handleAncestrySelection(ancestry)}
                                    className={`cursor-pointer p-2 rounded hover:bg-gray-200 ${selectedAncestry && selectedAncestry._id === ancestry._id ? 'bg-gray-300' : ''}`}
                                >
                                    {ancestry.name}
                                </li>
                            ))
                        ) : (
                            <li>Brak dostępnych pochodzeń dla wybranej rasy.</li>
                        )}
                    </ul>
                </div>
    
                {/* Right side: Selected Ancestry Details */}
                <div className="w-2/3 p-4">
                    {selectedAncestry ? (
                        <>
                            <h2 className="text-xl font-bold">{selectedAncestry.name}</h2>
                            <p className="mt-2">{selectedAncestry.description}</p>
                            
                            {/* Display Crafting Stats */}
                            <h3 className="text-lg font-semibold mt-4">Umiejętności Rzemieślnicze:</h3>
                            <ul className="mt-2">
                                {renderMultipliers(selectedAncestry.xpMultipliers)} {/* Wyświetl tylko mnożniki różne od 0 */}
                            </ul>
                            
                            <button
                                onClick={handleNext}
                                disabled={!selectedAncestry}
                                className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400`}
                            >
                                Dalej
                            </button>
                        </>
                    ) : (
                        <p className="mt-4">Wybierz pochodzenie, aby zobaczyć szczegóły.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
