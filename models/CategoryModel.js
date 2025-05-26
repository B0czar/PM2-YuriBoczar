const pool = require("../config/database");

class Category {
    static async create(categoryData) {
        const { name } = categoryData;
        const query = `
            INSERT INTO categories (name)
            VALUES ($1)
            RETURNING *
        `;

        try {
            const result = await pool.query(query, [name]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Erro ao criar categoria: ${error.message}`);
        }
    }

    static async findAll() {
        const query = "SELECT * FROM categories ORDER BY created_at DESC";

        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw new Error(`Erro ao listar categorias: ${error.message}`);
        }
    }

    static async findById(id) {
        const query = "SELECT * FROM categories WHERE id = $1";

        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Erro ao buscar categoria: ${error.message}`);
        }
    }

    static async update(id, categoryData) {
        const { name } = categoryData;
        const query = `
            UPDATE categories
            SET name = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING *
        `;

        try {
            const result = await pool.query(query, [name, id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Erro ao atualizar categoria: ${error.message}`);
        }
    }

    static async delete(id) {
        const query = "DELETE FROM categories WHERE id = $1 RETURNING *";

        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Erro ao deletar categoria: ${error.message}`);
        }
    }
}

module.exports = Category;
