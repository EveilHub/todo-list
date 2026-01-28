import type { JSX } from "react";
import type { Todo } from "../lib/definitions";
import {
    parseDate,
    getISOWeekNumber,
    getWeekDays,
    isSameDay
} from "../utils/dateUtils";
import DateCalendar from "./subcomponents/DateCalendar";
import "./styles/TableCalendar.css";

type TodoProps = {
    todos: Todo[];
};

const TableCalendar = ({ todos }: TodoProps): JSX.Element => {
    if (todos.length === 0) {
        return <h4 style={{textAlign: "center"}}>👻 Aucun projet agendé 👻</h4>
    };

    // 🔹 Grouper les todos par semaine ISO
    const todosByWeek = todos.reduce((acc, todo) => {
        const date = parseDate(todo.date);
        const week = getISOWeekNumber(date);

        if (!acc[week]) {
            acc[week] = [];
        }

        acc[week].push(todo);
        return acc;
    }, {} as Record<number, Todo[]>);

    // 🔹 En-tête basé sur la première semaine
    const firstTodoDate = parseDate(todos[0].date);
    const headerWeekDays = getWeekDays(firstTodoDate);

    return (
        <table className="table--calendar">
            <thead>
                <tr>
                    <th>Calendar</th>
                    {headerWeekDays.map(day => (
                        <DateCalendar
                            key={day.toISOString()}
                            date={day}
                        />
                    ))}
                </tr>
            </thead>

            <tbody>
                {Object.entries(todosByWeek).map(([week, weekTodos]) => {
                    const referenceDate = parseDate(weekTodos[0].date);
                    const weekDays = getWeekDays(referenceDate);

                    return (
                        <tr key={week}>
                            <th>Semaine {week}</th>

                            {weekDays.map(day => (
                                <td key={day.toISOString()}>
                                    {weekTodos
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
                                                {todo.date}: {todo.project}
                                            </div>
                                        ))
                                    }
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableCalendar;
