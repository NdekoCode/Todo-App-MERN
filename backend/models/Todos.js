import { Schema, model } from "mongoose";
const TodoSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updated_at: {
    type: Date,
  },
});
/**
 *
 */
export const TodoModel = model("todos", TodoSchema);
