import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import toast from 'react-hot-toast';

export default function SummaryPage() {
    const navigate = useNavigate();

    // Pobierz dane z sessionStorage
    const characterRace = sessionStorage.getItem('characterRace');
    const characterClass = sessionStorage.getItem('characterClass');
    const characterDeity = sessionStorage.getItem('characterDeity');
    const characterGender = sessionStorage.getItem('characterGender');
    const nickname = sessionStorage.getItem('nickname');
    const characterAncestry = sessionStorage.getItem('characterAncestry');
    const characterLocation = sessionStorage.getItem('characterLocation'); // Pobierz lokację początkową

    // Pobierz mnożniki z sessionStorage
    const xpMultipliers = JSON.parse(sessionStorage.getItem('xpMultipliers')) || {};

    const handleConfirm = async () => {
        // Sprawdź, czy wszystkie wymagane dane są dostępne
        if (!characterRace || !characterClass || !characterDeity || !characterGender || !nickname || !characterAncestry || !characterLocation) {
            toast.error("Wszystkie pola muszą być wypełnione!");
            return;
        }

        const confirmation = window.confirm("Czy na pewno chcesz stworzyć tę postać?");
        if (!confirmation) {
            return;
        }

        // Przygotuj dane do zapisania
        const characterData = {
            race: characterRace,
            class: characterClass,
            deity: characterDeity,
            gender: characterGender,
            nickname,
            ancestry: characterAncestry,
            location: characterLocation,
            xpMultipliers
        };

        try {
            const response = await fetch('/api/characters/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(characterData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            toast.success("Postać została stworzona!");
        } catch (error) {
            toast.error("Wystąpił błąd podczas tworzenia postaci: " + error.message);
        }

        // Wyczyść sessionStorage po potwierdzeniu stworzenia postaci
        sessionStorage.clear();

        // Przejdź do następnego ekranu, np. głównego menu gry
        navigate('/game');
    };

    const handleGoBack = () => {
        // Powrót do poprzedniego kroku
        navigate(-1); // Wróć do ostatniej odwiedzanej strony
    };

    return (
        <div className="flex flex-col items-center">
            {/* Pasek postępu */}
            <div className="w-full p-4">
                <ProgressBar currentStep={7} /> {/* Ustawia obecny krok na 7 (Podsumowanie) */}
            </div>

            <div className="flex flex-col items-center w-full p-4">
                <h2 className="text-xl font-bold mb-4">Podsumowanie Twojej postaci</h2>
                <div className="bg-gray-100 border border-gray-300 p-4 rounded w-3/4">
                    <p><strong>Imię:</strong> {nickname || 'Brak danych'}</p>
                    <p><strong>Rasa:</strong> {characterRace || 'Brak danych'}</p>
                    <p><strong>Pochodzenie:</strong> {characterAncestry || 'Brak danych'}</p>
                    <p><strong>Klasa:</strong> {characterClass || 'Brak danych'}</p>
                    <p><strong>Wyznanie:</strong> {characterDeity || 'Brak danych'}</p>
                    <p><strong>Płeć:</strong> {characterGender || 'Brak danych'}</p>
                    <p><strong>Lokacja Początkowa:</strong> {characterLocation || 'Brak danych'}</p> {/* Dodaj lokację */}
                </div>

                {/* Wyświetlanie zsumowanych mnożników */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Zsumowane Mnożniki:</h3>
                    <ul className="mt-2">
                        {Object.entries(xpMultipliers).map(([skill, multiplier]) => (
                            multiplier !== 0 && (
                                <li key={skill}>
                                    <strong>{skill.charAt(0).toUpperCase() + skill.slice(1)}:</strong> {multiplier}
                                </li>
                            )
                        ))}
                    </ul>
                </div>

                <div className="mt-4">
                    <button 
                        onClick={handleConfirm} 
                        className={`mr-4 px-4 py-2 ${(!characterRace || !characterClass || !characterDeity || !characterGender || !nickname || !characterAncestry || !characterLocation) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'} rounded`}
                        disabled={!characterRace || !characterClass || !characterDeity || !characterGender || !nickname || !characterAncestry || !characterLocation} 
                    >
                        Potwierdź i zakończ
                    </button>
                    <button 
                        onClick={handleGoBack} 
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                    >
                        Wróć
                    </button>
                </div>
            </div>
        </div>
    );
}
