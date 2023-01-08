import { model, Schema } from "mongoose";
const TodoSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/**
 * @type {collection}
 */
export const TodoModel = model("todos", TodoSchema);
