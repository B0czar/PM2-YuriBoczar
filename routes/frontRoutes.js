const express = require('express');
const router = express.Router();
const path = require('path');

const Task = require('../models/TaskModel');
const Category = require('../models/CategoryModel');
const User = require('../models/UserModel');

// Listagem de tarefas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.render('pages/tasks', {
      pageTitle: 'Lista de Tarefas',
      tasks
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Formulário de criação de nova tarefa
router.get('/tasks/new', async (req, res) => {
  try {
    const categories = await Category.findAll();
    const users = await User.findAll();
    res.render('pages/taskForm', {
      pageTitle: 'Nova Tarefa',
      task: {},
      categories,
      users,
      action: '/api/tasks',
      method: 'POST'
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Formulário de edição de tarefa existente
router.get('/tasks/:id/edit', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Tarefa não encontrada');
    const categories = await Category.findAll();
    const users = await User.findAll();
    res.render('pages/taskForm', {
      pageTitle: 'Editar Tarefa',
      task,
      categories,
      users,
      action: '/api/tasks/' + task.id,
      method: 'PUT'
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ==================== Usuários ====================
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('pages/users', {
      pageTitle: 'Lista de Usuários',
      users
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/users/new', (req, res) => {
  res.render('pages/userForm', {
    pageTitle: 'Novo Usuário',
    user: {},
    action: '/api/users',
    method: 'POST'
  });
});

router.get('/users/:id/edit', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('Usuário não encontrado');
    res.render('pages/userForm', {
      pageTitle: 'Editar Usuário',
      user,
      action: '/api/users/' + user.id,
      method: 'PUT'
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ==================== Categorias ====================
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render('pages/categories', {
      pageTitle: 'Lista de Categorias',
      categories
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/categories/new', (req, res) => {
  res.render('pages/categoryForm', {
    pageTitle: 'Nova Categoria',
    category: {},
    action: '/api/categories',
    method: 'POST'
  });
});

router.get('/categories/:id/edit', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send('Categoria não encontrada');
    res.render('pages/categoryForm', {
      pageTitle: 'Editar Categoria',
      category,
      action: '/api/categories/' + category.id,
      method: 'PUT'
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Adicione outras rotas conforme necessário

module.exports = router;
