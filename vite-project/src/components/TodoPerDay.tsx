import { 
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type JSX, 
  type SyntheticEvent
} from "react";
import type { 
  BooleanEditType,
  EditableElement,
  ParamsPriorityTypes,
  PropsTodoType,
  Todo,
  WriteEditType 
} from "../lib/definitions.ts";
import { 
  callChangeDay,
  handleChangePriority,
  submitClient,
  submitDelay,
  submitListe,
  submitMail,
  submitPhone,
  submitProject
} from "../utils/todoFunctions.ts";
import { changeColor, formatPhoneNumber } from "../utils/fonctions";
import CheckDay from "./subcomponents/CheckDay.tsx";
import PriorityTodo from "./subcomponents/PriorityTodo.tsx";
import EditableFields from "./subcomponents/EditableFields.tsx";
import { MdDelete } from "react-icons/md";
import { GiCrossedSabres } from "react-icons/gi";
import { FaEye } from "react-icons/fa6";
import "./styles/TodoPerDay.css";

const TodoPerDay = ({ todo, todos, setTodos }: PropsTodoType): JSX.Element => {

  const [editBoolParams, setEditBoolParams] = useState<BooleanEditType>({
    editBoolProject: false,
    editBoolListe: false,
    editBoolDelay: false,
    editBoolClient: false,
    editBoolMail: false,
    editBoolPhone: false
  });

  const [editWriteParams, setEditWriteParams] = useState<WriteEditType>({
    editId: String(todo.id),
    editProject: todo.project,
    editListe: todo.liste,
    editDelay: todo.delay,
    editClient: todo.client,
    editMail: todo.email,
    editPhone: todo.phone
  });

  // To change day
  const [dayBool, setDayBool] = useState<boolean>(true);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  // To change color by priority
  const [paramsPriority, setParamsPriority] = useState<ParamsPriorityTypes>({
    hidePriority: true,
    bgColor: "#4169e11a"
  });

  // Hide delete btn when items are crossed
  const [crossedItem, setCrossedItem] = useState<boolean>(false);

  // Ref
  const refs = {
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


  // Priority API
  const callHandleChangePriority = async (
    e: ChangeEvent<HTMLSelectElement>, id: string): Promise<void> => { 
      handleChangePriority(e, id, setTodos, setParamsPriority);
  };

  // Priority colors
  const callChangeColorPriority = (priorityValue: string): void => {
    changeColor(setParamsPriority, priorityValue);
  };

  // Priority changes color
  useEffect(() => {
    callChangeColorPriority(todo.priority);
  }, [todo.priority]);

  // Edit params for EditableField Component (reusable function)
  const editParamsOnChange = (e: ChangeEvent<EditableElement>): void => {
    const { name, value }: {name: string, value: string} = e.target;
    if (name === "editDelay") {
      const regexAutorise = /^[0-9/: ]*$/;

      if (!regexAutorise.test(value)) {
        return;
      };
    };
    setEditWriteParams((prev: WriteEditType) => ({
      ...prev,
      [name]: value
    })
  )};

  // Edit phone number for EditableField Component
  const editPhoneOnChange = (e: ChangeEvent<EditableElement>): void => {
    setEditWriteParams((prev: WriteEditType) => ({
      ...prev,
      editPhone: formatPhoneNumber(e.target.value)
    })
  )};

  // Day Selected changes
  const changeDayFunction = async (e: ChangeEvent<HTMLSelectElement>, id: string): Promise<void> => {
    callChangeDay(e, id, setTodos, setDayBool);
  };

  // Project
  const callSubmitProject = (
    e: SyntheticEvent<HTMLFormElement>, id: string): void => { 
      submitProject(e, editWriteParams, setTodos, setEditBoolParams, id);
  };

  // Liste
  const callSubmitListe = (
    e: SyntheticEvent<HTMLFormElement>, id: string): void => { 
      submitListe(e, editWriteParams, setTodos, setEditBoolParams, id);
  };

  // Delay
  const callSubmitDelay = (
    e: SyntheticEvent<HTMLFormElement>, id: string): void => { 
      submitDelay(e, editWriteParams, setTodos, setEditBoolParams, id);
  };

  // Client
  const callSubmitClient = (
    e: SyntheticEvent<HTMLFormElement>, id: string): void => { 
      submitClient(e, editWriteParams, setTodos, setEditBoolParams, id);
  };

  // Mail
  const callSubmitMail = (
    e: SyntheticEvent<HTMLFormElement>, id: string): void => { 
      submitMail(e, editWriteParams, setTodos, setEditBoolParams, id);
  };

  // Phone
  const callSubmitPhone = (
    e: SyntheticEvent<HTMLFormElement>, id: string): void => { 
      submitPhone(e, editWriteParams, setTodos, setEditBoolParams, id);
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
      console.error("Erreur DELETE", error);
    };
    setTodos(todos.filter((todo: Todo) => (todo.id !== id)));
  };

  return (
    <div id={String(todo.id)} className="main--div">

      <div 
        className="container--todo" 
        style={{ backgroundColor: paramsPriority.bgColor }}
      >
        
        <div className="day--priority">

          <CheckDay 
            id={todo.id} 
            dayBool={dayBool}
            selectedDay={todo?.selectedDay}
            handleChangeDay={(e) => changeDayFunction(e, todo.id)}
            onClick={() => setDayBool((prev: boolean) => !prev)}
          />

          <PriorityTodo
            id={String(todo.id)}
            paramsPriorityHide={paramsPriority.hidePriority}
            priorityTodo={todo.priority}
            handleChangePriority={(e: ChangeEvent<HTMLSelectElement>) => 
              callHandleChangePriority(e, todo.id)
            }
            onClick={() => setParamsPriority((prev: ParamsPriorityTypes) => ({
              ...prev, 
              hidePriority: !prev.hidePriority
              })
            )}
          />

        </div>

        <div className="project-liste-delay">

          <EditableFields
            onSubmit={(e) => callSubmitProject(e, todo.id)}
            type="text"
            as="input"
            className="input-button-container"
            ref={refs.editBoolProject}
            name="editProject"
            value={editWriteParams.editProject}
            onChange={editParamsOnChange}
            editBoolParams={editBoolParams.editBoolProject}
            editWriteParams={editWriteParams.editProject}
            isDoneParams={todo.isDoneProject}
          />

          <EditableFields
            onSubmit={(e) => callSubmitListe(e, todo.id)}
            as="textarea"
            className="input-button-textarea"
            rows={5}
            cols={20}
            ref={refs.editBoolListe}
            name="editListe"
            value={editWriteParams.editListe}
            onChange={editParamsOnChange}
            editBoolParams={editBoolParams.editBoolListe}
            editWriteParams={editWriteParams.editListe}
            isDoneParams={todo.isDoneListe}
          />

          <EditableFields
            onSubmit={(e) => callSubmitDelay(e, todo.id)} 
            type="text"
            as="input"
            className="input-button-container"
            ref={refs.editBoolDelay}
            name="editDelay"
            value={editWriteParams.editDelay}
            onChange={editParamsOnChange}
            editBoolParams={editBoolParams.editBoolDelay}
            editWriteParams={editWriteParams.editDelay}
            isDoneParams={todo.isDoneDelay}
          />

        </div>

        <div className="absolute--div">
          <div 
            onMouseLeave={() => setIsVisible(false)}
            className={`client--mail--phone ${isVisible ? "is-open" : "is-close"}`}
          >

            <EditableFields
              onSubmit={(e) => callSubmitClient(e, todo.id)} 
              type="text"
              as="input"
              className={`input-button-client ${isVisible ? "show" : "hide"}`}
              ref={refs.editBoolClient}
              name="editClient"
              value={editWriteParams.editClient}
              onChange={editParamsOnChange}
              editBoolParams={editBoolParams.editBoolClient}
              editWriteParams={editWriteParams.editClient}
              isDoneParams={todo.isDoneClient}
            />
          
            <EditableFields
              onSubmit={(e) => callSubmitMail(e, todo.id)} 
              type="email"
              as="input"
              className={`input-button-mail ${isVisible ? "show" : "hide"}`}
              ref={refs.editBoolMail}
              name="editMail"
              value={editWriteParams.editMail}
              onChange={editParamsOnChange}
              editBoolParams={editBoolParams.editBoolMail}
              editWriteParams={editWriteParams.editMail}
              isDoneParams={todo.isDoneMail}
            />

            <EditableFields
              onSubmit={(e) => callSubmitPhone(e, todo.id)}
              type="text"
              as="input"
              className={`input-button-phone ${isVisible ? "show" : "hide"}`}
              ref={refs.editBoolPhone}
              name="editPhone"
              value={editWriteParams.editPhone}
              onChange={editPhoneOnChange}
              editBoolParams={editBoolParams.editBoolPhone}
              editWriteParams={editWriteParams.editPhone}
              isDoneParams={todo.isDonePhone}
            />

          </div>

          <div className="div--hidden--clientMailPhone">

            <span 
              onClick={() => setIsVisible(true)}
              className={`span--client--mail--phone ${isVisible ? "hide" : "show"}`}
            >
              <FaEye size={24} />
            </span>

          </div>

        </div>

        <div className="div--crossout--delete">

          <button 
            type="button" 
            aria-label="cross todo"
            onClick={(): void => handleCrossOutTodo(todo.id)} 
            className="cross--out--btn"
          >
            <GiCrossedSabres size={22} />
          </button>

          {crossedItem === false ? (
            <button 
              type="button" 
              aria-label="btn--done"
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