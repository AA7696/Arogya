// models/taskModel.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
  },
  important: {
    type: Boolean,
    default: false,
  },
  urgent: {
    type: Boolean,
    default: false,
  },
  done: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);
export default Task;


