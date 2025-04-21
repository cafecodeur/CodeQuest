import { getQuestions, getQuestionById, getAnswersForQuestion } from "../services/questionService.js";

export const getAllQuestions = async (req, res) => {
  const questions = await getQuestions();
  res.json(questions);
};

export const getQuestionWithAnswers = async (req, res) => {
  const id = req.params.id;
  const question = await getQuestionById(id);
  const answers = await getAnswersForQuestion(id);
  res.json({ question, answers });
};
