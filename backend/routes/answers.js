import express from "express";
import { postAnswer, acceptAnswer } from "../controllers/answerController.js";

const router = express.Router();

router.post("/", postAnswer);
router.post("/accept", acceptAnswer);

export default router;
