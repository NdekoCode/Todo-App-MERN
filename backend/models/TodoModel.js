import { model, Schema, Types } from "mongoose";
const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * @type {collection}
 */
export const TodoModel = model("todos", TodoSchema);
