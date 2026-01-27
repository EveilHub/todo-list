import type { JSX } from "react";
import type { PropsCalendarType, Todo } from "../../lib/definitions";
import "./styles/ProjectCalendar.css";

const ProjectCalendar = ({todo, listOfDay, todos, setTodos}: PropsCalendarType): JSX.Element => {

    const isCorrectDay = (): string  => {
        const dateParts = todo.date.split(" ")[0].split("/");
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);

        const dateObject = new Date(year, month, day);

        const daysOfWeek: string[] = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
        const dayName: string = daysOfWeek[dateObject.getDay()];

        return dayName;
    }
    
    const result: string = isCorrectDay()
    console.log(result, "result");

    if (todo.selectedDay === result) {
        console.log(`${todo.selectedDay} est dans la liste des jours.`);
    } else if (todo.selectedDay === undefined) {
        console.log('selectedDay est undefined.');
    } else {
        console.log(`${todo.selectedDay} n'est pas dans la liste des jours.`);
    }

    return (
        <td id={String(todo.id)}>
            <div className="div--date--project">
                {todo.selectedDay === result ? (
                    <div>
                        <p>{todo.date}</p> 
                        <p>{todo.project}</p>
                    </div>
                ) : (
                    null
                )}
            </div>
            
        </td>
    )
}
export default ProjectCalendar;