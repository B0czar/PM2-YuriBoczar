const pool = require('../config/database');

class User {
  static async create(userData) {
    const { name, email } = userData;
    const query = `
      INSERT INTO users (name, email)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [name, email];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  static async findAll() {
    const query = 'SELECT * FROM users ORDER BY created_at DESC';
    
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
  }

  static async update(id, data) {
    try {
      const result = await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [data.name, data.email, id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
      return result.rowCount > 0;
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }
}

module.exports = User;
