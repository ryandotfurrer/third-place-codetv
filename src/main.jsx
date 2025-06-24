import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="max-w-screen-lg mx-auto p-4">
      <App />
    </div>
  </StrictMode>,
)
