import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3001;

const DATA_PATH = path.resolve(process.cwd(), "data.json");

type Data = {
  message: string;
};

app.use(cors());
app.use(express.json());

app.get("/data", (_req: Request, res: Response) => {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  const data: Data = JSON.parse(raw);
  res.json(data);
});

app.post("/data", (req: Request<{}, {}, Data>, res: Response) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:3001`);
});
