import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import Alert from "../utils/Alert.js";
export async function authMiddleware(req, res, next) {
  try {
    let user;
    const TOKEN_SECRET_CODE = process.env.TOKEN_SECRET_CODE;
    const token = req.headers.authorization.split(" ")[1];
    const { userId } = jwt.verify(token, TOKEN_SECRET_CODE);
    if (!user) {
      user = await UserModel.findById(userId);
      if (user) {
        req.user = new UserModel(user);
      }
    }
    next();
  } catch (error) {
    const alert = new Alert(req, res);
    return alert.danger("Vous devez etre connecter pour acceder à cette page");
  }
}
