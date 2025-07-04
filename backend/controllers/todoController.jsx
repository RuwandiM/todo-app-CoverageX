const Todo = require('../models/todoModel');

createTodo = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) return res.status(400).json({ error: 'Missing fields' });

  const id = await Todo.addTodo(title, description);
  res.status(201).json({ id, message: 'Todo added successfully' });
};

getRecentTodos = async (req, res) => {
  const todos = await Todo.getRecentTodos();
  res.json(todos);
};

updateTodoStatus = async (req, res) => {
  const { id } = req.params;
  const result = await Todo.updateTodoStatus(id);
  if (result) res.json({ message: 'Todo marked as complete' });
  else res.status(404).json({ error: 'Todo not found' });
};

module.exports = { addTodo, getRecentTodos, updateTodoStatus };