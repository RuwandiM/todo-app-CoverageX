const db = require('../config/db');

const addTodo = async (title, description) => {
  try {
    const [result] = await db.query(
      'INSERT INTO task (title, description, isDone, created_at) VALUES (?, ?, ?, NOW())',
      [title, description, false]
    );
    return result.insertId;
  } catch (err) {
    throw new Error('Database error: ' + err.message);
  }
};

const getRecentTodos = async () => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM task WHERE isDone = false ORDER BY created_at DESC LIMIT 5'
    );
    return rows;
  } catch (err) {
    throw new Error('Database error: ' + err.message);
  }
};

const updateTodoStatus = async (id) => {
  try {
    const [result] = await db.query(
      'UPDATE task SET isDone = true WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  } catch (err) {
    throw new Error('Database error: ' + err.message);
  }
};

module.exports = { addTodo, getRecentTodos, updateTodoStatus };
