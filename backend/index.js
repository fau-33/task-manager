const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();

connectToDatabase();

const app = express();

app.get("/tasks", (req, res) => {
  const tasks = [
    {
      description: "Task 1",
      done: false,
    },
  ];
  res.status(200).send(tasks);
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

module.exports = app;
