import type { JSX } from "react";
import type { PriorityType } from "../../lib/definitions";
import "./styles/PriorityTodo.css";

const PriorityTodo = ({
    id,
    paramsPriorityHide,
    priorityTodo,
    handleChangePriority,
    onClick
}: PriorityType): JSX.Element => {
    return (
        <div id={id} className="priority--container">
            {paramsPriorityHide === false ? (
                <select 
                    id="optionsPriority"
                    name="priority"
                    value={priorityTodo}
                    onChange={handleChangePriority}
                    onMouseLeave={onClick}
                    className="priority--select"
                >
                    <option value="option3">Standard</option>
                    <option value="option2">Important</option>
                    <option value="option1">Urgent</option>
                </select>
            ) : (
                <span 
                    onMouseEnter={onClick}
                    className="priority--span"
                >
                    PRIORITÉ
                </span>
            )}
        </div>
    )
};
export default PriorityTodo;