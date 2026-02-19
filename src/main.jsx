import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { LearningProvider } from './context/LearningContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LearningProvider>
        <App />
      </LearningProvider>
    </BrowserRouter>
  </React.StrictMode>
)
