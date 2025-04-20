import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let db;

// Initialize SQLite and create tables
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

  await db.exec(\`
    CREATE TABLE IF NOT EXISTS users (
      address TEXT PRIMARY KEY,
      questions_asked INTEGER DEFAULT 0,
      answers_posted INTEGER DEFAULT 0,
      rewards_earned INTEGER DEFAULT 0
    );
  \`);
};

app.get("/questions", async (req, res) => {
  const questions = await db.all("SELECT * FROM questions ORDER BY id DESC");
  res.json(questions);
});

app.get("/questions/:id", async (req, res) => {
  const { id } = req.params;
  const question = await db.get("SELECT * FROM questions WHERE id = ?", id);
  const answers = await db.all("SELECT * FROM answers WHERE question_id = ?", id);
  res.json({ question, answers });
});

app.get("/leaderboard", async (req, res) => {
  const leaders = await db.all("SELECT * FROM users ORDER BY rewards_earned DESC LIMIT 10");
  res.json(leaders);
});

init().then(() => {
  app.listen(PORT, () => {
    console.log(`DevQuest backend running on http://localhost:\${PORT}`);
  });
});
