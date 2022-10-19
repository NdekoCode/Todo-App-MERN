import { TodoModel } from "../models/Todos.js";
export default class TodoController {
  addTodo(req, res) {
    if (req.body) {
      const newTodos = {
        content: req.body.content,
        completed: false,
      };

      const todo = new TodoModel(newTodos);
      return TodoModel.exists({ content: req.body.content })
        .then((data) => {
          if (!data) {
            return todo
              .save()
              .then(() => {
                return res.status(200).send({
                  alert: {
                    message: "Todos Ajouter avec succés",
                    type: "success",
                    statusCode: 201,
                  },
                });
              })
              .catch(() =>
                res.status(500).send({
                  alert: {
                    message: "Erreur lors de l'enregistrement des données",
                    type: "danger",
                    statusCode: 500,
                  },
                })
              );
          }
          return res.status(409).send({
            alert: {
              message: "La tache existe déjà",
              type: "danger",
              statusCode: 409,
            },
          });
        })
        .catch(() => {});
    }
    return res.status(400).send({
      alert: {
        message: "Erreur lors de l'enregistrement des données",
        type: "danger",
        statusCode: 400,
      },
    });
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
  getTodos(req, res) {
    TodoModel.find((err, items) => {
      if (err) return err;
      return res.send({ todos: items });
    });
  }
}
