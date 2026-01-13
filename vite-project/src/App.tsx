import { useState, type FC, type JSX } from 'react'
import DaysComponents from "./components/DaysComponent.tsx";
//import InputComponent from "./components/InputComponent.tsx";
import type { Day } from './lib/definitions.ts';
import './App.css'

const App: FC = (): JSX.Element => {

  //const [truc, setTruc] = useState<string>('');
  const [newOne, setNewOne] = useState<string[]>([]);

  const [date, setDate] = useState<string>('');
  const [heure, setHeure] = useState<string>('');
  const [tache, setTache] = useState<string>('');
  const [delais, setDelais] = useState<string>('');
  const [reconduite, setReconduite] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Pour réutiliser !!!
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = dateNow.getMonth() + 1;
  const dateDay = dateNow.getDate();
  const hour = dateNow.getHours();
  const min = dateNow.getMinutes();

  console.log(year, month, dateDay, hour, min);

  const days: Day[] = [
    { number: 1, day: "Lundi" },
    { number: 2, day: "Mardi" },
    { number: 3, day: "Mercredi" },
    { number: 4, day: "Jeudi" },
    { number: 5, day: "Vendredi" }
  ];

  const derivatedState = date;

  const handleClick = (): void => {
    if (date) {
      setNewOne([...newOne, derivatedState]);
      setDate('');
    }
  };

  const handleErase = (): void => {
    setDate("");
    setNewOne([]);
  };

  return (
    <>
      <div>

        <h1>Tâches</h1>

        <h2>Entrer un truc ici !</h2>
        <h4>{date}</h4>

        <div className='Input-container'>

          {days.map((item: {number: number, day: string}) => (
            <DaysComponents
              dayNum={item.number}
              day={item.day}
              date={date}
              setDate={setDate}
              heure={heure}
              setHeure={setHeure}
              tache={tache}
              setTache={setTache}
              delais={delais}
              setDelais={setDelais}
              reconduite={reconduite}
              setReconduite={setReconduite}
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
            />
          ))}

        </div>

        <h3>{newOne}</h3>

        <button onClick={handleClick}>Add</button>
        <button onClick={handleErase}>Erase</button>

      </div>
    </>
  )
}

export default App;
