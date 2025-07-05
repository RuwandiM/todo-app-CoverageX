const Todo = require('../models/todoModel');

createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ error: 'Missing fields' });

    const id = await Todo.addTodo(title, description);
    res.status(201).json({ id: id, message: 'Todo added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

getRecentTodos = async (req, res) => {
  try {
    const todos = await Todo.getRecentTodos();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

updateTodoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.updateTodoStatus(id);
    if (result) res.json({ message: 'Todo marked as done' });
    else res.status(404).json({ error: 'Todo not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createTodo, getRecentTodos, updateTodoStatus };