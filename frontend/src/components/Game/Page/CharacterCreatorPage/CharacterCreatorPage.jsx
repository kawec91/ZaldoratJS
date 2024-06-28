import React, { useEffect, useState } from 'react';
import { defaultInput } from '../../../Styles/style.js';
import Select from "react-select";
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function CharacterCreatorPage() {
  const [racesNameList, setRaceNameList] = useState([]);
  const [selectedRace, setSelectedRace] = useState('');
  const [raceDescription, setRaceDescription] = useState('Wybierz aby zobaczyć opis...');
  const [raceStrenght, setRaceStrenght] = useState(0);
  const [raceAgility, setRaceAgility] = useState(0);
  const [raceVitality, setRaceVitality] = useState(0);
  const [raceIntelligence, setRaceIntelligence] = useState(0);

  const [selectedOption, setSelectedOption] = useState();
  const [selectedMainMenu, setSelectedMainMenu] = useState(0)

  const genderOptions = [
    {value: 'w', label: 'Kobieta'},
    {value: 'm', label: 'Mężczyzna'},
  ]
  

  const handleMainMenuChenge = (e,value) => {
    e.preventDefault();
    setSelectedMainMenu(value)
  }
  const handleRaceManuSelected = (id) => {
    console.log('Selected Race: ', id);
    setSelectedRace(id);
    changeRaceDescription(id);
  }

  const changeRaceDescription = (id) => {
    for(let i of racesList) {
      console.log(i);
      if (i._id === id) {
        setRaceDescription(i.description);
        setRaceStrenght(i.attributes.strength);
        setRaceAgility(i.attributes.agility);
        setRaceVitality(i.attributes.vitality);
        setRaceIntelligence(i.attributes.intelligence);
      }
    }
  }

  const { data: racesList, isLoading } = useQuery({
    queryKey: ['non'],
    queryFn: async() => {
      try {
        const res = await fetch('/api/races/getall');
        const data = await res.json();
        if(data.error) return null;
        if(!res.ok) {
          throw new Error(data.error || "Something went wrong.");
      }
      console.log('RacesList:', data);
      const emptyList = [];

      data.forEach((element) => {
        emptyList.push(<button className='px-4 py-1 border-yellow-900 border-t border-l border-r rounded-t-sm cursor-pointer' onClick={() => {handleRaceManuSelected(element._id)}}>{element.name}</button>);
        //emptyList2.push(<div id={element._id} className='hidden'><div className='text-center'>Strength: {element.attributes.strength}, Agility: {element.attributes.agility}, Vitality: {element.attributes.vitality}, Intelligence: {element.attributes.intelligence}</div><p>{element.description}</p></div>);
       
      });
      setRaceNameList(emptyList);
      return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });
  
 
  return (
    <div className='w-full h-[calc(100vh_-_50px)] py-4 flex justify-center items-center'>
      <div className='flex items-start gap-4 w-4/5 h-3/4 border-[1px] border-black'>
        <div className='w-1/2 p-2'>
          <form>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Nazwa:</label>
                  </td>
                  <td className='w-full'>
                    <input type='text' placeholder='Nazwa' className={defaultInput}/>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button className='w-full py-2 bg-orange-600 text-white duration-150' >Rasa</button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button className='w-full py-2 hover:bg-orange-600 hover:text-white hover:duration-150'>Klasa</button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button className='w-full py-2 hover:bg-orange-600 hover:text-white hover:duration-150'>Wyznanie</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Płeć:</label>
                  </td>
                  <td>
                  <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={genderOptions}
                    />
                  </td>
                </tr>
                
                <tr>
                  <td colSpan={2}>
                    <button className='my-2 w-full bg-green-600 py-2 rounded-lg uppercase text-white'>Utwórz postać</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <div className='w-full h-full p-2 '>
          <div className='flex gap-2'>
            {racesNameList} 
          </div>
          <div className='bg-yellow-900 text-white text-center'>
              Strength: {raceStrenght}, Agility: {raceAgility}, Vitality: {raceVitality}, Intelligence: {raceIntelligence} 
          </div>
          <div className='w-full h-[calc(100%_-_60px)] p-2 overflow-y-scroll bg-yellow-900 text-white'>
              {raceDescription}
          </div>
        </div>
        
      </div>
    </div>
  )
}
