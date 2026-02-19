/**
 * main.jsx
 * Entry point. Wraps the App in Providers.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { LearningProvider } from './context/LearningContext'
import './index.css' // Stellt sicher, dass Tailwind geladen wird

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. Context Provider für den globalen State (XP, Level, Settings) */}
    <LearningProvider>
      {/* 2. Router für die Navigation */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LearningProvider>
  </React.StrictMode>,
)