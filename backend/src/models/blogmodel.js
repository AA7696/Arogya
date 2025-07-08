// models/blogModel.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true

  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  imageUrl: {
    type: String,
  }
},{
    timestamps: true
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
