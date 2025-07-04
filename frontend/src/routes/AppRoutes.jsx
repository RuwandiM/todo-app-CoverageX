import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TodoLost from '../components/TodoList';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<TodoLost />} />
    </Routes>
  </Router>
);

export default AppRoutes;