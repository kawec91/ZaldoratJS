import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';

export default function SelectClassPage() {
    const [classes, setClasses] = useState([]); // Lista klas
    const [selectedClass, setSelectedClass] = useState(null); // Wybrana klasa
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch('/api/classes/getall'); // Upewnij się, że endpoint jest poprawny
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setClasses(data); // Ustaw pobrane klasy
            } catch (error) {
                console.error('Błąd podczas pobierania klas:', error);
            }
        };

        fetchClasses();
    }, []);

    const handleClassSelection = (characterClass) => {
        setSelectedClass(characterClass); // Ustaw wybraną klasę
    };

    const handleNext = () => {
        if (selectedClass) {
            sessionStorage.setItem('characterClass', selectedClass.name);
            navigate('selectdeity'); // Zmiana na właściwą stronę
        }
    };

    return (
        <div className="flex flex-col">
            {/* Opis kroku */}
            <div className="w-full p-4">
                <ProgressBar currentStep={1} /> {/* Ustawia obecny krok na 1 (Wybór Klasy) */}
            </div>

            <div className="flex flex-row w-full">
                {/* Lista klas */}
                <div className="w-1/3 p-4 border-r border-gray-300">
                    <h2 className="text-xl font-bold mb-4">Wybierz swoją klasę</h2>
                    <ul className="flex flex-col">
                        {classes.map((characterClass) => (
                            <li 
                                key={characterClass._id} 
                                onClick={() => handleClassSelection(characterClass)} 
                                className={`cursor-pointer p-2 rounded hover:bg-gray-200 ${selectedClass && selectedClass._id === characterClass._id ? 'bg-gray-300' : ''}`}
                            >
                                {characterClass.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Opis wybranej klasy */}
                <div className="w-2/3 p-4">
                    {selectedClass ? (
                        <>
                            <h2 className="text-xl font-bold">{selectedClass.name}</h2>
                            <p className="mt-2">{selectedClass.description}</p>
                            <h3 className="mt-4 text-lg font-semibold">Statystyki:</h3>
                            <ul className="mt-2">
                                <li>Siła: <span className="font-medium">{selectedClass.attributes?.strength || 0}</span></li>
                                <li>Zwinność: <span className="font-medium">{selectedClass.attributes?.agility || 0}</span></li>
                                <li>Witalność: <span className="font-medium">{selectedClass.attributes?.vitality || 0}</span></li>
                                <li>Inteligencja: <span className="font-medium">{selectedClass.attributes?.intelligence || 0}</span></li>
                            </ul>
                            <button 
                                onClick={handleNext} 
                                disabled={!selectedClass} 
                                className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400`}
                            >
                                Dalej
                            </button>
                        </>
                    ) : (
                        <p className="mt-4">Wybierz klasę, aby zobaczyć szczegóły.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
