import TodoController from "../controllers/TodoController.js";
import router from "./router.js";
const todoController = new TodoController();
router.get("/", todoController.getTodos);
router.get("/:id", todoController.getTodo);
router.post("/add", todoController.addTodo);
router.put("/update/:id", todoController.updateTodo);
router.delete("/delete/:id", todoController.deleteTodo);
export { router as todoRouter };
