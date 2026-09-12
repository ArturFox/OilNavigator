import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import './styles/main.scss'
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store/store.ts';

createRoot(document.getElementById('root')!).render(
  
  
  <BrowserRouter basename="/OilNavigator">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  
)
