import type { JSX } from "react";
import type { Todo, TodoListType } from "../lib/definitions";
import TodoPerDay from "./TodoPerDay";
import "./styles/TodoList.css";

const TodosList = ({todos, setTodos}: TodoListType): JSX.Element => {
    return (
        <div className="todolist--div">
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