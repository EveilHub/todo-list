import type { ChangeEvent, FormEvent, JSX } from "react";
import type { CreatorType, ParamsTodoType } from "../lib/definitions";
import InputComp from "./subcomponents/InputComp";
import CheckboxComp from "./subcomponents/CheckboxComp";
import "./styles/CreatorInputComp.css";

const CreatorInputComp = ({
    date,
    project,
    liste,
    delay,
    name,
    email,
    phone,
    setParamsTodo,
    dayChoice,
    handleCheckBox,
    handleSubmit
}: CreatorType): JSX.Element => {
    return (
        <form onSubmit={(e: FormEvent<HTMLFormElement>): void => handleSubmit(e)} className='creation-container'>

            <div className='creation-input-container'>

                <input 
                    type="text"
                    value={date.toLocaleString()} 
                    readOnly
                    className="input-creation" 
                    placeholder="Date" 
                />

                <InputComp 
                    type="text"
                    name="project"
                    value={project}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setParamsTodo((prev: ParamsTodoType) => ({
                        ...prev, [e.target.name]: e.target.value})
                    )} 
                    placeholder="Projet"
                />

                <InputComp 
                    type="text"
                    name="liste"
                    value={liste}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setParamsTodo((prev: ParamsTodoType) => ({
                        ...prev, [e.target.name]: e.target.value})
                    )}
                    placeholder="Liste"
                />

                <InputComp 
                    type="text"
                    name="delay"
                    value={delay}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setParamsTodo((prev: ParamsTodoType) => ({
                        ...prev, [e.target.name]: e.target.value})
                    )}
                    placeholder="Délais"
                />

                <InputComp 
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setParamsTodo((prev: ParamsTodoType) => ({
                        ...prev, [e.target.name]: e.target.value})
                    )} 
                    placeholder="Client"
                />

                <InputComp 
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setParamsTodo((prev: ParamsTodoType) => ({
                        ...prev, [e.target.name]: e.target.value})
                    )}
                    placeholder="example@mail.com" 
                />


                <InputComp 
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setParamsTodo((prev: ParamsTodoType) => ({
                        ...prev, [e.target.name]: e.target.value})
                    )}
                    placeholder="Phone" 
                />

                <div className="checkbox-lbl-input">
                  
                    <CheckboxComp
                        params="lundi"
                        checked={dayChoice.lundi}
                        handleCheckBox={(): void => handleCheckBox("lundi")}
                    >
                        Lundi
                    </CheckboxComp>

                    <CheckboxComp
                        params="mardi"
                        checked={dayChoice.mardi}
                        handleCheckBox={(): void => handleCheckBox("mardi")}
                    >
                        Mardi
                    </CheckboxComp>

                    <CheckboxComp
                        params="mercredi"
                        checked={dayChoice.mercredi}
                        handleCheckBox={(): void => handleCheckBox("mercredi")}
                    >
                        Mercredi
                    </CheckboxComp>

                    <CheckboxComp
                        params="jeudi"
                        checked={dayChoice.jeudi}
                        handleCheckBox={(): void => handleCheckBox("jeudi")}
                    >
                        Jeudi
                    </CheckboxComp>

                    <CheckboxComp
                        params="vendredi"
                        checked={dayChoice.vendredi}
                        handleCheckBox={(): void => handleCheckBox("vendredi")}
                    >
                        Vendredi
                    </CheckboxComp>

                </div>

            </div>

            <div className='creation-btn-div'>
                <button id="btn-1" type="submit" className="custom-btn">Create</button>
            </div>

        </form>
    )
}
export default CreatorInputComp;
