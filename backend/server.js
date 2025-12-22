import express from "express";
import cors from "cors";
import "dotenv/config";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Helper to convert BigInt fields to numbers for JSON
function serializeTask(task) {
  if (!task) return task;
  return {
    ...task,
    startTime: Number(task.startTime ?? 0n),
    endTimeAfter: Number(task.endTimeAfter ?? 0n),
  };
}

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { id: "asc" },
    });
    res.json(tasks.map(serializeTask));
  } catch (err) {
    console.error("GET /api/tasks error", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { taskName, startTime, endTimeAfter, progress, isDone } = req.body || {};

    if (!taskName || typeof taskName !== "string") {
      return res.status(400).json({ error: "taskName is required" });
    }

    const created = await prisma.task.create({
      data: {
        taskName,
        startTime: BigInt(startTime ?? 0),
        endTimeAfter: BigInt(endTimeAfter ?? 0),
        progress: Boolean(progress ?? false),
        isDone: Boolean(isDone ?? false),
      },
    });

    res.status(201).json(serializeTask(created));
  } catch (err) {
    console.error("POST /api/tasks error", err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    await prisma.task.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    console.error("DELETE /api/tasks/:id error", err);
    if (err.code === "P2025") {
      // Record not found
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(500).json({ error: "Failed to delete task" });
  }
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
