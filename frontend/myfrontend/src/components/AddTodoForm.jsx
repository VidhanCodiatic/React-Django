import React, { useState } from 'react';
import axios from 'axios';

const AddTodoForm = ({ onAddTodo }) => {
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        completed: false
    });
  
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/todos/', todo)
            .then(res => {
                console.log(res);
                console.log(res.data);
                // Pass the newly added todo to the parent component
                onAddTodo(res.data);
                // Clear the form after successful submission
                setTodo({
                    title: '',
                    description: '',
                    completed: false
                });
            })
            .catch(error => {
                console.error('Error adding todo:', error);
            });
    };
  
    const handleChange = (event) => {
        const { name, value } = event.target;
        setTodo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
  
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={todo.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={todo.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Completed:</label>
                <input
                    type="checkbox"
                    name="completed"
                    checked={todo.completed}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default AddTodoForm;
