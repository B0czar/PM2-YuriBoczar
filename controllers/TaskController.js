const Task = require("../models/TaskModel");

// Criar uma nova tarefa
exports.createTask = async (req, res) => {
    try {
        const taskData = req.body;
        const task = await Task.create(taskData);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar todas as tarefas
exports.listTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar uma tarefa específica
exports.getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar uma tarefa
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const taskData = req.body;

        const task = await Task.update(id, taskData);

        if (!task) {
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletar uma tarefa
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.delete(id);

        if (!task) {
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }

        res.status(200).json({ message: "Tarefa deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar tarefas de um usuário específico
exports.getUserTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.findByUserId(userId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
