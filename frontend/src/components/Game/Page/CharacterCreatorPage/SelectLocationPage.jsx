import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';

export default function SelectLocationPage({ authUser }) {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const navigate = useNavigate();

    // Definicja lokacji
    const locations = [
        { name: 'Wioska Elfów', description: 'Zamieszkała przez elfy, piękna i spokojna.', premium: false },
        { name: 'Wioska Krasnoludów', description: 'Podziemne miasto pełne rzemieślników.', premium: false },
        { name: 'Wioska Ludzi', description: 'Typowa wioska zamieszkała przez ludzi.', premium: false },
        { name: 'Verentris', description: 'Wielkie miasto pełne możliwości.', premium: true }
    ];

    const handleLocationSelection = (location) => {
        setSelectedLocation(location);
    };

    const handleNext = () => {
        if (selectedLocation) {
            sessionStorage.setItem('characterLocation', selectedLocation.name);
            navigate('summary'); // Zmień na odpowiednią ścieżkę
        }
    };

    const handleBuyPremium = () => {
        navigate('/buypremium');
    };

    // Sprawdzenie, czy użytkownik ma dostęp do premium
    const isPremiumAllowed = authUser && (authUser.status === 'admin' || authUser.status === 'vip');

    return (
        <div className="flex flex-col">
            <div className="w-full p-4">
                <ProgressBar currentStep={6} /> {/* Ustawia obecny krok na 6 (Wybór Lokacji) */}
            </div>

            <div className="flex flex-row w-full">
                {/* Lista lokacji */}
                <div className="w-1/3 p-4 border-r border-gray-300">
                    <h2 className="text-xl font-bold mb-4">Wybierz swoją lokację początkową</h2>
                    <ul className="flex flex-col">
                        {locations.map((location) => (
                            <li
                                key={location.name}
                                onClick={() => handleLocationSelection(location)}
                                className={`cursor-pointer p-2 rounded hover:bg-gray-200 ${selectedLocation && selectedLocation.name === location.name ? 'bg-gray-300' : ''}`}
                            >
                                {location.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Opis wybranej lokacji */}
                <div className="w-2/3 p-4">
                    {selectedLocation ? (
                        <>
                            <h2 className="text-xl font-bold">{selectedLocation.name}</h2>
                            <p className="mt-2">{selectedLocation.description}</p>
                            {selectedLocation.premium && !isPremiumAllowed ? (
                                <button
                                    onClick={handleBuyPremium}
                                    className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Kup Premium, aby odblokować
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Dalej
                                </button>
                            )}
                        </>
                    ) : (
                        <p className="mt-4">Wybierz lokację, aby zobaczyć szczegóły.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
