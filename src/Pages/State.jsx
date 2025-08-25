import React, { useState } from 'react';
import { Section, Card, CodeBlock } from '../Componentes/UI';

const State = () => {
  const [counter, setCounter] = useState(0);
  const [name, setName] = useState('');
  const [items, setItems] = useState(['React', 'JavaScript']);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem]);
      setNewItem('');
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <Section title="State (Estado)">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card title="Explicación">
            <p className="text-gray-600 leading-relaxed">
              El state es el estado interno de un componente que puede cambiar con el tiempo. 
              Permite que los componentes sean interactivos y reactivos a las acciones del usuario.
            </p>
          </Card>

          <Card title="Contador">
            <div className="text-center">
              <div className="text-4xl font-bold mb-4">{counter}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCounter(counter - 1)}
                  className="flex-1 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  -1
                </button>
                <button
                  onClick={() => setCounter(0)}
                  className="flex-1 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Reset
                </button>
                <button
                  onClick={() => setCounter(counter + 1)}
                  className="flex-1 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  +1
                </button>
              </div>
            </div>
          </Card>

          <Card title="Input Controlado">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Escribe tu nombre..."
              className="w-full p-3 border border-gray-300 rounded mb-3"
            />
            <p className="text-gray-600">
              {name ? `¡Hola, ${name}!` : 'Escribe algo arriba'}
            </p>
          </Card>

          <Card title="Lista Dinámica">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Nuevo elemento..."
                className="flex-1 p-2 border border-gray-300 rounded"
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
              />
              <button
                onClick={addItem}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Agregar
              </button>
            </div>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>{item}</span>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        <CodeBlock title="Uso de useState">
{`const [counter, setCounter] = useState(0);
const [name, setName] = useState('');
const [items, setItems] = useState(['React', 'JavaScript']);

// Actualizar estado
setCounter(counter + 1);
setName(e.target.value);

// Estado con arrays
const addItem = () => {
  if (newItem.trim()) {
    setItems([...items, newItem]);
    setNewItem('');
  }
};

const removeItem = (index) => {
  setItems(items.filter((_, i) => i !== index));
};`}
        </CodeBlock>
      </div>
    </Section>
  );
};

export default State;