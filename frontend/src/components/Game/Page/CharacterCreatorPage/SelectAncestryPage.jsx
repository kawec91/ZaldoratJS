import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';

export default function SelectAncestryPage() {
    const [ancestries, setAncestries] = useState([]);
    const [selectedAncestry, setSelectedAncestry] = useState(null);
    const navigate = useNavigate();
    const raceId = sessionStorage.getItem('characterRaceId');

    useEffect(() => {
        console.log("Race ID:", raceId);
    
        if (!raceId) {
            console.error("Brak ID rasy w sessionStorage.");
            return;
        }
    
        const fetchAncestries = async () => {
            try {
                const response = await fetch(`/api/ancestries/race/${raceId}`);
                if (!response.ok) {
                    throw new Error('Błąd sieci: ' + response.statusText);
                }
                const data = await response.json();
                console.log("Pobrane pochodzenia:", data);
                setAncestries(data.ancestries);
            } catch (error) {
                console.error('Błąd podczas pobierania pochodzeń:', error);
            }
        };
    
        fetchAncestries();
    }, [raceId]);

    const handleAncestrySelection = (ancestry) => {
        setSelectedAncestry(ancestry);
    };

    const handleNext = () => {
        if (selectedAncestry) {
            sessionStorage.setItem('characterAncestry', selectedAncestry.name);
            navigate('selectclass');
        }
    };

    return (
        <div>
            <ProgressBar currentStep={1} />
            <h1>Wybierz pochodzenie</h1>
            <div className="flex">
                {/* Left side: Ancestry List */}
                <div className="w-1/3 p-4 border-r border-gray-300">
                    <h2 className="text-xl font-bold mb-4">Wybierz swoje pochodzenie</h2>
                    <ul>
                        {ancestries.length > 0 ? (
                            ancestries.map((ancestry) => (
                                <li
                                    key={ancestry._id} // Keep this for the ancestry list
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
                                {selectedAncestry.stats.crafting ? (
                                    Object.entries(selectedAncestry.stats.crafting)
                                        .filter(([key]) => key !== '_id') // Exclude _id key
                                        .map(([skill, value]) => (
                                            <li key={skill}>
                                                <strong>{skill.charAt(0).toUpperCase() + skill.slice(1)}:</strong> {value}
                                            </li>
                                        ))
                                ) : (
                                    <li>Brak umiejętności rzemieślniczych dla tego pochodzenia.</li>
                                )}
                            </ul>

                            {/* Display Fighting Stats */}
                            <h3 className="text-lg font-semibold mt-4">Umiejętności Bojowe:</h3>
                            <ul className="mt-2">
                                {selectedAncestry.stats.fighting ? (
                                    Object.entries(selectedAncestry.stats.fighting)
                                        .filter(([key]) => key !== '_id') // Exclude _id key
                                        .map(([skill, value]) => (
                                            <li key={skill}>
                                                <strong>{skill.charAt(0).toUpperCase() + skill.slice(1)}:</strong> {value}
                                            </li>
                                        ))
                                ) : (
                                    <li>Brak umiejętności bojowych dla tego pochodzenia.</li>
                                )}
                            </ul>
                            
                            <button
                                onClick={handleNext}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
