import type { ChangeEvent, JSX } from "react";
import "./styles/InputComp.css";

type InputType = {
    type: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
};

const InputComp = ({type, value, onChange, placeholder}: InputType): JSX.Element => {
    return (
        <input 
            type={type}
            value={value} 
            onChange={onChange} 
            className="input-creation" 
            placeholder={placeholder}
        />
    )
};
export default InputComp;