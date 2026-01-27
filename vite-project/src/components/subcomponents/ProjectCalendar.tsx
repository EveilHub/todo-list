import type { JSX } from "react";
import type { PropsTodoType } from "../../lib/definitions";
import "./styles/ProjectCalendar.css";

const ProjectCalendar = ({todo}: PropsTodoType): JSX.Element => {


    return (
        <td id={String(todo.id)}>
            <div className="div--date--project">
                <p>{todo.date}</p> 
                <p>{todo.project}</p>
            </div>
            
        </td>
    )
}
export default ProjectCalendar;