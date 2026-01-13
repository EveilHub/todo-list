import type { ChangeEvent, JSX } from "react";
import type { CreatorType, daysOfWeek } from "../lib/definitions";
import "./CreatorInputComp.css";

const CreatorInputComp = ({
    date, setDate,
    project, setProject,
    delay, setDelay, 
    redraw, setRedraw,
    name, setName,
    email, setEmail,
    phone, setPhone,
    newOne, setNewOne,
    dayChoice, setDayChoice
}: CreatorType): JSX.Element => {
    
    const derivatedState: string = date;

    const handleChangeDate = (e: ChangeEvent<HTMLInputElement>): void => {
        setDate(e.target.value);
    };

    const handleChangeProject = (e: ChangeEvent<HTMLInputElement>): void => {
        setProject(e.target.value);
    };

    const handleChangeDelay = (e: ChangeEvent<HTMLInputElement>): void => {
        setDelay(e.target.value);
    };

    const handleChangeDeadLine = (e: ChangeEvent<HTMLInputElement>): void => {
        setRedraw(e.target.value);
    };

    const handleChangeClient = (e: ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    };

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const handleChangePhone = (e: ChangeEvent<HTMLInputElement>): void => {
        setPhone(e.target.value);
    };

    const handleCreate = (): void => {
        if (date) {
            setNewOne([...newOne, derivatedState]);
            setDate('');
        }
    };

    const handleCheckBox = (day: keyof daysOfWeek): void => {
        setDayChoice(prevState => ({
            ...prevState, 
            [day]: !prevState[day] 
        }));
    };

    return (
        <div className='creation-container'>

            <div className='creation-input-container'>

                <input 
                    type="text"
                    value={date} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeDate(e)} 
                    className="input-creation" 
                    placeholder="Date" 
                />

                <input 
                    type="text"
                    value={project} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeProject(e)} 
                    className="input-creation" 
                    placeholder="Projet" 
                />

                <input 
                    type="text"
                    value={delay} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeDelay(e)} 
                    className="input-creation" 
                    placeholder="Délais" 
                />

                <input 
                    type="text"
                    value={redraw} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeDeadLine(e)} 
                    className="input-creation" 
                    placeholder="Reconduite" 
                />

                <input 
                    type="text"
                    value={name} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeClient(e)} 
                    className="input-creation" 
                    placeholder="Client" 
                />

                <input 
                    type="text"
                    value={email} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEmail(e)} 
                    className="input-creation" 
                    placeholder="E-mail" 
                />

                <input 
                    type="text"
                    value={phone} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangePhone(e)} 
                    className="input-creation" 
                    placeholder="Tél" 
                />

                <div className="checkbox-lbl-input">

                    <label htmlFor="lundi">
                        <input type="checkbox" id="lundi" checked={dayChoice.lundi} onChange={() => handleCheckBox("lundi")} />
                        Lundi
                    </label>

                    <label htmlFor="mardi">
                        <input type="checkbox" id="mardi" checked={dayChoice.mardi} onChange={() => handleCheckBox("mardi")} />
                        Mardi
                    </label>

                    <label htmlFor="mercredi">
                        <input type="checkbox" id="mercredi" checked={dayChoice.mercredi} onChange={() => handleCheckBox("mercredi")} />
                        Mercredi
                    </label>

                    <label htmlFor="jeudi">
                        <input type="checkbox" id="jeudi" checked={dayChoice.jeudi} onChange={() => handleCheckBox("jeudi")} />
                        Jeudi
                    </label>

                    <label htmlFor="vendredi">
                        <input type="checkbox" id="vendredi" checked={dayChoice.vendredi} onChange={() => handleCheckBox("vendredi")} />
                        Vendredi
                    </label>

                </div>

            </div>

            <div className='creation-btn-div'>
                <button id="btn-1" type="button" className="main-btn" onClick={handleCreate}>Create</button>
            </div>

        </div>
    )
}
export default CreatorInputComp;
