import type { JSX } from "react";
import type { InputType } from "../../lib/definitions";
import "./styles/InputComp.css";

const InputComp = (
    {
        type, 
        name, 
        value,
        onChange,
        maxLength,
        placeholder
    }: InputType): JSX.Element => {
    return (
        <input 
            type={type}
            name={name}
            value={value}
            onChange={onChange} 
            className="input--creation"
            maxLength={maxLength} 
            placeholder={placeholder}
        />
    )
};
export default InputComp;