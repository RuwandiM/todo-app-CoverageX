import React, {useState} from 'react';
import '../styles/todolist.css';

function TodoList() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todoList, setTodoList] = useState([]);

    const addTodo = (e) => {
        e.preventDefault();
        console.log(title);
        console.log(description);
        setTodoList([
            { title, description, isDone: false, createdAt: Date.now() },
            ...todoList
        ]);
        setTitle('');
        setDescription('');
    }

    const handleComplete = (index) => {
        const updatedTodoList = [...todoList];
        updatedTodoList[index].isDone = true;
        setTodoList(updatedTodoList);
    }

    return (
        <div className="container">
            <div className="todolist-container">
                <div className="add-todo-form-container">
                    <p className="add-todo-form-title">Add a task</p>
                    <form className="add-todo-form" onSubmit={addTodo}>
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="Title" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <textarea 
                            type="text" 
                            name="description" 
                            placeholder="Description" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <button type="submit" className="todo-form-button">
                            Add
                        </button>
                    </form>
                </div>
                <div className="verticle-line"></div>
                <div className="todo-list-container">
                    {todoList
                        .filter(item => !item.isDone)
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 5)
                        .map((item, index) => (
                            <div className="todo-item-container" key={index}>
                                <div className="item-details-container">
                                    <span className="todo-item-title">{item.title}</span>
                                    <br />
                                    <span className="todo-item-description">{item.description}</span>
                                </div>
                                <div className="button-container">
                                    <button className="todo-complete-button" onClick={() => handleComplete(index)}>
                                        Done
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TodoList;