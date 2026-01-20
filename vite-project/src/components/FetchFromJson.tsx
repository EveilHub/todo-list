import type { JSX } from "react";
import type { Todo } from "../lib/definitions";

type PropsTodo = {
    todos: Todo[];
};

const FetchFromJson = ({todos}: PropsTodo): JSX.Element => {
    return (
        <div>
            <h2>Data from backend.json</h2>
            {todos.map((todo: Todo) => (
                <div key={String(todo.id)}>
                    <span>
                        {todo.date} - 
                        {todo.project} - {todo.liste} - 
                        {todo.delay} - 
                        {todo.name} - {todo.phone}
                    </span>
                    <br />
                </div>
            ))}
        </div>
    )
};
export default FetchFromJson;