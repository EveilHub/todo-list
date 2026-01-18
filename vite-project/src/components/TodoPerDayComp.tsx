import { useEffect, useRef, useState, type ChangeEvent, type JSX } from "react";
import type { BooleanEditType, daysOfWeek, PropsTodoType, Todo, WriteEditType } from "../lib/definitions.ts";
import PriorityComp from "./PriorityComp.tsx";
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

  const handleSaveDate = (id: number): void => {
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, isDoneDate: !todo.isDoneDate } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolDate: prev.editBoolDate}));
  };

  const handleEditDate = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editWriteParams.editDate } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolDate: !prev.editBoolDate}));
  };

  // Project
  const handleSaveProject = (id: number): void => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDoneProject: !todo.isDoneProject } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolProject: prev.editBoolProject}));
  };

  const handleEditProject = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editWriteParams.editProject } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolProject: !prev.editBoolProject}));
  };

  // Liste
  const handleSaveListe = (id: number): void => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDoneListe: !todo.isDoneListe } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolListe: prev.editBoolListe}));
  };

  const handleEditListe = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editWriteParams.editListe } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolListe: !prev.editBoolListe}));
  };

  // Délais
  const handleSaveDelay = (id: number): void => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDoneDelay: !todo.isDoneDelay } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolDelay: prev.editBoolDelay}));
  };

  const handleEditDelay = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editWriteParams.editDelay } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolDelay: !prev.editBoolDelay}));
  };


  // Client
  const handleSaveClient = (id: number): void => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDoneClient: !todo.isDoneClient } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolClient: prev.editBoolClient}));
  };

  const handleEditClient = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editWriteParams.editClient } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolClient: !prev.editBoolClient}));
  };

  // Email
  const handleSaveMail = (id: number): void => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDoneMail: !todo.isDoneMail } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolMail: prev.editBoolMail}));
  };

  const handleEditMail = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editWriteParams.editMail } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolMail: !prev.editBoolMail}));
  };

  // Phone
  const handleSavePhone = (id: number): void => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDonePhone: !todo.isDonePhone } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolPhone: prev.editBoolPhone}));
  };

  const handleEditPhone = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editWriteParams.editPhone } : todo))
    setEditBoolParams((prev: BooleanEditType) => ({...prev, editBoolPhone: !prev.editBoolPhone}));
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
          <form 
            onSubmit={(e) => handleEditDate(e, todo.id)} 
            className="form"
          >
            <div className="daycomp-box">
              <h3>Date</h3>
              <div className="input-btn-container">

                {editBoolParams.editBoolDate ? (
                  <input 
                    ref={refs.editBoolDate}
                    name={editWriteParams.editDate}
                    value={editWriteParams.editDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditWriteParams((prev: WriteEditType) => ({
                      ...prev,
                      editDate: e.target.value
                      })
                    )}
                  />
                  ) : todo.isDoneDate === true ? (
                    <s>{editWriteParams.editDate}</s>
                  ) : (
                    <span>
                      {editWriteParams.editDate}
                    </span>
                  )
                }
                <div>
                  <button 
                    type="button" 
                    onClick={(): void => handleSaveDate(todo.id)} 
                    className="save-btn"
                  >
                    <GiCrossedSabres size={22} />
                  </button>

                  <button 
                    type="button" 
                    onClick={(): void => setEditBoolParams((prev: BooleanEditType) => ({
                      ...prev, 
                      editBoolDate: !prev.editBoolDate
                      })
                    )}
                    className="modify-btn"
                  >
                    {editBoolParams.editBoolDate === true ? (
                      <MdOutlineSaveAlt size={22} />
                    ) : (
                      <BsPencilSquare size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          <form 
            onSubmit={(e) => handleEditProject(e, todo.id)} 
            className="form"
          >
            <div className="daycomp-box">
              <h3>Projet</h3>
              <div className="input-btn-container">

                {editBoolParams.editBoolProject === true ? (
                  <input 
                    ref={refs.editBoolProject}
                    name={editWriteParams.editProject}
                    value={editWriteParams.editProject}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditWriteParams((prev: WriteEditType) => ({
                      ...prev,
                      editProject: e.target.value
                      })
                    )}
                  />
                  ) : todo.isDoneProject === true ? (
                    <s>{editWriteParams.editProject}</s>
                  ) : (
                    <span>{editWriteParams.editProject}</span> 
                  )
                }
                <div>
                  <button 
                    type="button" 
                    onClick={(): void => handleSaveProject(todo.id)} 
                    className="save-btn"
                  >
                    <GiCrossedSabres size={22} />
                  </button>

                  <button 
                    type="button" 
                    onClick={(): void => setEditBoolParams((prev: BooleanEditType) => ({
                      ...prev, 
                      editBoolProject: !prev.editBoolProject
                      })
                    )}
                    className="modify-btn"
                  >
                    {editBoolParams.editBoolProject === true ? (
                      <MdOutlineSaveAlt size={22} />
                    ) : (
                      <BsPencilSquare size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          <form
            onSubmit={(e) => handleEditListe(e, todo.id)} 
            className="form"
          >
            <div className="daycomp-textarea">
              <h3>Liste</h3>
              <div className="input-btn-container">
                
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
                    onClick={(): void => handleSaveListe(todo.id)} 
                    className="save-btn"
                  >
                    <GiCrossedSabres size={22} />
                  </button>

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

          <form
            onSubmit={(e) => handleEditDelay(e, todo.id)} 
            className="form"
          >
            <div className="daycomp-box">
              <h3>Délais</h3>
              <div className="input-btn-container">

                {editBoolParams.editBoolDelay === true ? (
                  <input 
                    ref={refs.editBoolDelay}
                    name={editWriteParams.editDelay}
                    value={editWriteParams.editDelay}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditWriteParams((prev: WriteEditType) => ({
                      ...prev,
                      editDelay: e.target.value
                      })
                    )}
                  />
                  ) : todo.isDoneDelay === true ? (
                    <s>{editWriteParams.editDelay}</s>
                  ) : (
                    <span>{editWriteParams.editDelay}</span> 
                  )
                }
                <div>
                  <button 
                    type="button" 
                    onClick={(): void => handleSaveDelay(todo.id)} 
                    className="save-btn"
                  >
                    <GiCrossedSabres size={22} />
                  </button>

                  <button 
                    type="button" 
                    onClick={(): void => setEditBoolParams((prev: BooleanEditType) => ({
                      ...prev, editBoolDelay: !prev.editBoolDelay
                      })
                    )}
                    className="modify-btn"
                  >
                    {editBoolParams.editBoolDelay === true ? (
                      <MdOutlineSaveAlt size={22} />
                    ) : (
                      <BsPencilSquare size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="client-mail-phone">

          <form
            onSubmit={(e) => handleEditClient(e, todo.id)} 
            className="form"
          >
            <h3>Client</h3>
            <div className="input-button-client">

              {editBoolParams.editBoolClient === true ? (
                <input 
                  ref={refs.editBoolClient}
                  name={editWriteParams.editClient}
                  value={editWriteParams.editClient}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditWriteParams((prev: WriteEditType) => ({
                    ...prev,
                    editClient: e.target.value
                    })
                  )}
                />
                ) : todo.isDoneClient === true ? (
                  <s>{editWriteParams.editClient}</s>
                ) : (
                  <span>{editWriteParams.editClient}</span> 
                )
              }
              <div>

                <button 
                  type="button" 
                  onClick={(): void => handleSaveClient(todo.id)} 
                  className="save-btn"
                >
                  <GiCrossedSabres size={22} />
                </button>

                <button 
                  type="button" 
                  onClick={(): void => setEditBoolParams((prev: BooleanEditType) => ({
                    ...prev, editBoolClient: !prev.editBoolClient
                    })
                  )}
                  className="modify-btn"
                >
                  {editBoolParams.editBoolClient === true ? (
                    <MdOutlineSaveAlt size={22} />
                  ) : (
                    <BsPencilSquare size={18} />
                  )}
                </button>
              </div>
            </div>
          </form>
        
          <form
            onSubmit={(e) => handleEditMail(e, todo.id)} 
            className="form"
          >
            <h5>E-mail</h5>
            <div className="input-button-client">

              {editBoolParams.editBoolMail === true ? (
                <input 
                  ref={refs.editBoolMail}
                  name={editWriteParams.editMail}
                  value={editWriteParams.editMail}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditWriteParams((prev: WriteEditType) => ({
                    ...prev,
                    editMail: e.target.value
                    })
                  )}
                />
                ) : todo.isDoneMail === true ? (
                  <s>{editWriteParams.editMail}</s>
                ) : (
                  <span>{editWriteParams.editMail}</span> 
                )
              }
              <div>

                <button 
                  type="button" 
                  onClick={(): void => handleSaveMail(todo.id)} 
                  className="save-btn"
                >
                  <GiCrossedSabres size={22} />
                </button>

                <button 
                  type="button" 
                  onClick={(): void => setEditBoolParams((prev: BooleanEditType) => ({
                    ...prev, editBoolMail: !prev.editBoolMail
                    })
                  )}
                  className="modify-btn"
                >
                  {editBoolParams.editBoolMail === true ? (
                    <MdOutlineSaveAlt size={22} />
                  ) : (
                    <BsPencilSquare size={18} />
                  )}
                </button>

              </div>
            </div>
          </form>

          <form
            onSubmit={(e) => handleEditPhone(e, todo.id)} 
            className="form"
          >
            <div>

              <h5>Tél</h5>
              <div className="input-button-client">
                
              {editBoolParams.editBoolPhone === true ? (
                <input 
                  ref={refs.editBoolPhone}
                  name={editWriteParams.editPhone}
                  value={editWriteParams.editPhone}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditWriteParams((prev: WriteEditType) => ({
                    ...prev,
                    editPhone: e.target.value
                    })
                  )}
                />
                ) : todo.isDonePhone === true ? (
                  <s>{editWriteParams.editPhone}</s>
                ) : (
                  <span>{editWriteParams.editPhone}</span> 
                )
              }
              <div>

                <button 
                  type="button" 
                  onClick={(): void => handleSavePhone(todo.id)} 
                  className="save-btn"
                >
                  <GiCrossedSabres size={22} />
                </button>

                <button 
                  type="button" 
                  onClick={(): void => setEditBoolParams((prev: BooleanEditType) => ({
                    ...prev, editBoolPhone: !prev.editBoolPhone
                    })
                  )}
                  className="modify-btn"
                >
                  {editBoolParams.editBoolPhone === true ? (
                    <MdOutlineSaveAlt size={22} />
                  ) : (
                    <BsPencilSquare size={18} />
                  )}
                </button>

              </div>

              </div>
            </div>
          </form>
        </div>

        <div className="div--btndelete--project">
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