const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();

const app = express();
app.use(express.json());

connectToDatabase();

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(500).send("Task not found");
    }

    return res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;
    const taskToUpdate = await TaskModel.findById(taskId);

    const allowedUpdates = ["isCompleted"];
    const requestedUpdates = Object.keys(req.body);

    for (update of requestedUpdates) {
      if (allowedUpdates.includes(update)) {
        taskToUpdate[update] = taskData[update];
      } else {
        return res
          .status(500)
          .send("Um ou mais campos inseridos não são editáveis!");
      }
    }

    await taskToUpdate.save();
    return res.status(200).send(taskToUpdate);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskToDelete = await TaskModel.findById(taskId);

    if (!taskToDelete) {
      return res.status(404).send("Task not found");
    }

    const deletedTask = await TaskModel.findByIdAndDelete(taskId);

    res.status(200).send(deletedTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

module.exports = app;
