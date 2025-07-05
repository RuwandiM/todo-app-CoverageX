const db =  require('../../config/db');
const model = require('../../models/todoModel');

jest.mock('../../config/db');

describe('Todo Model', () => {
    afterEach(() => jest.clearAllMocks());

    describe('Todo Model', () => {
        afterEach(() => jest.clearAllMocks());

        describe('addTodo', () => {
            it('should insert todo and return insertId', async () => {
                db.query.mockResolvedValueOnce([{ insertId: 12 }]);
                const id = await model.addTodo('title', 'description');
                expect(id).toBe(12);
            });
            it('should throw on db error', async () => {
                db.query.mockRejectedValueOnce(new Error('fail'));
                await expect(model.addTodo('title', 'description')).rejects.toThrow('Database error');
            });
        });
    });

    describe('getRecentTodos', () => {
        it('should return rows', async() => {
            db.query.mockResolvedValueOnce([[{id: 1}]]);
            const rows = await model.getRecentTodos();
            expect(rows).toEqual([{id:1}]);
        });
        it('should throw on db error', async () => {
            db.query.mockRejectedValueOnce(new Error('fail'));
            await expect(model.getRecentTodos()).rejects.toThrow('Database error');
        });
    });

    describe('updateTodoStatus', () => {
        it('should return affectedRows', async () => {
            db.query.mockResolvedValueOnce([{ affectedRows: 1 }]);
            const result = await model.updateTodoStatus(1);
            expect(result).toBe(1);
        });
        it('should throw on db error', async () => {
            db.query.mockRejectedValueOnce(new Error('fail'));
            await expect(model.updateTodoStatus(1)).rejects.toThrow('Database error');
        });
    });
});