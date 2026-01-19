import type { Dispatch, JSX } from "react";
import type { Todo } from "../lib/definitions";
import TodoPerDay from "./TodoPerDay";

type PropsType = {
    todos: Todo[];
    setTodos: Dispatch<React.SetStateAction<Todo[]>>;
};

const TodosList = ({todos, setTodos}: PropsType): JSX.Element => {
    return (
        <div className="todolist-div">
            {todos?.map((todo: Todo) => (
                <TodoPerDay
                    key={String(todo.id)}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                />
            ))}
        </div>
    )
};
export default TodosList;