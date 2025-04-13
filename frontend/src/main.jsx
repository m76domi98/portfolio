import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createStars } from './utils/starEffect.js'
import './index.css'

document.addEventListener('DOMContentLoaded', () => {
  createStars();
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
