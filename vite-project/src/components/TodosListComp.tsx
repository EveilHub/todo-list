import type { Dispatch, JSX } from "react";
import type { Todo } from "../lib/definitions";
//import SingleTodo from "./SingleTodoComp";
import DaysComponents from "./DaysComponent";

type PropsType = {
    todos: Todo[];
    setTodos: Dispatch<React.SetStateAction<Todo[]>>;
};

const TodosListComp = ({todos, setTodos}: PropsType): JSX.Element => {
    return (
        <div className="todolist-div">
            {todos?.map((todo: Todo) => (
                <DaysComponents
                    key={String(todo.id)}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                />
            ))}
        </div>
    )
};
export default TodosListComp;