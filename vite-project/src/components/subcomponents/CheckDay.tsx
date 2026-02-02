import type { JSX } from "react";
import "./styles/CheckDay.css";

type SelectedDayProps = {
    selectedDay: string | undefined;
};

const CheckDay = ({selectedDay}: SelectedDayProps): JSX.Element => {
    return (
        <div className="div--day">
            <h6>{selectedDay?.toUpperCase()}</h6>
        </div>
    )
};
export default CheckDay;