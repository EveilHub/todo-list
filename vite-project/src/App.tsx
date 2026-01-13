import { useEffect, useState, type FC, type JSX } from 'react'
import DaysComponents from "./components/DaysComponent.tsx";
//import InputComponent from "./components/InputComponent.tsx";
import type { Day } from './lib/definitions.ts';
import './App.css'

const App: FC = (): JSX.Element => {
  
  const [newOne, setNewOne] = useState<string[]>([]);

  const [date, setDate] = useState<string>('');
  const [heure, setHeure] = useState<string>('');
  const [tache, setTache] = useState<string>('');
  const [delais, setDelais] = useState<string>('');
  const [reconduite, setReconduite] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const pad = (n: number) => String(n).padStart(2, "0");
      const dateNow: Date = new Date();
      const year = pad(dateNow.getFullYear());
      const month = pad(dateNow.getMonth() + 1);
      const dateDay = pad(dateNow.getDate());
      const hour = pad(dateNow.getHours());
      const min = pad(dateNow.getMinutes());

      const todayDate = `${dateDay}/${month}/${year} ${hour}:${min}`;
      setTime(todayDate);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

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

        <h2>{time}</h2>
        <h4>{date}</h4>

        <div className='Input-container'>

          {days.map((item: {number: number, day: string}) => (
            <DaysComponents
              key={item.number}
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
