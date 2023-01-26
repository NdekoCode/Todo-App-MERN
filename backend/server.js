import dotenv from "dotenv";
import { createServer } from "http";
import app from "./app.js";
import databaseConnect from "./config/dbConfig.js";
import { fakeData } from "./utils/fakeData.js";
dotenv.config();
databaseConnect();
const server = createServer(app);
const port = process.env.PORT || 4500;
server.listen(port, () => {
  fakeData();
  console.log("Connecting to port " + port);
});
