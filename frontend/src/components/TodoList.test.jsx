import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList', () => {
    it('render add task form', () => {
        render(<TodoList />);
        expect(screen.getByText(/Add a task/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
    });
    it('adds a new todo and display it', () => {
        render(<TodoList />);
        fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Test Task' } });
        fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Test Description' } });
        fireEvent.click(screen.getByRole('button', { name: /Add/i }));
        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
    it('marks a todo as done', () => {
        render(<TodoList />);
        fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Task' } });
        fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Description' } });
        fireEvent.click(screen.getByRole('button', { name: /Add/i }));
        fireEvent.click(screen.getByRole('button', { name: /Done/i }));
        expect(screen.queryByText('Task')).not.toBeInTheDocument();
    });
});