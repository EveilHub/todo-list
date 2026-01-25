import { useEffect, useRef, useState, type FormEvent, type JSX } from 'react';
import type { ParamsTodoType, SwitchLoadErrType, Todo } from './lib/definitions.ts';
import { useFetchDate } from './hooks/useFetchDate.ts';
import CreateInputCheckbox from './components/CreateInputCheckbox.tsx';
import TodosList from './components/TodosList.tsx';
import FetchFromJson from './components/FetchFromCSV.tsx';
import './App.css';

const App = (): JSX.Element => {

  const [time, setTime] = useState<string>('');

  const todayDate: string = useFetchDate({setTime});

  const [paramsTodo, setParamsTodo] = useState<ParamsTodoType>({
    date: todayDate,
    project: "",
    liste: "",
    delay: todayDate,
    client: "",
    email: "",
    phone: "",
    priority: "option3",
  });

  const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);

  const idRef: React.RefObject<number> = useRef<number>(0);

  const [todos, setTodos] = useState<Todo[]>([]);

  const [switchLoadErr, setSwitchLoadErr] = useState<SwitchLoadErrType>({
    switcher: false,
    loading: true,
    error: null
  });

  const handleCheckBox = (day: string): void => {
    setSelectedDay(day);
  };

  const handleSwitch = (): void => {
    setSwitchLoadErr((prev: SwitchLoadErrType) => ({
      ...prev, 
      switcher: !prev.switcher
    }))
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!paramsTodo.date) return;
    const newTodo: Todo = {
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
    };
    setTodos((prev: Todo[]) => [...prev, newTodo]);
    try {
      await fetch("http://localhost:3001/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
    } catch (error: unknown) {
      console.error("Erreur ajout todo", error);
    };
    setParamsTodo({
      date: todayDate,
      project: "",
      liste: "",
      delay: todayDate,
      client: "",
      email: "",
      phone: "",
      priority: "option3",
    });
    setSelectedDay(undefined);
  };

  useEffect(() => {
    const fetchTodos = async (): Promise<void> => {
      try {
        const res: Response = await fetch("http://localhost:3001/api/todos");
        if (!res.ok) throw new Error("Erreur serveur");

        const data: Todo[] = await res.json();
        setTodos(data);
      } catch (err: unknown) {
        setSwitchLoadErr((prev: SwitchLoadErrType) => ({
          ...prev, 
          error: "☠️ Impossible de charger les données ☠️"
        }));
      } finally {
        setSwitchLoadErr((prev: SwitchLoadErrType) => ({
          ...prev, 
          loading: false
        }));
      }
    };
    fetchTodos();
    return (): void => console.log("Clean-up");
  }, [switchLoadErr.switcher]);
  
  if (switchLoadErr.loading) return <h3>Chargement...</h3>;
  if (switchLoadErr.error) return <h3 style={{color: "#ff3444"}}>{switchLoadErr.error}</h3>;

  return (
    <div className="main--div--app">
      
      <div className='main--title'>
        <h1>{time}</h1>
      </div>

      <div className='div--switcher--btn'>
        <button 
          type="button" 
          onClick={handleSwitch} 
          className='custom-btn'
        >
          Switch
        </button>
      </div>

      {switchLoadErr.switcher === false ? (
        <div>

          <CreateInputCheckbox
            date={paramsTodo.date}
            project={paramsTodo.project}
            liste={paramsTodo.liste}
            delay={paramsTodo.delay}
            client={paramsTodo.client}
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
        <FetchFromJson />
      )}
    </div>
  )
};
export default App;