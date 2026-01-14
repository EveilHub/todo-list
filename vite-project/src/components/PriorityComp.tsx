import type { JSX } from "react";
import type { PriorityType } from "../lib/definitions";

const PriorityComp = ({priority, hidePriority, setHidePriority, handleChangePriority}: PriorityType): JSX.Element => {
    
    return (
        <div>
            {hidePriority === false ? (
                <div>
                    <label htmlFor="options">Choose an option:</label>
                    <select id="options" value={priority} onChange={handleChangePriority}>
                        <option value="option3">Priorité 3 (Standard)</option>
                        <option value="option2">Priorité 2 (Important)</option>
                        <option value="option1">Priorité 1 (Urgent)</option>
                    </select>
                </div>
            ) : (
                <button type="button" onClick={() => setHidePriority(!hidePriority)} className="custom-btn">Priorité</button>
            )}
        </div>
    )
};
export default PriorityComp;