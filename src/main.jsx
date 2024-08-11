import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { EditorDataProvider } from './contexts/EditorDataProvider.jsx'

createRoot(document.getElementById('root')).render(
  <EditorDataProvider>
    <App />
  </EditorDataProvider>
)
