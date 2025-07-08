// routes/blogRoutes.js
import express from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogsByUser,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';

const router = express.Router();

router.post('/', createBlog);
router.get('/', getAllBlogs);
router.get('/:userId', getBlogsByUser);
router.put('/:blogId', updateBlog);
router.delete('/:blogId', deleteBlog);

export default router;
