import express from "express";
import { getAllQuestions, getQuestionWithAnswers } from "../controllers/questionController.js";

const router = express.Router();

router.get("/", getAllQuestions);
router.get("/:id", getQuestionWithAnswers);

export default router;
