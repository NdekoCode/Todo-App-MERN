import { hash } from "bcrypt";
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
    try {
      const user = await UserModel.findByIdAndUpdate(id, bodyRequest);
      if (!user) {
        return alert.danger(
          "Erreur lors de la modification de l'utilisateur",
          404
        );
      }
      return alert.success("Utilisateur modifier avec succés", 201);
    } catch (error) {
      return alert.danger(error.message, 500);
    }
  }
  async deleteUser(req, res) {
    const alert = new Alert(req, res);

    const id = req.params.id;
    try {
      const user = await UserModel.findByIdAndRemove(id);
      if (!user) {
        return alert.danger(
          "Erreur lors de la suppression de l'utilisateur",
          404
        );
      }
      return alert.success("Utilisateur supprimer avec succés", 204);
    } catch (error) {
      return alert.danger(error.message, 500);
    }
  }
  async register(req, res) {
    const bodyRequest = req.body;
    const alert = new Alert(req, res);
    const validator = new Validators();
    const userData = {
      firstName: bodyRequest.firstName,
      lastName: bodyRequest.lastName,
      email: bodyRequest.email,
      password: bodyRequest.password,
      confpassword: bodyRequest.confpassword,
    };
    const valid = validator.validForm(userData);
    if (!valid) {
      return alert.danger("Veuillez remplir tous les champs");
    }
    validator.ValidateEmail(userData.email);
    validator.validPassword(userData.password, userData.confpassword);
    if (!validator.isEmptyObject(validator.errors)) {
      return alert.danger(validator.errors["error"]);
    }
    try {
      const user = await UserModel.findOne({ email: bodyRequest.email });
      if (user) {
        return alert.danger("L'utilisateur existe déjà", 409);
      }
      delete userData.confpassword;
      userData.password = await hash(userData.password, 14);
      const newUser = new UserModel(userData);

      await newUser.save();
      return alert.success("Utilisateur enregister avec succés", 201);
    } catch (error) {
      return alert.danger(error.message, 500);
    }
  }
}
