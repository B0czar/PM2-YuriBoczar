// controllers/TarefaController.js
const pool = require("../config/database");

// Create a new task
exports.createTask = async (req, res) => {
    const { name, description, status, user_id, category_id, due_date } = req.body;

    const query =
        "INSERT INTO tasks (name, description, status, user_id, category_id, due_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [name, description, status, user_id, category_id, due_date];

    try {
        const result = await pool.query(query, values);
        const task = result.rows[0];
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// List all tasks
exports.listTasks = async (req, res) => {
    const query = "SELECT * FROM tasks";

    try {
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit a task
exports.editTask = async (req, res) => {
    const { id } = req.params;
    const { name, description, status, user_id, category_id, due_date } = req.body;

    const query = `
    UPDATE tasks SET name = $1, description = $2, status = $3, user_id = $4, category_id = $5, due_date = $6, updated_at = CURRENT_TIMESTAMP
    WHERE id = $7 RETURNING *`;
    const values = [name, description, status, user_id, category_id, due_date, id];

    try {
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM tasks WHERE id = $1 RETURNING *";
    const values = [id];

    try {
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
