import { TodoModel } from "../models/TodoModel.js";
import Alert from "../utils/Alert.js";
import Validators from "../utils/Validators.js";
export default class TodosController {
  async addTodo(req, res) {
    const alert = new Alert(req, res);
    const bodyRequest = req.body;
    const validator = new Validators();
    const valid = validator.validForm(bodyRequest);
    if (!valid) {
      return alert.danger(
        "Veuillez remplir tous les champs " + validator.errors["error"]
      );
    }
    const todoData = {
      title: bodyRequest.title,
      description: bodyRequest.description,
      completed: false,
      userId: req.user._id,
    };
    try {
      const data = await TodoModel.findOne({ title: todoData.title });
      if (data) {
        return alert.danger("La tache existe déjà", 409);
      }
      const todo = new TodoModel(todoData);
      await todo.save();
      return alert.success("Todos Ajouter avec succés", 201);
    } catch (error) {
      return alert.danger(
        "Erreur lors de l'enregistrement des données " + error.message,
        500
      );
    }
  }
  async updateTodo(req, res) {
    const id = req.params.id;
    const bodyRequest = req.body;
    const alert = new Alert(req, res);
    const validator = new Validators();
    const valid = validator.validForm(bodyRequest);
    if (!valid) {
      return alert.danger(
        "Veuillez remplir tous les champs " + validator.errors["error"]
      );
    }
    const todoData = {
      title: bodyRequest.title,
      description: bodyRequest.description,
      completed: bodyRequest.completed,
      updatedAt: Date.now(),
    };
    try {
      const todo = await TodoModel.findById(id);
      if (req.user._id.toString() !== todo.userId.toString()) {
        return alert.danger(
          "Vous n'avez pas le droit d'acceder à cette ressource",
          401
        );
      }
      const todoUpdate = await TodoModel.updateOne({ _id: id }, todoData);
      if (!todoUpdate) {
        return alert.danger("Erreur lors de la modification de la tache");
      }
      return alert.success("Tache modifier avec succés", 201);
    } catch (error) {
      return alert.danger(error.message, 500);
    }
  }
  async deleteTodo(req, res) {
    const alert = new Alert(req, res);
    const id = req.params.id;
    try {
      const todo = await TodoModel.findById(id);
      if (!todo) {
        return alert.danger("La tache n'existe pas", 404);
      }
      if (todo.userId.toString() !== req.user._id.toString()) {
        return alert.danger(
          "Vous n'avez pas le droit d'acceder à cette ressource",
          401
        );
      }
      await TodoModel.deleteOne({ _id: id });

      return alert.success("Tache supprimer avec succées");
    } catch (error) {
      return alert.danger(
        "Echec lors de la suppression, " + error.message,
        500
      );
    }
  }
  async getTodos(req, res) {
    const todos = await TodoModel.find({}).sort({ createdAt: -1 }).exec();

    return res.status(200).json({ todos: todos || [] });
  }
  async getTodo(req, res) {
    const id = req.params.id;
    const alert = new Alert(req, res);
    try {
      const todo = await TodoModel.findById(id);
      return todo
        ? res.status(200).json(todo)
        : alert.danger("Tache introuvable", 404);
    } catch (error) {
      return alert.danger(error.message, 500);
    }
  }
  async getTodoUser(req, res) {
    const userId = req.params.userId;
    const todos = await TodoModel.find({ userId })
      .sort({ createdAt: -1 })
      .exec();
    return res.status(200).json({ todos: todos || [] });
  }
}
