import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Section, Card, CodeBlock } from '../Componentes/UI';

const Hooks = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  const expensiveValue = useMemo(() => {
    console.log('Calculando valor caro...');
    return count * 1000;
  }, [count]);

  const fetchData = useCallback(() => {
    setTimeout(() => {
      setData({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString()
      });
    }, 1000);
  }, []);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <Section title="Hooks">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card title="Explicación">
            <p className="text-gray-600 leading-relaxed">
              Los Hooks permiten usar estado y otras características de React en componentes funcionales. 
              Son funciones especiales que comienzan con "use".
            </p>
          </Card>

          <Card title="useState">
            <div className="text-center">
              <div className="text-2xl font-bold mb-4">{count}</div>
              <button
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Incrementar
              </button>
            </div>
          </Card>

          <Card title="useMemo">
            <div className="text-center">
              <p className="text-gray-600">Valor calculado:</p>
              <div className="text-xl font-bold">{expensiveValue}</div>
              <p className="text-sm text-gray-500 mt-2">
                Solo recalcula cuando count cambia
              </p>
            </div>
          </Card>

          <Card title="useRef">
            <div className="space-y-3">
              <input
                ref={inputRef}
                type="text"
                placeholder="Input con referencia"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                onClick={focusInput}
                className="w-full py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Enfocar Input
              </button>
            </div>
          </Card>

          <Card title="useCallback">
            <div className="space-y-3">
              <button
                onClick={fetchData}
                className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Fetch Data
              </button>
              {data && (
                <div className="p-3 bg-gray-50 rounded text-sm">
                  <p>ID: {data.id}</p>
                  <p>Timestamp: {data.timestamp}</p>
                </div>
              )}
            </div>
          </Card>
        </div>
        
        <CodeBlock title="Hooks principales">
{`// useState - manejo de estado
const [count, setCount] = useState(0);

// useEffect - efectos secundarios
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);

// useMemo - memorización de valores
const expensiveValue = useMemo(() => {
  return count * 1000;
}, [count]);

// useCallback - memorización de funciones
const fetchData = useCallback(() => {
  // lógica de fetch
}, []);

// useRef - referencias a elementos DOM
const inputRef = useRef(null);
inputRef.current.focus();

// useReducer - estado complejo
const [state, dispatch] = useReducer(reducer, initialState);`}
        </CodeBlock>
      </div>
    </Section>
  );
};

export default Hooks;