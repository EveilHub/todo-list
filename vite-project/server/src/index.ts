import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

//const dataPath = path.resolve("data.json");

const DATA_PATH = path.resolve(process.cwd(), "data.json");

// 🔹 Utils
const readTodos = (): any[] => {
  if (!fs.existsSync(DATA_PATH)) return [];
  const data = fs.readFileSync(DATA_PATH, "utf8");
  return data ? JSON.parse(data) : [];
};

const writeTodos = (todos: any[]) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(todos, null, 2));
};

app.post("/api/todos", (req: Request, res: Response) => {
  const newTodo = req.body;

  fs.readFile(DATA_PATH, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lecture fichier" });
    }

    const todos = JSON.parse(data);

    todos.push(newTodo);

    fs.writeFile(DATA_PATH, JSON.stringify(todos, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Erreur écriture fichier" });
      }

      res.status(201).json(newTodo);
    });
  });
});

app.delete("/api/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  fs.readFile(DATA_PATH, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lecture fichier" });
    }

    const todos = JSON.parse(data);
    const newTodos = todos.filter((todo: { id: string; }) => todo.id !== id);

    fs.writeFile(DATA_PATH, JSON.stringify(newTodos, null, 2), err => {
      if (err) {
        return res.status(500).json({ error: "Erreur écriture fichier" });
      }

      res.status(200).json({ success: true });
    });
  });
});

app.get("/api/todos", (_req: Request, res: Response) => {
  res.json(readTodos());
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:3001`);
});
