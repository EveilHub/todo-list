import type { JSX } from "react";
import type { CheckBoxType } from "../../lib/definitions";
import "./styles/CheckboxComp.css";

const CheckboxComp = ({params, checked, handleCheckBox, children,}: CheckBoxType): JSX.Element => {

    return (
        <label htmlFor={params} className="checkbox-lbl">
            <input
                type="checkbox"
                id={params}
                checked={checked}
                onChange={() => handleCheckBox(params)}
                className="checkbox-input"
            />
            {children}
        </label>
    )
};
export default CheckboxComp;