import { TodoModel } from "../models/Todos.js";
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
        const data = await TodoModel.findOne({ content: req.body });
        if (!data) {
          await todo.save();
          return alert.success("Todos Ajouter avec succés", 201);
        }

        return alert.danger("La tache existe déjà", 409);
      } catch (error) {
        return alert.danger(
          "Erreur lors de l'enregistrement des données " + error.message,
          500
        );
      }
    }

    return alert.danger("Erreur lors de l'enregistrement des données", 400);
  }
  updateTodo(req, res) {
    if (req.body && req.params.id) {
      const todoUpdate = {
        content: req.body.content,
        completed: req.body.completed,
        updated_at: Date.now(),
      };
      return TodoModel.findByIdAndUpdate(req.params.id, todoUpdate)
        .then(() =>
          res.status(201).send({
            alert: {
              message: "Tache modifier avec succés",
              type: "success",
              statusCode: 201,
            },
          })
        )
        .catch(() =>
          res.status(500).send({
            alert: {
              message: "Erreur lors de la modification de la tache",
              type: "danger",
              statusCode: 500,
            },
          })
        );
    }
    return res.status(500).send({
      alert: {
        message: "Erreur lors de la modification de la tache",
        type: "danger",
        statusCode: 500,
      },
    });
  }
  deleteTodo(req, res) {
    if (req.params.id) {
      return TodoModel.findOneAndDelete(req.params.id).then(() =>
        res.status(201).send({
          alert: {
            messages: "Tache supprimés avec succés",
            type: "success",
            statusCode: 201,
          },
        })
      );
    }
    return res.status(500).send({
      alert: {
        messages: "Echec lors de la suppression",
        type: "danger",
        statusCode: 500,
      },
    });
  }
  getTodos(req, res) {
    TodoModel.find((err, items) => {
      if (err) return err;
      return res.send({ todos: items });
    });
  }
}
