import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import toast from 'react-hot-toast';

export default function SummaryPage({ authUser, isLoading }) {
    const navigate = useNavigate();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Stan do kontrolowania modalu potwierdzenia

    // Pobierz dane z sessionStorage
    const characterRace = sessionStorage.getItem('characterRace');
    const characterClass = sessionStorage.getItem('characterClass');
    const characterDeity = sessionStorage.getItem('characterDeity');
    const characterGender = sessionStorage.getItem('characterGender');
    const characterName = sessionStorage.getItem('character_name');
    const characterAncestry = sessionStorage.getItem('characterAncestry');
    const characterLocation = sessionStorage.getItem('characterLocation');

    // Pobierz mnożniki z sessionStorage
    const raceMultipliers = JSON.parse(sessionStorage.getItem('raceMultipliers')) || {};
    const ancestryMultipliers = JSON.parse(sessionStorage.getItem('ancestryMultipliers')) || {};
    const classMultipliers = JSON.parse(sessionStorage.getItem('classMultipliers')) || {};

    // Funkcja do zaokrąglania mnożników
    const formatMultiplier = (multiplier) => {
        return Math.round(multiplier * 100) / 100; // Zaokrąglij do 2 miejsc po przecinku
    };

    // Zsumuj i zaokrąglij mnożniki
    const totalMultipliers = {};
    const sumMultipliers = (multipliers) => {
        Object.entries(multipliers).forEach(([key, value]) => {
            totalMultipliers[key] = formatMultiplier((totalMultipliers[key] || 0) + value);
        });
    };

    sumMultipliers(raceMultipliers);
    sumMultipliers(ancestryMultipliers);
    sumMultipliers(classMultipliers);

    // Zapisz zsumowane i zaokrąglone mnożniki w sessionStorage
    sessionStorage.setItem('totalMultipliers', JSON.stringify(totalMultipliers));

    const handleConfirm = async () => {
        const requiredFields = [
            characterRace, 
            characterClass, 
            characterDeity, 
            characterGender, 
            characterName, 
            characterAncestry, 
            characterLocation
        ];

        // Debugowanie: logowanie wartości
        console.log("Dane postaci:", {
            race: characterRace,
            classType: characterClass,
            deity: characterDeity,
            gender: characterGender,
            character_name: characterName,
            ancestry: characterAncestry,
            location: characterLocation,
        });

        // Sprawdź, czy wszystkie dane są poprawne
        if (requiredFields.some(field => !field)) {
            toast.error("Wszystkie pola muszą być wypełnione!");
            return;
        }

        // Sprawdź, czy authUser jest załadowany
        if (isLoading) {
            toast.error("Ładowanie danych użytkownika, spróbuj ponownie później.");
            return;
        }

        // Pobierz ownerId z authUser
        const ownerId = authUser ? authUser._id : null;

        if (!ownerId) {
            toast.error("Nie znaleziono identyfikatora właściciela.");
            return;
        }

        const characterData = {
            race: characterRace,
            classType: characterClass,
            deity: characterDeity,
            gender: characterGender,
            character_name: characterName,
            ancestry: characterAncestry,
            location: characterLocation,
            multipliers: totalMultipliers, // Wysyłamy zsumowane i zaokrąglone mnożniki
            owner: ownerId
        };

        try {
            console.log("Dane postaci do wysłania:", characterData);
            const response = await fetch('/api/characters/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(characterData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Błąd podczas tworzenia postaci:", errorData);
                throw new Error(errorData.message || 'Wystąpił nieznany błąd');
            }

            toast.success("Postać została stworzona!");
            sessionStorage.clear(); // Wyczyść sessionStorage po pomyślnym stworzeniu postaci
            navigate('/game');
        } catch (error) {
            console.error("Wystąpił błąd podczas tworzenia postaci:", error);
            toast.error("Wystąpił błąd podczas tworzenia postaci: " + error.message);
        }

        setIsConfirmModalOpen(false); // Zamknij modal po potwierdzeniu
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const openConfirmModal = () => {
        setIsConfirmModalOpen(true); // Otwórz modal potwierdzenia
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false); // Zamknij modal potwierdzenia
    };

    // Jeśli ładowanie
    if (isLoading) {
        return <div>Ładowanie...</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-full p-4">
                <ProgressBar currentStep={7} />
            </div>

            <div className="flex flex-col items-center w-full p-4">
                <h2 className="text-xl font-bold mb-4">Podsumowanie Twojej postaci</h2>
                <div className="bg-gray-100 border border-gray-300 p-4 rounded w-3/4">
                    <p><strong>Imię:</strong> {characterName || 'Brak danych'}</p>
                    <p><strong>Rasa:</strong> {characterRace || 'Brak danych'}</p>
                    <p><strong>Pochodzenie:</strong> {characterAncestry || 'Brak danych'}</p>
                    <p><strong>Klasa:</strong> {characterClass || 'Brak danych'}</p>
                    <p><strong>Wyznanie:</strong> {characterDeity || 'Brak danych'}</p>
                    <p><strong>Płeć:</strong> {characterGender || 'Brak danych'}</p>
                    <p><strong>Lokacja Początkowa:</strong> {characterLocation || 'Brak danych'}</p>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Zsumowane Mnożniki:</h3>
                    <ul className="mt-2">
                        {Object.entries(totalMultipliers).map(([skill, multiplier]) => (
                            multiplier !== 0 && (
                                <li key={skill}>
                                    <strong>{skill.charAt(0).toUpperCase() + skill.slice(1)}:</strong> {formatMultiplier(multiplier)}
                                </li>
                            )
                        ))}
                    </ul>
                </div>

                <div className="mt-4">
                    <button 
                        onClick={openConfirmModal} 
                        className={`mr-4 px-4 py-2 rounded ${(!characterRace || !characterClass || !characterDeity || !characterGender || !characterName || !characterAncestry || !characterLocation) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        disabled={!characterRace || !characterClass || !characterDeity || !characterGender || !characterName || !characterAncestry || !characterLocation}
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

                {/* Modal Potwierdzenia */}
                {isConfirmModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white border border-gray-300 p-6 rounded shadow-lg w-1/2">
                            <h3 className="text-lg font-bold mb-4">Potwierdzenie</h3>
                            <p>Czy na pewno chcesz stworzyć tę postać?</p>
                            <div className="mt-4 flex justify-end">
                                <button 
                                    onClick={handleConfirm} 
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Tak
                                </button>
                                <button 
                                    onClick={closeConfirmModal} 
                                    className="ml-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                                >
                                    Nie
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
