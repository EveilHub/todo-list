import { useMemo, type JSX } from "react";
import type { Todo, TodoListType } from "../lib/definitions";
import { sortTodosByPriorityAndDelay } from "../utils/fonctions";
import TodoPerDay from "./TodoPerDay";

const TodosList = ({className, todos, setTodos}: TodoListType): JSX.Element => {
    
    const sortedTodos: Todo[] = useMemo((): Todo[] =>
        sortTodosByPriorityAndDelay(todos),
        [todos]
    );
    
    return (
        <div className={className} data-testid="main--list">
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