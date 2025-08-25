import React from 'react';

// Section Container
export const Section = ({ title, children }) => (
  <div className="max-w-6xl mx-auto px-6 py-16">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
    </div>
    {children}
  </div>
);

// Card Component
export const Card = ({ title, children, className = '' }) => (
  <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
    {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
    {children}
  </div>
);

// Code Block Component
export const CodeBlock = ({ title, children }) => (
  <Card title={title} className="font-mono text-sm bg-gray-50">
    <pre className="text-gray-700 overflow-x-auto">{children}</pre>
  </Card>
);