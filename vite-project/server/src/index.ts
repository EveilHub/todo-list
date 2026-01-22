import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";

const app = express();
const PORT: number = 3001;

app.use(cors());
app.use(express.json());

type Todo = {
  id: string;
  date: string;
  project: string;
  liste: string;
  delay: string;
  client: string;
  email: string;
  phone: string;
  priority: string;
  selectedDay: string | null;
  isDoneDate: boolean;
  isDoneProject: boolean;
  isDoneListe: boolean;
  isDoneDelay: boolean;
  isDoneClient: boolean;
  isDoneMail: boolean;
  isDonePhone: boolean;
};

const DATA_PATH: string = path.resolve(process.cwd(), "data.json");

// 🔹 Utils asynchrones
const readTodos = async (): Promise<Todo[]> => {
  try {
    const data = await fs.readFile(DATA_PATH, "utf8");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const writeTodos = async (todos: Todo[]): Promise<void> => {
  await fs.writeFile(DATA_PATH, JSON.stringify(todos, null, 2));
};

// 🔹 Routes
app.get("/api/todos", async (_req: Request, res: Response) => {
  const todos = await readTodos();
  res.json(todos);
});

app.post("/api/todos", async (req: Request, res: Response) => {
  try {
    const newTodo: Todo = {...req.body};

    const todos = await readTodos();
    todos.push(newTodo);
    await writeTodos(todos);

    res.status(201).json(newTodo);
  } catch (err: unknown) {
    res.status(500).json({ error: "Impossible d'ajouter le todo" });
  }
});

app.delete("/api/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todos = await readTodos();
    const filteredTodos: Todo[] = todos.filter((todo: Todo) => todo.id !== id);

    if (filteredTodos.length === todos.length) {
      return res.status(404).json({ error: "Todo non trouvé" });
    }

    await writeTodos(filteredTodos);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Impossible de supprimer le todo" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
