import React, { useState } from 'react';
import { Section, Card, CodeBlock } from '../Componentes/UI';

const Props = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Laura Martínez', age: 22, email: 'laura@email.com', isActive: true },
    { id: 2, name: 'Diego Fernández', age: 35, email: 'diego@email.com', isActive: false }
  ]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');

  const UserCard = ({ name, age, email, isActive, onToggle }) => (
    <div className={`border rounded p-4 cursor-pointer transition-colors ${
      isActive ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white hover:bg-gray-50'
    }`} onClick={onToggle}>
      <h4 className="font-semibold">{name}</h4>
      <p className="text-gray-600">{age} años</p>
      <p className="text-sm text-gray-500">{email}</p>
      <span className={`inline-block px-2 py-1 text-xs rounded ${
        isActive ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
      }`}>
        {isActive ? 'Activo' : 'Inactivo'}
      </span>
    </div>
  );

  const addUser = () => {
    if (newName.trim() && newAge.trim()) {
      const newUser = {
        id: Date.now(),
        name: newName,
        age: parseInt(newAge),
        email: `${newName.toLowerCase().replace(' ', '')}@email.com`,
        isActive: Math.random() > 0.5
      };
      setUsers([...users, newUser]);
      setNewName('');
      setNewAge('');
    }
  };

  const toggleUserStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, isActive: !user.isActive } : user
    ));
  };

  return (
    <Section title="Props">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card title="Explicación">
            <p className="text-gray-600 leading-relaxed">
              Las props (propiedades) son argumentos que se pasan a los componentes React. 
              Permiten que los componentes sean reutilizables y configurables. Son de solo lectura.
            </p>
          </Card>

          <Card title="Agregar Nueva Persona">
            <div className="space-y-3">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nombre completo..."
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="number"
                value={newAge}
                onChange={(e) => setNewAge(e.target.value)}
                placeholder="Edad..."
                className="w-full p-3 border border-gray-300 rounded"
                min="1"
                max="120"
              />
              <button
                onClick={addUser}
                className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                disabled={!newName.trim() || !newAge.trim()}
              >
                Agregar Persona
              </button>
            </div>
          </Card>
          
          <Card title="Lista de Personas">
            <div className="space-y-4">
              {users.map(user => (
                <UserCard
                  key={user.id}
                  name={user.name}
                  age={user.age}
                  email={user.email}
                  isActive={user.isActive}
                  onToggle={() => toggleUserStatus(user.id)}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Haz click en las tarjetas para cambiar el estado
            </p>
          </Card>
        </div>
        
        <CodeBlock title="Componente UserCard con Props">
{`const UserCard = ({ name, age, email, isActive, onToggle }) => (
  <div 
    className={isActive ? 'active-card' : 'inactive-card'}
    onClick={onToggle}
  >
    <h4>{name}</h4>
    <p>{age} años</p>
    <p>{email}</p>
    <span>{isActive ? 'Activo' : 'Inactivo'}</span>
  </div>
);

// Uso del componente pasando props
<UserCard
  name="Laura Martínez"
  age={22}
  email="laura@email.com"
  isActive={true}
  onToggle={() => toggleUserStatus(user.id)}
/>

// Agregando dinámicamente
const addUser = () => {
  const newUser = {
    id: Date.now(),
    name: newName,
    age: parseInt(newAge),
    email: \`\${name}@email.com\`,
    isActive: Math.random() > 0.5
  };
  setUsers([...users, newUser]);
};`}
        </CodeBlock>
      </div>
    </Section>
  );
};

export default Props;