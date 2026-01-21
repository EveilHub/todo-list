import { useRef, useState, type FormEvent, type JSX } from 'react';
import type { ParamsTodoType, Todo } from './lib/definitions.ts';
import { useFetchDate } from './hooks/useFetchDate.ts';
import CreateInputCheckbox from './components/CreateInputCheckbox.tsx';
import TodosList from './components/TodosList.tsx';
import FetchFromJson from './components/FetchFromJson.tsx';
import './App.css';

const App = (): JSX.Element => {

  const [time, setTime] = useState<string>('');

  const todayDate: string = useFetchDate({setTime});

  const [paramsTodo, setParamsTodo] = useState<ParamsTodoType>({
    date: todayDate,
    project: "",
    liste: "",
    delay: "",
    name: "",
    email: "",
    phone: "",
    priority: "option3",
  });

  const [todos, setTodos] = useState<Todo[]>([]);

  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const [switcher, setSwitcher] = useState<boolean>(false);

  const idRef = useRef<number>(0);

  const handleCheckBox = (day: string): void => {
    setSelectedDay(day);
  };

  const handleSwitch = () => {
    setSwitcher((prev: boolean) => !prev);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!paramsTodo.date) return;
    setTodos((prev: Todo[]) => [
      ...prev,
      {
        id: String(idRef.current++),
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
      date: todayDate,
      project: "",
      liste: "",
      delay: "",
      name: "",
      email: "",
      phone: "",
      priority: "option3",
    });
    setSelectedDay(null);
  };

  console.log("!!!todos!!!", todos?.map((x) => x));

  return (
    <div className="main--div--app">
      
      <div className='main--title'>
        <h1>{time}</h1>
      </div>

      <div className='div--switcher--btn'>
        <button type="button" onClick={handleSwitch} className='custom-btn'>
          Switch
        </button>
      </div>

      {switcher === false ? (
        <div>

          <CreateInputCheckbox
            date={paramsTodo.date}
            project={paramsTodo.project}
            liste={paramsTodo.liste}
            delay={paramsTodo.delay}
            name={paramsTodo.name}
            email={paramsTodo.email}
            phone={paramsTodo.phone}
            priority={paramsTodo.priority}
            setParamsTodo={setParamsTodo}
            selectedDay={selectedDay}
            handleCheckBox={handleCheckBox}
            handleSubmit={handleSubmit}
          />

          <TodosList todos={todos} setTodos={setTodos} />

        </div>
      ) : (
        <FetchFromJson todos={todos} />
      )}
    </div>
  )
};
export default App;