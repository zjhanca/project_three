import React, { useReducer, useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } from 'react';

// Context for global state management
const AppContext = createContext();

// Redux-like reducer for global state
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }]
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
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
};

const initialState = {
  activeSection: 'inicio',
  todos: []
};

// Styles object for inline CSS
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
  },
  nav: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    zIndex: 50
  },
  navContainer: {
    maxWidth: '72rem',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '4rem'
  },
  navTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#111827',
    margin: 0
  },
  navButtons: {
    display: 'flex',
    gap: '2rem',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  navButton: {
    color: '#6b7280',
    fontWeight: '500',
    fontSize: '0.875rem',
    padding: '0.75rem 1rem',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: '0.5rem',
    transition: 'all 0.2s ease',
    textDecoration: 'none'
  },
  navButtonActive: {
    color: '#4f46e5',
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    fontWeight: '600'
  },
  select: {
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    backgroundColor: '#ffffff',
    color: '#374151',
    cursor: 'pointer',
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block'
    }
  },
  section: {
    maxWidth: '72rem',
    margin: '0 auto',
    padding: '4rem 1.5rem'
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: '3rem',
    fontSize: '2.25rem',
    fontWeight: '700',
    color: '#111827'
  },
  grid: {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
  },
  gridTwo: {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: '1fr 1fr',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    transition: 'all 0.2s ease'
  },
  cardTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '1rem',
    margin: '0 0 1rem 0'
  },
  button: {
    fontFamily: 'inherit',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: '500',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    padding: '0.75rem 1.25rem'
  },
  buttonPrimary: {
    backgroundColor: '#4f46e5',
    color: '#ffffff'
  },
  buttonGreen: {
    backgroundColor: '#10b981',
    color: '#ffffff'
  },
  buttonRed: {
    backgroundColor: '#ef4444',
    color: '#ffffff'
  },
  buttonGray: {
    backgroundColor: '#6b7280',
    color: '#ffffff'
  },
  buttonPurple: {
    backgroundColor: '#8b5cf6',
    color: '#ffffff'
  },
  input: {
    fontFamily: 'inherit',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    backgroundColor: '#ffffff',
    color: '#374151',
    transition: 'all 0.2s ease',
    width: '100%',
    boxSizing: 'border-box'
  },
  codeBlock: {
    fontFamily: '"JetBrains Mono", "Fira Code", Monaco, "Cascadia Code", monospace',
    fontSize: '0.875rem',
    lineHeight: '1.6',
    color: '#374151',
    backgroundColor: '#fafafa',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    overflowX: 'auto',
    margin: 0,
    whiteSpace: 'pre-wrap'
  },
  flexRow: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  textCenter: {
    textAlign: 'center'
  },
  textLarge: {
    fontSize: '2.5rem',
    fontWeight: '900',
    color: '#111827',
    marginBottom: '1.5rem',
    lineHeight: '1'
  },
  textGray: {
    color: '#6b7280'
  },
  textMuted: {
    color: '#9ca3af',
    fontSize: '0.875rem'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  listItem: {
    marginBottom: '0.5rem',
    color: '#6b7280'
  },
  userCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: '#ffffff'
  },
  userCardActive: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4'
  },
  badge: {
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    fontSize: '0.75rem',
    borderRadius: '0.25rem'
  },
  badgeGreen: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  badgeGray: {
    backgroundColor: '#f3f4f6',
    color: '#374151'
  },
  footer: {
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e5e7eb',
    color: '#6b7280',
    padding: '2rem 1.5rem',
    textAlign: 'center',
    marginTop: '4rem'
  }
};

// UI Components
const Section = ({ title, children }) => (
  <div style={styles.section}>
    <div style={styles.textCenter}>
      <h2 style={styles.sectionTitle}>{title}</h2>
    </div>
    {children}
  </div>
);

const Card = ({ title, children, className = '' }) => (
  <div style={styles.card}>
    {title && <h3 style={styles.cardTitle}>{title}</h3>}
    {children}
  </div>
);

const CodeBlock = ({ title, children }) => (
  <Card title={title}>
    <pre style={styles.codeBlock}>
      <code>{children}</code>
    </pre>
  </Card>
);

// Navigation Component
const Navigation = () => {
  const { state, dispatch } = useContext(AppContext);
  
  const sections = [
    { id: 'inicio', name: 'Inicio' },
    { id: 'props', name: 'Props' },
    { id: 'state', name: 'State' },
    { id: 'lifecycle', name: 'Ciclo de Vida' },
    { id: 'hooks', name: 'Hooks' },
    { id: 'virtualdom', name: 'Virtual DOM' },
    { id: 'redux', name: 'Redux' }
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        <h1 style={styles.navTitle}>Poryecto Tres</h1>
        
        <div style={styles.navButtons}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => dispatch({ type: 'SET_ACTIVE_SECTION', payload: section.id })}
              style={{
                ...styles.navButton,
                ...(state.activeSection === section.id ? styles.navButtonActive : {})
              }}
            >
              {section.name}
            </button>
          ))}
        </div>

        <select
          value={state.activeSection}
          onChange={(e) => dispatch({ type: 'SET_ACTIVE_SECTION', payload: e.target.value })}
          style={styles.select}
        >
          {sections.map(section => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

// Home Component
const Home = () => (
  <Section title="Introducción a React">
    <div style={styles.gridTwo}>
      <Card title="¿Qué es React?">
        <p style={styles.textGray}>
          React es una biblioteca de JavaScript para construir interfaces de usuario, 
          especialmente para aplicaciones web. Fue desarrollada por Facebook y se basa 
          en componentes reutilizables.
        </p>
      </Card>
      
      <Card title="Características principales">
        <ul style={styles.list}>
          <li style={styles.listItem}>• Basado en componentes</li>
          <li style={styles.listItem}>• Virtual DOM para optimización</li>
          <li style={styles.listItem}>• Unidirectional data flow</li>
          <li style={styles.listItem}>• JSX syntax</li>
          <li style={styles.listItem}>• Hooks para manejo de estado</li>
          <li style={styles.listItem}>• Ecosistema robusto</li>
        </ul>
      </Card>
      
      <div style={{gridColumn: '1 / -1'}}>
        <CodeBlock title="Componente básico">
{`function Welcome({ name }) {
  return <h1>¡Hola, {name}!</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="React" />
      <Welcome name="Mundo" />
    </div>
  );
}`}
        </CodeBlock>
      </div>
    </div>
  </Section>
);

// Props Component
const Props = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Laura Martínez', age: 22, email: 'laura@gmail.com', isActive: true },
    { id: 2, name: 'Diego Fernández', age: 35, email: 'diego@gmail.com', isActive: false }
  ]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');

  const UserCard = ({ name, age, email, isActive, onToggle }) => (
    <div 
      style={{
        ...styles.userCard,
        ...(isActive ? styles.userCardActive : {})
      }} 
      onClick={onToggle}
    >
      <h4 style={{margin: '0 0 0.5rem 0', fontWeight: '600'}}>{name}</h4>
      <p style={{margin: '0 0 0.25rem 0', color: '#6b7280'}}>{age} años</p>
      <p style={{margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#9ca3af'}}>{email}</p>
      <span style={{
        ...styles.badge,
        ...(isActive ? styles.badgeGreen : styles.badgeGray)
      }}>
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
        email: `${newName.toLowerCase().replace(' ', '')}@gmail.com`,
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
      <div style={styles.gridTwo}>
        <div style={styles.flexCol}>
          <Card title="Explicación">
            <p style={styles.textGray}>
              Las props (propiedades) son argumentos que se pasan a los componentes React. 
              Permiten que los componentes sean reutilizables y configurables. Son de solo lectura.
            </p>
          </Card>

          <Card title="Agregar Nueva Persona">
            <div style={styles.flexCol}>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nombre completo..."
                style={styles.input}
              />
              <input
                type="number"
                value={newAge}
                onChange={(e) => setNewAge(e.target.value)}
                placeholder="Edad..."
                style={styles.input}
                min="1"
                max="120"
              />
              <button
                onClick={addUser}
                style={{
                  ...styles.button,
                  ...styles.buttonPrimary,
                  opacity: (!newName.trim() || !newAge.trim()) ? 0.5 : 1,
                  cursor: (!newName.trim() || !newAge.trim()) ? 'not-allowed' : 'pointer'
                }}
                disabled={!newName.trim() || !newAge.trim()}
              >
                Agregar Persona
              </button>
            </div>
          </Card>
          
          <Card title="Lista de Personas">
            <div style={styles.flexCol}>
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
            <p style={styles.textMuted}>
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
/>`}
        </CodeBlock>
      </div>
    </Section>
  );
};

// State Component
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
      <div style={styles.gridTwo}>
        <div style={styles.flexCol}>
          <Card title="Explicación">
            <p style={styles.textGray}>
              El state es el estado interno de un componente que puede cambiar con el tiempo. 
              Permite que los componentes sean interactivos y reactivos a las acciones del usuario.
            </p>
          </Card>

          <Card title="Contador">
            <div style={styles.textCenter}>
              <div style={styles.textLarge}>{counter}</div>
              <div style={styles.flexRow}>
                <button
                  onClick={() => setCounter(counter - 1)}
                  style={{...styles.button, ...styles.buttonRed, flex: 1}}
                >
                  -1
                </button>
                <button
                  onClick={() => setCounter(0)}
                  style={{...styles.button, ...styles.buttonGray, flex: 1}}
                >
                  Reset
                </button>
                <button
                  onClick={() => setCounter(counter + 1)}
                  style={{...styles.button, ...styles.buttonGreen, flex: 1}}
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
              style={{...styles.input, marginBottom: '0.75rem'}}
            />
            <p style={styles.textGray}>
              {name ? `¡Hola, ${name}!` : 'Escribe algo arriba'}
            </p>
          </Card>

          <Card title="Lista Dinámica">
            <div style={{...styles.flexRow, marginBottom: '1rem'}}>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Nuevo elemento..."
                style={{...styles.input, flex: 1}}
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
              />
              <button
                onClick={addItem}
                style={{...styles.button, ...styles.buttonPrimary}}
              >
                Agregar
              </button>
            </div>
            <div style={styles.flexCol}>
              {items.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem'
                }}>
                  <span>{item}</span>
                  <button
                    onClick={() => removeItem(index)}
                    style={{
                      color: '#ef4444',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '1.25rem'
                    }}
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

// Lifecycle Component
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
      <div style={{
        border: '1px solid #bfdbfe',
        borderRadius: '0.5rem',
        padding: '1rem',
        backgroundColor: '#eff6ff'
      }}>
        <h4 style={{fontWeight: '600', margin: '0 0 0.5rem 0'}}>Componente #{id}</h4>
        <p style={{fontSize: '0.875rem', color: '#6b7280', margin: 0}}>Estado: {status}</p>
      </div>
    );
  };

  return (
    <Section title="Ciclo de Vida del Componente">
      <div style={styles.gridTwo}>
        <div style={styles.flexCol}>
          <Card title="Explicación">
            <p style={{...styles.textGray, marginBottom: '1rem'}}>
              El ciclo de vida de un componente React tiene tres fases principales:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}><strong>Montaje:</strong> El componente se crea y se agrega al DOM</li>
              <li style={styles.listItem}><strong>Actualización:</strong> El componente se actualiza cuando cambian props o state</li>
              <li style={styles.listItem}><strong>Desmontaje:</strong> El componente se elimina del DOM</li>
            </ul>
          </Card>

          <Card title="Demo Interactivo">
            <div style={styles.flexCol}>
              <div style={styles.flexRow}>
                <button
                  onClick={() => setComponentCount(prev => prev + 1)}
                  style={{...styles.button, ...styles.buttonGreen}}
                >
                  Crear Componente
                </button>
                <button
                  onClick={() => setShowDemo(!showDemo)}
                  style={{...styles.button, ...styles.buttonPrimary}}
                >
                  {showDemo ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              
              <p style={styles.textMuted}>
                Componentes creados: {componentCount}
              </p>
              
              {showDemo && (
                <div style={styles.flexCol}>
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

// Hooks Component
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
      <div style={styles.gridTwo}>
        <div style={styles.flexCol}>
          <Card title="Explicación">
            <p style={styles.textGray}>
              Los Hooks permiten usar estado y otras características de React en componentes funcionales. 
              Son funciones especiales que comienzan con "use".
            </p>
          </Card>

          <Card title="useState">
            <div style={styles.textCenter}>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem'}}>{count}</div>
              <button
                onClick={() => setCount(count + 1)}
                style={{...styles.button, ...styles.buttonPrimary}}
              >
                Incrementar
              </button>
            </div>
          </Card>

          <Card title="useMemo">
            <div style={styles.textCenter}>
              <p style={styles.textGray}>Valor calculado:</p>
              <div style={{fontSize: '1.25rem', fontWeight: 'bold'}}>{expensiveValue}</div>
              <p style={styles.textMuted}>
                Solo recalcula cuando count cambia
              </p>
            </div>
          </Card>

          <Card title="useRef">
            <div style={styles.flexCol}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Input con referencia"
                style={styles.input}
              />
              <button
                onClick={focusInput}
                style={{...styles.button, ...styles.buttonPurple}}
              >
                Enfocar Input
              </button>
            </div>
          </Card>

          <Card title="useCallback">
            <div style={styles.flexCol}>
              <button
                onClick={fetchData}
                style={{...styles.button, ...styles.buttonGreen}}
              >
                Fetch Data
              </button>
              {data && (
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}>
                  <p style={{margin: '0 0 0.25rem 0'}}>ID: {data.id}</p>
                  <p style={{margin: 0}}>Timestamp: {data.timestamp}</p>
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
inputRef.current.focus();`}
        </CodeBlock>
      </div>
    </Section>
  );
};

// Virtual DOM Component
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
      <div style={styles.gridTwo}>
        <div style={styles.flexCol}>
          <Card title="¿Qué es el Virtual DOM?">
            <p style={{...styles.textGray, marginBottom: '1rem'}}>
              El Virtual DOM es una representación en memoria del DOM real. React usa esta 
              representación para hacer actualizaciones más eficientes.
            </p>
            <div style={styles.flexCol}>
              <p style={styles.textMuted}><strong>1.</strong> React crea un Virtual DOM tree</p>
              <p style={styles.textMuted}><strong>2.</strong> Cuando el state cambia, se crea un nuevo tree</p>
              <p style={styles.textMuted}><strong>3.</strong> React compara (diff) los trees</p>
              <p style={styles.textMuted}><strong>4.</strong> Solo actualiza los cambios en el DOM real</p>
            </div>
          </Card>

          <Card title="Demo Interactivo">
            <div style={styles.flexCol}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={styles.textMuted}>Re-renders: {renderCount}</span>
                <button
                  onClick={addItem}
                  style={{...styles.button, ...styles.buttonPrimary, padding: '0.25rem 0.75rem', fontSize: '0.75rem'}}
                >
                  Agregar Item
                </button>
              </div>
              
              <div style={styles.flexCol}>
                {items.map(item => (
                  <div
                    key={item.id}
                    style={{
                      padding: '0.75rem',
                      border: '1px solid',
                      borderColor: item.active ? '#10b981' : '#e5e7eb',
                      backgroundColor: item.active ? '#f0fdf4' : '#ffffff',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => toggleItem(item.id)}
                  >
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span>{item.text}</span>
                      <span style={{
                        ...styles.badge,
                        ...(item.active ? styles.badgeGreen : styles.badgeGray)
                      }}>
                        {item.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <p style={{...styles.textMuted, fontSize: '0.75rem'}}>
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
// 4. Actualiza únicamente esos elementos en el DOM real`}
        </CodeBlock>
      </div>
    </Section>
  );
};

// Redux Component
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
      <div style={styles.gridTwo}>
        <div style={styles.flexCol}>
          <Card title="Conceptos de Redux">
            <div style={styles.flexCol}>
              <p style={styles.textGray}><strong>Store:</strong> Almacena el estado global de la aplicación</p>
              <p style={styles.textGray}><strong>Actions:</strong> Objetos que describen qué pasó</p>
              <p style={styles.textGray}><strong>Reducers:</strong> Funciones que especifican cómo cambia el estado</p>
              <p style={styles.textGray}><strong>Dispatch:</strong> Método para enviar actions al store</p>
            </div>
          </Card>

          <Card title="Todo App con useReducer">
            <div style={styles.flexCol}>
              <div style={styles.flexRow}>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Nueva tarea..."
                  style={{...styles.input, flex: 1}}
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                />
                <button
                  onClick={addTodo}
                  style={{...styles.button, ...styles.buttonPrimary}}
                >
                  Agregar
                </button>
              </div>
              
              <div style={styles.flexCol}>
                {state.todos.map(todo => (
                  <div
                    key={todo.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      border: '1px solid',
                      borderColor: todo.completed ? '#10b981' : '#e5e7eb',
                      backgroundColor: todo.completed ? '#f0fdf4' : '#ffffff',
                      borderRadius: '0.5rem'
                    }}
                  >
                    <span style={todo.completed ? {textDecoration: 'line-through', color: '#6b7280'} : {}}>
                      {todo.text}
                    </span>
                    <div style={styles.flexRow}>
                      <button
                        onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                        style={{
                          ...styles.button,
                          ...(todo.completed ? styles.buttonGray : styles.buttonGreen),
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.75rem'
                        }}
                      >
                        {todo.completed ? 'Deshacer' : 'Completar'}
                      </button>
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}
                        style={{
                          ...styles.button,
                          ...styles.buttonRed,
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.75rem'
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {state.todos.length === 0 && (
                <p style={{...styles.textGray, textAlign: 'center', padding: '1rem 0'}}>No hay tareas</p>
              )}
              
              <div style={{
                ...styles.textMuted,
                borderTop: '1px solid #e5e7eb',
                paddingTop: '0.75rem'
              }}>
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

// Footer Component
const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={{maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem'}}>
        <p style={{margin: 0}}>
          © 2024 React Guide - Aprende React paso a paso
        </p>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const renderSection = () => {
    switch (state.activeSection) {
      case 'inicio':
        return <Home />;
      case 'props':
        return <Props />;
      case 'state':
        return <State />;
      case 'lifecycle':
        return <Lifecycle />;
      case 'hooks':
        return <Hooks />;
      case 'virtualdom':
        return <VirtualDOM />;
      case 'redux':
        return <Redux />;
      default:
        return <Home />;
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div style={styles.container}>
        <Navigation />
        {renderSection()}
        <Footer />
      </div>
    </AppContext.Provider>
  );
};

export default App;