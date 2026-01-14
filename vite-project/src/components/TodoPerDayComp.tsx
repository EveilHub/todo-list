import { useEffect, useRef, useState, type JSX } from "react";
import type { daysOfWeek, PropsTodoType } from "../lib/definitions.ts";
import InputComponent from "./InputComponent.tsx";
import { MdOutlineSaveAlt } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import "./styles/TodoPerDayComp.css";

const TodoPerDayComp = ({todo, todos, setTodos}: PropsTodoType): JSX.Element => {

  const [editBoolDate, setEditBoolDate] = useState<boolean>(false);
  const [editDate, setEditDate] = useState<string>(todo.date.toLocaleString());

  const secondRef = useRef<HTMLInputElement>(null);

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

  useEffect((): void => {
      secondRef.current?.focus();
  }, [editBoolDate]);

  const handleSave = (id: number): void => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
    setEditBoolDate(false);
  };

  const handleEdit = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(todos.map(todo => todo.id === id ? { ...todo, todo: editDate } : todo))
    setEditBoolDate(true);
  };

  const handleDelete = (id: number): void => {
    setTodos(todos.filter((todo) => (todo.id !== id)));
  };

  return (

    <form id={String(todo.id)} onSubmit={(e) => handleEdit(e, todo.id)} className="main-div-daycomp">

      <div className="div-day-daycomp">
        <h2>{getDayLabel(todo.dayChoice)}</h2>
      </div>

      {editBoolDate ? (
          <input 
              ref={secondRef}
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              style={{fontSize: "1.1rem"}}
          />
          ) : todo.isDone ? (
              <s>{todo.date.toLocaleString()}</s>
          ) : (
              <span>{todo.date.toLocaleString()}</span>
          )
      }
      <span onClick={() => {
            if (!editBoolDate && !todo.isDone) {
              setEditBoolDate(!editBoolDate)
            }
          }} className="edit--span">Edit
      </span>

      <div className='input-box-daycomp'>
        
        <div className="daycomp-box">
          <h3>Date</h3>
          <div className="input-button-container">
            <InputComponent params={todo.date.toLocaleString()} />
            <div>
              <button type="button" onClick={() => handleSave(todo.id)} className="save-btn"><MdOutlineSaveAlt size={22} /></button>
              <button type="button" onClick={(e) => handleEdit(e, todo.id)} className="modify-btn"><BsPencilSquare size={18} /></button>
            </div>
          </div>
        </div>

        <div className="daycomp-box">
          <h3>Projet</h3>
          <div className="input-button-container">
            <InputComponent params={todo.project} />
            <div>
              <button type="button" onClick={() => handleSave(todo.id)} className="save-btn"><MdOutlineSaveAlt size={22} /></button>
              <button type="button" onClick={(e) => handleEdit(e, todo.id)} className="modify-btn"><BsPencilSquare size={18} /></button>
            </div>
          </div>
        </div>


        <div className="daycomp-box">
          <h3>Liste</h3>
          <div className="input-button-container">
            {/* <InputComponent params={todo.liste} /> */}
            
            <textarea name="liste" id="liste" rows={4} cols={50} value={todo.liste} readOnly>
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



        <div className="daycomp-box-client">
          <h3>Client</h3>
          <div className="input-button-client">
            <InputComponent params={todo.name} />
            <div className="btn-params">
              <button type="button" onClick={() => handleSave(todo.id)} className="save-btn-client"><MdOutlineSaveAlt size={18} /></button>
              <button type="button" onClick={(e) => handleEdit(e, todo.id)} className="modify-btn-client"><BsPencilSquare size={14} /></button>
            </div>
          </div>

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

        </div>

      </div>
      <div className="div-btndelete-project">
        <button type="button" onClick={() => handleDelete(todo.id)} className="delete-btn"><MdDelete size={20} /></button>
      </div>
    </form>
  )
};
export default TodoPerDayComp;