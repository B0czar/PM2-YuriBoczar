// routes/index.js
const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");
const UserController = require("../controllers/userController");
const CategoryController = require("../controllers/CategoryController");

// Rotas para usuários
router.post("/users", UserController.createUser);
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

// Rotas para categorias
router.post("/categories", CategoryController.createCategory);
router.get("/categories", CategoryController.listCategories);
router.get("/categories/:id", CategoryController.getCategory);
router.put("/categories/:id", CategoryController.updateCategory);
router.delete("/categories/:id", CategoryController.deleteCategory);

// Rotas para tarefas
router.post("/tasks", TaskController.createTask);
router.get("/tasks", TaskController.listTasks);
router.get("/tasks/:id", TaskController.getTask);
router.put("/tasks/:id", TaskController.updateTask);
router.delete("/tasks/:id", TaskController.deleteTask);
router.get("/users/:userId/tasks", TaskController.getUserTasks);

module.exports = router;
