import UserModel from "../models/UserModel.js";
import Alert from "../utils/Alert.js";
import Validators from "../utils/Validators.js";

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
  async updateUser(req, res) {
    const id = req.params.id;
    const bodyRequest = req.body;
    const alert = new Alert(req, res);
    const validator = new Validators();
    const valid = validator.validForm(bodyRequest);
    if (!valid) {
      return alert.danger(validator.errors["error"]);
    }
    if (bodyRequest.email) {
      return alert.danger(
        "Seul le nom, le prenom, le mot de passe peut etre modifier"
      );
    }

    const user = await UserModel.findByIdAndUpdate(id, bodyRequest);
    if (!user) {
      return alert.danger(
        "Erreur lors de la modification de l'utilisateur",
        404
      );
    }
    return alert.success("Utilisateur modifier avec succés", 201);
  }
  async deleteUser(req, res) {
    const alert = new Alert(req, res);

    const id = req.params.id;
    const user = await UserModel.findByIdAndRemove(id);
    if (!user) {
      return alert.danger(
        "Erreur lors de la suppression de l'utilisateur",
        404
      );
    }
    return alert.success("Utilisateur supprimer avec succés", 204);
  }
}
