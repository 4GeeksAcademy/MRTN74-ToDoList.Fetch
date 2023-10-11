
import React, { useState, useEffect } from 'react';

const urlBase = 'https://playground.4geeks.com/apis/fake/todos/user/martin' 

const Home = () => {
  // Estado para almacenar la lista de tareas
  const [todos, setTodos] = useState([]);
  // Estado para almacenar la nueva tarea ingresada por el usuario
  const [newTodo, setNewTodo] = useState("");

  async function getTask() {
   try {
    let response = await fetch(urlBase)
    let data = await response.json()
    if (response.ok){
      setTodos(data)
    }
    if(response.status == 404){
      createUser()
    }
   } catch (error) {
    console.log(error)
   } 
  }

  async function createUser(){
    try {
      let response = await fetch(urlBase, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify([])
      })
      if (response.ok){
        getTask()
      }
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect se utiliza para realizar una llamada a la API GET al cargar el componente
  useEffect(() => {
    // Realiza una llamada a la API GET para obtener la lista de tareas del usuario
     getTask()
  }, []);

  // Función para agregar una nueva tarea
  const addTodo = () => {
    // Realiza una llamada a la API PUT para agregar una nueva tarea
    fetch(urlBase, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...todos, newTodo]), // Crea un objeto de tarea y lo convierte a JSON
    })
      .then(response => response.json()) // Convierte la respuesta en formato JSON
      .then(data => {
        // Actualiza la lista de tareas en el estado local
        // setTodos([...todos, { label: newTodo, done: false }]);
        getTask()
        // setNewTodo(''); // Limpia el campo de entrada después de agregar la tarea
      });
  };

  // Función para eliminar una tarea por su etiqueta
  const borrar = (labelToDelete) => {
    // Filtra la tarea a eliminar por su etiqueta y crea una nueva lista de tareas actualizada
    const updatedTodos = todos.filter(todo => todo.label !== labelToDelete);
    
    // Realiza una llamada a la API PUT para actualizar la lista de tareas eliminando la tarea por su etiqueta
    fetch(urlBase, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodos), // Envía la lista actualizada como JSON
    })
      .then(response => response.json()) // Convierte la respuesta en formato JSON
      .then(data => {
        // Actualiza la lista de tareas en el estado local excluyendo la tarea eliminada por etiqueta
        setTodos(updatedTodos);
      });
  };

  return (
    <div>
      <h1>Todo List</h1>
      {/* Input para ingresar una nueva tarea */}
        <div className="container">
        <input
          type="text"
         placeholder="Nueva tarea"
         value={newTodo.label}
          onChange={(e) => setNewTodo({label:e.target.value, done:false})} // Actualiza el estado 'newTodo' al escribir en el input
       />
        {/* Botón para agregar una nueva tarea */}
        <button onClick={addTodo}>Agregar</button>
       {/* Lista de tareas */}
        <ul>
         {todos.map((todo, index) => (
           <li key={index}>
              {todo.label}
              {/* Botón para eliminar una tarea llamando a la función 'borrar' con la etiqueta de la tarea */}
             <button onClick={() => borrar(todo.label)}>Eliminar</button>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;