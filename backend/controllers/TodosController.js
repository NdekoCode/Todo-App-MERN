import { TodoModel } from "../models/TodoModel.js";
import Alert from "../utils/Alert.js";
export default class TodosController {
  async addTodo(req, res) {
    const alert = new Alert(req, res);
    if (req.body) {
      const newTodos = {
        content: req.body.content,
        completed: false,
      };
      try {
        const todo = new TodoModel(newTodos);
        console.log(todo);
        const data = await TodoModel.findOne({ content: req.body.content });
        if (!data) {
          await todo.save();
          return alert.success("Todos Ajouter avec succés", 201);
        }

        return alert.danger("La tache existe déjà", 409);
      } catch (error) {
        console.log(error);
        return alert.danger(
          "Erreur lors de l'enregistrement des données " + error.message,
          500
        );
      }
    }

    return alert.danger("Erreur lors de l'enregistrement des données", 400);
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
      if (req.user._id !== todo.userId) {
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
      const todo = await findById(id);
      if (!todo) {
        return alert.danger("La tache n'existe pas", 404);
      }
      if (todo.userId !== req.user._id) {
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

    return todos ? res.send({ todos }) : res.send({ todos: [] });
  }
  async getTodo(req, res) {
    const id = req.params.id;
    const alert = new Alert(req, res);
    try {
      const todo = await TodoModel.findById(id);
      return todo ? res.json(todo) : alert.danger("Tache introuvable", 404);
    } catch (error) {
      return alert.danger(error.message, 500);
    }
  }
  async getTodoUser(req, res) {
    const userId = req.params.userId;
    const todos = await TodoModel.find({ userId })
      .sort({ createdAt: -1 })
      .exec();
    return res.status(200).json(todos || []);
  }
}
