import { type JSX } from "react";
import type { SelectedDayProps } from "../../lib/definitions";
import "./styles/CheckDay.css";

const CheckDay = ({
    id,
    dayBool,
    selectedDay,
    handleChangeDay,
    onClick
}: SelectedDayProps): JSX.Element => {
    return (
        <div id={id} className="div--day">
            {dayBool === false ? (
                <select
                    id="optionsDays"
                    value={selectedDay} 
                    onChange={handleChangeDay}
                    onMouseLeave={onClick}
                >
                    <option value="lundi">Lundi</option>
                    <option value="mardi">Mardi</option>
                    <option value="mercredi">Mercredi</option>
                    <option value="jeudi">Jeudi</option>
                    <option value="vendredi">Vendredi</option>
                </select>
            ) : (
                <span 
                    onMouseEnter={onClick}
                    className="checkday--span"
                >
                    {selectedDay?.toUpperCase()}
                </span>
            )}
        </div>
    )
};
export default CheckDay;