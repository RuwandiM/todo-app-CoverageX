import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TodoList from '../components/TodoList';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<TodoList />} />
    </Routes>
  </Router>
);

export default AppRoutes;