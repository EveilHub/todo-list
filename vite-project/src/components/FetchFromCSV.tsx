import { useEffect, useState, type JSX } from "react";
import type { Todo } from "../lib/definitions";
import "./styles/FetchFromCSV.css";

const FetchFromJson = (): JSX.Element => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCSV = async (): Promise<void> => {
      try {
        const res: Response = await fetch("http://localhost:3001/api/todos/csv");
        if (!res.ok) throw new Error("Erreur lors de la récupération des todos");

        const data: Todo[] = await res.json();
        setTodos(data);
      } catch (err) {
        const error = err as {message: string}; 
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCSV();
    return (): void => console.log("Clean-up CSV");
  }, []);

  const deleteDataCsv = async (id: string): Promise<void> => {
    setTodos(todos.filter((todo: Todo) => (todo.id !== id)));
    try {
      await fetch(`http://localhost:3001/api/todos/csv/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Erreur suppression serveur", error);
    }
  };

  if (loading) return <h3>Chargement...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div className="div--fetch">

      <h3>Projets Terminés</h3>

      {todos.length === 0 ? (
        <p className="p--data">Aucune donnée sauvegardée</p>
      ) : (
        <div>
          {todos.map((todo) => (
            <ul key={todo.id}>
              
              <li>
                <s>{todo.date} - {todo.project} - {todo.liste} - {todo.delay}
                  - {todo.client} - {todo.email} - {todo.phone}
                </s>
              </li>

              <div>
                <button
                  type="button" 
                  onClick={() => deleteDataCsv(todo.id)} 
                  className="custom-btn"  
                >
                  Delete
                </button>
              </div>

            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default FetchFromJson;
