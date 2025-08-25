import React from 'react';
import { Section, Card, CodeBlock } from '../Componentes/UI/index.js';

const Home = () => (
  <Section title="Introducción a React">
    <div className="grid md:grid-cols-2 gap-8">
      <Card title="¿Qué es React?">
        <p className="text-gray-600 leading-relaxed">
          React es una biblioteca de JavaScript para construir interfaces de usuario, 
          especialmente para aplicaciones web. Fue desarrollada por Facebook y se basa 
          en componentes reutilizables.
        </p>
      </Card>
      
      <Card title="Características principales">
        <ul className="text-gray-600 space-y-2">
          <li>• Basado en componentes</li>
          <li>• Virtual DOM para optimización</li>
          <li>• Unidirectional data flow</li>
          <li>• JSX syntax</li>
          <li>• Hooks para manejo de estado</li>
          <li>• Ecosistema robusto</li>
        </ul>
      </Card>
      
      <div className="md:col-span-2">
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

export default Home;