import { 
  useEffect,
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
import { changeColor, formatPhoneNumber } from "../utils/fonctions";
import { 
  handleChangePriority,
  handleEditClient,
  handleEditDate,
  handleEditDelay,
  handleEditListe,
  handleEditMail,
  handleEditPhone,
  handleEditProject 
} from "../utils/apiFunctions.ts";
import CheckDay from "./subcomponents/CheckDay.tsx";
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

  // To change day
  const [dayBool, setDayBool] = useState<boolean>(true);

  // To change color by priority
  const [paramsPriority, setParamsPriority] = useState<ParamsPriorityTypes>({
    hidePriority: true,
    bgColor: "#4169e11a"
  });

  // Hide delete btn when items are crossed
  const [crossedItem, setCrossedItem] = useState<boolean>(false);

  // Ref
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editBoolParams]);

  // Priority colors
  const callChangeColorPriority = (priorityValue: string): void => {
      changeColor(setParamsPriority, priorityValue);
  };

  useEffect(() => {
      callChangeColorPriority(todo.priority);
  }, [todo.priority]);

  // Edit params for EditableField Component (reusable function)
  const EditParamsOnChange = (e: ChangeEvent<EditableElement>): void => {
    const { name, value }: {name: string, value: string} = e.target;
    setEditWriteParams((prev: WriteEditType) => ({
      ...prev,
      [name]: value
    })
  )};

  // Edit phone number for EditableField Component
  const EditPhoneOnChange = (e: ChangeEvent<EditableElement>): void => {
    setEditWriteParams((prev: WriteEditType) => ({
      ...prev,
      editPhone: formatPhoneNumber(e.target.value)
    })
  )};

  // HandleEdit... Priority
  const callHandleChangePriority = async (
   e: ChangeEvent<HTMLSelectElement>, id: string): Promise<void> => { 
    await handleChangePriority(e, id, setTodos, setParamsPriority);
  }

  // Date
  const callSubmitDate = async (
    e: FormEvent<HTMLFormElement>, id: string): Promise<void> => { 
    await handleEditDate(e, editWriteParams, setTodos, setEditBoolParams, id);
  };

  // Project
  const callSubmitProject = async (    
    e: FormEvent<HTMLFormElement>, id: string): Promise<void> => { 
    await handleEditProject(e, editWriteParams, setTodos, setEditBoolParams, id);
  };

  // Liste
  const callSubmitListe = async(
      e: FormEvent<HTMLFormElement>, id: string): Promise<void> => { 
    await handleEditListe(e, editWriteParams, setTodos, setEditBoolParams, id);
  };

  // Delay
  const callSubmitDelay = async (
    e: FormEvent<HTMLFormElement>, id: string): Promise<void> => { 
    await handleEditDelay(e, editWriteParams, setTodos, setEditBoolParams, id);
  };

  // Client
  const callSubmitClient = async (
    e: FormEvent<HTMLFormElement>, id: string): Promise<void> => { 
    await handleEditClient(e, editWriteParams, setTodos, setEditBoolParams, id);
  };

  // Mail
  const callSubmitMail = async (
    e: FormEvent<HTMLFormElement>, id: string): Promise<void> => { 
    await handleEditMail(e, editWriteParams, setTodos, setEditBoolParams, id);
  };

  // Phone
  const callSubmitPhone = async (
    e: FormEvent<HTMLFormElement>, id: string): Promise<void> => { 
    await handleEditPhone(e, editWriteParams, setTodos, setEditBoolParams, id);
  };

  // Cross out todo by id
  const handleCrossOutTodo = (id: string): void => {
    setTodos((prev: Todo[]) => prev.map((todo: Todo): Todo => todo.id === id ? {...todo,
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
    setCrossedItem((prev: boolean) => !prev);
  };

  // Delete todo by id in json file & write todo deleted to csv file
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
    } catch (error: unknown) {
      console.error("Erreur ajout todo", error);
    };
    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "DELETE",
      });
    } catch (error: unknown) {
      console.error("Erreur suppression serveur", error);
    };
    setTodos(todos.filter((todo: Todo) => (todo.id !== id)));
  };


  
  
  const callChangeDay = (e: ChangeEvent<HTMLSelectElement>, id: string) => {
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id 
      ? {...todo, selectedDay: e.target.value } 
      : todo
    ));
  }; 



  return (
    <div id={String(todo.id)} className="main--div">

      {/* <div className="div--day">
        <h2>{todo.selectedDay?.toUpperCase()}</h2>
      </div> */}

      <div 
        className="container--todo" 
        style={{ backgroundColor: paramsPriority.bgColor }}
      >
        
        <div className="priority--div">

          <CheckDay 
            id={todo.id} 
            dayBool={dayBool}
            selectedDay={todo.selectedDay}
            handleChangeDay={(e: ChangeEvent<HTMLSelectElement>) => 
              callChangeDay(e, todo.id)} 
            onClick={() => setDayBool((prev: boolean) => !prev)}
          />

          <PriorityTodo
            priorityTodo={todo.priority}
            paramsPriority={paramsPriority}
            handleChangePriority={(e: ChangeEvent<HTMLSelectElement>) => 
              callHandleChangePriority(e, todo.id)
            }
            onClick={() => setParamsPriority((prev: ParamsPriorityTypes) => ({
                ...prev, 
                hidePriority: !prev.hidePriority
            }))}
          />

        </div>

        <div className="date-project-liste-delay">

          <EditableFields
            onSubmit={(e: FormEvent<HTMLFormElement>) => callSubmitDate(e, todo.id)}
            type="text"
            params="Date"
            as="input"
            className="input-button-container"
            ref={refs.editBoolDate}
            name="editDate"
            value={editWriteParams.editDate}
            onChange={EditParamsOnChange}
            editBoolParams={editBoolParams.editBoolDate}
            editWriteParams={editWriteParams.editDate}
            isDoneParams={todo.isDoneDate}
          />

          <EditableFields
            onSubmit={(e: FormEvent<HTMLFormElement>) => callSubmitProject(e, todo.id)}
            type="text"
            params="Project"
            as="input"
            className="input-button-container"
            ref={refs.editBoolProject}
            name="editProject"
            value={editWriteParams.editProject}
            onChange={EditParamsOnChange}
            editBoolParams={editBoolParams.editBoolProject}
            editWriteParams={editWriteParams.editProject}
            isDoneParams={todo.isDoneProject}
          />

          <EditableFields
            onSubmit={(e: FormEvent<HTMLFormElement>) => callSubmitListe(e, todo.id)}
            params="Liste"
            as="textarea"
            className="input-button-textarea"
            rows={5}
            cols={20}
            ref={refs.editBoolListe}
            name="editListe"
            value={editWriteParams.editListe}
            onChange={EditParamsOnChange}
            editBoolParams={editBoolParams.editBoolListe}
            editWriteParams={editWriteParams.editListe}
            isDoneParams={todo.isDoneProject}
          />

          <EditableFields
            onSubmit={(e: FormEvent<HTMLFormElement>) => callSubmitDelay(e, todo.id)} 
            type="text"
            params="Délais"
            as="input"
            className="input-button-container"
            ref={refs.editBoolDelay}
            name="editDelay"
            value={editWriteParams.editDelay}
            onChange={EditParamsOnChange}
            editBoolParams={editBoolParams.editBoolDelay}
            editWriteParams={editWriteParams.editDelay}
            isDoneParams={todo.isDoneDelay}
          />

        </div>

        <div className="client--mail--phone">

          <EditableFields
            onSubmit={(e: FormEvent<HTMLFormElement>) => callSubmitClient(e, todo.id)} 
            type="text"
            params="Client"
            as="input"
            className="input-button-client"
            ref={refs.editBoolClient}
            name="editClient"
            value={editWriteParams.editClient}
            onChange={EditParamsOnChange}
            editBoolParams={editBoolParams.editBoolClient}
            editWriteParams={editWriteParams.editClient}
            isDoneParams={todo.isDoneClient}
          />
        
          <EditableFields
            onSubmit={(e: FormEvent<HTMLFormElement>) => callSubmitMail(e, todo.id)} 
            type="email"
            params="Email"
            as="input"
            className="input-button-mail"
            ref={refs.editBoolMail}
            name="editMail"
            value={editWriteParams.editMail}
            onChange={EditParamsOnChange}
            editBoolParams={editBoolParams.editBoolMail}
            editWriteParams={editWriteParams.editMail}
            isDoneParams={todo.isDoneMail}
          />

          <EditableFields
            onSubmit={(e: FormEvent<HTMLFormElement>) => callSubmitPhone(e, todo.id)}
            type="text"
            params="Phone"
            as="input"
            className="input-button-phone"
            ref={refs.editBoolPhone}
            name="editPhone"
            value={editWriteParams.editPhone}
            onChange={EditPhoneOnChange}
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

          {crossedItem === false ? (
            <button 
              type="button" 
              onClick={() => handleDelete(todo.id)} 
              className="delete--btn"
            >
              <MdDelete size={20} />
            </button>
          ):(
            null
          )}

        </div>

      </div>

    </div>
  )
};
export default TodoPerDay;