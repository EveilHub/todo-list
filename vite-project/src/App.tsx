import { 
  useEffect, 
  useRef, 
  useState, 
  type FC, 
  type FormEvent, 
  type JSX 
} from 'react';
import type { 
  ParamsTodoType,
  LoadErrType,
  Todo 
} from './lib/definitions.ts';
import { useFetchDate } from './hooks/useFetchDate.ts';
import CreateInputCheckbox from './components/CreateInputCheckbox.tsx';
import TodosList from './components/TodosList.tsx';
import FetchFromCSV from './components/FetchFromCSV.tsx';
import './App.css';
import Calendar from './components/Calendar.tsx';

const App: FC = (): JSX.Element => {

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

  const [todos, setTodos] = useState<Todo[]>([]);

  const [loadErr, setLoadErr] = useState<LoadErrType>({
    loading: true,
    error: null
  });

  const [view, setView] = useState<string>("default");

  const idRef = useRef<number>(0);

  const handleCheckBox = (day: string): void => {
    setSelectedDay(day);
  };

  useEffect(() => {
      const savedId = localStorage.getItem('currentId');
      idRef.current = savedId ? parseInt(savedId, 10) : 0;
  }, []);

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
      localStorage.setItem('currentId', String(idRef.current));
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
        setLoadErr((prev: LoadErrType) => ({
          ...prev, 
          error: "☠️ Impossible de charger les données ☠️"
        }));
      } finally {
        setLoadErr((prev: LoadErrType) => ({
          ...prev, 
          loading: false
        }));
      }
    };
    fetchTodos();
  }, [view]);
  
  if (loadErr.loading) return <h3>Chargement...</h3>;
  if (loadErr.error) return (
    <h3 style={{color: "#ff3444"}}>
      {loadErr.error}
    </h3>
  );

  return (
    <div className="main--div--app">
      
      <div className='main--title'>
        <h1>{time}</h1>
      </div>

      <div className='switch--cal--btn'>
        <button 
          type="button" 
          onClick={() => setView(view === "completed" 
            ? "default" 
            : "completed"
          )}
          className='custom-btn'
        >
          Completed
        </button>

        <button 
          type="button" 
          onClick={() => setView(view === "calendar" 
            ? "default" 
            : "calendar"
          )} 
          className='custom-btn'
        >
          Calendar
        </button>
      </div>

      {view === "default" ? (
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
      ) : null}
      
      {view === "completed" ? (
        <FetchFromCSV />
      ) : null}
      
      {view === "calendar" ? (
        <Calendar />
      ) : null} 
      
    </div>
  )
};
export default App;