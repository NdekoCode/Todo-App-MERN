import { TodoModel } from "../models/TodoModel.js";
import Alert from "../utils/Alert.js";
export default class TodoController {
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
  updateTodo(req, res) {
    const alert = new Alert(req, res);
    if (req.body && req.params.id) {
      const todoUpdate = {
        content: req.body.content,
        completed: req.body.completed,
        updatedAt: Date.now(),
      };
      return TodoModel.findByIdAndUpdate(req.params.id, todoUpdate)
        .then(() => alert.success("Tache modifier avec succés", 201))
        .catch((error) =>
          alert.danger(
            "Erreur lors de la modification de la tache " + error.message,
            500
          )
        );
    }
    return alert.danger("Erreur lors de la modification de la tache", 500);
  }
  deleteTodo(req, res) {
    const alert = new Alert(req, res);
    if (req.params.id) {
      return TodoModel.findOneAndDelete(req.params.id).then(() =>
        alert.success("Tache supprimés avec succés", 201)
      );
    }
    return alert.danger("Echec lors de la suppression", 500);
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
}
