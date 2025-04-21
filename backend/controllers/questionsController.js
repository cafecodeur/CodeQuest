import {
  fetchAllQuestions,
  fetchQuestionById,
  fetchAnswersByQuestionId
} from '../services/questionsService.js';

export const getAllQuestions = async (req, res) => {
  const questions = await fetchAllQuestions();
  res.json(questions);
};

export const getQuestionWithAnswers = async (req, res) => {
  const id = req.params.id;
  const question = await fetchQuestionById(id);
  const answers = await fetchAnswersByQuestionId(id);
  res.json({ question, answers });
};
