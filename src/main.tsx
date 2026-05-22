import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './store/new-store.ts';
import './styles/main.scss'
import { BrowserRouter } from 'react-router-dom';




createRoot(document.getElementById('root')!).render(
  
  
  <BrowserRouter basename="/studentStartup">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  
)
