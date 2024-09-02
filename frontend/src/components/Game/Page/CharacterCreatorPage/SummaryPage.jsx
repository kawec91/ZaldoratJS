import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SummaryPage() {
    const navigate = useNavigate();

    // Pobierz dane z sessionStorage
    const characterRace = sessionStorage.getItem('characterRace');
    const characterClass = sessionStorage.getItem('characterClass');
    const characterDeity = sessionStorage.getItem('characterDeity');
    const characterGender = sessionStorage.getItem('characterGender');

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
        <div>
            <h1>Podsumowanie Twojej postaci</h1>
            <div>
                <p><strong>Rasa:</strong> {characterRace}</p>
                <p><strong>Klasa:</strong> {characterClass}</p>
                <p><strong>Wyznanie:</strong> {characterDeity}</p>
                <p><strong>Płeć:</strong> {characterGender}</p>
            </div>
            <button onClick={handleConfirm}>Potwierdź i zakończ</button>
            <button onClick={handleGoBack}>Wróć</button>
        </div>
    );
}
