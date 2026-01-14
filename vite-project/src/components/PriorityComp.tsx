import type { JSX } from "react";
import type { PriorityType } from "../lib/definitions";

const PriorityComp = ({priority, handleChangePriority}: PriorityType): JSX.Element => {
    
    return (
        <div>
            <label htmlFor="options">Choose an option:</label>
            <select id="options" value={priority} onChange={handleChangePriority}>
                {/* <option value="">--Please choose an option--</option> */}
                <option value="option3">Priorité 3 (Standard)</option>
                <option value="option2">Priorité 2 (Important)</option>
                <option value="option1">Priorité 1 (Urgent)</option>
            </select>
            <p>You selected: {priority}</p>
        </div>
    )
};
export default PriorityComp;