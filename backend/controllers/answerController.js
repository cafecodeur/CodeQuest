import { saveAnswer, markAnswerAccepted } from "../services/answerService.js";

export const postAnswer = async (req, res) => {
  const { question_id, responder, text, timestamp } = req.body;
  await saveAnswer(question_id, responder, text, timestamp);
  res.status(201).json({ message: "Answer saved" });
};

export const acceptAnswer = async (req, res) => {
  const { question_id, answer_id } = req.body;
  await markAnswerAccepted(question_id, answer_id);
  res.status(200).json({ message: "Answer accepted" });
};
