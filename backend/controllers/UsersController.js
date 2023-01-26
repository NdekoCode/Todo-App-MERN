import UserModel from "../models/UserModel.js";
import Alert from "../utils/Alert.js";

export default class UsersControllers {
  async getAllUsers(req, res) {
    const users = await UserModel.find().sort({ createdAt: -1 }).exec();
    return res.status(200).json(users || []);
  }
  async getSingleUser(req, res) {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (user) {
      return res.status(200).json(user);
    }
    const alert = new Alert(req, res);
    return alert("Cet utilisateur n'existe pas");
  }
}
