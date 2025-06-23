// routes/aiRoutes.js
import express from 'express';
const router = express.Router();

import { generateHealthChatResponse } from '../controllers/aiChatController.js';


// router.post('/chat', generateChatResponse);
//  router.post('/chat', test);
 router.post('/chat', generateHealthChatResponse);

export default router;
