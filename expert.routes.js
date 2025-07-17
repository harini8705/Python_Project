import express from 'express';
import { questionstore,questions,allquestions,addAnswer } from '../controllers/questions.controller.js';

const router = express.Router();

router.post('/addquestion', questionstore);
router.get('/questions', questions);
router.get('/recentquestions', allquestions);
router.put('/addanswer/:id', addAnswer);

export default router;