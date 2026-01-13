import { type ChangeEvent, type JSX } from "react";
import type { ParamsType } from "../lib/definitions.ts";

const InputComponent = ({params, setParams}: ParamsType): JSX.Element => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setParams(e.target.value);
    };

    return (
        <input 
            type="text"
            id="one"
            name="one" 
            value={params} 
            onChange={(e) => handleChange(e)}
            placeholder="Entrer un truc"
        />
    )
}
export default InputComponent;