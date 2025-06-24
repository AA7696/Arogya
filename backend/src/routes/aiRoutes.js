// routes/aiRoutes.js
import express from 'express';
const router = express.Router();

import { generateHealthChatResponse } from '../controllers/aiChatController.js';
import {generateHealthReport} from '../controllers/aiReportController.js'


// router.post('/chat', generateChatResponse);
//  router.post('/chat', test);
 router.post('/chat', generateHealthChatResponse);
 router.post('/report', generateHealthReport);

export default router;
