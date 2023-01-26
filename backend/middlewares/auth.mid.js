import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
export async function authMiddleware(req, res) {
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
    return alert.danger("Vous devez etre connecter pour acceder à cette page");
  }
}
