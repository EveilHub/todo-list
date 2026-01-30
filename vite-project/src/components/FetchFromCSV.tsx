import { useEffect, useState, type JSX } from "react";
import type { Todo } from "../lib/definitions";
import { MdDelete } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import "./styles/FetchFromCSV.css";

const FetchFromCSV = (): JSX.Element => {

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

  const preDeleteCSVData = (id: string): void => {
    const response = prompt("Voulez-vous vraiement supprimer ce projet à tout jamais ? 'o'=oui");
    if (response === "o") {
      deleteDataCsv(id);
    } else {
      console.log(`Projet ${id} non supprimé`);
    }
  };

  if (loading) return <h3>Chargement...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div className="div--fetch">

      <h2>Projets Terminés</h2>

      {todos.length === 0 ? (
        <h3>Aucun projet terminé 🧞‍♂️</h3>
      ) : (
        <div className="div--todo">
          <div className="div--download">
            <a href="http://localhost:3001/api/download-csv">
              <FaDownload size={16} />
            </a>
          </div>
          {todos.map((todo) => (
            <ul key={todo.id} className="ul--fetch">
              <div className="todo--container--fetch">

                <li>
                  <s>{todo.date} - {todo.project} - {todo.liste} - {todo.delay}
                    - {todo.client} - {todo.email} - {todo.phone}
                  </s>
                </li>

                <div className="div--btn">
                  <button
                    type="button" 
                    onClick={() => preDeleteCSVData(todo.id)} 
                    className="delete--btn"  
                  >
                    <MdDelete size={18} />
                  </button>
                </div>

              </div>

              <hr />

            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default FetchFromCSV;
