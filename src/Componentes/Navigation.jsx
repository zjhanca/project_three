import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext.js';

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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-semibold text-gray-900">React Guide</h1>
          
          <div className="hidden md:flex space-x-8">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => dispatch({ type: 'SET_ACTIVE_SECTION', payload: section.id })}
                className={`text-sm font-medium transition-colors ${
                  state.activeSection === section.id
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-4'
                    : 'text-gray-600 hover:text-gray-900 pb-4'
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>

          <select
            value={state.activeSection}
            onChange={(e) => dispatch({ type: 'SET_ACTIVE_SECTION', payload: e.target.value })}
            className="md:hidden px-3 py-1 border border-gray-300 rounded text-sm"
          >
            {sections.map(section => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;