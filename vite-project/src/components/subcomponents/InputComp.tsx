import type { ChangeEvent, JSX } from "react";
import "./styles/InputComp.css";

type InputType = {
    type: string;
    name: string;
    value: string;
    readOnly?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
};

const InputComp = ({type, name, value, onChange, placeholder}: InputType): JSX.Element => {
    return (
        <input 
            type={type}
            name={name}
            value={value} 
            onChange={onChange} 
            className="input-creation" 
            placeholder={placeholder}
        />
    )
};
export default InputComp;