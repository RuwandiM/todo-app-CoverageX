import React, {useState, useEffect} from 'react';
import '../styles/todolist.css';
import no_data_image from '../images/no-data-found.png';
import API_BASE_URL from '../api';

function TodoList() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}`);
            if (!res.ok) throw new Error('Failed to fetch todos');
            const data = await res.json();
            setTodoList(data);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = async (e) => {
        const newErrors = {};
        e.preventDefault();
        if(title == '') {
            newErrors.titleError = true;
        }
        if(description == '') {
            newErrors.descriptionError = true;
        }
        setFormErrors(newErrors);
        if(title != '' && description!= '') {
            try {
                const res = await fetch(`${API_BASE_URL}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({title, description})
                });

                if (!res.ok) throw new Error('Failed to add todo');

                console.log('Todo added successfully!');
                setTitle('');
                setDescription('');
                await fetchTodos();
            } catch (err) {
                console.log(err.message);
            }
        }
    };

    const markAsDone = async (index, id) => {
        try {
            const res = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
            });
            if(!res.ok) throw new Error('Failed to update todo');

            await fetchTodos();
        } catch (err) {
            console.log(err.message);
        }
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
                        />
                        {formErrors.titleError && <span className="error-msg">*Task title cannot be empty.</span>}
                        <textarea 
                            type="text" 
                            name="description" 
                            placeholder="Description" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {formErrors.descriptionError && <span className="error-msg">*Task description cannot be empty.</span>}
                        <button type="submit" className="todo-form-button">
                            Add
                        </button>
                    </form>
                </div>
                <div className="verticle-line"></div>
                <div className="todo-list-container">
                    {loading && 
                    <div className="loader-container">
                        <div className="loader"></div>
                        <p className="loader-text">Loading...</p>
                    </div>
                    }
                    {!loading && todoList.length === 0 && (
                        <div className="no-data-container">
                            <img src={no_data_image} alt="no-data-found-img" className="not-found-image"></img>
                            <p className="no-data-text">No uncompleted tasks found.</p>
                        </div>
                    )}
                    {!loading && todoList.length > 0 &&
                    (
                        todoList.map((item, index) => (
                            <div className="todo-item-container" key={index}>
                                <div className="item-details-container">
                                    <span className="todo-item-title">{item.title}</span>
                                    <br />
                                    <span className="todo-item-description">{item.description}</span>
                                </div>
                                <div className="button-container">
                                    <button className="todo-complete-button" onClick={() => markAsDone(index, item.id)}>
                                        Done
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default TodoList;