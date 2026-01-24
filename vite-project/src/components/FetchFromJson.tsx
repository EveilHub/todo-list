import { useEffect, useState, type JSX } from "react";
import type { Todo } from "../lib/definitions";
import "./styles/FetchFromJson.css";

const FetchFromJson = (): JSX.Element => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCSV = async (): Promise<void> => {
      try {
        const res = await fetch("http://localhost:3001/api/todos/csv");
        if (!res.ok) throw new Error("Erreur lors de la récupération des todos");

        const data: Todo[] = await res.json();
        setTodos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCSV();
    return () => console.log("Clean-up CSV");
  }, []);

  // const deleteDataJson = async (id: string): Promise<void> => {
  //   setTodos(todos.filter((todo: Todo) => (todo.id !== id)));
  //   try {
  //     await fetch(`http://localhost:3001/api/todos/${id}`, {
  //       method: "DELETE",
  //     });
  //   } catch (error) {
  //     console.error("Erreur suppression serveur", error);
  //   }
  // };

  if (loading) return <h3>Chargement...</h3>;
  if (error) return <h3>{error}</h3>;

  console.log(todos.map((x) => x));

  return (
    <div className="div--fetch">

      <h2>Projets Terminés</h2>

      {todos.length === 0 ? (
        <h3>Aucune donnée</h3>
      ) : (
        <ul>
          {todos.map((todo) => (
            <div key={todo.id}>
              
              <li>
                <s>{todo.date} - {todo.project} - {todo.liste} - {todo.delay}
                  - {todo.client} - {todo.email} - {todo.phone}
                </s>
              </li>

              <div>
                <button
                  type="button" 
                  // onClick={() => deleteDataJson(todo.id)} 
                  className="custom-btn"  
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchFromJson;
