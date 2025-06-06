// controllers/userController.js

const User = require('../models/UserModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ success: true, data: users, error: null });
  } catch (error) {
    res.status(500).json({ success: false, data: null, error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json({ success: true, data: user, error: null });
    } else {
      res.status(404).json({ success: false, data: null, error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: null, error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await User.create(userData);
    res.status(201).json({ success: true, data: user, error: null });
  } catch (error) {
    res.status(500).json({ success: false, data: null, error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const user = await User.update(id, userData);
    if (!user) {
      return res.status(404).json({ success: false, data: null, error: 'Usuário não encontrado' });
    }
    res.status(200).json({ success: true, data: user, error: null });
  } catch (error) {
    res.status(500).json({ success: false, data: null, error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.delete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, data: null, error: 'Usuário não encontrado' });
    }
    res.status(200).json({ success: true, data: { message: 'Usuário deletado com sucesso' }, error: null });
  } catch (error) {
    res.status(500).json({ success: false, data: null, error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
