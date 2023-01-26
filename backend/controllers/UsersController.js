import UserModel from "../models/UserModel.js";

export default class UsersControllers {
  async getAllUsers(req, res) {
    const users = await UserModel.find().sort({ createdAt: -1 }).exec();
    return res.status(200).json(users || []);
  }
}
