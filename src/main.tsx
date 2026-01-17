import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ToolsPage from './components/ToolsPage'
import NotFound from './components/NotFound'

const root = ReactDOM.createRoot(document.getElementById('root')!)

const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'

if (pathname.startsWith('/tools')) {
    root.render(
        <React.StrictMode>
            <ToolsPage />
        </React.StrictMode>,
    )
} else if (pathname === '/' || pathname === '/index.html') {
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )
} else {
    root.render(
        <React.StrictMode>
            <NotFound />
        </React.StrictMode>,
    )
}