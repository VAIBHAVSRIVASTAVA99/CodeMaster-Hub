import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import './index.css'


// console.log('Environment Variables:', {
//   BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
//   NODE_ENV: import.meta.env.MODE
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
)
