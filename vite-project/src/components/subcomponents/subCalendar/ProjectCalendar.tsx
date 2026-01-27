import type { JSX } from "react";
import "./styles/ProjectCalendar.css";

interface Props {
    day: Date;
    todoDate: Date;
    project: string;
}

const isSameDay = (d1: Date, d2: Date): boolean =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

const ProjectCalendar = ({
    day,
    todoDate,
    project,
}: Props): JSX.Element => {
    return (
        <td>
            {isSameDay(day, todoDate) && (
                <span className="todo">{project}</span>
            )}
        </td>
    );
};
export default ProjectCalendar;
