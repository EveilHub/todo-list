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
const DATA_CSV_PATH: string = path.resolve(process.cwd(), "projets.csv");

// 🔹 JSON
const readTodos = async (): Promise<Todo[]> => {
  try {
    const data: string = await fs.readFile(DATA_PATH, "utf8");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// 🔹 CSV
const todosToCSV = (todos: Todo[]): string => {
  if (todos.length === 0) return "";

  const headers: string = Object.keys(todos[0]).join(",");

  const rows = todos.map(todo =>
    Object.values(todo)
      .map(value =>
        typeof value === "string"
          ? `"${value.replace(/"/g, '""')}"`
          : value
      )
      .join(",")
  );
  return [headers, ...rows].join("\n");
};

// 🔹 CSV parsing simple
const parseCSV = async (filePath: string): Promise<Todo[]> => {
  try {
    const csvData = await fs.readFile(filePath, "utf8");
    const lines = csvData.trim().split("\n");
    const headers = lines[0].split(",").map(h => h.trim());

    return lines.slice(1).map(line => {
      const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      const todo: any = {};
      if (values) {
        headers.forEach((header, i) => {
          let val = values[i];
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.slice(1, -1).replace(/""/g, '"');
          }
          todo[header] = val;
        });
      }
      return todo as Todo;
    });
  } catch (err) {
    console.error("Erreur lecture CSV:", err);
    return [];
  }
};

const writeTodosCSV = async (todos: Todo[]): Promise<void> => {
  const csvContent = todosToCSV(todos);
  await fs.writeFile(DATA_CSV_PATH, csvContent, "utf8");
};

// 🔹 Write JSON + CSV
/* const writeTodos = async (todos: Todo[]): Promise<void> => {
  await Promise.all([
    fs.writeFile(DATA_PATH, JSON.stringify(todos, null, 2), "utf8"),
    writeTodosCSV(todos),
  ]);
}; */

const writeTodos = async (todos: Todo[]): Promise<void> => {
  await fs.writeFile(DATA_PATH, JSON.stringify(todos, null, 2));
};

// 🔹 Route CSV
app.get("/api/todos/csv", async (_req: Request, res: Response) => {
  const todos = await parseCSV(DATA_CSV_PATH);
  res.json(todos);
});

// 🔹 Route JSON
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
    await writeTodosCSV(todos);
    res.status(201).json(newTodo);
  } catch (err: unknown) {
    res.status(500).json({ error: "Impossible d'ajouter le todo" });
  }
});

app.patch("/api/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { date, project, liste, delay, client, email, phone } = req.body;

    const fileContent = await fs.readFile("data.json", "utf-8");
    const todos: Todo[] = JSON.parse(fileContent);

    const todo = todos.find((todo: Todo) => todo.id === id);

    if (!todo) {
      return res.status(404).json({ error: "Not found" });
    }

    // PATCH partiel
    if (date !== undefined) todo.date = date;
    if (project !== undefined) todo.project = project;
    if (liste !== undefined) todo.liste = liste;
    if (delay !== undefined) todo.delay = delay;
    if (client !== undefined) todo.client = client;
    if (email !== undefined) todo.email = email;
    if (phone !== undefined) todo.phone = phone;

    await writeTodos(todos);
    res.json(todo);
  } catch (error) {
    console.error("Erreur PATCH /api/todos/:id", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.delete("/api/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todos = await readTodos();

    /* const todoToDelete: Todo | undefined = todos.find((todo: Todo) => todo.id === id);

    if (!todoToDelete) {
      return res.status(404).json({ error: "Todo non trouvé" });
    }

    // Écriture dans le CSV AVANT suppression
    await writeTodosCSV(todoToDelete); */

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
