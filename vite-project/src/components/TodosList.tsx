import { useMemo, type JSX } from "react";
import type { Todo, TodoListType } from "../lib/definitions";
import { sortTodosByPriorityAndDelay } from "../utils/fonctions";
import TodoPerDay from "./TodoPerDay";
import "./styles/TodoList.css";

const TodosList = ({todos, setTodos}: TodoListType): JSX.Element => {
    
    const sortedTodos: Todo[] = useMemo(
        () => sortTodosByPriorityAndDelay(todos),
        [todos]
    );
    
    return (
        <div className="todolist--div">
            {sortedTodos?.map((todo: Todo) => (
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