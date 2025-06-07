import React, {StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MeetingProvider } from './Context/userContext.jsx'

createRoot(document.getElementById('root')).render(
  <MeetingProvider>
    <App />
  </MeetingProvider>
)
