import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { 
        id: Date.now(), 
        text: inputValue, 
        completed: false 
      }]);
      setInputValue('');
    }
  };

  // Toggle completion status
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>My To-Do List</h1>
        
        <div className="add-todo">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-button">
            Add
          </button>
        </div>

        <div className="todo-stats">
          <span>Total: {todos.length}</span>
          <span>Completed: {todos.filter(todo => todo.completed).length}</span>
          <span>Remaining: {todos.filter(todo => !todo.completed).length}</span>
        </div>

        {todos.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet. Add one above to get started!</p>
          </div>
        ) : (
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="todo-checkbox"
                />
                <span className="todo-text">{todo.text}</span>
                <button 
                  onClick={() => deleteTodo(todo.id)} 
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
