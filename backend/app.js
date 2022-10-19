import express from "express";
import { todoRouter } from "./routes/todoRoutes.js";
const app = express();
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
app.use(express.json());
app.use("/todos", todoRouter);
app.use("/", (req, res) => {
  res.end("Bienvenus");
});
export default app;
