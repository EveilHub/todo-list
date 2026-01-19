import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import type { BooleanEditType, daysOfWeek, PropsTodoType, Todo, WriteEditType } from "../lib/definitions.ts";
import PriorityComp from "./subcomponents/PriorityComp.tsx";
import EditableFields from "./subcomponents/EditableFields.tsx";
import { MdOutlineSaveAlt } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { GiCrossedSabres } from "react-icons/gi";
import "./styles/TodoPerDayComp.css";

const TodoPerDayComp = ({todo, todos, setTodos}: PropsTodoType): JSX.Element => {

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
    editDate: todo.date.toLocaleString(),
    editProject: todo.project,
    editListe: todo.liste,
    editDelay: todo.delay,
    editClient: todo.name,
    editMail: todo.email,
    editPhone: todo.phone
  });

  // To change color by priority
  const [hidePriority, setHidePriority] = useState<boolean>(true);
  const [priority, setPriority] = useState<string>("option3");
  const [bgColor, setBgColor] = useState('#4169e11a');

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

  const getDayLabel = (dayChoice: daysOfWeek): string => {
    switch (true) {
      case dayChoice.lundi:
        return "Lundi";
      case dayChoice.mardi:
        return "Mardi";
      case dayChoice.mercredi:
        return "Mercredi";
      case dayChoice.jeudi:
        return "Jeudi";
      case dayChoice.vendredi:
        return "Vendredi";
      default:
        return "NO DAY";
    }
  };

  const changeColor = (priority: string): void => {
    switch (priority) {
      case 'option1':
        setBgColor('#79c900');
          break;
      case 'option2':
        setBgColor('#9afd00');
          break;
      case 'option3':
        setBgColor('#4169e11a');
          break;
      default:
        setBgColor('#4169e11a');
    }
  };

  useEffect(() => {
    changeColor(priority);
  }, [priority]);

  const handleChangePriority = (e: ChangeEvent<HTMLSelectElement>): void => {
    setPriority(e.target.value);
    setHidePriority(!hidePriority);
  };

  const handleEditDate = (e: FormEvent<HTMLFormElement>, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editWriteParams.editDate } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolDate: !prev.editBoolDate}));
  };

  const handleEditProject = (e: FormEvent<HTMLFormElement>, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editWriteParams.editProject } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolProject: !prev.editBoolProject}));
  };

  const handleEditListe = (e: FormEvent<HTMLFormElement>, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editWriteParams.editListe } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolListe: !prev.editBoolListe}));
  };

  const handleEditDelay = (e: FormEvent<HTMLFormElement>, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editWriteParams.editDelay } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolDelay: !prev.editBoolDelay}));
  };

  const handleEditClient = (e: FormEvent<HTMLFormElement>, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editWriteParams.editClient } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolClient: !prev.editBoolClient}));
  };

  const handleEditMail = (e: FormEvent<HTMLFormElement>, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editWriteParams.editMail } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolMail: !prev.editBoolMail}));
  };

  const handleEditPhone = (e: FormEvent<HTMLFormElement>, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editWriteParams.editPhone } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolPhone: !prev.editBoolPhone}));
  };

  const handleCrossOutTodo = (id: number): void => {
    setTodos(todos.map((todo: Todo): Todo => todo.id === id ? { ...todo,
      isDoneProject: !todo.isDoneProject,
      isDoneDate: !todo.isDoneDate,
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

  // Delete todo by id
  const handleDelete = (id: number): void => {
    setTodos(todos.filter((todo) => (todo.id !== id)));
  };

  return (
    <div id={String(todo.id)} className="main--div">

      <div className="div--day">
        <h2>{getDayLabel(todo.dayChoice)}</h2>
      </div>

      <div className="container--todo" style={{ backgroundColor: bgColor }}>

        <div className="priority--div">
          <PriorityComp 
            priority={priority} 
            setHidePriority={setHidePriority} 
            hidePriority={hidePriority} 
            handleChangePriority={handleChangePriority}
          />
        </div>

        <div className="date-project-liste-delay">

          <EditableFields
            onSubmit={(e) => handleEditDate(e, todo.id)} 
            day="Date"
            className="input-button-container"
            ref={refs.editBoolDate}
            name={editWriteParams.editDate}
            value={editWriteParams.editDate}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditWriteParams((prev: WriteEditType) => ({
              ...prev,
              editDate: e.target.value
              })
            )}
            onClick={(): void => setEditBoolParams((prev: BooleanEditType) => ({
              ...prev, 
              editBoolDate: !prev.editBoolDate
              })
            )}
            editBoolParams={editBoolParams.editBoolDate}
            editWriteParams={editWriteParams.editDate}
            isDoneParams={todo.isDoneDate}
          />

          <EditableFields
            onSubmit={(e) => handleEditProject(e, todo.id)} 
            day="Project"
            className="input-button-container"
            ref={refs.editBoolProject}
            name={editWriteParams.editProject}
            value={editWriteParams.editProject}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditWriteParams((prev: WriteEditType) => ({
              ...prev,
              editProject: e.target.value
              })
            )}
            onClick={(): void => setEditBoolParams((prev: BooleanEditType) => ({
              ...prev, 
              editBoolProject: !prev.editBoolProject
              })
            )}
            editBoolParams={editBoolParams.editBoolProject}
            editWriteParams={editWriteParams.editProject}
            isDoneParams={todo.isDoneProject}
          />

          {/* <EditableFields
            onSubmit={(e) => handleEditListe(e, todo.id)} 
            day={"Liste"}
            ref={refs.editBoolListe}
            name={editWriteParams.editListe}
            value={editWriteParams.editListe}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => setEditWriteParams((prev: WriteEditType) => ({
              ...prev,
              editListe: e.target.value
              })
            )}
            onClick={(): void => setEditBoolParams((prev: BooleanEditType) => ({
              ...prev, 
              editBoolListe: !prev.editBoolListe
              })
            )}
            editBoolParams={editBoolParams.editBoolListe}
            editWriteParams={editWriteParams.editListe}
            isDoneParams={todo.isDoneProject}
          /> */}

          <form
            onSubmit={(e) => handleEditListe(e, todo.id)} 
            className="form"
          >
            <div className="daycomp-textarea">
              <h3>Liste</h3>
              <div className="input-button-container">
                
                {editBoolParams.editBoolListe === true ? (
                  <textarea 
                    ref={refs.editBoolListe} 
                    name={editWriteParams.editListe}
                    id="liste"
                    rows={4}
                    cols={30}
                    value={editWriteParams.editListe}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => setEditWriteParams((prev: WriteEditType) => ({
                      ...prev,
                      editListe: e.target.value
                      })
                    )}
                  >
                  </textarea>
                  ) : todo.isDoneListe === true ? (
                    <s>{editWriteParams.editListe}</s>
                  ) : (
                  <textarea name="liste" id="liste" rows={4} cols={30} value={editWriteParams.editListe} readOnly>
                  </textarea>
                  )
                }
                <div>
                  <button 
                    type="button" 
                    onClick={(): void => setEditBoolParams((prev: BooleanEditType) => ({
                      ...prev, editBoolListe: !prev.editBoolListe
                      })
                    )}
                    className="modify-btn"
                  >
                    {editBoolParams.editBoolListe === true ? (
                      <MdOutlineSaveAlt size={22} />
                    ) : (
                      <BsPencilSquare size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          <EditableFields
            onSubmit={(e) => handleEditDelay(e, todo.id)} 
            day="Délais"
            className="input-button-container"
            ref={refs.editBoolDelay}
            name={editWriteParams.editDelay}
            value={editWriteParams.editDelay}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditWriteParams((prev: WriteEditType) => ({
              ...prev,
              editDelay: e.target.value
              })
            )}
            onClick={(): void => setEditBoolParams((prev: BooleanEditType) => ({
              ...prev, 
              editBoolDelay: !prev.editBoolDelay
              })
            )}
            editBoolParams={editBoolParams.editBoolDelay}
            editWriteParams={editWriteParams.editDelay}
            isDoneParams={todo.isDoneDelay}
          />

        </div>

        <div className="client-mail-phone">

          <EditableFields
            onSubmit={(e) => handleEditClient(e, todo.id)} 
            day="Client"
            className="input-button-client"
            ref={refs.editBoolClient}
            name={editWriteParams.editClient}
            value={editWriteParams.editClient}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditWriteParams((prev: WriteEditType) => ({
              ...prev,
              editClient: e.target.value
              })
            )}
            onClick={(): void => setEditBoolParams((prev: BooleanEditType) => ({
              ...prev, 
              editBoolClient: !prev.editBoolClient
              })
            )}
            editBoolParams={editBoolParams.editBoolClient}
            editWriteParams={editWriteParams.editClient}
            isDoneParams={todo.isDoneClient}
          />
        
          <EditableFields
            onSubmit={(e) => handleEditMail(e, todo.id)} 
            day="Email"
            className="input-button-client"
            ref={refs.editBoolMail}
            name={editWriteParams.editMail}
            value={editWriteParams.editMail}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditWriteParams((prev: WriteEditType) => ({
              ...prev,
              editMail: e.target.value
              })
            )}
            onClick={(): void => setEditBoolParams((prev: BooleanEditType) => ({
              ...prev, 
              editBoolMail: !prev.editBoolMail
              })
            )}
            editBoolParams={editBoolParams.editBoolMail}
            editWriteParams={editWriteParams.editMail}
            isDoneParams={todo.isDoneMail}
          />

          <EditableFields
            onSubmit={(e) => handleEditPhone(e, todo.id)}
            day="Phone"
            className="input-button-client"
            ref={refs.editBoolPhone}
            name={editWriteParams.editPhone}
            value={editWriteParams.editPhone}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditWriteParams((prev: WriteEditType) => ({
              ...prev,
              editPhone: e.target.value
              })
            )}
            onClick={(): void => setEditBoolParams((prev: BooleanEditType) => ({
              ...prev, 
              editBoolPhone: !prev.editBoolPhone
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
            onClick={(): void => handleDelete(todo.id)} 
            className="delete--btn"
          >
            <MdDelete size={20} />
          </button>

        </div>

      </div>

    </div>
  )
};
export default TodoPerDayComp;