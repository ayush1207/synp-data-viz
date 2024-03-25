/**
 * react essential imports
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
/**
 * design imports
 */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
/**
 * root-component import
 */
import App from './App';
/**
 * 
 */
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
