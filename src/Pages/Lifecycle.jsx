import React, { useState, useEffect } from 'react';
import { Section, Card, CodeBlock } from '../Componentes/UI';

const Lifecycle = () => {
  const [componentCount, setComponentCount] = useState(0);
  const [showDemo, setShowDemo] = useState(true);

  const LifecycleDemo = ({ id }) => {
    const [status, setStatus] = useState('Montando...');

    useEffect(() => {
      console.log(`Component ${id} montado`);
      setStatus('Montado ✅');
      
      return () => {
        console.log(`Component ${id} desmontado`);
      };
    }, [id]);

    useEffect(() => {
      setStatus('Actualizado 🔄');
    }, [componentCount]);

    return (
      <div className="border border-blue-200 rounded p-4 bg-blue-50">
        <h4 className="font-semibold">Componente #{id}</h4>
        <p className="text-sm text-gray-600">Estado: {status}</p>
      </div>
    );
  };

  return (
    <Section title="Ciclo de Vida del Componente">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card title="Explicación">
            <p className="text-gray-600 leading-relaxed mb-4">
              El ciclo de vida de un componente React tiene tres fases principales:
            </p>
            <ul className="text-gray-600 space-y-2">
              <li><strong>Montaje:</strong> El componente se crea y se agrega al DOM</li>
              <li><strong>Actualización:</strong> El componente se actualiza cuando cambian props o state</li>
              <li><strong>Desmontaje:</strong> El componente se elimina del DOM</li>
            </ul>
          </Card>

          <Card title="Demo Interactivo">
            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setComponentCount(prev => prev + 1)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Crear Componente
                </button>
                <button
                  onClick={() => setShowDemo(!showDemo)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {showDemo ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              
              <p className="text-sm text-gray-600">
                Componentes creados: {componentCount}
              </p>
              
              {showDemo && (
                <div className="space-y-3">
                  {Array.from({ length: Math.min(componentCount, 2) }, (_, i) => (
                    <LifecycleDemo key={i} id={i + 1} />
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
        
        <CodeBlock title="useEffect para ciclo de vida">
{`useEffect(() => {
  // Montaje - se ejecuta una vez
  console.log('Component montado');
  
  return () => {
    // Desmontaje - cleanup
    console.log('Component desmontado');
  };
}, []); // Array vacío = solo en mount/unmount

useEffect(() => {
  // Actualización - cada vez que count cambia
  console.log('Count actualizado');
}, [count]);

useEffect(() => {
  // Se ejecuta después de cada render
  document.title = \`Count: \${count}\`;
});`}
        </CodeBlock>
      </div>
    </Section>
  );
};

export default Lifecycle;