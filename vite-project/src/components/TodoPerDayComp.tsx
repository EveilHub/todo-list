import { useEffect, useRef, useState, type ChangeEvent, type JSX } from "react";
import type { daysOfWeek, PropsTodoType, Todo } from "../lib/definitions.ts";
import PriorityComp from "./PriorityComp.tsx";
import { MdOutlineSaveAlt } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { GiCrossedSabres } from "react-icons/gi";
import "./styles/TodoPerDayComp.css";

const TodoPerDayComp = ({todo, todos, setTodos}: PropsTodoType): JSX.Element => {

  // boolean + string change
  const [editBoolDate, setEditBoolDate] = useState<boolean>(false);
  const [editDate, setEditDate] = useState<string>(todo.date.toLocaleString());

  const [editBoolProject, setEditBoolProject] = useState<boolean>(false);
  const [editProject, setEditProject] = useState<string>(todo.project);

  const [editBoolListe, setEditBoolListe] = useState<boolean>(false);
  const [editListe, setEditListe] = useState<string>(todo.liste);

  const [editBoolDelay, setEditBoolDelay] = useState<boolean>(false);
  const [editDelay, setEditDelay] = useState<string>(todo.delay);

  const [editBoolClient, setEditBoolClient] = useState<boolean>(false);
  const [editClient, setEditClient] = useState<string>(todo.name);

  const [editBoolMail, setEditBoolMail] = useState<boolean>(false);
  const [editMail, setEditMail] = useState<string>(todo.email);

  const [editBoolPhone, setEditBoolPhone] = useState<boolean>(false);
  const [editPhone, setEditPhone] = useState<string>(todo.phone);

  // To change color by priority
  const [hidePriority, setHidePriority] = useState<boolean>(true);
  const [priority, setPriority] = useState<string>("option3");
  const [bgColor, setBgColor] = useState('#4169e11a');

  // Ref with id
  const firstRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const refListe = useRef<HTMLTextAreaElement>(null);
  const refDelay = useRef<HTMLInputElement>(null);
  const refClient = useRef<HTMLInputElement>(null);
  const refMail = useRef<HTMLInputElement>(null);
  const refPhone = useRef<HTMLInputElement>(null);
  
  useEffect((): void => {
    if (editBoolDate) firstRef.current?.focus();
  }, [editBoolDate]);

  useEffect((): void => {
    if (editBoolProject) secondRef.current?.focus();
  }, [editBoolProject]);

  useEffect((): void => {
    if (editBoolListe) refListe.current?.focus();
  }, [editBoolListe]);

  useEffect((): void => {
    if (editBoolDelay) refDelay.current?.focus();
  }, [editBoolDelay]);

  useEffect((): void => {
    if (editBoolClient) refClient.current?.focus();
  }, [editBoolClient]);

  useEffect((): void => {
    if (editBoolMail) refMail.current?.focus();
  }, [editBoolMail]);

  useEffect((): void => {
    if (editBoolPhone) refPhone.current?.focus();
  }, [editBoolPhone]);


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
    setEditBoolDate(editBoolDate);
  };

  const handleEditDate = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editDate } : todo))
    setEditBoolDate(!editBoolDate);
  };

  // Project
  const handleSaveProject = (id: number): void => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDoneProject: !todo.isDoneProject } : todo))
    setEditBoolProject(editBoolProject);
  };

  const handleEditProject = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editProject } : todo))
    setEditBoolProject(!editBoolProject);
  };

  // Liste
  const handleSaveListe = (id: number): void => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDoneListe: !todo.isDoneListe } : todo))
    setEditBoolListe(editBoolListe);
  };

  const handleEditListe = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editListe } : todo))
    setEditBoolListe(!editBoolListe);
  };

  // Délais
  const handleSaveDelay = (id: number): void => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDoneDelay: !todo.isDoneDelay } : todo))
    setEditBoolDelay(editBoolDelay);
  };

  const handleEditDelay = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editDelay } : todo))
    setEditBoolDelay(!editBoolDelay);
  };


  // Client
  const handleSaveClient = (id: number): void => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDoneClient: !todo.isDoneClient } : todo))
    setEditBoolClient(editBoolClient);
  };

  const handleEditClient = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editClient } : todo))
    setEditBoolClient(!editBoolClient);
  };

  // Email
  const handleSaveMail = (id: number): void => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDoneMail: !todo.isDoneMail } : todo))
    setEditBoolMail(editBoolMail);
  };

  const handleEditMail = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editMail } : todo))
    setEditBoolMail(!editBoolMail);
  };

  // Phone
  const handleSavePhone = (id: number): void => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDonePhone: !todo.isDonePhone } : todo))
    setEditBoolPhone(editBoolPhone);
  };

  const handleEditPhone = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editPhone } : todo))
    setEditBoolPhone(!editBoolPhone);
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

                {editBoolDate ? (
                  <input 
                    ref={firstRef}
                    value={editDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditDate(e.target.value)}
                  />
                  ) : todo.isDoneDate === true ? (
                    <s>{editDate}</s>
                  ) : (
                    <span>
                      {editDate}
                    </span>
                  )
                }
                <div>
                  {/* <button type="button" onClick={(e) => handleEdit(e, todo.id)} className="modify-btn"><BsPencilSquare size={18} /></button> */}

                  <button 
                    type="button" 
                    onClick={(): void => handleSaveDate(todo.id)} 
                    className="save-btn"
                  >
                    <GiCrossedSabres size={22} />
                  </button>

                  <button type="button" onClick={(): void => setEditBoolDate(!editBoolDate)}
                    className="modify-btn"
                  >
                    {editBoolDate === true ? (
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

                {editBoolProject === true ? (
                  <input 
                    ref={secondRef}
                    value={editProject}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditProject(e.target.value)}
                  />
                  ) : todo.isDoneProject === true ? (
                    <s>{editProject}</s>
                  ) : (
                    <span>{editProject}</span> 
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

                  <button type="button" onClick={(): void => setEditBoolProject(!editBoolProject)}
                    className="modify-btn"
                  >
                    {editBoolProject === true ? (
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
                
                {editBoolListe === true ? (
                  <textarea 
                    ref={refListe} 
                    name="liste"
                    id="liste"
                    rows={4}
                    cols={30}
                    value={editListe}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => setEditListe(e.target.value)}
                  >
                  </textarea>
                  ) : todo.isDoneListe === true ? (
                    <s>{editListe}</s>
                  ) : (
                  <textarea name="liste" id="liste" rows={4} cols={30} value={editListe} readOnly>
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

                  <button type="button" onClick={(): void => setEditBoolListe(!editBoolListe)}
                    className="modify-btn"
                  >
                    {editBoolListe === true ? (
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

                {editBoolDelay === true ? (
                  <input 
                    ref={refDelay}
                    value={editDelay}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditDelay(e.target.value)}
                  />
                  ) : todo.isDoneDelay === true ? (
                    <s>{editDelay}</s>
                  ) : (
                    <span>{editDelay}</span> 
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

                  <button type="button" onClick={(): void => setEditBoolDelay(!editBoolDelay)}
                    className="modify-btn"
                  >
                    {editBoolDelay === true ? (
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

              {editBoolClient === true ? (
                <input 
                  ref={refClient}
                  value={editClient}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditClient(e.target.value)}

                />
                ) : todo.isDoneClient === true ? (
                  <s>{editClient}</s>
                ) : (
                  <span>{editClient}</span> 
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

                <button type="button" onClick={(): void => setEditBoolClient(!editBoolClient)}
                  className="modify-btn"
                >
                  {editBoolClient === true ? (
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

              {editBoolMail === true ? (
                <input 
                  ref={refMail}
                  value={editMail}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditMail(e.target.value)}
                />
                ) : todo.isDoneMail === true ? (
                  <s>{editMail}</s>
                ) : (
                  <span>{editMail}</span> 
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

                <button type="button" onClick={(): void => setEditBoolMail(!editBoolMail)}
                  className="modify-btn"
                >
                  {editBoolMail === true ? (
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
                
              {editBoolPhone === true ? (
                <input 
                  ref={refPhone}
                  value={editPhone}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void => setEditPhone(e.target.value)}
                />
                ) : todo.isDonePhone === true ? (
                  <s>{editPhone}</s>
                ) : (
                  <span>{editPhone}</span> 
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

                <button type="button" onClick={(): void => setEditBoolPhone(!editBoolPhone)}
                  className="modify-btn"
                >
                  {editBoolPhone === true ? (
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
          <button type="button" onClick={(): void => handleDelete(todo.id)} className="delete--btn"><MdDelete size={20} /></button>
        </div>

      </div>

    </div>
  )
};
export default TodoPerDayComp;