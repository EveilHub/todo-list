import { useEffect, useState, type FC, type FormEvent, type JSX } from 'react'
import type { ParamsTodoType, Todo } from './lib/definitions.ts';
import CreatorInputComp from './components/CreatorInputComp.tsx';
import TodosListComp from './components/TodosListComp.tsx';
import FetchFromJson from './components/FetchFromJson.tsx';
import './App.css'

let iterator: number = 0;

const App: FC = (): JSX.Element => {

  const [paramsTodo, setParamsTodo] = useState<ParamsTodoType>({
    date: new Date(),
    project: "",
    liste: "",
    delay: "",
    name: "",
    email: "",
    phone: ""
  });

  const [selectedDay, setSelectedDay] = useState<string | null>(null);

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

  const handleCheckBox = (day: string): void => {
    setSelectedDay(day);
  };

  const handleSwitch = () => {
    setSwitcher(!switcher);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!paramsTodo.date) return;
    setTodos((prev) => [
      ...prev,
      {
        id: iterator++,
        selectedDay,
        ...paramsTodo,
        isDoneDate: false,
        isDoneProject: false,
        isDoneListe: false,
        isDoneDelay: false,
        isDoneClient: false,
        isDoneMail: false,
        isDonePhone: false
      }
    ]);
    setParamsTodo({
      date: new Date(),
      project: "",
      liste: "",
      delay: "",
      name: "",
      email: "",
      phone: ""
    });
    setSelectedDay(null);
  };

  //console.log("todos => ", todos.map((x) => x));

  return (
    <div className="main--div--app">
      
      <h1>{time}</h1>

      <div>
        <button type="button" onClick={handleSwitch} className='custom-btn'>Switch</button>
      </div>

      {switcher === false ? (
        <div>
          <CreatorInputComp
            date={paramsTodo.date.toLocaleString()}
            project={paramsTodo.project}
            liste={paramsTodo.liste}
            delay={paramsTodo.delay}
            name={paramsTodo.name}
            email={paramsTodo.email}
            phone={paramsTodo.phone}
            setParamsTodo={setParamsTodo}
            selectedDay={selectedDay}
            handleCheckBox={handleCheckBox}
            handleSubmit={handleSubmit}
          />

          <TodosListComp todos={todos} setTodos={setTodos} />

        </div>
      ) : (
        <FetchFromJson todos={todos} />
      )}
    </div>
  )
};

export default App;
