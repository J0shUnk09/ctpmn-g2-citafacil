import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Los estilos globales se importan ANTES que App: así los CSS de cada página
// (que se cargan al importar App) pueden sobrescribir a los globales.
import './index.css'
import './styles/layout.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)