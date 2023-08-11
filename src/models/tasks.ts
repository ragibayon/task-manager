import {Schema, model} from 'mongoose';

const tasksSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Must provide task title'],
    trim: true,
    minlength: [3, 'Too few characters'],
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Task = model('Task', tasksSchema);
export default Task;
