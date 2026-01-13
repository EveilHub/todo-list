import { useEffect, useState, type ChangeEvent, type FC, type JSX } from 'react'
import type { Day } from './lib/definitions.ts';
import DaysComponents from "./components/DaysComponent.tsx";
import './App.css'

const App: FC = (): JSX.Element => {

  const [newOne, setNewOne] = useState<string[]>([]);

  const [date, setDate] = useState<string>('');
  const [project, setProject] = useState<string>('');
  const [delay, setDelay] = useState<string>('');
  const [redraw, setRedraw] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>('');

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

      const todayDate = `${dateDay}/${month}/${year} ${hour}:${min}`;
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

  const derivatedState: string = date;

  const handleChangeDate = (e: ChangeEvent<HTMLInputElement>): void => {
    setDate(e.target.value);
  };

  const handleChangeProject = (e: ChangeEvent<HTMLInputElement>): void => {
    setProject(e.target.value);
  };

  const handleChangeDelay = (e: ChangeEvent<HTMLInputElement>): void => {
    setDelay(e.target.value);
  };

  const handleChangeDeadLine = (e: ChangeEvent<HTMLInputElement>): void => {
    setRedraw(e.target.value);
  };

  const handleChangeClient = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhone(e.target.value);
  };

  const handleCreate = (): void => {
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
    <div>
      
      <h1>{time}</h1>

      <div className='creation-container'>

        <div className='creation-input-container'>

          <input 
            type="text"
            value={date} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeDate(e)} 
            className="input-creation" 
            placeholder="Date" 
          />

          <input 
            type="text"
            value={project} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeProject(e)} 
            className="input-creation" 
            placeholder="Projet" 
          />

          <input 
            type="text"
            value={delay} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeDelay(e)} 
            className="input-creation" 
            placeholder="Délais" 
          />

          <input 
            type="text"
            value={redraw} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeDeadLine(e)} 
            className="input-creation" 
            placeholder="Reconduite" 
          />

          <input 
            type="text"
            value={name} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeClient(e)} 
            className="input-creation" 
            placeholder="Client" 
          />

          <input 
            type="text"
            value={email} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEmail(e)} 
            className="input-creation" 
            placeholder="E-mail" 
          />

          <input 
            type="text"
            value={phone} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangePhone(e)} 
            className="input-creation" 
            placeholder="Tél" 
          />

        </div>

        <div className='creation-btn-div'>
          <button id="btn-1" type="button" className="main-btn" onClick={handleCreate}>Create</button>
        </div>

      </div>

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
