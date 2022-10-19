import TodoController from "../controllers/TodoController.js";
import router from "./router.js";
const todoController = new TodoController();
router.get("/", todoController.getTodos);
router.post("/add", todoController.addTodo);
export { router as todoRouter };
