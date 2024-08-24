import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import App from './App';
// import dotenv from 'dotenv';
// dotenv.config();

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
