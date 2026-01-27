import type { JSX } from "react";
import type { Todo, TodoListType } from "../lib/definitions";
import DateCalendar from "./subcomponents/DateCalendar";
import ProjectCalendar from "./subcomponents/ProjectCalendar";
import "./styles/ListCalendar.css";

const ListCalendar = ({todos, setTodos}: TodoListType): JSX.Element => {

    const listOfDay: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

    return (
        <div className="main--div--calendar">
    
            <div>
                <h3>Calendar</h3>
            </div>

            <div className="div--calendar">

                <table className="table--calendar">
                    <thead>
                        <tr>
                            <th></th>
                            {listOfDay?.map((date: string) => (
                                <DateCalendar
                                    key={date}
                                    date={date}
                                />
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th>Semaine 1</th>
                            {todos?.map((todo: Todo) => (
                                <ProjectCalendar
                                    key={String(todo.id)}
                                    todo={todo}
                                    listOfDay={listOfDay}
                                    todos={todos}
                                    setTodos={setTodos}
                                />
                            ))}
                        </tr>
                        <tr>
                            <th>Semaine 2</th>
                            {todos?.map((todo: Todo) => (
                                <ProjectCalendar
                                    key={String(todo.id)}
                                    todo={todo}
                                    todos={todos}
                                    setTodos={setTodos}
                                />
                            ))}
                        </tr>
                        <tr>
                            <th>Semaine 3</th>
                            {todos?.map((todo: Todo) => (
                                <ProjectCalendar
                                    key={String(todo.id)}
                                    todo={todo}
                                    todos={todos}
                                    setTodos={setTodos}
                                />
                            ))}
                        </tr>
                        <tr>
                            <th>Semaine 4</th>
                            {todos?.map((todo: Todo) => (
                                <ProjectCalendar
                                    key={String(todo.id)}
                                    todo={todo}
                                    todos={todos}
                                    setTodos={setTodos}
                                />
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ListCalendar;