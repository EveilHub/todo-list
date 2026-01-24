import { useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type JSX 
} from "react";
import type { 
  BooleanEditType,
  EditableElement,
  ParamsPriorityTypes,
  PropsTodoType,
  Todo,
  WriteEditType 
} from "../lib/definitions.ts";
import { formatPhoneNumber } from "../utils/fonctions";
import PriorityTodo from "./subcomponents/PriorityTodo.tsx";
import EditableFields from "./subcomponents/EditableFields.tsx";
import { MdDelete } from "react-icons/md";
import { GiCrossedSabres } from "react-icons/gi";
import "./styles/TodoPerDay.css";

const TodoPerDay = ({todo, todos, setTodos}: PropsTodoType): JSX.Element => {

  const [editBoolParams, setEditBoolParams] = useState<BooleanEditType>({
    editBoolDate: false,
    editBoolProject: false,
    editBoolListe: false,
    editBoolDelay: false,
    editBoolClient: false,
    editBoolMail: false,
    editBoolPhone: false
  });

  const [editWriteParams, setEditWriteParams] = useState<WriteEditType>({
    editId: String(todo.id),
    editDate: String(todo.date),
    editProject: todo.project,
    editListe: todo.liste,
    editDelay: todo.delay,
    editClient: todo.client,
    editMail: todo.email,
    editPhone: todo.phone
  });

  // To change color by priority
  const [paramsPriority, setParamsPriority] = useState<ParamsPriorityTypes>({
    hidePriority: true,
    bgColor: "#4169e11a"
  });

  // Ref with id
  const refs = {
    editBoolDate: useRef<HTMLInputElement>(null),
    editBoolProject: useRef<HTMLInputElement>(null),
    editBoolListe: useRef<HTMLTextAreaElement>(null),
    editBoolDelay: useRef<HTMLInputElement>(null),
    editBoolClient: useRef<HTMLInputElement>(null),
    editBoolMail: useRef<HTMLInputElement>(null),
    editBoolPhone: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    (Object.entries(editBoolParams) as [
      keyof typeof refs,
      boolean
    ][]).forEach(([key, value]) => {
      if (value) {
        refs[key]?.current?.focus();
      }
    });
  }, [editBoolParams]);

  // Priority colors
  const changeColor = (priorityValue: string): void => {
    switch (priorityValue) {
      case 'option1':
        setParamsPriority((prev: ParamsPriorityTypes) => ({
          ...prev, 
          bgColor: '#3c650b'
        }));
        break;
      case 'option2':
        setParamsPriority((prev: ParamsPriorityTypes) => ({
          ...prev,
          bgColor: '#0b3c65'
        }));
        break;
      case 'option3':
        setParamsPriority((prev: ParamsPriorityTypes) => ({
          ...prev, 
          bgColor: '#4169e11a'
        }));
        break;
      default:
        setParamsPriority((prev: ParamsPriorityTypes) => ({
          ...prev, 
          bgColor: '#4169e11a'
        }));
    }
  };

  useEffect(() => {
      changeColor(todo.priority);
  }, [todo.priority]);

  const handleChangePriority = 
    async (e: ChangeEvent<HTMLSelectElement>, id: string): Promise<void> => {
    setTodos(todos.map((todo: Todo) => todo.id === editWriteParams.editId ? {
      ...todo, priority: e.target.value
    } : todo));

    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priority: e.target.value }),
      });
    } catch (error) {
      console.error("Erreur mise à jour date", error);
    };

    setParamsPriority((prev: ParamsPriorityTypes) => ({
      ...prev, hidePriority: !prev.hidePriority
    }));
  };

  // HandleEdit...
  const handleEditDate = async (e: FormEvent<HTMLFormElement>, id: string): Promise<void> => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
      ...todo, date: editWriteParams.editDate
    } : todo));

    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: editWriteParams.editDate }),
      });
    } catch (error) {
      console.error("Erreur mise à jour date", error);
    };

    setEditBoolParams((prev: BooleanEditType) => ({
      ...prev, 
      editBoolDate: !prev.editBoolDate
    }));
  };

  // Project
  const handleEditProject = async (e: FormEvent<HTMLFormElement>, id: string): Promise<void> => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
      ...todo, project: editWriteParams.editProject
    } : todo));

    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ project: editWriteParams.editProject }),
      });
    } catch (error) {
      console.error("Erreur mise à jour date", error);
    }

    setEditBoolParams((prev: BooleanEditType) => ({
      ...prev, editBoolProject: !prev.editBoolProject
    }));
  };

  // Liste
  const handleEditListe = async (e: FormEvent<HTMLFormElement>, id: string): Promise<void> => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
      ...todo, liste: editWriteParams.editListe  
    } : todo));

    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ liste: editWriteParams.editListe }),
      });
    } catch (error) {
      console.error("Erreur mise à jour date", error);
    };

    setEditBoolParams((prev: BooleanEditType) => ({
      ...prev, editBoolListe: !prev.editBoolListe
    }));
  };

  // Delay
  const handleEditDelay = async (e: FormEvent<HTMLFormElement>, id: string): Promise<void> => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
      ...todo, delay: editWriteParams.editDelay 
    } : todo));

    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ delay: editWriteParams.editDelay }),
      });
    } catch (error) {
      console.error("Erreur mise à jour date", error);
    };

    setEditBoolParams((prev: BooleanEditType) => ({
      ...prev, editBoolDelay: !prev.editBoolDelay
    }));
  };

  // Client
  const handleEditClient = async (e: FormEvent<HTMLFormElement>, id: string): Promise<void> => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
      ...todo, client: editWriteParams.editClient
    } : todo));

    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ client: editWriteParams.editClient }),
      });
    } catch (error) {
      console.error("Erreur mise à jour date", error);
    };

    setEditBoolParams((prev: BooleanEditType) => ({
      ...prev, editBoolClient: !prev.editBoolClient
    }));
  };

  // Mail
  const handleEditMail = async (e: FormEvent<HTMLFormElement>, id: string): Promise<void> => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
      ...todo, email: editWriteParams.editMail
    } : todo));

    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: editWriteParams.editMail }),
      });
    } catch (error) {
      console.error("Erreur mise à jour date", error);
    };

    setEditBoolParams((prev: BooleanEditType) => ({
      ...prev, editBoolMail: !prev.editBoolMail
    }));
  };

  // Phone
  const handleEditPhone = async (e: FormEvent<HTMLFormElement>, id: string): Promise<void> => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
      ...todo, phone: editWriteParams.editPhone 
    } : todo));

    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: editWriteParams.editPhone }),
      });
    } catch (error) {
      console.error("Erreur mise à jour date", error);
    };

    setEditBoolParams((prev: BooleanEditType) => ({
      ...prev, editBoolPhone: !prev.editBoolPhone
    }));
  };

  // Cross out todo by id
  const handleCrossOutTodo = (id: string): void => {
    setTodos(todos.map((todo: Todo): Todo => todo.id === id ? {...todo,
      isDoneDate: !todo.isDoneDate,
      isDoneProject: !todo.isDoneProject,
      isDoneListe: !todo.isDoneListe,
      isDoneDelay: !todo.isDoneDelay,
      isDoneClient: !todo.isDoneClient,      
      isDoneMail: !todo.isDoneMail, 
      isDonePhone: !todo.isDonePhone 
    } : todo));

    setEditBoolParams((prev: BooleanEditType): BooleanEditType => ({...prev,
      editBoolDate: prev.editBoolDate,
      editBoolProject: prev.editBoolProject,
      editBoolListe: prev.editBoolListe,
      editBoolDelay: prev.editBoolDelay,
      editBoolClient: prev.editBoolClient,
      editBoolMail: prev.editBoolMail,
      editBoolPhone: prev.editBoolPhone
    }));
  };

  /*
    Delete todo by id in json file & 
    write todo deleted to csv file
  */
  const handleDelete = async (id: string): Promise<void> => {
    if (!todo.date) return;
    const newTodo: Todo | undefined = todos.find((todo: Todo) => todo.id === id);
    if (!newTodo) return;
    try {
      await fetch(`http://localhost:3001/api/todos/csv`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
    } catch (error) {
      console.error("Erreur ajout todo", error);
    };
    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Erreur suppression serveur", error);
    };
    setTodos(todos.filter((todo: Todo) => (todo.id !== id)));
  };

  /* const EditParamsOnChange = {(e: ChangeEvent<EditableElement>): void => 
    setEditWriteParams((prev: WriteEditType) => ({
      ...prev,
      [e.target.name]: e.target.value
    })
  )}; */

  return (
    <div id={String(todo.id)} className="main--div">

      <div className="div--day">
        <h2>{todo.selectedDay?.toUpperCase()}</h2>
      </div>

      <div 
        className="container--todo" 
        style={{ backgroundColor: paramsPriority.bgColor }}
      >

        <div className="priority--div">
          <PriorityTodo
            priorityTodo={todo.priority}
            paramsPriority={paramsPriority}
            handleChangePriority={(e: ChangeEvent<HTMLSelectElement>) => 
              handleChangePriority(e, todo.id)
            }
            onClick={() => setParamsPriority((prev: ParamsPriorityTypes) => ({
              ...prev, 
              hidePriority: !prev.hidePriority
            }))}
          />
        </div>

        <div className="date-project-liste-delay">

          <EditableFields
            onSubmit={(e: FormEvent<HTMLFormElement>) => handleEditDate(e, todo.id)}
            type="text"
            params="Date"
            as="input"
            className="input-button-container"
            ref={refs.editBoolDate}
            name={editWriteParams.editDate}
            value={editWriteParams.editDate}
            onChange={(e: ChangeEvent<EditableElement>): void => 
              setEditWriteParams((prev: WriteEditType) => ({
                ...prev,
                editDate: e.target.value
              })
            )}
            editBoolParams={editBoolParams.editBoolDate}
            editWriteParams={editWriteParams.editDate}
            isDoneParams={todo.isDoneDate}
          />

          <EditableFields
            onSubmit={(e: FormEvent<HTMLFormElement>) => handleEditProject(e, todo.id)}
            type="text"
            params="Project"
            as="input"
            className="input-button-container"
            ref={refs.editBoolProject}
            name={editWriteParams.editProject}
            value={editWriteParams.editProject}
            onChange={(e: ChangeEvent<EditableElement>): void => 
              setEditWriteParams((prev: WriteEditType) => ({
                ...prev,
                editProject: e.target.value
              })
            )}
            editBoolParams={editBoolParams.editBoolProject}
            editWriteParams={editWriteParams.editProject}
            isDoneParams={todo.isDoneProject}
          />

          <EditableFields
            onSubmit={(e: FormEvent<HTMLFormElement>) => handleEditListe(e, todo.id)}
            params="Liste"
            as="textarea"
            className="input-button-textarea"
            rows={5}
            cols={20}
            ref={refs.editBoolListe}
            name={editWriteParams.editListe}
            value={editWriteParams.editListe}
            onChange={(e: ChangeEvent<EditableElement>): void => 
              setEditWriteParams((prev: WriteEditType) => ({
                ...prev,
                editListe: e.target.value
              })
            )}
            editBoolParams={editBoolParams.editBoolListe}
            editWriteParams={editWriteParams.editListe}
            isDoneParams={todo.isDoneProject}
          />

          <EditableFields
            onSubmit={(e: FormEvent<HTMLFormElement>) => handleEditDelay(e, todo.id)} 
            type="text"
            params="Délais"
            as="input"
            className="input-button-container"
            ref={refs.editBoolDelay}
            name={editWriteParams.editDelay}
            value={editWriteParams.editDelay}
            onChange={(e: ChangeEvent<EditableElement>): void => 
              setEditWriteParams((prev: WriteEditType) => ({
                ...prev,
                editDelay: e.target.value
              })
            )}
            editBoolParams={editBoolParams.editBoolDelay}
            editWriteParams={editWriteParams.editDelay}
            isDoneParams={todo.isDoneDelay}
          />

        </div>

        <div className="client--mail--phone">

          <EditableFields
            onSubmit={(e: FormEvent<HTMLFormElement>) => handleEditClient(e, todo.id)} 
            type="text"
            params="Client"
            as="input"
            className="input-button-client"
            ref={refs.editBoolClient}
            name={editWriteParams.editClient}
            value={editWriteParams.editClient}
            onChange={(e: ChangeEvent<EditableElement>): void => 
              setEditWriteParams((prev: WriteEditType) => ({
                ...prev,
                editClient: e.target.value
              })
            )}
            editBoolParams={editBoolParams.editBoolClient}
            editWriteParams={editWriteParams.editClient}
            isDoneParams={todo.isDoneClient}
          />
        
          <EditableFields
            onSubmit={(e: FormEvent<HTMLFormElement>) => handleEditMail(e, todo.id)} 
            type="email"
            params="Email"
            as="input"
            className="input-button-client"
            ref={refs.editBoolMail}
            name={editWriteParams.editMail}
            value={editWriteParams.editMail}
            onChange={(e: ChangeEvent<EditableElement>): void => 
              setEditWriteParams((prev: WriteEditType) => ({
                ...prev,
                editMail: e.target.value
              })
            )}
            editBoolParams={editBoolParams.editBoolMail}
            editWriteParams={editWriteParams.editMail}
            isDoneParams={todo.isDoneMail}
          />

          <EditableFields
            onSubmit={(e: FormEvent<HTMLFormElement>) => handleEditPhone(e, todo.id)}
            type="text"
            params="Phone"
            as="input"
            className="input-button-client"
            ref={refs.editBoolPhone}
            name={editWriteParams.editPhone}
            value={editWriteParams.editPhone}
            onChange={(e: ChangeEvent<EditableElement>): void => 
              setEditWriteParams((prev: WriteEditType) => ({
                ...prev,
                editPhone: formatPhoneNumber(e.target.value)
              })
            )}
            editBoolParams={editBoolParams.editBoolPhone}
            editWriteParams={editWriteParams.editPhone}
            isDoneParams={todo.isDonePhone}
          />

        </div>

        <div className="div--crossout--delete">

          <button 
            type="button" 
            onClick={(): void => handleCrossOutTodo(todo.id)} 
            className="cross--out--btn"
          >
            <GiCrossedSabres size={22} />
          </button>

          <button 
            type="button" 
            onClick={() => handleDelete(todo.id)} 
            className="delete--btn"
          >
            <MdDelete size={20} />
          </button>

        </div>

      </div>

    </div>
  )
};
export default TodoPerDay;