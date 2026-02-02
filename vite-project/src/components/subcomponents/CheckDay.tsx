import { type ChangeEvent, type JSX } from "react";
import "./styles/CheckDay.css";

type SelectedDayProps = {
    id: string;
    dayBool: boolean;
    selectedDay: string | undefined;
    handleChangeDay: (e: ChangeEvent<HTMLSelectElement>) => void; 
    onClick: () => void;
};

const CheckDay = ({id, dayBool, selectedDay, handleChangeDay, onClick}: SelectedDayProps): JSX.Element => {
    return (
        <div id={id} className="div--day">
            {dayBool === false ? (
                <button 
                    type="button"
                    onClick={onClick}
                    
                >
                    {selectedDay?.toUpperCase()}
                </button>
            ) : (
                <select

                    id="optionsDays"
                    onChange={handleChangeDay}
                    onMouseLeave={onClick}
                >
                    <option value="lundi">lundi</option>
                    <option value="mardi">mardi</option>
                    <option value="mercredi">mercredi</option>
                    <option value="jeudi">jeudi</option>
                    <option value="vendredi">vendredi</option>
                </select>
            )}
        </div>
    )
};
export default CheckDay;