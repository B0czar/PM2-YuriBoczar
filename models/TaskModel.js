const pool = require("../config/database");

class Task {
    static async create(taskData) {
        const { name, description, status, user_id, category_id, due_date } =
            taskData;
        const query = `
            INSERT INTO tasks (name, description, status, user_id, category_id, due_date)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const values = [
            name,
            description,
            status,
            user_id,
            category_id,
            due_date,
        ];

        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Erro ao criar tarefa: ${error.message}`);
        }
    }

    static async findAll() {
        const query = `
            SELECT t.*, u.name as user_name, c.name as category_name
            FROM tasks t
            LEFT JOIN users u ON t.user_id = u.id
            LEFT JOIN categories c ON t.category_id = c.id
            ORDER BY t.created_at DESC
        `;

        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw new Error(`Erro ao listar tarefas: ${error.message}`);
        }
    }

    static async findById(id) {
        const query = `
            SELECT t.*, u.name as user_name, c.name as category_name
            FROM tasks t
            LEFT JOIN users u ON t.user_id = u.id
            LEFT JOIN categories c ON t.category_id = c.id
            WHERE t.id = $1
        `;

        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Erro ao buscar tarefa: ${error.message}`);
        }
    }

    static async update(id, taskData) {
        const { name, description, status, user_id, category_id, due_date } =
            taskData;
        const query = `
            UPDATE tasks
            SET name = $1,
                description = $2,
                status = $3,
                user_id = $4,
                category_id = $5,
                due_date = $6,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $7
            RETURNING *
        `;
        const values = [
            name,
            description,
            status,
            user_id,
            category_id,
            due_date,
            id,
        ];

        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Erro ao atualizar tarefa: ${error.message}`);
        }
    }

    static async delete(id) {
        const query = "DELETE FROM tasks WHERE id = $1 RETURNING *";

        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Erro ao deletar tarefa: ${error.message}`);
        }
    }

    static async findByUserId(userId) {
        const query = `
            SELECT t.*, u.name as user_name, c.name as category_name
            FROM tasks t
            LEFT JOIN users u ON t.user_id = u.id
            LEFT JOIN categories c ON t.category_id = c.id
            WHERE t.user_id = $1
            ORDER BY t.created_at DESC
        `;

        try {
            const result = await pool.query(query, [userId]);
            return result.rows;
        } catch (error) {
            throw new Error(
                `Erro ao buscar tarefas do usuário: ${error.message}`
            );
        }
    }
}

module.exports = Task;
