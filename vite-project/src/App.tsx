import { useEffect, useState, type FC } from 'react'
import type { Day, daysOfWeek } from './lib/definitions.ts';
import CreatorInputComp from './components/CreatorInputComp.tsx';
import DaysComponents from "./components/DaysComponent.tsx";
import './App.css'

const App: FC = () => {

  const [newOne, setNewOne] = useState<string[]>([]);

  const [date, setDate] = useState<string>('');
  const [project, setProject] = useState<string>('');
  const [delay, setDelay] = useState<string>('');
  const [redraw, setRedraw] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>('');

  const [dayChoice, setDayChoice] = useState<daysOfWeek>({
    lundi: false,
    mardi: false,
    mercredi: false,
    jeudi: false,
    vendredi: false
  });

  const [time, setTime] = useState<string>('');


  useEffect(() => {
    const updateTime = (): void => {
      const pad = (n: number) => String(n).padStart(2, "0");

      const dateNow: Date = new Date();
      const year: string = pad(dateNow.getFullYear());
      const month: string = pad(dateNow.getMonth() + 1);
      const dateDay: string = pad(dateNow.getDate());
      const hour: string = pad(dateNow.getHours());
      const min: string = pad(dateNow.getMinutes());

      const todayDate: string = `${dateDay}/${month}/${year} ${hour}:${min}`;
      setTime(todayDate);
    };
    updateTime();
    const intervalId: number = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const days: Day[] = [
    { number: 1, day: "Lundi" },
    { number: 2, day: "Mardi" },
    { number: 3, day: "Mercredi" },
    { number: 4, day: "Jeudi" },
    { number: 5, day: "Vendredi" }
  ];


  const handleErase = (): void => {
    setDate("");
    setNewOne([]);
  };

  return (
    <div>
      
      <h1>{time}</h1>

      <CreatorInputComp
        dayChoice={dayChoice}
        setDayChoice={setDayChoice}
        newOne={newOne}
        setNewOne={setNewOne}
        date={date}
        setDate={setDate}
        project={project}
        setProject={setProject}
        delay={delay}
        setDelay={setDelay}
        redraw={redraw}
        setRedraw={setRedraw}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
      />

      {days.map((item: {number: number, day: string}) => (
        <DaysComponents
          key={item.number}
          dayNum={item.number}
          day={item.day}
          date={date}
          setDate={setDate}
          project={project}
          setProject={setProject}
          delay={delay}
          setDelay={setDelay}
          redraw={redraw}
          setRedraw={setRedraw}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
        />
      ))}

      <h3>{newOne}</h3>

      <button id="btn-2" type="button" className="main-btn" onClick={handleErase}>Delete</button>

    </div>
  )
}

export default App;
