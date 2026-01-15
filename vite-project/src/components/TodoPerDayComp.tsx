import { useEffect, useRef, useState, type ChangeEvent, type JSX } from "react";
import type { daysOfWeek, PropsTodoType, Todo } from "../lib/definitions.ts";
import PriorityComp from "./PriorityComp.tsx";
import InputComponent from "./InputComponent.tsx";
import { MdOutlineSaveAlt } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { GiCrossedSabres } from "react-icons/gi";
import "./styles/TodoPerDayComp.css";

const TodoPerDayComp = ({todo, todos, setTodos}: PropsTodoType): JSX.Element => {

  const [hidePriority, setHidePriority] = useState<boolean>(true);
  const [priority, setPriority] = useState<string>("option3");

  // boolean + string change
  const [editBoolDate, setEditBoolDate] = useState<boolean>(false);
  const [editDate, setEditDate] = useState<string>(todo.date.toLocaleString());

  const [editBoolProject, setEditBoolProject] = useState<boolean>(false);
  const [editProject, setEditProject] = useState<string>(todo.project);

  const [bgColor, setBgColor] = useState('#4169e11a');

  const firstRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  
  useEffect((): void => {
    if (editBoolDate) firstRef.current?.focus();
  }, [editBoolDate]);

  useEffect((): void => {
    if (editBoolProject) secondRef.current?.focus();
  }, [editBoolProject]);

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
        setBgColor('#00bf56'); // green
          break;
      case 'option2':
        setBgColor('#6bfc6b'); // Vert
          break;
      case 'option3':
        setBgColor('#4169e11a'); // Bleu
          break;
      default:
        setBgColor('#4169e11a'); // Bleu
    }
  };

  useEffect(() => {
    changeColor(priority);
  }, [priority]);

  const handleChangePriority = (e: ChangeEvent<HTMLSelectElement>): void => {
    setPriority(e.target.value);
    setHidePriority(!hidePriority);
  };

  const handleSave = (id: number): void => {
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, isDoneDate: !todo.isDoneDate } : todo))
    setEditBoolDate(false);
  };

  const handleEdit = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editDate } : todo))
    setEditBoolDate(true);
  };

  // project
  const handleSaveProject = (id: number): void => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDoneProject: !todo.isDoneProject } : todo))
    setEditBoolProject(!editBoolProject);
  };

  const handleEditProject = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map((todo: Todo) => todo.id === id ? { ...todo, todo: editProject } : todo))
    setEditBoolProject(!editBoolProject);
  };

  const handleDelete = (id: number): void => {
    setTodos(todos.filter((todo) => (todo.id !== id)));
  };

  return (
    <div className="main--div">

      <div className="div--day">
        <h2>{getDayLabel(todo.dayChoice)}</h2>
      </div>

      <div id={String(todo.id)} className="main--div--todo" style={{ backgroundColor: bgColor }}>

        {/* <div className="div-day-daycomp">
          <h2>{getDayLabel(todo.dayChoice)}</h2>
        </div> */}

        <form 
          onSubmit={(e) => handleEdit(e, todo.id)} 
          className=""
          style={{ backgroundColor: bgColor, border: "10px solid orange" }}
        >

          <PriorityComp 
            priority={priority} 
            setHidePriority={setHidePriority} 
            hidePriority={hidePriority} 
            handleChangePriority={handleChangePriority}
          />

          <div className='input-box-daycomp'>
            
            <div className="daycomp-box">
              <h3>Date</h3>
              <div className="input-button-container">

                {/* <InputComponent params={todo.date.toLocaleString()} /> */}

                {editBoolDate ? (
                  <input 
                    ref={firstRef}
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    style={{fontSize: "1.1rem"}}
                  />
                  ) : todo.isDoneDate === true ? (
                    <s>{editDate}</s>
                  ) : (
                    <span>
                      {editDate}
                    </span>

                  )
                }
                <span onClick={() => {
                      if (!editBoolDate && !todo.isDoneDate) {
                        setEditBoolDate(!editBoolDate)
                      }
                    }} className="edit--span"><BsPencilSquare size={18} />
                </span>


                <div>
                  {/* <button type="button" onClick={(e) => handleEdit(e, todo.id)} className="modify-btn"><BsPencilSquare size={18} /></button> */}

                  <button 
                    type="button" 
                    onClick={() => handleSave(todo.id)} 
                    className="save-btn"
                  >
                    <GiCrossedSabres size={22} />
                  </button>

                  <button type="button" onClick={() => setEditBoolDate(!editBoolDate)}
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
          </div>

        </form>

        <form 
          onSubmit={(e) => handleEditProject(e, todo.id)} 
          className=""
          // style={{ backgroundColor: bgColor }}
        >
        
          <div className="daycomp-box">
            <h3>Projet</h3>
            <div className="input-button-container">
              
              {/* <InputComponent params={todo.project} /> */}

              {editBoolProject === true ? (
                <input 
                  ref={secondRef}
                  value={editProject}
                  onChange={(e) => setEditProject(e.target.value)}
                  style={{fontSize: "1.1rem"}}
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
                  onClick={() => handleSaveProject(todo.id)} 
                  className="save-btn"
                >
                  <GiCrossedSabres size={22} />
                </button>

                <button type="button" onClick={() => setEditBoolProject(!editBoolProject)}
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

        <form>
          <div className="daycomp-textarea">
            <h3>Liste</h3>
            <div className="input-button-container">
              {/* <InputComponent params={todo.liste} /> */}
              
              <textarea name="liste" id="liste" rows={4} cols={30} value={todo.liste} readOnly>
              </textarea>

              <div>
                <button type="button" onClick={() => handleSave(todo.id)} className="save-btn"><MdOutlineSaveAlt size={22} /></button>
                <button type="button" onClick={(e) => handleEdit(e, todo.id)} className="modify-btn"><BsPencilSquare size={18} /></button>
              </div>
            </div>
          </div>

          <div className="daycomp-box">
            <h3>Délais</h3>
            <div className="input-button-container">
              
              <InputComponent params={todo.delay} />
              
              <div>
                <button type="button" onClick={() => handleSave(todo.id)} className="save-btn"><MdOutlineSaveAlt size={22} /></button>
                <button type="button" onClick={(e) => handleEdit(e, todo.id)} className="modify-btn"><BsPencilSquare size={18} /></button>
              </div>

            </div>
          </div>

        </form>




        <div className="daycomp-box-client">


          <form>

              <h3>Client</h3>
              <div className="input-button-client">
                
                <InputComponent params={todo.name} />

                <div className="btn-params">
                  <button type="button" onClick={() => handleSave(todo.id)} className="save-btn-client"><MdOutlineSaveAlt size={18} /></button>
                  <button type="button" onClick={(e) => handleEdit(e, todo.id)} className="modify-btn-client"><BsPencilSquare size={14} /></button>
                </div>
              
              </div>
          </form>
        
          <form action="">
              <div>

                <h5>E-mail</h5>
                <div className="input-button-client">

                  <InputComponent params={todo.email} />

                  <div className="btn-params">
                    <button type="button" onClick={() => handleSave(todo.id)} className="save-btn-client"><MdOutlineSaveAlt size={18} /></button>
                    <button type="button" onClick={(e) => handleEdit(e, todo.id)} className="modify-btn-client"><BsPencilSquare size={14} /></button>
                  </div>

                </div>
              </div>
          </form>

          <form action="">
              <div>

                <h5>Tél</h5>
                <div className="input-button-client">
                  
                  <InputComponent params={todo.phone} />
                  
                  <div className="btn-params">
                    <button type="button" onClick={() => handleSave(todo.id)} className="save-btn-client"><MdOutlineSaveAlt size={18} /></button>
                    <button type="button" onClick={(e) => handleEdit(e, todo.id)} className="modify-btn-client"><BsPencilSquare size={14} /></button>
                  </div>

                </div>
              </div>
          </form>

          <div className="div-btndelete-project">
            <button type="button" onClick={() => handleDelete(todo.id)} className="delete-btn"><MdDelete size={20} /></button>
          </div>
          
        </div>

      </div>

    </div>
  )
};
export default TodoPerDayComp;