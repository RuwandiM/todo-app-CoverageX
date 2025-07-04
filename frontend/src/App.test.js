import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Add a task form in the main app window', () => {
  render(<App />);
  expect(screen.getByText(/Add a task/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
});