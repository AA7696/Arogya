import express from 'express';
import {
  createUser,
  getUserByEmail,
  getAllUsers,
  deleteUser,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

// Create new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);



// Get user by email
router.get('/:email', getUserByEmail);

// Delete user by email
router.delete('/:email', deleteUser);

router.put('/:email', updateUser)


export default router;
