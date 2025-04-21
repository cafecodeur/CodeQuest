import { db } from "../index.mjs";

export const getQuestions = async () => {
  return await db.all("SELECT * FROM questions ORDER BY id DESC");
};

export const getQuestionById = async (id) => {
  return await db.get("SELECT * FROM questions WHERE id = ?", id);
};

export const getAnswersForQuestion = async (id) => {
  return await db.all("SELECT * FROM answers WHERE question_id = ?", id);
};
