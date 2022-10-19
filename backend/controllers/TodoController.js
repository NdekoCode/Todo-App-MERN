import { TodoModel } from "../models/Todos.js";
export default class TodoController {
  addTodo(req, res) {
    const todo = new TodoModel({
      content: "Apprendre express",
      completed: false,
    });
    todo
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
  getTodos(req, res) {
    TodoModel.find((err, items) => {
      if (err) return err;
      return res.send({ todos: items });
    });
  }
}
