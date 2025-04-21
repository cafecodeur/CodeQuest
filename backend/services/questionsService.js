import db from './sqlite.js';

export const fetchAllQuestions = async () => {
  return await db.all("SELECT * FROM questions ORDER BY id DESC");
};

export const fetchQuestionById = async (id) => {
  return await db.get("SELECT * FROM questions WHERE id = ?", id);
};

export const fetchAnswersByQuestionId = async (id) => {
  return await db.all("SELECT * FROM answers WHERE question_id = ?", id);
};
