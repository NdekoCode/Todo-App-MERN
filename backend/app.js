import express from "express";
const app = express();
app.use("/", (req, res) => {
  res.end("Bienvenus");
});

export default app;
