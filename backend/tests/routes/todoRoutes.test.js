const request = require('supertest');
const app = require('../../app');
const model = require('../../models/todoModel');

jest.mock('../../models/todoModel');

describe('Todo Routes', () => {
  describe('POST /api/todo', () => {
    it('should create a todo', async () => {
      model.addTodo.mockResolvedValue(1);
      const res = await request(app)
        .post('/api/todo')
        .send({ title: 'title', description: 'description' });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id', 1);
    });
    it('should return 400 if missing fields', async () => {
      const res = await request(app).post('/api/todo').send({});
      expect(res.statusCode).toBe(400);
    });
    it('should return 500 on error', async () => {
      model.addTodo.mockRejectedValue(new Error('fail'));
      const res = await request(app)
        .post('/api/todo')
        .send({ title: 'title', description: 'description' });
      expect(res.statusCode).toBe(500);
    });
  });

  describe('GET /api/todo', () => {
    it('should return todos', async () => {
      model.getRecentTodos.mockResolvedValue([{ id: 1 }]);
      const res = await request(app).get('/api/todo');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([{ id: 1 }]);
    });
    it('should return 500 on error', async () => {
      model.getRecentTodos.mockRejectedValue(new Error('fail'));
      const res = await request(app).get('/api/todo');
      expect(res.statusCode).toBe(500);
    });
  });

  describe('PUT /api/todo/:id', () => {
    it('should return 200 if updated', async () => {
      model.updateTodoStatus.mockResolvedValue(1);
      const res = await request(app).put('/api/todo/1');
      expect(res.statusCode).toBe(200);
    });
    it('should return 404 if not found', async () => {
      model.updateTodoStatus.mockResolvedValue(0);
      const res = await request(app).put('/api/todo/1');
      expect(res.statusCode).toBe(404);
    });
    it('should return 500 on error', async () => {
      model.updateTodoStatus.mockRejectedValue(new Error('fail'));
      const res = await request(app).put('/api/todo/1');
      expect(res.statusCode).toBe(500);
    });
  });
});