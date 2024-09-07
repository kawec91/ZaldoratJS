import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import toast from 'react-hot-toast'; // Importowanie toast

export default function SelectClassPage() {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const navigate = useNavigate();
    const ancestryId = sessionStorage.getItem('characterAncestryId');

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch('/api/classes/getall');
                if (!response.ok) {
                    throw new Error('Błąd sieci: ' + response.statusText);
                }
                const data = await response.json();
                setClasses(data);
            } catch (error) {
                console.error('Błąd podczas pobierania klas:', error);
            }
        };

        fetchClasses();
    }, []);

    const handleClassSelection = (classItem) => {
        setSelectedClass(classItem);
    };

    const handleNext = () => {
        if (!selectedClass) {
            toast.error("Proszę wybrać klasę przed przejściem dalej.");
            return;
        }
        sessionStorage.setItem('characterClass', selectedClass.name);
        sessionStorage.setItem('classMultipliers', JSON.stringify(selectedClass.xpMultipliers));
        navigate('selectdeity');
    };

    return (
        <div>
            <ProgressBar currentStep={2} />
            <h1>Wybierz klasę</h1>
            <div className="flex">
                {/* Left side: Class List */}
                <div className="w-1/3 p-4 border-r border-gray-300">
                    <h2 className="text-xl font-bold mb-4">Wybierz swoją klasę</h2>
                    <ul className="list-none">
                        {classes.map((classItem) => (
                            <li
                                key={classItem._id}
                                onClick={() => handleClassSelection(classItem)}
                                className={`cursor-pointer p-2 rounded hover:bg-gray-200 ${selectedClass && selectedClass._id === classItem._id ? 'bg-gray-300' : ''}`}
                            >
                                {classItem.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right side: Selected Class Details */}
                <div className="w-2/3 p-4">
                    {selectedClass ? (
                        <>
                            <h2 className="text-xl font-bold">{selectedClass.name}</h2>
                            <p className="mt-2">{selectedClass.description}</p>
                            <h3 className="text-lg font-semibold mt-4">Mnożniki:</h3>
                            <ul className="mt-2 list-none">
                                {Object.entries(selectedClass.xpMultipliers)
                                    .filter(([key, value]) => value !== 0)
                                    .map(([key, value]) => (
                                        <li key={key}>
                                            {key.charAt(0).toUpperCase() + key.slice(1)}: <span className="font-medium">{value}</span>
                                        </li>
                                    ))}
                            </ul>
                            <button
                                onClick={handleNext}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
