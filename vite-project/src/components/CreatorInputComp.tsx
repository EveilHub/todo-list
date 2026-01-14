import type { ChangeEvent, FormEvent, JSX } from "react";
import type { CreatorType } from "../lib/definitions";
import "./styles/CreatorInputComp.css";

const CreatorInputComp = ({
    date,
    project, setProject,
    liste, setListe,
    delay, setDelay,
    name, setName,
    email, setEmail,
    phone, setPhone,
    dayChoice,
    handleCheckBox,
    handleSubmit
}: CreatorType): JSX.Element => {
    return (
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)} className='creation-container'>

            <div className='creation-input-container'>

                <input 
                    type="text"
                    value={date.toLocaleString()} 
                    readOnly
                    className="input-creation" 
                    placeholder="Date" 
                />

                <input 
                    type="text"
                    value={project} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setProject(e.target.value)} 
                    className="input-creation" 
                    placeholder="Projet" 
                />

                <input 
                    type="text"
                    value={liste} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setListe(e.target.value)} 
                    className="input-creation" 
                    placeholder="Liste" 
                />

                <input 
                    type="text"
                    value={delay} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDelay(e.target.value)} 
                    className="input-creation" 
                    placeholder="Délais" 
                />

                <input 
                    type="text"
                    value={name} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
                    className="input-creation" 
                    placeholder="Client" 
                />

                <input 
                    type="email"
                    value={email} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                    className="input-creation" 
                    placeholder="E-mail" 
                />

                <input 
                    type="number"
                    value={phone} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)} 
                    className="input-creation" 
                    placeholder="Phone" 
                />

                <div className="checkbox-lbl-input">

                    <label htmlFor="lundi" className="checkbox-lbl">
                        <input 
                            type="checkbox" 
                            id="lundi" 
                            checked={dayChoice.lundi} 
                            onChange={() => handleCheckBox("lundi")} 
                            className="checkbox-input" 
                        />
                        Lundi
                    </label>

                    <label htmlFor="mardi" className="checkbox-lbl">
                        <input 
                            type="checkbox" 
                            id="mardi" 
                            checked={dayChoice.mardi} 
                            onChange={() => handleCheckBox("mardi")} 
                            className="checkbox-input" 
                        />
                        Mardi
                    </label>

                    <label htmlFor="mercredi" className="checkbox-lbl">
                        <input 
                            type="checkbox" 
                            id="mercredi" 
                            checked={dayChoice.mercredi} 
                            onChange={() => handleCheckBox("mercredi")} 
                            className="checkbox-input" 
                        />
                        Mercredi
                    </label>

                    <label htmlFor="jeudi" className="checkbox-lbl">
                        <input 
                            type="checkbox" 
                            id="jeudi" 
                            checked={dayChoice.jeudi} 
                            onChange={() => handleCheckBox("jeudi")} 
                            className="checkbox-input" 
                        />
                        Jeudi
                    </label>

                    <label htmlFor="vendredi" className="checkbox-lbl">
                        <input 
                            type="checkbox" 
                            id="vendredi" 
                            checked={dayChoice.vendredi} 
                            onChange={() => handleCheckBox("vendredi")} 
                            className="checkbox-input" 
                        />
                        Vendredi
                    </label>

                </div>

            </div>

            <div className='creation-btn-div'>
                <button id="btn-1" type="submit" className="custom-btn">Create</button>
            </div>

        </form>
    )
}
export default CreatorInputComp;
