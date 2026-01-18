import type { JSX } from "react";
import "./styles/CheckboxComp.css";

type CheckBoxType = {
    params: string;
    checked: boolean;
    handleCheckBox: (day: string) => void;
    children: React.ReactNode;
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