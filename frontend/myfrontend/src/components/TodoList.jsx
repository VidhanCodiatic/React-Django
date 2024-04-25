import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodoForm from './AddTodoForm';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:8000/api/todos/')
            .then(res => {
                setTodos(res.data);
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
            });
    };

    const handleAddTodo = (newTodo) => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
    };

    return (
        <>
            <AddTodoForm onAddTodo={handleAddTodo} />
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {todos.map(todo => (
                <li key={todo.id}>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: todo.completed ? 'green' : 'red' }}>
                    {todo.completed ? 'Completed' : 'Incomplete'}
                  </p>
                </li>
              ))}
            </ul>
        </>
    );
};

export default TodoList;
