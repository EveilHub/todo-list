import type { Dispatch, JSX } from "react";
import type { Todo } from "../lib/definitions";

type PropsType = {
    todo: Todo;
    todos: Todo[];
    setTodos: Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({todo, todos, setTodos}: PropsType): JSX.Element => {
    
    console.log(todo)

    const mapping: string[] = todos.map((x) => x.id + " " + x.todo +" "+ x.derivatedState +" "+ x.isDone);
    console.log(mapping);


    return (
        <div>

            {todos.map((todo: Todo) => (
                <div id={String(todo.id)}>

                    <p>{todo.date}</p>

                    <p>{todo.project}</p>

                    <p>{todo.liste}</p>

                    <p>{todo.delay}</p>

                    <p>{todo.name}</p>

                    <p>{todo.email}</p>

                    <p>{todo.phone}</p>

                    <p>{todo.derivatedState.lundi === true ? "true" : "false"}</p>

                    <p>{todo.isDone === true ? "true" : "false"}</p>

                </div>
            ))}

        </div>
    )
};
export default SingleTodo;