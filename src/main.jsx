import { createRoot } from 'react-dom/client'
import './index.css'
import './Pages/api/axios.js'
import Launcher from './Launcher.jsx'
import { BrowserRouter } from 'react-router-dom'
import ApplicationContextProvider from './context/ApplicationContextProvider.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <ApplicationContextProvider>
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: '14px',
            background: '#0f172a',
            color: '#fff',
            padding: '14px 16px',
            boxShadow: '0 16px 40px rgba(15,23,42,.18)',
          },
        }}
      />
      <Launcher />
    </BrowserRouter>
  </ApplicationContextProvider>
)
