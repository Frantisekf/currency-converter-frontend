import React from 'react';
import ReactDOM from 'react-dom/client';
import ConverterApp from './components/ConverterApp/ConverterApp';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConverterApp />
  </React.StrictMode>
);
