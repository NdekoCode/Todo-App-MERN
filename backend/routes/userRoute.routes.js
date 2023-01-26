import { Router } from "express";
import UsersControllers from "../controllers/UsersController.js";
const userRouter = Router();
const userCTRL = new UsersControllers();
userRouter.get("/users", userCTRL.getAllUsers);
export default userRouter;
