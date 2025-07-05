const httpMocks = require('node-mocks-http');
const Todo = require('../../models/todoModel');
const controller = require('../../controllers/todoController');

jest.mock('../../models/todoModel');

describe('Todo controller', () => {
    describe('createTodo', () => {
        it('should return 400 if missing fields', async () => {
            const req = httpMocks.createRequest({ body: {} });
            const res = httpMocks.createResponse();
            await controller.createTodo(req, res);
            expect(res.statusCode).toBe(400);
        });
        it('should return 201 if todo is created successfully', async () => {
            const req = httpMocks.createRequest({ body: {title: 'title', description: 'description'} });
            const res = httpMocks.createResponse();
            Todo.createTodo.mockResolvedValue(1);
            await controller.createTodo(req, res);
            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toHaveProperty('id', 1);
        });
        it('should return 500 on error', async () => {
            Todo.createTodo.mockRejectedValue(new Error('fail'));
            const req = httpMocks.createRequest({ body: {title: 'title', description: 'description'} });
            const res = httpMocks.createResponse();
            await controller.createTodo(req, res);
            expect(res.statusCode).toBe(500);
        });
    });

    describe('getRecentTodos', () => {
        it('should return todos', async () => {
            Todo.getRecentTodos.mockResolvedValue([{ id:1 }]);
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            await controller.getRecentTodos(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual([{id:1}]);
        });
        it('should return 500 on error', async () => {
            Todo.getRecentTodos.mockRejectedValue(new Error('fail'));
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            await controller.getRecentTodos(req, res);
            expect(res.statusCode).toBe(500);
        });
    });

    describe('updateTodoStatus', () => {
        it('should return 404 if not found', async () => {
            Todo.updateTodoStatus.mockResolvedValue(0);
            const req  = httpMocks.createRequest({ params: {id:1} });
            const res = httpMocks.createResponse();
            await controller.updateTodoStatus(req, res);
            expect(res.statusCode).toBe(404);
        });
        it('should return 200 if updated', async () => {
            Todo.updateTodoStatus.mockResolvedValue(1);
            const req  = httpMocks.createRequest({ params: {id:1} });
            const res = httpMocks.createResponse();
            await controller.updateTodoStatus(req, res);
            expect(res.statusCode).toBe(200);
        });
        it('should return 500 on error', async () => {
            Todo.updateTodoStatus.mockRejectedValue(new Error('fail'));
            const req = httpMocks.createRequest({ params: { id: 1 } });
            const res = httpMocks.createResponse();
            await controller.updateTodoStatus(req, res);
            expect(res.statusCode).toBe(500);
        });
    })
});