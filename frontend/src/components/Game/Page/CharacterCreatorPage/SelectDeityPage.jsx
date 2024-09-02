import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';

export default function SelectDeityPage() {
    const [deities, setDeities] = useState([]); // Lista bóstw
    const [selectedDeity, setSelectedDeity] = useState(null); // Wybrane bóstwo
    const navigate = useNavigate();

    useEffect(() => {
        // Funkcja do pobierania bóstw z API
        const fetchDeities = async () => {
            try {
                const response = await fetch('/api/deities/getall'); // Zmodyfikuj zgodnie z Twoim API
                const data = await response.json();
                setDeities(data); // Ustaw pobrane bóstwa
            } catch (error) {
                console.error('Błąd podczas pobierania bóstw:', error);
            }
        };

        fetchDeities(); // Wywołaj funkcję
    }, []);

    const handleDeitySelection = (deity) => {
        setSelectedDeity(deity); // Ustaw wybrane bóstwo
    };

    const handleNext = () => {
        // Zapisz wybrane bóstwo w sessionStorage
        sessionStorage.setItem('characterDeity', selectedDeity.name);
        // Przejdź do wyboru płci
        navigate('selectgender');
    };

    return (
        <div className="flex flex-col">
            {/* Pasek postępu */}
            <div className="w-full p-4">
                <ProgressBar currentStep={3} /> {/* Ustawia obecny krok na 2 (Wybór Bóstwa) */}
            </div>

            <div className="flex flex-row w-full">
                {/* Lista bóstw */}
                <div className="w-1/3 p-4 border-r border-gray-300">
                    <h2 className="text-xl font-bold mb-4">Wybierz swoje bóstwo</h2>
                    <ul className="flex flex-col">
                        {deities.map((deity) => (
                            <li 
                                key={deity._id} 
                                onClick={() => handleDeitySelection(deity)} 
                                className={`cursor-pointer p-2 rounded hover:bg-gray-200 ${selectedDeity && selectedDeity._id === deity._id ? 'bg-gray-300' : ''}`}
                            >
                                {deity.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Opis wybranego bóstwa */}
                <div className="w-2/3 p-4">
                    {selectedDeity ? (
                        <>
                            <h2 className="text-xl font-bold">{selectedDeity.name}</h2>
                            <p className="mt-2">{selectedDeity.description}</p>
                            <button 
                                onClick={handleNext} 
                                disabled={!selectedDeity} 
                                className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400`}
                            >
                                Dalej
                            </button>
                        </>
                    ) : (
                        <p className="mt-4">Wybierz bóstwo, aby zobaczyć szczegóły.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
