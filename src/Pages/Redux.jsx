import React, { useState, useContext } from 'react';
import { Section, Card, CodeBlock } from '../Componentes/UI';
import { AppContext } from '../context/AppContext';

const Redux = () => {
  const { state, dispatch } = useContext(AppContext);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
    }
  };

  return (
    <Section title="Redux (Manejo de Estado Global)">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card title="Conceptos de Redux">
            <div className="space-y-3 text-gray-600">
              <p><strong>Store:</strong> Almacena el estado global de la aplicación</p>
              <p><strong>Actions:</strong> Objetos que describen qué pasó</p>
              <p><strong>Reducers:</strong> Funciones que especifican cómo cambia el estado</p>
              <p><strong>Dispatch:</strong> Método para enviar actions al store</p>
            </div>
          </Card>

          <Card title="Todo App con useReducer">
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Nueva tarea..."
                  className="flex-1 p-2 border border-gray-300 rounded"
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                />
                <button
                  onClick={addTodo}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Agregar
                </button>
              </div>
              
              <div className="space-y-2">
                {state.todos.map(todo => (
                  <div
                    key={todo.id}
                    className={`flex items-center justify-between p-3 border rounded ${
                      todo.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                    }`}
                  >
                    <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                      {todo.text}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                        className={`px-2 py-1 text-xs rounded ${
                          todo.completed
                            ? 'bg-gray-500 text-white'
                            : 'bg-green-500 text-white'
                        }`}
                      >
                        {todo.completed ? 'Deshacer' : 'Completar'}
                      </button>
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {state.todos.length === 0 && (
                <p className="text-gray-500 text-center py-4">No hay tareas</p>
              )}
              
              <div className="text-sm text-gray-600 border-t pt-3">
                Total: {state.todos.length} | 
                Completadas: {state.todos.filter(t => t.completed).length}
              </div>
            </div>
          </Card>
        </div>
        
        <CodeBlock title="Reducer + Context">
{`// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    default:
      return state;
  }
};

// Context + Reducer
const AppContext = createContext();
const [state, dispatch] = useReducer(appReducer, initialState);

// Dispatch actions
dispatch({ type: 'ADD_TODO', payload: 'Nueva tarea' });
dispatch({ type: 'TOGGLE_TODO', payload: todoId });`}
        </CodeBlock>
      </div>
    </Section>
  );
};

export default Redux;