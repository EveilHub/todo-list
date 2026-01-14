import { useEffect, useRef, useState, type Dispatch, type JSX } from "react";
import type { Todo } from "../lib/definitions";

type PropsType = {
    todo: Todo;
    todos: Todo[];
    setTodos: Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({todo, todos, setTodos}: PropsType): JSX.Element => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editProject, setEditProject] = useState<string>(todo.project);

    const secondRef = useRef<HTMLInputElement>(null);

    const handleEdit = (e: React.FormEvent, id: number): void => {
        e.preventDefault();
        setTodos(todos.map(todo => todo.id === id ? { ...todo, todo: editProject } : todo))
        setEdit(false);
    };

    const handleDelete = (id: number): void => {
        setTodos(todos.filter((todo) => (todo.id !== id)));
    };

    const handleDone = (id: number): void => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
        setEdit(false);
    };

    useEffect((): void => {
        secondRef.current?.focus();
    }, [edit]);

    return (
        <form onSubmit={(e) => handleEdit(e, todo.id)} className="singleinput--div">
            {edit ? (
                <input 
                    ref={secondRef}
                    value={editProject}
                    onChange={(e) => setEditProject(e.target.value)}
                    style={{fontSize: "1.1rem"}}
                />
                ) : todo.isDone ? (
                    <s>{todo.project}</s>
                ) : (
                    <span>{todo.project}</span>
                )
            }

            <div className="btn--action">

            <span onClick={() => {
                if (!edit && !todo.isDone) {
                    setEdit(!edit)
                }
            }} className="edit--span">Edit</span>
        
            <span onClick={() => handleDone(todo.id)} className="done--span">Done</span>

            <span onClick={() => handleDelete(todo.id)} className="del--span">Delete</span>

            </div>

        </form>
    )
};
export default SingleTodo;