import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Función para cargar la lista de tareas desde el servidor
  const fetchTasks = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/valentinfr')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  useEffect(() => {
    fetchTasks();
  }, []); // El segundo argumento [] asegura que esta función se ejecute solo una vez al montar el componente

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { label: newTask, done: false }]);
    setNewTask('');
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="todo-container">
      <h1>LISTA DE TAREAS</h1>
      <p className="task-count">
        Total de Tareas: <span>{tasks.length}</span>
      </p>
      <div>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTask}>Agregar</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.done ? 'completed-task' : ''}>
            <button onClick={() => toggleComplete(index)}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </button>
            <span className={task.done ? 'completed-text' : ''}>{task.label}</span>
            <button onClick={() => deleteTask(index)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
