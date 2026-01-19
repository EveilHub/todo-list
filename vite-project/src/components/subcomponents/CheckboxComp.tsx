import type { JSX, ReactNode } from "react";
import "./styles/CheckboxComp.css";

type CheckBoxType = {
    params: string;
    checked: boolean;
    handleCheckBox: (day: string) => void;
    children: ReactNode;
};

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