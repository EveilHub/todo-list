import { useEffect, useState, type JSX } from "react";
import type { Todo } from "../lib/definitions";

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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Todos depuis data.json</h2>

      {todos.length === 0 ? (
        <p>Aucune donnée</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <strong>{todo.project}</strong> – {todo.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchFromJson;
