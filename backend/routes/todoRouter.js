const express = require('express');
const router = express.Router();
const controller = require('../controllers/todoController');

router.post('/', controller.createTodo);
router.get('/', controller.getRecentTodos);
router.put('/:id', controller.updateTodoStatus);

module.exports = router;
