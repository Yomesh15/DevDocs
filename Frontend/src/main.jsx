import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "jodit/es2021/jodit.min.css";
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './pages/auth/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
