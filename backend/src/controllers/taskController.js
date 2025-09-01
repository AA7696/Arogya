import Task from '../models/taskmodel.js';
import User from '../models/usermodel.js';

// @desc Create a new task for a user
export const createTask = async (req, res) => {
  try {
    const { userId, text, important, urgent } = req.body;

    // Optional: Validate if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }
    


    const task = new Task({
      userId: userId,
      text,
      important,
      urgent,
      done: false,
    });
    await task.save();

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// @desc Get all tasks for a user
export const getTasksByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const tasks = await Task.find({ userId: userId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// @desc Update a task by ID
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedFields = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedFields, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// @desc Delete a task by ID
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
