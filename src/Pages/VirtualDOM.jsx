import React, { useState, useEffect } from 'react';
import { Section, Card, CodeBlock } from '../Componentes/UI';

const VirtualDOM = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1', active: false },
    { id: 2, text: 'Item 2', active: true },
    { id: 3, text: 'Item 3', active: false }
  ]);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });

  const toggleItem = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, active: !item.active } : item
    ));
  };

  const addItem = () => {
    const newId = Math.max(...items.map(i => i.id)) + 1;
    setItems([...items, { id: newId, text: `Item ${newId}`, active: false }]);
  };

  return (
    <Section title="Virtual DOM">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card title="¿Qué es el Virtual DOM?">
            <p className="text-gray-600 leading-relaxed mb-4">
              El Virtual DOM es una representación en memoria del DOM real. React usa esta 
              representación para hacer actualizaciones más eficientes.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>1.</strong> React crea un Virtual DOM tree</p>
              <p><strong>2.</strong> Cuando el state cambia, se crea un nuevo tree</p>
              <p><strong>3.</strong> React compara (diff) los trees</p>
              <p><strong>4.</strong> Solo actualiza los cambios en el DOM real</p>
            </div>
          </Card>

          <Card title="Demo Interactivo">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Re-renders: {renderCount}</span>
                <button
                  onClick={addItem}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  Agregar Item
                </button>
              </div>
              
              <div className="space-y-2">
                {items.map(item => (
                  <div
                    key={item.id}
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      item.active
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{item.text}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.active ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
                      }`}>
                        {item.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-gray-500">
                Haz click en los items para cambiar su estado y observar cómo React 
                optimiza las actualizaciones del DOM.
              </p>
            </div>
          </Card>
        </div>
        
        <CodeBlock title="Virtual DOM en acción">
{`// Estado inicial
const [items, setItems] = useState([
  { id: 1, text: 'Item 1', active: false },
  { id: 2, text: 'Item 2', active: true }
]);

// Cuando actualizamos el estado
const toggleItem = (id) => {
  setItems(items.map(item =>
    item.id === id 
      ? { ...item, active: !item.active } 
      : item
  ));
};

// React hace esto internamente:
// 1. Crea nuevo Virtual DOM tree con los cambios
// 2. Compara con el Virtual DOM anterior (diffing)
// 3. Identifica solo los elementos que cambiaron
// 4. Actualiza únicamente esos elementos en el DOM real

// Sin Virtual DOM: actualizaría todo el DOM
// Con Virtual DOM: solo actualiza los elementos cambiados`}
        </CodeBlock>
      </div>
    </Section>
  );
};

export default VirtualDOM;