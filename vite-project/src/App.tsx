import { useEffect, useState, type FC, type FormEvent, type JSX } from 'react'
import type { daysOfWeek, Todo } from './lib/definitions.ts';
import CreatorInputComp from './components/CreatorInputComp.tsx';
import TodosListComp from './components/TodosListComp.tsx';
import './App.css'

let iterator: number = 0;

const App: FC = (): JSX.Element => {

  const [date, setDate] = useState<Date>(new Date());
  const [project, setProject] = useState<string>('');
  const [liste, setListe] = useState<string>('');
  const [delay, setDelay] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [dayChoice, setDayChoice] = useState<daysOfWeek>({
    lundi: false,
    mardi: false,
    mercredi: false,
    jeudi: false,
    vendredi: false
  });

  // All in One
  const [todos, setTodos] = useState<Todo[]>([]);

  const [time, setTime] = useState<string>('');

  const [switcher, setSwitcher] = useState<boolean>(false);

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

  const resetDayChoices = (): void => {
    setDayChoice({
      lundi: false,
      mardi: false,
      mercredi: false,
      jeudi: false,
      vendredi: false
    });
  };

  const handleCheckBox = (day: keyof daysOfWeek): void => {
    setDayChoice(prevState => ({
      ...prevState, 
      [day]: !prevState[day] 
    }));
  };

  const handleSwitch = () => {
    setSwitcher(!switcher);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (date) {
      setTodos((prev: Todo[]) => [...prev, {
        id: iterator++,
        date, project, liste, 
        delay, name, email, 
        phone, dayChoice,
        isDoneDate: false, 
        isDoneProject: false,
        isDoneListe: false,
        isDoneDelay: false,
        isDoneClient: false,
        isDoneMail: false,
        isDonePhone: false
      }]);
      setDate(new Date);
      setProject("");
      setListe("");
      setDelay("");
      setName("");
      setEmail("");
      setPhone("");
      resetDayChoices();
    }
  };

  console.log("todos => ", todos.map((x) => x));

  return (
    <div>
      
      <h1>{time}</h1>

      <div>
        <button type="button" onClick={handleSwitch} className='custom-btn'>Switch</button>
      </div>

      {switcher === false ? (
        <div>
          <CreatorInputComp
            date={date}
            setDate={setDate}
            project={project}
            setProject={setProject}
            liste={liste}
            setListe={setListe}
            delay={delay}
            setDelay={setDelay}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            dayChoice={dayChoice}
            setDayChoice={setDayChoice}
            handleCheckBox={handleCheckBox}
            handleSubmit={handleSubmit}
          />

          <TodosListComp todos={todos} setTodos={setTodos} />

        </div>
      ) : (
        <h2>Data from backup.json</h2>
      )}
    </div>
  )
}

export default App;
