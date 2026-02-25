import type { ChangeEvent, FormEvent, JSX } from "react";
import type { CreatorType, ParamsTodoType } from "../lib/definitions";
import { formatPhoneNumber } from "../utils/fonctions";
import InputComp from "./subcomponents/InputComp";
import CheckboxComp from "./subcomponents/CheckboxComp";
import { FaDownload } from "react-icons/fa";
import "./styles/CreateInputCheckbox.css";

const CreateInputCheckbox = ({
    date,
    project,
    liste,
    delay,
    client,
    email,
    phone,
    setParamsTodo,
    selectedDay,
    handleCheckBox,
    handleSubmit
}: CreatorType): JSX.Element => {

    const handleChangeCreateInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value }: {name: string; value: string;} = e.target;
        if (name === "delay") {
            const regexAutorise = /^[0-9/: ]*$/;

            if (!regexAutorise.test(value)) {
                return;
            }
        }
        setParamsTodo((prev: ParamsTodoType) => ({
            ...prev, [name]: value
        }));
    };

    const handleChangeCreateInputPhone = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value }: {name: string; value: string;} = e.target;
        setParamsTodo((prev: ParamsTodoType) => ({
            ...prev, [name]: formatPhoneNumber(value)
        }));
    };

    return (
        <form
            onSubmit={(e: FormEvent<HTMLFormElement>): void => handleSubmit(e)} 
            className='creation--container'
        >
            <div className="creation--input--checkbox">

                <div className='creation-input-container'>

                    <InputComp
                        type="text"
                        name="date"
                        value={date} 
                        onChange={handleChangeCreateInput}
                        placeholder="Date"
                    />

                    <InputComp 
                        type="text"
                        name="project"
                        value={project}
                        onChange={handleChangeCreateInput}
                        placeholder="Projet"
                    />

                    <InputComp 
                        type="text"
                        name="liste"
                        value={liste}
                        onChange={handleChangeCreateInput}
                        placeholder="Liste"
                    />

                    <InputComp 
                        type="text"
                        name="delay"
                        value={delay}
                        onChange={handleChangeCreateInput}
                        placeholder="21/01/2026 16:00"
                        minLength={16}
                    />

                    <InputComp 
                        type="text"
                        name="client"
                        value={client}
                        onChange={handleChangeCreateInput}
                        placeholder="Client"
                    />

                    <InputComp 
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChangeCreateInput}
                        placeholder="example@mail.com" 
                    />

                    <InputComp 
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={handleChangeCreateInputPhone}
                        placeholder="076 673 67 34"
                        maxLength={13}
                    />

                </div>

                <div className="checkbox-lbl-input">
                    
                    <CheckboxComp
                        params="lundi"
                        checked={selectedDay === "lundi"}
                        handleCheckBox={(): void => handleCheckBox("lundi")}
                    >
                        Lundi
                    </CheckboxComp>

                    <CheckboxComp
                        params="mardi"
                        checked={selectedDay === "mardi"}
                        handleCheckBox={(): void => handleCheckBox("mardi")}
                    >
                        Mardi
                    </CheckboxComp>

                    <CheckboxComp
                        params="mercredi"
                        checked={selectedDay === "mercredi"}
                        handleCheckBox={(): void => handleCheckBox("mercredi")}
                    >
                        Mercredi
                    </CheckboxComp>

                    <CheckboxComp
                        params="jeudi"
                        checked={selectedDay === "jeudi"}
                        handleCheckBox={(): void => handleCheckBox("jeudi")}
                    >
                        Jeudi
                    </CheckboxComp>

                    <CheckboxComp
                        params="vendredi"
                        checked={selectedDay === "vendredi"}
                        handleCheckBox={(): void => handleCheckBox("vendredi")}
                    >
                        Vendredi
                    </CheckboxComp>

                </div>

            </div>

            <div className='creation--btn--div'>
                <button
                    id="btn-1"
                    type="submit"
                    aria-label='btn--create'
                    className={selectedDay === undefined 
                        ? "disable-btn" 
                        : "custom-btn"
                    }
                    disabled={selectedDay === undefined 
                        ? true 
                        : false
                    }
                >
                    <FaDownload size={16} />
                </button>
            </div>

        </form>
    )
}
export default CreateInputCheckbox;