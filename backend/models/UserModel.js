import { model, Schema } from "mongoose";
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  avatar: {
    type: String,
    required: false,
  },
});
const UserModel = new model("user", userSchema);
export default UserModel;
