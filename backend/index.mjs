import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import questionRoutes from "./routes/questions.js";
import leaderboardRoutes from "./routes/leaderboard.js";
import answersRoutes from "./routes/answers.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

export let db;

const init = async () => {
  db = await open({ filename: "./devquest.db", driver: sqlite3.Database });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY,
      asker TEXT,
      text TEXT,
      type TEXT,
      reward INTEGER,
      timestamp INTEGER
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_id INTEGER,
      responder TEXT,
      text TEXT,
      accepted INTEGER DEFAULT 0,
      timestamp INTEGER
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      address TEXT PRIMARY KEY,
      questions_asked INTEGER DEFAULT 0,
      answers_posted INTEGER DEFAULT 0,
      rewards_earned INTEGER DEFAULT 0
    );
  `);

  app.use("/questions", questionRoutes);
  app.use("/leaderboard", leaderboardRoutes);
  app.use("/answers", answersRoutes);

  app.listen(PORT, () => {
    console.log(`DevQuest backend running on http://localhost:${PORT}`);
  });
};

init();
