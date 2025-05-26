// routes/index.js
const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TarefaController");

// CRUD routes for tasks
router.post("/tasks", TaskController.createTask);
router.get("/tasks", TaskController.listTasks);
router.put("/tasks/:id", TaskController.editTask);
router.delete("/tasks/:id", TaskController.deleteTask);

module.exports = router;
