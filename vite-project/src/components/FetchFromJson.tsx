import { useEffect, useState, type JSX } from "react";
import type { Todo } from "../lib/definitions";
import "./styles/FetchFromJson.css";

const FetchFromJson = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/todos");
        if (!res.ok) throw new Error("Erreur serveur");

        const data: Todo[] = await res.json();
        setTodos(data);
      } catch (err) {
        setError("Impossible de charger les données");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) return <h3>Chargement...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div className="div--fetch">

      <h2>Projets Terminés</h2>

      {todos.length === 0 ? (
        <h3>Aucune donnée</h3>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.project} – {todo.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchFromJson;
