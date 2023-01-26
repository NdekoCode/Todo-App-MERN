import { hash } from "bcrypt";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { TodoModel } from "../models/TodoModel.js";
import UserModel from "../models/UserModel.js";
import { __dirname } from "./constants.js";
export async function fakeTodos() {
  const todoData = JSON.parse(
    await readFile(join(__dirname, "utils", "data", "todos.json"))
  );
  return todoData;
}
export async function fakeUser() {
  const userData = JSON.parse(
    await readFile(join(__dirname, "utils", "data", "users.json"))
  );
  return userData;
}
export async function fakeData() {
  const users = await fakeUser();
  const todos = await fakeTodos();
  const newFakeUser = {
    firstName: "Arick",
    lastName: "Bulakali",
    email: "arickbulakali@gmail.com",
    password: await hash("7288ndeko", 13),
  };
  const newUser = UserModel(newFakeUser);
  await newUser.save();
  console.log("Add new user");
  for (let user of users) {
    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: await hash("7288ndeko", 13),
    };
    const newUser = UserModel(userData);
    await newUser.save();
    console.log("Add new user ", userData.firstName);
  }
  const usersDB = await UserModel.find();
  for (let todo of todos) {
    const todoData = {
      title: todo.todo,
      completed: todo.completed,
      description: "",
      userId: usersDB[parseInt(Math.random() * usersDB.length - 1)]._id,
      password: await hash("7288ndeko", 13),
    };
    const newTodo = TodoModel(todoData);
    await newTodo.save();
    console.log("Add new todo ", todoData.title);
  }
}
