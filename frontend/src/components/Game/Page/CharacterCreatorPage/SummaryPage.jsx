import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';

export default function SummaryPage() {
    const navigate = useNavigate();

    // Pobierz dane z sessionStorage
    const characterRace = sessionStorage.getItem('characterRace');
    const characterClass = sessionStorage.getItem('characterClass');
    const characterDeity = sessionStorage.getItem('characterDeity');
    const characterGender = sessionStorage.getItem('characterGender');
    const nickname = sessionStorage.getItem('nickname'); // Pobierz imię postaci

    const handleConfirm = () => {
        // Potwierdź stworzenie postaci (zapisz dane, przejdź dalej, itp.)
        // Tutaj można dodać logikę do zapisania postaci na serwerze, itp.
        alert('Postać została stworzona!');
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
                <ProgressBar currentStep={6} /> {/* Ustawia obecny krok na 5 (Podsumowanie) */}
            </div>

            <div className="flex flex-col items-center w-full p-4">
                <h2 className="text-xl font-bold mb-4">Podsumowanie Twojej postaci</h2>
                <div className="bg-gray-100 border border-gray-300 p-4 rounded w-3/4">
                    <p><strong>Imię:</strong> {nickname}</p>
                    <p><strong>Rasa:</strong> {characterRace}</p>
                    <p><strong>Klasa:</strong> {characterClass}</p>
                    <p><strong>Wyznanie:</strong> {characterDeity}</p>
                    <p><strong>Płeć:</strong> {characterGender}</p>
                </div>

                <div className="mt-4">
                    <button 
                        onClick={handleConfirm} 
                        className="mr-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
