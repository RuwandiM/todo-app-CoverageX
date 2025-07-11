const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRouter');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/todo', todoRoutes);

module.exports = app;