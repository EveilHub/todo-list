import type { JSX } from "react";
import type { Todo } from "../../../lib/definitions";
import {
    parseDate,
    getISOWeekNumber,
    getWeekDays,
    isSameDay
} from "../../../utils/dateUtils";
import DateCalendar from "./DateCalendar";
//import ProjectCalendar from "./ProjectCalendar";
import "./styles/TableCalendar.css";

type TodoProps = {
    todos: Todo[];
};

const TableCalendar = ({ todos }: TodoProps): JSX.Element => {
if (todos.length === 0) return <p>Aucun projet</p>;

    const todoDate = parseDate(todos[0].date);
    const todoWeek = getISOWeekNumber(todoDate);
    const weekDays = getWeekDays(todoDate);

    return (
        <table className="table--calendar">
            <thead>
                <tr>
                    <th></th>
                    {weekDays.map((day) => (
                        <DateCalendar
                            key={day.toISOString()}
                            date={day}
                        />
                    ))}
                </tr>
            </thead>

            <tbody>
                <tr>
                    <th>Semaine {todoWeek}</th>
                    {weekDays.map(day => (
                        <td key={day.toISOString()}>
                            {todos
                                .filter(todo =>
                                    isSameDay(
                                        parseDate(todo.date),
                                        day
                                    )
                                )
                                .map(todo => (
                                    <div
                                        key={todo.id}
                                        className="calendar--todo"
                                    >
                                        {todo.project}
                                    </div>
                                ))}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
};

export default TableCalendar;
