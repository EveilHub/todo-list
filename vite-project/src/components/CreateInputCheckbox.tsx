import type { ChangeEvent, FormEvent, JSX } from "react";
import type { CreatorType, ParamsTodoType } from "../lib/definitions";
import InputComp from "./subcomponents/InputComp";
import CheckboxComp from "./subcomponents/CheckboxComp";
import "./styles/CreateInputCheckbox.css";

const CreateInputCheckbox = ({
    date,
    project,
    liste,
    delay,
    name,
    email,
    phone,
    setParamsTodo,
    selectedDay,
    handleCheckBox,
    handleSubmit
}: CreatorType): JSX.Element => {

    const formatPhoneNumber = (value: string): string => {
        const digits = value.replace(/\D/g, "");

        return digits
            .slice(0, 10)
            .replace(/(\d{3})(\d{0,3})(\d{0,2})(\d{0,2})/, (_, a, b, c, d) =>
                [a, b, c, d].filter(Boolean).join(" ")
            );
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
                        readOnly
                        placeholder="Date"
                    />

                    <InputComp 
                        type="text"
                        name="project"
                        value={project}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => setParamsTodo((
                            prev: ParamsTodoType) => ({
                                ...prev, [e.target.name]: e.target.value
                            })
                        )} 
                        placeholder="Projet"
                    />

                    <InputComp 
                        type="text"
                        name="liste"
                        value={liste}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => setParamsTodo((
                            prev: ParamsTodoType) => ({
                                ...prev, [e.target.name]: e.target.value
                            })
                        )}
                        placeholder="Liste"
                    />

                    <InputComp 
                        type="text"
                        name="delay"
                        value={delay}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => setParamsTodo((
                            prev: ParamsTodoType) => ({
                                ...prev, [e.target.name]: e.target.value
                            })
                        )}
                        placeholder="Délais"
                    />

                    <InputComp 
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => setParamsTodo((
                            prev: ParamsTodoType) => ({
                                ...prev, [e.target.name]: e.target.value
                            })
                        )} 
                        placeholder="Client"
                    />

                    <InputComp 
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => setParamsTodo((
                            prev: ParamsTodoType) => ({
                                ...prev, [e.target.name]: e.target.value
                            })
                        )}
                        placeholder="example@mail.com" 
                    />

                    <InputComp 
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => setParamsTodo((
                            prev: ParamsTodoType) => ({
                                ...prev, [e.target.name]: formatPhoneNumber(e.target.value)
                            })
                        )}
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
                <button id="btn-1" type="submit" className="custom-btn">
                    Create
                </button>
            </div>

        </form>
    )
}
export default CreateInputCheckbox;
