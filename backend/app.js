import express from "express";
import { todoRouter } from "./routes/todoRoutes.routes.js";
const baseURL = process.env.BASE_URL || "/api/v1";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Ce middleware parse les headers nécessaires pour notre application
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,PATCH,OPTIONS,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Origin,Content, Accept,X-Requested-With,Authorization"
  );

  next();
});
app.use(baseURL + "/todos", todoRouter);
app.use(baseURL + "/", (req, res) => {
  res.end("Bienvenus");
});
export default app;
