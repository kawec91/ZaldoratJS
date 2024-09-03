// src/components/Game/Page/CharacterCreatorPage/UseClearSessionOnLeave.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useClearSessionOnLeave = () => {
    const location = useLocation();

    useEffect(() => {
        // Sprawdza, czy aktualna ścieżka jest w kreatorze postaci
        const isInCharacterCreator = location.pathname.startsWith('/game/new-character');
        
        // Logujemy aktualną lokalizację i stan w kreatorze postaci
        console.log('Current Location:', location.pathname);
        console.log('Is in Character Creator:', isInCharacterCreator);

        // Funkcja do czyszczenia sesji
        const clearSession = () => {
            sessionStorage.removeItem('characterRace');
            sessionStorage.removeItem('characterRaceId');
            sessionStorage.removeItem('characterClass');
            sessionStorage.removeItem('characterDeity');
            sessionStorage.removeItem('characterGender');
            sessionStorage.removeItem('nickname');
            sessionStorage.removeItem('characterAncestry'); // Oczyść wszystkie istotne dane
        };

        // Jeśli nie jesteśmy w kreatorze postaci, czyścimy sesję
        if (!isInCharacterCreator) {
            clearSession();
        }

        // Nasłuchuj zmian lokalizacji
        return () => {
            if (!isInCharacterCreator) {
                clearSession();
            }
        };
    }, [location]);
};

export default useClearSessionOnLeave;
