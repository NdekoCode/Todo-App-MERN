import UserModel from "../models/UserModel.js";
import Alert from "../utils/Alert.js";

export default class UsersControllers {
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.find().sort({ createdAt: -1 }).exec();
      return res.status(200).json(users || []);
    } catch (error) {
      const alert = new Alert(req, res);
      return alert.danger(error.message, 500);
    }
  }
  async getSingleUser(req, res) {
    try {
      const id = req.params.id;
      const user = await UserModel.findById(id);
      if (user) {
        return res.status(200).json(user);
      }
      const alert = new Alert(req, res);
      return alert.danger("Cet utilisateur n'existe pas");
    } catch (error) {
      const alert = new Alert(req, res);
      return alert.danger(error.message, 500);
    }
  }
}
