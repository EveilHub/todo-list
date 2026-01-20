import type { JSX } from "react";
import type { PriorityType } from "../../lib/definitions";
import "./styles/PriorityTodo.css";

const PriorityTodo = ({
    paramsPriority,
    onClick, 
    handleChangePriority
}: PriorityType): JSX.Element => {
    return (
        <div className="priority--container">
            {paramsPriority.hidePriority === false ? (
                <div className="priority--field">
                    <select 
                        id="options" 
                        value={paramsPriority.priority} 
                        onChange={handleChangePriority}
                    >
                        <option value="option3">Priorité 3 (Standard)</option>
                        <option value="option2">Priorité 2 (Important)</option>
                        <option value="option1">Priorité 1 (Urgent)</option>
                    </select>
                </div>
            ) : (
                <button 
                    type="button" 
                    onClick={onClick} 
                    className="custom-btn"
                >
                    Priorité
                </button>
            )}
        </div>
    )
};
export default PriorityTodo;