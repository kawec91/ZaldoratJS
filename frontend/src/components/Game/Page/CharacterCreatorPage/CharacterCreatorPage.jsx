import React, { useEffect, useState } from 'react';
import { defaultInput } from '../../../Styles/style.js';
import Select from "react-select";

export default function CharacterCreatorPage() {
  const [desc, setDesc] = useState('Wybierz aby zobaczyć opis...');
  const [selectedOption, setSelectedOption] = useState();
  const [selectedMainMenu, setSelectedMainMenu] = useState(0)

  const raceData = [
    {
      race: 'Elf',
      raceDescription: `W fantastycznym świecie, pełnym magii i niezwykłych stworzeń, elfowie wyróżniają się swoją niezrównaną elegancją, nieśmiertelnością i głębokim połączeniem z naturą. Są to istoty o smukłej sylwetce, delikatnych rysach twarzy i błyszczących, często migoczących oczach, które odzwierciedlają ich mądrość oraz wielowiekowe doświadczenie. Ich skóra jest jasna, niemal świetlista, a włosy zazwyczaj długie, lśniące i w różnych odcieniach blond, srebra, a czasem nawet ciemniejszych barw.

Elfowie zamieszkują zazwyczaj głębokie, starożytne lasy, w których ich miasta i osady harmonijnie współgrają z otaczającą przyrodą. Budują swoje domy w koronach drzew lub w ukrytych dolinach, używając materiałów naturalnych, które sprawiają, że ich budowle wydają się być częścią samego krajobrazu. Elfie osady są przesiąknięte magią, a ich architektura pełna jest skomplikowanych ornamentów, delikatnych mostów i świetlistych kryształów.

Magia jest integralną częścią życia elfów. Od dzieciństwa uczą się jej tajemnic, co pozwala im wpływać na przyrodę, uzdrawiać rany i tworzyć niezwykłe zaklęcia. Wielu z nich to utalentowani łucznicy, wojownicy i czarodzieje, których umiejętności w walce i strategii są legendarne. W bitwie poruszają się z gracją, ich ruchy są szybkie i precyzyjne, a ich umiejętność skradania się i kamuflażu czyni ich niezwykle trudnymi do pokonania przeciwnikami.

Elfowie żyją w harmonii z naturą i często pełnią rolę jej strażników. Są wrażliwi na zaburzenia w przyrodzie i nie wahają się stanąć w jej obronie, gdy jest zagrożona. Ich związek z fauną i florą jest głęboki, co pozwala im rozumieć mowę zwierząt i roślin, a także korzystać z ich mocy i mądrości.

Choć ich długowieczność daje im perspektywę, której brakuje śmiertelnikom, elfowie również doświadczają emocji i trosk. Często są zamyśleni i melancholijni, wspominając minione wieki i utracone królestwa. Mimo to potrafią cieszyć się życiem, ceniąc piękno, sztukę, muzykę i poezję, które tworzą z pasją i mistrzostwem.

Elfowie są tajemniczymi i majestatycznymi istotami, których istnienie przypomina nam o pięknie i magii ukrytej w świecie przyrody, a także o wiecznym poszukiwaniu harmonii i mądrości.`
    },
    {
      race: 'Ork',
      raceDescription: ''
    },
  ]
  const clasData = [
    {
      clas: 'Wojownik',
      clasDescription: ''
    },
    {
      clas: 'Złodziej',
      clasDescription: ''
    },
  ]

  const raceOptions = [
    {value: 'Elf', label: 'Elf'},
    {value: 'Ork', label: 'Ork'},
  ]
  const clasOptions = [
    {value: 'warrior', label: 'Wojownik'},
    {value: 'thief', label: 'Złodziej'},
  ]
  const genderOptions = [
    {value: 'w', label: 'Kobieta'},
    {value: 'm', label: 'Mężczyzna'},
  ]
  const feithOptions = [
    {value: 'x', label: 'xxxxx'},
    {value: 'y', label: 'yyyyaaaaa'},
  ]

  const handleMainMenuChenge = (e,value) => {
    e.preventDefault();
    setSelectedMainMenu(value)
  }
 
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
                    {/* <button className='w-full py-2 hover:bg-orange-600 hover:text-white hover:duration-150'>Rasa</button> */}
                    <button className='w-full py-2 bg-orange-600 text-white duration-150' >Rasa</button>
                  </td>
                  {/* <td>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={raceOptions}
                    />
                  </td> */}
                </tr>
                <tr>
                  <td colSpan={2}>
                    {/* <label>Klasa:</label> */}
                    <button className='w-full py-2 hover:bg-orange-600 hover:text-white hover:duration-150'>Klasa</button>
                  </td>
                  {/* <td>
                  <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={clasOptions}
                    />
                  </td> */}
                </tr>
                <tr>
                  <td colSpan={2}>
                    {/* <label>Wyznanie:</label> */}
                    <button className='w-full py-2 hover:bg-orange-600 hover:text-white hover:duration-150'>Wyznanie</button>
                  </td>
                  {/* <td>
                  <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={feithOptions}
                    />
                  </td> */}
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
        <div className='w-full h-full p-2 overflow-y-scroll'>
          {/* {desc} */}
          <div className='flex gap-2'>
            <div className='px-4 py-1 bg-yellow-900 text-white rounded-t-sm'>Elf</div>
            <div className='px-4 py-1 border-yellow-900 border-t border-l border-r rounded-t-sm'>Ork</div>
          </div>
          <div className='bg-yellow-900 p-2 text-white'>{raceData[0].raceDescription}</div>
          </div>
      </div>
    </div>
  )
}
