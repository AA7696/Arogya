// routes/aiRoutes.js
import express from 'express';
import { generateHealthChatResponse } from '../controllers/aiController.js';

const router = express.Router();

router.post('/chat', generateHealthChatResponse);

export default router;
