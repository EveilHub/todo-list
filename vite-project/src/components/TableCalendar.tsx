import { useEffect, useState, type ChangeEvent, type Dispatch, type JSX, type SetStateAction } from "react";
import type { Todo } from "../lib/definitions";
import {
    parseDate,
    getISOWeekNumber,
    getWeekDays,
    isSameDay
} from "../utils/dateUtils";
import { callApiCalendar } from "../utils/apiFunctions.ts";
import DateCalendar from "./subcomponents/DateCalendar.tsx";
import { MdDone } from "react-icons/md";
import "./styles/TableCalendar.css";

type TodoProps = {
    todos: Todo[];
    setTodos: Dispatch<SetStateAction<Todo[]>>;
};

const TableCalendar = ({ todos, setTodos }: TodoProps): JSX.Element => {

    const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
    const [findDelay, setFindDelay] = useState<Todo[]>(todos);

    const todoSource: Todo[] = findDelay;

    useEffect(() => {
        setFindDelay(todos);
    }, [todos]);

    const [delayValue, setDelayValue] = useState<string>("");

    if (todos.length === 0) {
        return <h3 style={{textAlign: "center"}}>Aucun projet agendé 👻</h3>
    };

    const today: Date = new Date();
    const currentWeek: number = getISOWeekNumber(today);

    // 🔹 Grouper les todos par semaine ISO
    const todosByWeek = todoSource.reduce((acc, todo) => {
        const date: Date = parseDate(todo.delay);
        const week: number = getISOWeekNumber(date);

        if (!acc[week]) {
            acc[week] = [];
        }

        acc[week].push(todo);
        return acc;
    }, {} as Record<number, Todo[]>);

    // 🔹 En-tête basé sur la première semaine
    const firstTodoDate: Date = parseDate(todoSource[0].delay);
    const headerWeekDays: Date[] = getWeekDays(firstTodoDate);

    const truncate = (text: string, max: number = 10): string => {
        if (!text) return "";
    return text.length > max ? text.slice(0, max) + "…" : text;
    };

    const changeDelay = (e: ChangeEvent<HTMLInputElement>): void => {
        setDelayValue(e.target.value);
    };

    const submitDelay = (id: string): void => {
        setTodos((prev: Todo[]) => prev.map((task: Todo) => task.id === id 
            ? {...task, delay: delayValue} 
            : task)
        );
        callApiCalendar(id, delayValue);
        setEditingTodoId(null);
    };

    return (
        <table className="table--calendar">
            <thead>
                <tr>
                    <th className="calendar--title">Calendar</th>
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
                    const weekNumber = Number(week);
                    const isCurrentWeek: boolean = weekNumber === currentWeek;

                    const referenceDate: Date = parseDate(weekTodos[0].delay);
                    const weekDays: Date[] = getWeekDays(referenceDate);

                    return (
                        <tr key={week}>
                            <th className="week-th">
                                Semaine {week}
                                {isCurrentWeek && <span className="week--indicator">
                                    💥
                                </span>}
                            </th>

                            {weekDays.map((day: Date) => (
                                <td key={day.toISOString()}>
                                    {weekTodos
                                        .filter((todo: Todo) =>
                                            isSameDay(
                                                parseDate(todo.delay),
                                                day
                                            )
                                        )
                                        .map((todo: Todo) => (
                                            <div
                                                key={todo.id}
                                                title={todo.delay + ": " + todo.project}
                                                className="calendar--todo"
                                            >
                                                {editingTodoId !== todo.id ? (
                                                    <div className="span--todo--values">
                                                        <p>
                                                            <span 
                                                                onClick={() => {
                                                                    setEditingTodoId(todo.id);
                                                                    setDelayValue(todo.delay);
                                                                }}
                                                                className="btn--visible"
                                                            >
                                                                {todo.delay}:&nbsp;
                                                            </span> 
                                                            {truncate(todo.project, 20)}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="div--change--delay">

                                                        <div className="div--input--delay">
                                                            <input 
                                                                type="text" 
                                                                value={delayValue}
                                                                onChange={changeDelay} 
                                                                className="input--delay"
                                                            />
                                                        </div>

                                                        <div className="div--btn--validate">
                                                            <button
                                                                type="button"
                                                                aria-label='btn--submitDelay'
                                                                onClick={() => submitDelay(todo.id)}
                                                                className="btn--validate"
                                                            >
                                                                <MdDone size={18} />
                                                            </button>
                                                        </div>
                                                        
                                                    </div>
                                                )}
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