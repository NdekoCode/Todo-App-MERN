import dotenv from "dotenv";
dotenv.config();
import {createServer} from "http";
import app from "./app.js";
import databaseConnect from "./config/dbConfig.js";
databaseConnect();
const server = createServer(app);
const port = process.env.PORT || 4500;
server.listen(port, () => console.log("Connecting to port " + port));
