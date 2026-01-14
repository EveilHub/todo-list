import { type JSX } from "react";
import type { ParamsType } from "../lib/definitions.ts";

const InputComponent = ({params}: ParamsType): JSX.Element => {

    return (
        <input 
            type="text"
            id="one"
            name="one" 
            value={params}
            readOnly
            placeholder="data display here"
        />
    )
}
export default InputComponent;