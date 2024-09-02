import React from 'react';
import { Link } from 'react-router-dom';

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { label: 'Wybór Rasy', path: '/game/new-character/game/selectrace' },
    { label: 'Wybór Klasy', path: '/game/new-character/game/selectrace/selectclass' },
    { label: 'Wybór Bóstwa', path: '/game/new-character/game/selectrace/selectclass/selectdeity' },
    { label: 'Wybór Płci', path: '/game/new-character/game/selectrace/selectclass/selectdeity/selectgender' },
    { label: 'Nadanie Imienia', path: '/game/new-character/game/selectrace/selectclass/selectdeity/selectgender/selectname' },
    { label: 'Podsumowanie', path: '/game/new-character/game/selectrace/selectclass/selectdeity/selectgender/selectname/summary' },
  ];

  return (
    <div className="flex justify-between mb-4">
      {steps.map((step, index) => (
        <Link
          key={index}
          to={step.path}
          className={`flex-1 text-center py-2 ${currentStep === index ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
        >
          {step.label}
        </Link>
      ))}
    </div>
  );
};

export default ProgressBar;
