import Blog from '../models/blogModel.js';
import User from '../models/usermodel.js';

// @desc Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { userId, name, title, content, tags, imageUrl } = req.body;
    console.log(userId);
    

    // Optional: Validate user existence
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const blog = new Blog({
      userId: userId,
      name,
      title,
      content,
      tags,
      imageUrl,
    });

    await blog.save();

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get blog by id
export const getBlogById = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// @desc Get blogs by user ID
export const getBlogsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const blogs = await Blog.find({ userId: userId }).sort({ createdAt: -1 });
    if (blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found for this user" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Update a blog
export const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const updatedData = req.body;

    const blog = await Blog.findByIdAndUpdate(blogId, updatedData, { new: true });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findByIdAndDelete(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully",blog });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
