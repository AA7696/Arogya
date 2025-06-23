import express from 'express';
import {
  createTask,
  getTasksByUser,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

// POST /api/tasks - Create a new task
router.post('/', createTask);


// PATCH /api/tasks/:id - Update a task (for drag, edit, done toggle)
router.patch('/:taskId', updateTask);

// DELETE /api/tasks/:id - Delete a task
router.delete('/:taskId', deleteTask);

// GET /api/tasks - Get all tasks
router.get('/:userId', getTasksByUser);


export default router;
