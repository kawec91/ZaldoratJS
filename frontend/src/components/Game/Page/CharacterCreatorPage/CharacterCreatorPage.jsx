import React from 'react';
import { Link } from 'react-router-dom';

export default function CharacterCreatorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Witamy w kreatorze postaci</h1>
            <p className="text-lg mb-8 text-center max-w-md">
                W tym kreatorze stworzysz swoją unikalną postać, która będzie Cię reprezentować w grze. 
                Przejdziesz przez kilka kroków, aby wybrać rasę, klasę, bóstwo i inne cechy swojej postaci.
            </p>
            <Link 
                to="game/selectrace" 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Wybierz swoją rasę
            </Link>
        </div>
    );
}
