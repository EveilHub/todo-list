import { type JSX } from "react";
import type { HollyType } from "../lib/definitions.ts";
import InputComponent from "./InputComponent.tsx";
import { MdOutlineSaveAlt } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import "./DaysComponent.css";

const DaysComponents = ({
  dayNum, day, 
  date, setDate, 
  project, setProject,
  liste, setListe,
  delay, setDelay,
  name, setName,
  email, setEmail,
  phone, setPhone
}: HollyType): JSX.Element => {

  const handleClick = (): void => {
    console.log("clicked !");
  };

  return (
    <div id={String(dayNum)} className="main-div-daycomp">

      <div className="div-day-daycomp">
        <h2>{day}</h2>
      </div>

      <div className='input-box-daycomp'>
        
        
        <div className="daycomp-box">
          <h3>Date</h3>
          <div className="input-button-container">
            <InputComponent params={date} setParams={setDate} />
            <div>
              <button type="button" onClick={handleClick} className="save-btn"><MdOutlineSaveAlt size={22} /></button>
              <button type="button" onClick={handleClick} className="modify-btn"><BsPencilSquare size={18} /></button>
              <button type="button" onClick={handleClick} className="delete-btn"><MdDelete size={20} /></button>
            </div>
          </div>
        </div>

        <div className="daycomp-box">
          <h3>Projet</h3>
          <div className="input-button-container">
            <InputComponent params={project} setParams={setProject} />
            <div>
              <button type="button" onClick={handleClick} className="save-btn"><MdOutlineSaveAlt size={22} /></button>
              <button type="button" onClick={handleClick} className="modify-btn"><BsPencilSquare size={18} /></button>
              <button type="button" onClick={handleClick} className="delete-btn"><MdDelete size={20} /></button>
            </div>
          </div>
        </div>


        <div className="daycomp-box">
          <h3>Liste</h3>
          <div className="input-button-container">
            <InputComponent params={liste} setParams={setListe} />
            <div>
              <button type="button" onClick={handleClick} className="save-btn"><MdOutlineSaveAlt size={22} /></button>
              <button type="button" onClick={handleClick} className="modify-btn"><BsPencilSquare size={18} /></button>
              <button type="button" onClick={handleClick} className="delete-btn"><MdDelete size={20} /></button>
            </div>
          </div>
        </div>

        <div className="daycomp-box">
          <h3>Délais</h3>
          <div className="input-button-container">
            <InputComponent params={delay} setParams={setDelay} />
            <div>
              <button type="button" onClick={handleClick} className="save-btn"><MdOutlineSaveAlt size={22} /></button>
              <button type="button" onClick={handleClick} className="modify-btn"><BsPencilSquare size={18} /></button>
              <button type="button" onClick={handleClick} className="delete-btn"><MdDelete size={20} /></button>
            </div>
          </div>
        </div>



        <div className="daycomp-box-client">
          <h3>Client</h3>
          <div className="input-button-client">
            <InputComponent params={name} setParams={setName} />
            <div className="btn-params">
              <button type="button" onClick={handleClick} className="save-btn-client"><MdOutlineSaveAlt size={18} /></button>
              <button type="button" onClick={handleClick} className="modify-btn-client"><BsPencilSquare size={14} /></button>
              <button type="button" onClick={handleClick} className="delete-btn-client"><MdDelete size={16} /></button>
            </div>
          </div>

          <div>

            <h5>E-mail</h5>
            <div className="input-button-client">
              <InputComponent params={email} setParams={setEmail} />
              <div className="btn-params">
                <button type="button" onClick={handleClick} className="save-btn-client"><MdOutlineSaveAlt size={18} /></button>
                <button type="button" onClick={handleClick} className="modify-btn-client"><BsPencilSquare size={14} /></button>
                <button type="button" onClick={handleClick} className="delete-btn-client"><MdDelete size={16} /></button>
              </div>
            </div>
          </div>

          <div>
            <h5>Tél</h5>
            <div className="input-button-client">
              <InputComponent params={phone} setParams={setPhone} />
              <div className="btn-params">
                <button type="button" onClick={handleClick} className="save-btn-client"><MdOutlineSaveAlt size={18} /></button>
                <button type="button" onClick={handleClick} className="modify-btn-client"><BsPencilSquare size={14} /></button>
                <button type="button" onClick={handleClick} className="delete-btn-client"><MdDelete size={16} /></button>
              </div>
            </div>
          </div>

        </div>

        {/* <div>
          <h3>E-mail</h3>
          <div className="input-button-container">
            <InputComponent params={email} setParams={setEmail} />
            <div>
              <button type="button" onClick={handleClick} className="save-btn"><MdOutlineSaveAlt size={22} /></button>
              <button type="button" onClick={handleClick} className="modify-btn"><BsPencilSquare size={18} /></button>
              <button type="button" onClick={handleClick} className="delete-btn"><MdDelete size={20} /></button>
            </div>
          </div>
        </div>

        <div>
          <h3>Tél</h3>
          <div className="input-button-container">
            <InputComponent params={phone} setParams={setPhone} />
            <div>
              <button type="button" onClick={handleClick} className="save-btn"><MdOutlineSaveAlt size={22} /></button>
              <button type="button" onClick={handleClick} className="modify-btn"><BsPencilSquare size={18} /></button>
              <button type="button" onClick={handleClick} className="delete-btn"><MdDelete size={20} /></button>
            </div>
          </div>
        </div> */}

      </div>
      <div className="div-btndelete-project">
        <button type="button" onClick={handleClick} className="delete-btn"><MdDelete size={20} /></button>
      </div>
    </div>
  )
};
export default DaysComponents;