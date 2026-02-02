import type { JSX } from "react";
import type { PriorityType } from "../../lib/definitions";
import "./styles/PriorityTodo.css";

const PriorityTodo = ({
    priorityTodo,
    paramsPriority,
    onClick, 
    handleChangePriority
}: PriorityType): JSX.Element => {


    return (
        <div className="priority--container">
            {paramsPriority.hidePriority === false ? (
                <div className="priority--field">
                    <select 
                        key={paramsPriority.hidePriority ? "open" : "closed"}
                        id="options"
                        value={priorityTodo} 
                        onChange={handleChangePriority}
                        onMouseLeave={onClick}
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
                    className="priority-btn"
                >
                    Priorité
                </button>
            )}
        </div>
    )
};
export default PriorityTodo;