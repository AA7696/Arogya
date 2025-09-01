// routes/blogRoutes.js
import express from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByUser,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';

const router = express.Router();

router.post('/', createBlog);
router.get('/', getAllBlogs);
router.get('/user/:userId', getBlogsByUser);
router.get('/', getBlogById)
router.put('/:blogId', updateBlog);
router.delete('/:blogId', deleteBlog);

export default router;
