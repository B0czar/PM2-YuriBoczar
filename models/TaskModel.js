const pool = require("../config/database");

class Task {
    static async create(taskData) {
        const { name, description, status, user_id, category_id, due_date } = taskData;
        const query = `
            INSERT INTO tasks (name, description, status, user_id, category_id, due_date)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const values = [name, description, status, user_id, category_id, due_date];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async findAll() {
        const query = `
            SELECT t.*, c.name as category_name, u.name as user_name
            FROM tasks t
            LEFT JOIN categories c ON t.category_id = c.id
            LEFT JOIN users u ON t.user_id = u.id
            ORDER BY t.created_at DESC
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    static async findById(id) {
        const query = `
            SELECT t.*, c.name as category_name, u.name as user_name
            FROM tasks t
            LEFT JOIN categories c ON t.category_id = c.id
            LEFT JOIN users u ON t.user_id = u.id
            WHERE t.id = $1
        `;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async update(id, taskData) {
        const { name, description, status, user_id, category_id, due_date } = taskData;
        const query = `
            UPDATE tasks
            SET name = $1, description = $2, status = $3, user_id = $4, category_id = $5, due_date = $6
            WHERE id = $7
            RETURNING *
        `;
        const values = [name, description, status, user_id, category_id, due_date, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async findByUserId(userId) {
        const query = `
            SELECT t.*, c.name as category_name
            FROM tasks t
            LEFT JOIN categories c ON t.category_id = c.id
            WHERE t.user_id = $1
            ORDER BY t.created_at DESC
        `;
        const result = await pool.query(query, [userId]);
        return result.rows;
    }
}

module.exports = Task;
