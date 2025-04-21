import { db } from "../index.mjs";

export const saveAnswer = async (question_id, responder, text, timestamp) => {
  await db.run(
    "INSERT INTO answers (question_id, responder, text, timestamp) VALUES (?, ?, ?, ?)",
    question_id, responder, text, timestamp
  );

  await db.run(
    "INSERT INTO users (address, answers_posted) VALUES (?, 1) ON CONFLICT(address) DO UPDATE SET answers_posted = answers_posted + 1",
    responder
  );
};

export const markAnswerAccepted = async (question_id, answer_id) => {
  const answer = await db.get("SELECT responder FROM answers WHERE id = ?", answer_id);
  const reward = await db.get("SELECT reward FROM questions WHERE id = ?", question_id);

  await db.run("UPDATE answers SET accepted = 1 WHERE id = ?", answer_id);
  await db.run("UPDATE questions SET answered = 1 WHERE id = ?", question_id);

  await db.run(
    "INSERT INTO users (address, rewards_earned) VALUES (?, ?) ON CONFLICT(address) DO UPDATE SET rewards_earned = rewards_earned + ?",
    answer.responder, reward.reward, reward.reward
  );
};
