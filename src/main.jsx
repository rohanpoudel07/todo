import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GroupContextProvider } from './context/GroupContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GroupContextProvider>
      <App />
    </GroupContextProvider>
  </React.StrictMode>,
)
