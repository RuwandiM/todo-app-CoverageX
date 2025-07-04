const db = require('../config/db');

const addTodo = async (title, description) => {
  const [result] = await db.query(
    'INSERT INTO todos (title, description, isDone, created_at) VALUES (?, ?, ?, NOW())',
    [title, description, false]
  );
  return result.insertId;
};

const getRecentTodos = async () => {
  const [rows] = await db.query(
    'SELECT * FROM todos WHERE isDone = false ORDER BY created_at DESC LIMIT 5'
  );
  return rows;
};

const updateTodoStatus = async (id) => {
  const [result] = await db.query(
    'UPDATE todos SET isDone = true WHERE id = ?',
    [id]
  );
  return result.affectedRows;
};

module.exports = { addTodo, getRecentTodos, updateTodoStatus };
