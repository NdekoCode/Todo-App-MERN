import { TodoModel } from "../models/Todos.js";
import router from "./router.js";
router.get("/", (req, res) => {
  res.send("routes des Todos");
});
router.post("/add", (req, res) => {
  console.log(req.body);
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
});
export { router as todoRouter };
